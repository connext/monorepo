import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Wallet } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName, verify } from "../src/utils";
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
  console.log("============================= Deploying Connext ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  const domainConfig = getDomainInfoFromChainId(network.chainId);

  console.log("Fetching bridge router...");
  // Get BridgeRouter and TokenRegistry deployments.
  const bridgeRouterDeploymentName = getDeploymentName("BridgeRouterUpgradeBeaconProxy");
  const bridgeRouterDeployment = await hre.deployments.getOrNull(bridgeRouterDeploymentName);
  if (!bridgeRouterDeployment) {
    throw new Error(`BridgeRouter not deployed`);
  }
  const bridge = new hre.ethers.Contract(
    bridgeRouterDeployment.address,
    (await hre.deployments.getOrNull(getDeploymentName("BridgeRouter")))!.abi,
  ).connect(deployer);

  console.log("Fetching token registry...");
  const tokenRegistryDeployment = await hre.deployments.getOrNull(getDeploymentName("TokenRegistryUpgradeBeaconProxy"));
  if (!tokenRegistryDeployment) {
    throw new Error(`TokenRegistry not deployed`);
  }
  const tokenRegistry = new hre.ethers.Contract(
    tokenRegistryDeployment.address,
    (await hre.deployments.getOrNull(getDeploymentName("TokenRegistry")))!.abi,
  ).connect(deployer);

  // Deploy Connext logic libraries

  console.log("Deploying asset logic, utils, permissions manager...");
  const assetLogicName = getDeploymentName("AssetLogic");
  const assetLogic = await hre.deployments.deploy(assetLogicName, {
    from: deployer.address,
    log: true,
    contract: "AssetLogic",
  });
  const utilsLogicName = getDeploymentName("ConnextUtils");
  const connextUtils = await hre.deployments.deploy(utilsLogicName, {
    from: deployer.address,
    log: true,
    contract: "ConnextUtils",
  });
  const routersLogicName = getDeploymentName("RouterPermissionsManagerLogic");
  const routerPermissionsManagerLogic = await hre.deployments.deploy(routersLogicName, {
    from: deployer.address,
    log: true,
    contract: "RouterPermissionsManagerLogic",
  });

  // verify libs
  console.log("verifying connext libraries...");
  await Promise.all([
    assetLogic.newlyDeployed ? verify(hre, assetLogic.address) : Promise.resolve(),
    connextUtils.newlyDeployed ? verify(hre, connextUtils.address) : Promise.resolve(),
    routerPermissionsManagerLogic.newlyDeployed
      ? verify(hre, routerPermissionsManagerLogic.address)
      : Promise.resolve(),
  ]);

  // Deploy connext contract
  console.log("Deploying connext...");
  const libraries = {
    AssetLogic: assetLogic.address,
    ConnextUtils: connextUtils.address,
    RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
  };
  const connextName = getDeploymentName("Connext");
  const connext = await hre.deployments.deploy(connextName, {
    from: deployer.address,
    log: true,
    libraries,
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [
            domainConfig.domain,
            bridge.address,
            tokenRegistry.address,
            WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
          ],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: { name: getDeploymentName("ConnextProxyAdmin"), artifact: "ConnextProxyAdmin" },
    },
    contract: "Connext",
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  // verify implementation
  if (connext.newlyDeployed) {
    console.log("verifying connext implementation...");
    await verify(hre, connext.implementation ?? connext.address, [], libraries);
  }

  // Add tm to bridge
  if ((await bridge.connext()) !== connextAddress) {
    console.log("setting connext on bridge");
    const addTm = await bridge.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("bridge connext set");
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

    // verify deployment
    console.log("verifying ConnextPriceOracle...");
    await verify(hre, priceOracleDeployment.address, [WRAPPED_ETH_MAP.get(+chainId)]);
  }

  console.log("Deploying multicall...");
  const multicallName = getDeploymentName("Multicall");
  let deployment = await hre.deployments.deploy(multicallName, {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
    contract: "Multicall",
  });

  // verify multicall
  console.log("verifying multicall...");
  await verify(hre, deployment.address);

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
    // Note: NOT using special token for staging envs
    deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      // salt: keccak256("amarokrulez"),
      skipIfAlreadyDeployed: true,
    });
    // verify test erc20
    console.log("verifying token...");
    await verify(hre, deployment.address);
    console.log("TestERC20: ", deployment.address);

    // verify deployment
    console.log("verifying TestERC20");
    await verify(hre, deployment.address);
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }

  // Verify libraries
  console.log("verifying AssetLogic implementation");
  await verify(hre, assetLogic.address);
  console.log("verifying ConnextUtils implementation");
  await verify(hre, connextUtils.address);
  console.log("verifying RouterPermissionsManagerLogic implementation");
  await verify(hre, routerPermissionsManagerLogic.address);

  // Verify connext implementation
  console.log("verifying connext implementation");
  const implementation = await hre.deployments.get(connextName + "_Implementation");
  await verify(hre, implementation.address, [], {
    AssetLogic: assetLogic.address,
    ConnextUtils: connextUtils.address,
    RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
  });
};

export default func;
func.tags = ["Connext"];
func.dependencies = ["Nomad"];
