import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeploymentSubmission } from "hardhat-deploy/types";
import { Contract, Signer, BigNumber } from "ethers";

import { NOMAD_DEPLOYMENTS, SKIP_SETUP, WRAPPED_ETH_MAP } from "../src/constants";

const NOMAD_CONTRACT_NAMES = ["TokenRegistry", "BridgeMessage", "BridgeRouter"];

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

const deployNomadBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  const factory = await hre.ethers.getContractFactory(name, deployer.address);
  const proxyName = `${name}UpgradeBeaconProxy`;
  const initData = factory.interface.encodeFunctionData("initialize", args);

  // Get controller deployment
  const controllerDeployment = await hre.deployments.getOrNull(`UpgradeBeaconController`);
  if (!controllerDeployment) {
    throw new Error(`No UpgradeBeaconController deployed`);
  }

  // Check if already deployed
  let proxyDeployment = await hre.deployments.getOrNull(proxyName);
  let implementation: string | undefined;
  let beaconAddress: string | undefined;

  let deployedImplementation = false;

  if (proxyDeployment) {
    console.log(`${name} proxy deployed. upgrading...`);
    // Get beacon and implementation addresses
    beaconAddress = (await hre.deployments.getOrNull(`${name}UpgradeBeacon`))?.address;
    implementation = (await hre.deployments.getOrNull(name))?.address;
    if (!implementation || !beaconAddress) {
      throw new Error(`Could not find beacon or implementation address for ${name}`);
    }

    // Check if theres an upgrade needed by checking the deployed code
    const artifact = await hre.deployments.getArtifact(name);
    const deployment = await hre.deployments.getOrNull(name);
    if (artifact.deployedBytecode !== deployment?.deployedBytecode) {
      // Must upgrade the proxy
      // First, deploy new implementation
      const upgradeDeployment = await hre.deployments.deploy(name, {
        args: [],
        from: deployer.address,
        skipIfAlreadyDeployed: false,
        log: true,
      });
      implementation = upgradeDeployment.address;
      deployedImplementation = true;
      console.log(`upgrading proxy to implementation logic at: ${implementation}`);

      // Then, upgrade proxy via beacon controller
      const controller = new Contract(controllerDeployment.address, controllerDeployment.abi).connect(deployer);
      const upgrade = await controller.upgrade(beaconAddress, implementation, { gasLimit: BigNumber.from(1_000_000) });
      console.log(`${name} upgrade transaction:`, upgrade.hash);
      const receipt = await upgrade.wait();
      console.log(`${name} upgrade tx mined:`, receipt.transactionHash);
    } else {
      console.log(`no upgrade needed, using implementation at: ${implementation}`);
    }
  } else {
    console.log(`Deploying ${name} with nomad upgradeable scheme`);

    // 1. Deploy implementation
    const implementationDeployment = await hre.deployments.deploy(name, {
      args: [],
      from: deployer.address,
      skipIfAlreadyDeployed: true,
      log: true,
    });
    implementation = implementationDeployment.address;
    deployedImplementation = true;
    console.log(`deployed implementation: ${implementation}`);

    // 2. Deploy UpgradeBeacon
    const beaconDeployment = await hre.deployments.deploy(`${name}UpgradeBeacon`, {
      args: [implementation, controllerDeployment.address],
      from: deployer.address,
      skipIfAlreadyDeployed: true,
      log: true,
      contract: "UpgradeBeacon",
    });
    beaconAddress = beaconDeployment.address;

    // 3. Deploy UpgradeBeaconProxy
    proxyDeployment = await hre.deployments.deploy(proxyName, {
      args: [beaconAddress, initData],
      from: deployer.address,
      skipIfAlreadyDeployed: true,
      log: true,
      contract: "UpgradeBeaconProxy",
    });
  }

  // Verify implementation
  if (deployedImplementation) {
    try {
      console.log(`Verifying implementation`);
      await hre.run("verify:verify", {
        address: implementation,
        constructorArguments: [],
      });
    } catch (e: any) {
      if (e.message.includes("Already Verified")) {
        console.log(`${name} at ${implementation} already verified`);
      } else {
        //throw e;
      }
    }
  }

  const proxy = new Contract(proxyDeployment.address, (await hre.deployments.getOrNull(name))!.abi).connect(deployer);

  return proxy as unknown as T;
};

