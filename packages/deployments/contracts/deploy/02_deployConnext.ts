import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet, constants } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDomainInfoFromChainId } from "../src/nomad";
import { verify } from "../src/utils";

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
  console.log("============================= Deploying Connext ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  const domain = getDomainInfoFromChainId(network.chainId);
  console.log("domain: ", domain);

  console.log("Deploying relayer fee router...");
  // Get RelayerFeeRouter and TokenRegistry deployments.
  const relayerFeeRouterDeployment = await hre.deployments.getOrNull("RelayerFeeRouterUpgradeBeaconProxy");
  if (!relayerFeeRouterDeployment) {
    throw new Error(`RelayerFeRelayerFeeRoutere not deployed`);
  }
  const relayerFeeRouter = new hre.ethers.Contract(
    relayerFeeRouterDeployment.address,
    (await hre.deployments.getOrNull("RelayerFeeRouter"))!.abi,
  ).connect(deployer);

  // Get xapp connection manager
  const xappConnectionManagerDeployment = await hre.deployments.getOrNull("XAppConnectionManager");
  if (!xappConnectionManagerDeployment) {
    throw new Error(`XappConnectionManager not deployed`);
  }

  console.log("Deploying token registry...");
  const tokenRegistryDeployment = await hre.deployments.getOrNull("TokenRegistryUpgradeBeaconProxy");
  if (!tokenRegistryDeployment) {
    throw new Error(`TokenRegistry not deployed`);
  }
  const tokenRegistry = new hre.ethers.Contract(
    tokenRegistryDeployment.address,
    (await hre.deployments.getOrNull("TokenRegistry"))!.abi,
  ).connect(deployer);

  // Deploy Connext logic libraries
  console.log("Deploying utils, permissions manager...");
  const connextUtils = await hre.deployments.deploy("ConnextUtils", {
    from: deployer.address,
    log: true,
  });
  const routerPermissionsManagerLogic = await hre.deployments.deploy("RouterPermissionsManagerLogic", {
    from: deployer.address,
    log: true,
  });

  // verify libs
  console.log("verifying connext libraries...");
  await Promise.all([
    connextUtils.newlyDeployed ? verify(hre, connextUtils.address) : Promise.resolve(),
    routerPermissionsManagerLogic.newlyDeployed
      ? verify(hre, routerPermissionsManagerLogic.address)
      : Promise.resolve(),
  ]);

  // Deploy connext contract
  console.log("Deploying connext...");
  const libraries = {
    ConnextUtils: connextUtils.address,
    RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
  };
  const connext = await hre.deployments.deploy("ConnextHandler", {
    from: deployer.address,
    log: true,
    libraries,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            domain.domain,
            xappConnectionManagerDeployment.address,
            tokenRegistry.address,
            WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
            relayerFeeRouter.address,
          ],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "ConnextProxyAdmin",
    },
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

  // verify implementation
  if (connext.newlyDeployed) {
    console.log("verifying connext implementation...");
    await verify(hre, connext.implementation ?? connext.address, [], libraries);
  }

  if (WRAPPED_ETH_MAP.has(+chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    try {
      deployedPriceOracleAddress = (await hre.deployments.get("ConnextPriceOracle")).address;
    } catch (e: unknown) {
      console.log("ConnextPriceOracle not deployed yet:", (e as Error).message);
    }
    const { newlyDeployed: oracleNewlyDeployed } = await hre.deployments.deploy("ConnextPriceOracle", {
      from: deployer.address,
      args: [WRAPPED_ETH_MAP.get(+chainId)],
      log: true,
      skipIfAlreadyDeployed: true,
    });

    const priceOracleDeployment = await hre.deployments.get("ConnextPriceOracle");
    const newPriceOracleAddress = priceOracleDeployment.address;
    if (deployedPriceOracleAddress && deployedPriceOracleAddress != newPriceOracleAddress) {
      console.log("Setting v1PriceOracle, v1PriceOracle: ", deployedPriceOracleAddress);
      const priceOracleContract = await hre.ethers.getContractAt("ConnextPriceOracle", newPriceOracleAddress);
      const tx = await priceOracleContract.setV1PriceOracle(deployedPriceOracleAddress, { from: deployer });
      console.log("setV1PriceOracle tx: ", tx);
      await tx.wait();
    }

    // verify
    if (oracleNewlyDeployed) {
      console.log("verifying price oracle...");
      await verify(hre, newPriceOracleAddress, [WRAPPED_ETH_MAP.get(+chainId)]);
    }
  }

  console.log("Deploying multicall...");
  let deployment = await hre.deployments.deploy("Multicall", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  // verify multicall
  console.log("verifying multicall...");
  if (deployment.newlyDeployed) {
    await verify(hre, deployment.address);
  }

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
    deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      // salt: keccak256("amarokrulez"),
      skipIfAlreadyDeployed: true,
    });
    // verify test erc20
    console.log("verifying token...");
    if (deployment.newlyDeployed) {
      await verify(hre, deployment.address);
    }
    console.log("TestERC20: ", deployment.address);
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};

export default func;
func.tags = ["Connext"];
func.dependencies = ["Nomad"];
