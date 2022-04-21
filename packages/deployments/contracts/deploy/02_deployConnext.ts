import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Wallet, constants } from "ethers";

import { SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";

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

  // Deploy connext contract
  console.log("Deploying connext...");
  const connext = await hre.deployments.deploy("ConnextHandler", {
    from: deployer.address,
    log: true,
    libraries: {
      // AssetLogic: assetLogic.address,
      ConnextUtils: connextUtils.address,
      RouterPermissionsManagerLogic: routerPermissionsManagerLogic.address,
    },
    proxy: {
      execute: {
        init: {
          methodName: "initialize",
          // TODO - Use real RelayerFeeRouter
          args: [
            domain,
            xappConnectionManagerDeployment.address,
            tokenRegistry.address,
            WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
            hre.ethers.constants.AddressZero,
          ],
        },
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "ConnextProxyAdmin",
    },
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  if (WRAPPED_ETH_MAP.has(+chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    try {
      deployedPriceOracleAddress = (await hre.deployments.get("ConnextPriceOracle")).address;
    } catch (e: unknown) {
      console.log("ConnextPriceOracle not deployed yet:", (e as Error).message);
    }
    await hre.deployments.deploy("ConnextPriceOracle", {
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
  }

  console.log("Deploying multicall...");
  let deployment = await hre.deployments.deploy("Multicall", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain...");
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