// Helper function
const deployBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  if (NOMAD_CONTRACT_NAMES.map((n) => n.toLowerCase()).includes(name.toLowerCase())) {
    throw new Error(`Should not use "deployBeaconProxy" for nomad contracts`);
  }
  const factory = await hre.ethers.getContractFactory(name, deployer.address);
  const proxyName = `${name}UpgradeBeaconProxy`;
  const initData = factory.interface.encodeFunctionData("initialize", args);

  // Check if already deployed. then upgrade
  const proxyDeployment = await hre.deployments.getOrNull(proxyName);
  let proxy: Contract;
  let implementation: string;
  let beaconAddress: string | undefined;

  if (proxyDeployment) {
    console.log(`${name} proxy deployed. upgrading........`);

    beaconAddress = await hre.upgrades.erc1967.getBeaconAddress(proxyDeployment.address);
    implementation = await hre.upgrades.beacon.getImplementationAddress(beaconAddress);

    const deployedImpl = await hre.upgrades.prepareUpgrade(beaconAddress, factory);
    // check if need to be upgraded.
    if (deployedImpl.toLowerCase() !== implementation.toLowerCase()) {
      await hre.upgrades.upgradeBeacon(beaconAddress, factory);
      implementation = deployedImpl;
      console.log(`${name} Implementation should be upgraded to ${implementation}.  proxy upgraded.`);
    } else {
      console.log(`${name} No changes in the current implementation`);
    }
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
    await saveDeployment(beaconAddress, `${name}UpgradeBeacon`, [implementation], "UpgradeBeacon", hre);
    await saveDeployment(proxyAddress, `${name}UpgradeBeaconProxy`, [beaconAddress, initData], "BeaconProxy", hre);
  }
  // Save Implementation
  await saveDeployment(implementation, name, [], name, hre);
  // Verify contracts
  try {
    // verify implementation
    console.log(`Verify new implementation ${implementation} ...`);
    await hre.run("verify:verify", {
      address: implementation,
      constructorArguments: [],
    });
  } catch (e) {
    console.log("Error while verify implementation:", e);
  }
  return (await hre.ethers.getContractAt(factory.interface.format(), proxy.address)) as T;
};

const deployUpgradeable = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  if (NOMAD_CONTRACT_NAMES.map((n) => n.toLowerCase()).includes(name.toLowerCase())) {
    return deployNomadBeaconProxy(name, args, deployer, hre);
  }
  // Not a nomad contract, should use the standard Initializable/Upgradeable proxy
  // contracts by open zeppelin. these are default compatible with the deploy plugin
  return deployBeaconProxy(name, args, deployer, hre);
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
    log: true,
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
    deployer,
    hre,
  );

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
    await deployUpgradeable("BridgeRouter", [tokenRegistry.address, xappConnectionManagerAddress], deployer, hre)
  ).connect(deployer);
  console.log("bridge address:", bridge.address);
  console.log("bridge owner:", await bridge.owner());

  // NOTE: need to run `enrollHandler` task post-deployment to enroll the
  // remote routers for different chains after they are all deployed
  // ========== End: Nomad BridgeRouter Deployment ==========

  // Deploy connext contract
  const connext = await deployUpgradeable(
    "Connext",
    [nomadConfig.domain, bridge.address, tokenRegistry.address, nomadConfig.wrappedEth],
    deployer,
    hre,
  );
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  // Add tm to bridge
  if ((await bridge.connext) !== connextAddress) {
    console.log("setting connext on bridge");
    const addTm = await bridge.connect(deployer).setConnext(connextAddress);
    await addTm.wait();
  } else {
    console.log("bridge connext set");
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
