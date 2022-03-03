import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Signer } from "ethers";

import { NOMAD_DEPLOYMENTS, SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";

// Helper function
const deployUpgradeable = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  controllerAddress: string,
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  // Get init data
  const factory = await hre.ethers.getContractFactory(name, deployer.address);
  const initData = factory.interface.encodeFunctionData("initialize", args);

  // Deploy implementation
  const implementationDeployment = await hre.deployments.deploy(name, {
    from: deployer.address,
    log: true,
  });
  const implementationAddress = implementationDeployment.address;

  // Deploy beacon
  const beaconDeployment = await hre.deployments.deploy(name + "UpgradeBeacon", {
    from: deployer.address,
    args: [implementationAddress, controllerAddress],
    log: true,
    contract: "UpgradeBeacon",
  });
  const beaconAddress = beaconDeployment.address;
  console.log(`${name} beaconAddress:`, beaconAddress);

  // Deploy proxy
  const proxyDeployment = await hre.deployments.deploy(name + "UpgradeBeaconProxy", {
    from: deployer.address,
    args: [beaconAddress, initData],
    log: true,
    contract: "UpgradeBeaconProxy",
  });
  const proxyAddress = proxyDeployment.address;
  console.log(`${name} proxyAddress:`, proxyAddress);
  return hre.ethers.getContractAt(proxyDeployment.abi, proxyDeployment.address);
};

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  const chainId = await hre.getChainId();

  let deployer: any;
  ({ deployer } = await hre.ethers.getNamedSigners());
  if (!deployer) {
    [deployer] = await hre.ethers.getUnnamedSigners();
  }
  console.log("deployer: ", deployer.address);

  const nomadConfig = NOMAD_DEPLOYMENTS.get(Number(chainId));
  if (!nomadConfig) {
    throw new Error(`No mapping exists for chain ${chainId}`);
  }
  console.log("nomadConfig: ", nomadConfig);

  // ========== Start: Nomad BridgeRouter Deployment ==========
  // Deploy beacon controller
  const controllerDeployment = await hre.deployments.deploy("UpgradeBeaconController", {
    from: deployer.address,
    log: true,
  });
  const controllerAddress = controllerDeployment.address;

  // Deploy xapp connection manager
  console.log("Deploying xapp connection manager...");
  const xappDeployment = await hre.deployments.deploy("XAppConnectionManager", {
    from: deployer.address,
  });
  console.log("deploy tx:", xappDeployment.transactionHash);
  const xappConnectionManagerAddress = xappDeployment.address;
  console.log("xappConnectionManagerAddress:", xappConnectionManagerAddress);
  const xappConnectionManager = (
    await hre.ethers.getContractAt("XAppConnectionManager", xappConnectionManagerAddress)
  ).connect(deployer);

  console.log("Deploying token registry...");
  const tokenRegistry = await deployUpgradeable(
    "TokenRegistry",
    [nomadConfig.tokenBeacon, xappConnectionManagerAddress],
    controllerAddress,
    deployer,
    hre,
  );
  console.log("tokenRegistry address:", tokenRegistry.address);

  // Set token registry local domain
  console.log("Setting local domain of token registry...");
  const setDomain = await tokenRegistry.setLocalDomain(nomadConfig.domain);
  console.log("setDomain tx:", setDomain.hash);
  const setDomainReceipt = await setDomain.wait();
  console.log("setDomain tx mined:", setDomainReceipt);

  // Set the home
  console.log("xapp owner", await xappConnectionManager.owner());
  if ((await xappConnectionManager.home()).toLowerCase() !== nomadConfig.home.toLowerCase()) {
    console.log("setting home....");
    const home = await xappConnectionManager.setHome(nomadConfig.home);
    const homeTx = await home.wait();
    console.log("setHome:", homeTx.transactionHash);
  } else {
    console.log("home set");
  }

  // Enroll all the replicas
  for (const { replica, domain, chainId } of nomadConfig.replicas) {
    if (!(await xappConnectionManager.isReplica(replica))) {
      console.log(`enrolling replica for ${chainId}`);
      const enroll = await xappConnectionManager.ownerEnrollReplica(replica, domain);
      const tx = await enroll.wait();
      console.log(`enrolled replica for ${chainId}: ${tx.transactionHash}`);
    } else {
      console.log(`replica for ${chainId} enrolled`);
    }
  }

  // Deploy bridge router
  console.log("Deploying bridge router...");
  const bridge = (
    await deployUpgradeable(
      "BridgeRouter",
      [tokenRegistry.address, xappConnectionManagerAddress],
      controllerAddress,
      deployer,
      hre,
    )
  ).connect(deployer);
  console.log("bridge address:", bridge.address);
  console.log("bridge owner:", await bridge.owner());

  // NOTE: need to run `enrollHandler` task post-deployment to enroll the
  // remote routers for different chains after they are all deployed
  // ========== End: Nomad BridgeRouter Deployment ==========

  // Deploy tx manager
  let deployment = await hre.deployments.deploy("TransactionManager", {
    from: deployer.address,
    args: [nomadConfig.domain, bridge.address, tokenRegistry.address, nomadConfig.wrappedEth],
    log: true,
    // salt: keccak256("amarokrulez"),
  });
  // let deployment = await dep.deploy();
  const txManagerAddress = deployment.address;
  console.log("txManagerAddress: ", txManagerAddress);

  // Add tm to bridge
  if ((await bridge.transactionManager) !== txManagerAddress) {
    console.log("setting tx manager on bridge");
    const addTm = await bridge.connect(deployer).setTransactionManager(txManagerAddress);
    await addTm.wait();
  } else {
    console.log("bridge tx manager set");
  }

  if (WRAPPED_ETH_MAP.has(+chainId)) {
    console.log("Deploying ConnextPriceOracle to configured chain");

    let deployedPriceOracleAddress;
    try {
      deployedPriceOracleAddress = (await hre.deployments.get("ConnextPriceOracle")).address;
    } catch (e) {
      console.log("ConnextPriceOracle not deployed yet");
    }
    await hre.deployments.deploy("ConnextPriceOracle", {
      from: deployer.address,
      args: [WRAPPED_ETH_MAP.get(+chainId)],
      log: true,
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

  console.log("Deploying multicall to configured chain");
  deployment = await hre.deployments.deploy("Multicall", {
    from: deployer.address,
    log: true,
    // salt: keccak256("amarokrulez"),
  });
  // await dep.deploy();

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain");
    await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      // salt: keccak256("amarokrulez"),
    });
    // deployment = await dep.deploy();
    console.log("TestERC20: ", deployment.address);

    console.log("Deploying test stable swap on non-mainnet chain");
    await hre.deployments.deploy("TestStableSwap", {
      from: deployer.address,
      log: true,
    });
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};
export default func;
