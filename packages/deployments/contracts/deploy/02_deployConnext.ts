import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Contract, utils, Wallet } from "ethers";
import { ethers } from "hardhat";
import { keccak256 } from "ethers/lib/utils";

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
  console.log("\n============================= Deploying Connext Diamond ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  const domainConfig = getDomainInfoFromChainId(network.chainId);

  console.log("Fetching relayer fee router...");
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

  console.log("Fetching promise router...");
  const promiseRouterDeployment = await hre.deployments.getOrNull(getDeploymentName("PromiseRouterUpgradeBeaconProxy"));
  const promiseRouterImplementationDeployment = await hre.deployments.getOrNull(getDeploymentName("PromiseRouter"));

  if (!promiseRouterDeployment || !promiseRouterImplementationDeployment) {
    throw new Error(
      `PromiseRouterUpgradeBeaconProxy not deployed. ` +
        `Upgrade Beacon: ${!!promiseRouterDeployment}; Implementation: ${!!promiseRouterImplementationDeployment}`,
    );
  }

  const promiseRouter = new hre.ethers.Contract(
    promiseRouterDeployment.address,
    promiseRouterImplementationDeployment.abi,
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
  const tokenRegistry = new hre.ethers.Contract(
    tokenRegistryDeployment.address,
    (await hre.deployments.getOrNull(getDeploymentName("TokenRegistry")))!.abi,
  ).connect(deployer);

  const lpTokenDeployment = await hre.deployments.deploy("LPToken", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (lpTokenDeployment.newlyDeployed) {
    await hre.deployments.execute(
      "LPToken",
      { from: deployer.address, log: true },
      "initialize",
      "Nxtp Stable LP Token",
      "NxtpStableLPToken",
    );
  }

  // Deploy connext diamond contract
  console.log("Deploying connext diamond...");
  const connext = await hre.deployments.diamond.deploy(getDeploymentName("ConnextHandler"), {
    from: deployer.address,
    owner: deployer.address,
    log: true,
    facets: [
      { name: getDeploymentName("AssetFacet"), contract: "AssetFacet", args: [] },
      { name: getDeploymentName("BridgeFacet"), contract: "BridgeFacet", args: [] },
      { name: getDeploymentName("NomadFacet"), contract: "NomadFacet", args: [] },
      { name: getDeploymentName("ProposedOwnableFacet"), contract: "ProposedOwnableFacet", args: [] },
      { name: getDeploymentName("RelayerFacet"), contract: "RelayerFacet", args: [] },
      { name: getDeploymentName("RoutersFacet"), contract: "RoutersFacet", args: [] },
      { name: getDeploymentName("StableSwapFacet"), contract: "StableSwapFacet", args: [] },
      { name: getDeploymentName("VersionFacet"), contract: "VersionFacet", args: [] },
    ],
    defaultOwnershipFacet: false,
    execute: {
      contract: "DiamondInit",
      methodName: "init",
      args: [
        domainConfig.domain,
        xappConnectionManagerDeployment.address,
        tokenRegistry.address,
        WRAPPED_ETH_MAP.get(+chainId) ?? constants.AddressZero,
        relayerFeeRouter.address,
        promiseRouter.address,
      ],
    },
    // deterministicSalt: keccak256(utils.toUtf8Bytes("connextDiamondProxyV1")),
  });
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  // Sanity check: did token registry set
  const contract = new Contract(connext.address, connext.abi, ethers.provider);
  if ((await contract.tokenRegistry()).toLowerCase() !== tokenRegistry.address.toLowerCase()) {
    console.log("expected token registry:", tokenRegistry.address);
    console.log("init-d token registry:", await contract.tokenRegistry());
    throw new Error(`Improperly init-d token registry`);
  }

  // Add connext to relayer fee router
  if ((await relayerFeeRouter.connext()) !== connextAddress) {
    console.log("setting connext on relayer fee router");
    const addTm = await relayerFeeRouter.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("relayer fee router connext set");
  }

  // Add connext to promise router
  if ((await promiseRouter.connext()) !== connextAddress) {
    console.log("setting connext on promiseRouter router");
    const addTm = await promiseRouter.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("promise router connext set");
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
      deterministicDeployment: keccak256(utils.toUtf8Bytes("connextTestERC20")),
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
