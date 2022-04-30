import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Wallet } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName } from "../src/utils";
import { getDomainInfoFromChainId } from "../src/nomad";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let _deployer: any;
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Connext ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  const domainConfig = getDomainInfoFromChainId(network.chainId);

  console.log("Deploying relayer fee router...");
  // Get RelayerFeeRouter and TokenRegistry deployments.
  const relayerFeeRouterName = getDeploymentName("RelayerFeeRouterUpgradeBeaconProxy");
  const relayerFeeRouterDeployment = await hre.deployments.getOrNull(relayerFeeRouterName);
  const relayerFeeRouterImplementationName = getDeploymentName("RelayerFeeRouter");
  const relayerFeeRouterImplementationDeployment = await hre.deployments.getOrNull(relayerFeeRouterImplementationName);

  if (!relayerFeeRouterDeployment || !relayerFeeRouterImplementationDeployment) {
    throw new Error(
      `RelayerFeeRouterUpgradeBeaconProxy not deployed. ` +
        `Upgrade Beacon: ${!!relayerFeeRouterDeployment}; Implementation: ${!!relayerFeeRouterImplementationDeployment}`,
    );
  }

  const relayerFeeRouter = new hre.ethers.Contract(
    relayerFeeRouterDeployment.address,
    relayerFeeRouterImplementationDeployment.abi,
  ).connect(deployer);

  // Get xapp connection manager
  const xappConnectionManagerDeployment = await hre.deployments.getOrNull(getDeploymentName("XAppConnectionManager"));
  if (!xappConnectionManagerDeployment) {
    throw new Error(`XappConnectionManager not deployed`);
  }

  console.log("Fetching token registry...");
  const tokenRegistryDeployment = await hre.deployments.getOrNull(getDeploymentName("TokenRegistryUpgradeBeaconProxy"));
  if (!tokenRegistryDeployment) {
    throw new Error(`TokenRegistry not deployed`);
  }
  console.log("Deploying token registry...");
  const tokenRegistry = new hre.ethers.Contract(
    tokenRegistryDeployment.address,
    (await hre.deployments.getOrNull(getDeploymentName("TokenRegistry")))!.abi,
  ).connect(deployer);

  // Deploy Connext logic libraries
  console.log("Deploying asset logic, utils, permissions manager...");
  const assetLogicName = getDeploymentName("AssetLogic");
  await hre.deployments.deploy(assetLogicName, {
    from: deployer.address,
    log: true,
    contract: "AssetLogic",
  });
  const utilsLogicName = getDeploymentName("ConnextLogic");
  const connextLogic = await hre.deployments.deploy(utilsLogicName, {
    from: deployer.address,
    log: true,
    contract: "ConnextLogic",
  });
  const routersLogicName = getDeploymentName("RouterPermissionsManagerLogic");
  const routerPermissionsManagerLogic = await hre.deployments.deploy(routersLogicName, {
    from: deployer.address,
    log: true,
    contract: "RouterPermissionsManagerLogic",
  });

  // Deploy connext contract
  console.log("Deploying connext...");
  const libraries = {
    ConnextLogic: connextLogic.address,
    RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
  };
  const connext = await hre.deployments.deploy(getDeploymentName("ConnextHandler"), {
    from: deployer.address,
    log: true,
    libraries,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            domainConfig.domain,
            xappConnectionManagerDeployment.address,
            tokenRegistry.address,
            WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
            relayerFeeRouter.address,
          ],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: { name: getDeploymentName("ConnextProxyAdmin"), artifact: "ConnextProxyAdmin" },
    },
    contract: "ConnextHandler",
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  // Add connext to relayer fee router
  if ((await relayerFeeRouter.connext()) !== connextAddress) {
    console.log("setting connext on relayer fee router");
    const addTm = await relayerFeeRouter.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("relayer fee router connext set");
  }

  if (WRAPPED_ETH_MAP.has(+chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    const priceOracleDeploymentName = getDeploymentName("ConnextPriceOracle");
    try {
      deployedPriceOracleAddress = (await hre.deployments.get(priceOracleDeploymentName)).address;
    } catch (e: unknown) {
      console.log("ConnextPriceOracle not deployed yet:", (e as Error).message);
    }
    await hre.deployments.deploy(priceOracleDeploymentName, {
      from: deployer.address,
      args: [WRAPPED_ETH_MAP.get(+chainId)],
      log: true,
      skipIfAlreadyDeployed: true,
      contract: "ConnextPriceOracle",
    });

    const priceOracleDeployment = await hre.deployments.get(priceOracleDeploymentName);
    const newPriceOracleAddress = priceOracleDeployment.address;
    if (deployedPriceOracleAddress && deployedPriceOracleAddress != newPriceOracleAddress) {
      console.log("Setting v1PriceOracle, v1PriceOracle: ", deployedPriceOracleAddress);
      const priceOracleContract = await hre.ethers.getContractAt(priceOracleDeploymentName, newPriceOracleAddress);
      const tx = await priceOracleContract.setV1PriceOracle(deployedPriceOracleAddress, { from: deployer });
      console.log("setV1PriceOracle tx: ", tx);
      await tx.wait();
    }
  }

  console.log("Deploying multicall...");
  const multicallName = getDeploymentName("Multicall");
  let deployment = await hre.deployments.deploy(multicallName, {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "Multicall",
  });

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
    // Note: NOT using special token for staging envs
    deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      // salt: keccak256("amarokrulez"),
      skipIfAlreadyDeployed: true,
    });
    console.log("TestERC20: ", deployment.address);
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};

export default func;
func.tags = ["Connext"];
func.dependencies = ["Nomad"];
