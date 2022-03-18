import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentSubmission } from "hardhat-deploy/types";
import { Contract, Signer } from "ethers";

import { NOMAD_DEPLOYMENTS, SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";

const saveDeployment = async (
  address: string,
  name: string,
  args: any[],
  artifactName: string,
  hre: HardhatRuntimeEnvironment,
) => {
  const artifact = await hre.deployments.getExtendedArtifact(artifactName);
  const deploymentSubmission: DeploymentSubmission = {
    address,
    args,
    ...artifact,
  };

  hre.deployments.save(`${name}`, deploymentSubmission);
};
// Helper function
const deployBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  const factory = await hre.ethers.getContractFactory(name, deployer.address);
  const proxyName = `${name}UpgradeBeaconProxy`;
  const initData = factory.interface.encodeFunctionData("initialize", args);

  // Check if already deployed. then upgrade
  const proxyDeployment = await hre.deployments.getOrNull(proxyName);

  let proxy: Contract;
  let implementation: string;
  let beaconAddress: string;

  if (proxyDeployment) {
    console.log(`${name} proxy deployed. upgrading........`);
    beaconAddress = await hre.upgrades.erc1967.getBeaconAddress(proxyDeployment.address);
    await hre.upgrades.upgradeBeacon(beaconAddress, factory);

    console.log(`${name} proxy upgraded.`);

    implementation = await hre.upgrades.beacon.getImplementationAddress(beaconAddress);
    proxy = await hre.ethers.getContractAt(proxyDeployment.abi, proxyDeployment.address);
  } else {
    // Deploy new implementation
    const beacon = await hre.upgrades.deployBeacon(factory);
    await beacon.deployed();
    beaconAddress = beacon.address;
    console.log(`${name} beaconAddress:`, beaconAddress);

    // Deploy new proxy
    proxy = await hre.upgrades.deployBeaconProxy(beacon, factory, args);
    await proxy.deployed();

    const proxyAddress = proxy.address;
    console.log(`${name} proxyAddress:`, proxyAddress);

    implementation = await hre.upgrades.beacon.getImplementationAddress(beaconAddress);

    // Save to deployments
    await saveDeployment(beaconAddress, `${name}UpgradeableBeacon`, [implementation], "UpgradeableBeacon", hre);
    await saveDeployment(proxyAddress, `${name}UpgradeBeaconProxy`, [beaconAddress, initData], "BeaconProxy", hre);
  }

  // Save Implementation
  await saveDeployment(implementation, name, [], name, hre);

  // Verify contracts
  try {
    //verify implementation
    console.log(`Verify new implementation ${implementation} ...`);

    await hre.run("verify:verify", {
      address: implementation,
      constructorArguments: [],
    });
  } catch (e) {
    console.log("Errow while verify implementation");
  }

  return (await hre.ethers.getContractAt(factory.interface.format(), proxy.address)) as T;
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

  // Deploy xapp connection manager
  console.log("Deploying xapp connection manager...");
  const xappDeployment = await hre.deployments.deploy("XAppConnectionManager", {
    from: deployer.address,
    skipIfAlreadyDeployed: true,
  });
  console.log("deploy tx:", xappDeployment.transactionHash);
  const xappConnectionManagerAddress = xappDeployment.address;
  console.log("xappConnectionManagerAddress:", xappConnectionManagerAddress);

  const xappConnectionManager = (
    await hre.ethers.getContractAt("XAppConnectionManager", xappConnectionManagerAddress)
  ).connect(deployer);

  console.log("Deploying token registry...");
  const tokenRegistry = await deployBeaconProxy(
    "TokenRegistry",
    [nomadConfig.tokenBeacon, xappConnectionManagerAddress],
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
    await deployBeaconProxy("BridgeRouter", [tokenRegistry.address, xappConnectionManagerAddress], deployer, hre)
  ).connect(deployer);
  console.log("bridge address:", bridge.address);
  console.log("bridge owner:", await bridge.owner());

  // NOTE: need to run `enrollHandler` task post-deployment to enroll the
  // remote routers for different chains after they are all deployed
  // ========== End: Nomad BridgeRouter Deployment ==========

  // Deploy tx manager
  const txManager = await deployBeaconProxy(
    "TransactionManager",
    [nomadConfig.domain, bridge.address, tokenRegistry.address, nomadConfig.wrappedEth],
    deployer,
    hre,
  );
  const txManagerAddress = txManager.address;
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

  console.log("Deploying multicall to configured chain");
  let deployment = await hre.deployments.deploy("Multicall", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: true,
  });

  if (!SKIP_SETUP.includes(parseInt(chainId))) {
    console.log("Deploying test token on non-mainnet chain");
    deployment = await hre.deployments.deploy("TestERC20", {
      from: deployer.address,
      log: true,
      // salt: keccak256("amarokrulez"),
      skipIfAlreadyDeployed: true,
    });
    // deployment = await dep.deploy();
    console.log("TestERC20: ", deployment.address);

    console.log("Deploying test stable swap on non-mainnet chain");
    await hre.deployments.deploy("TestStableSwap", {
      from: deployer.address,
      log: true,
      skipIfAlreadyDeployed: true,
    });
  } else {
    console.log("Skipping test setup on chainId: ", chainId);
  }
};
export default func;
