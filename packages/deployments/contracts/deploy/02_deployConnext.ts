import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet, constants } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";
import { getDeploymentName } from "../src/utils";

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let _deployer: any;
  ({ _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("============================= Deploying Connext ===============================");
  console.log("deployer: ", deployer.address);

  // Just plug in hardcoded domain for testing.
  const domain = 31337;

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

  // Deploy connext contract
  console.log("Deploying connext...");
  const connextName = getDeploymentName("Connext");
  const connext = await hre.deployments.deploy(connextName, {
    from: deployer.address,
    log: true,
    libraries: {
      AssetLogic: assetLogic.address,
      ConnextUtils: connextUtils.address,
      RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
    },
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          args: [domain, bridge.address, tokenRegistry.address, WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: { name: getDeploymentName("ConnextProxyAdmin"), artifact: "ConnextProxyAdmin" },
    },
    contract: "Connext",
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

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

  // Verify connext
  try {
    await hre.run("verify:verify", {
      address: connext.address,
      constructorArguments: [],
      libraries: {
        AssetLogic: assetLogic.address,
        ConnextUtils: connextUtils.address,
        RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
      },
    });
  } catch (e: unknown) {
    console.log("Error while verify connext contract", connext.address, e);
  }
};

export default func;
func.tags = ["Connext"];
func.dependencies = ["Nomad"];
