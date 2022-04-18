import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Signer, BigNumber, Wallet, constants } from "ethers";
import { config } from "dotenv";

import { NomadDomainInfo } from "../src/nomad";
import { getDeploymentName } from "../src/utils";

config();

const deployNomadBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
): Promise<T> => {
  // get names
  const implementationName = getDeploymentName(name);
  const upgradeBeaconName = getDeploymentName(`${name}UpgradeBeacon`);
  const proxyName = getDeploymentName(`${name}UpgradeBeaconProxy`);
  const upgradeBeaconControllerName = getDeploymentName(`UpgradeBeaconController`);

  // get data + factories
  const factory = await hre.ethers.getContractFactory(name, deployer.address);
  const initData = factory.interface.encodeFunctionData("initialize", args);

  // Get controller deployment
  let controllerDeployment = await hre.deployments.getOrNull(upgradeBeaconControllerName);
  if (!controllerDeployment) {
    controllerDeployment = await hre.deployments.deploy(upgradeBeaconControllerName, {
      from: deployer.address,
      log: true,
      contract: "UpgradeBeaconController",
    });
  }

  // Check if already deployed
  let proxyDeployment = await hre.deployments.getOrNull(proxyName);
  let implementation: string | undefined;
  let beaconAddress: string | undefined;

  let deployedImplementation = false;

  if (proxyDeployment) {
    console.log(`${name} proxy deployed. upgrading...`);
    // Get beacon and implementation addresses
    beaconAddress = (await hre.deployments.getOrNull(upgradeBeaconName))?.address;
    implementation = (await hre.deployments.getOrNull(name))?.address;
    if (!implementation || !beaconAddress) {
      throw new Error(`Could not find beacon or implementation address for ${name}`);
    }

    // Check if theres an upgrade needed by checking the deployed code
    const artifact = await hre.deployments.getArtifact(name);
    const deployment = await hre.deployments.getOrNull(implementationName);
    if (artifact.deployedBytecode !== deployment?.deployedBytecode) {
      // Must upgrade the proxy
      // First, deploy new implementation
      const upgradeDeployment = await hre.deployments.deploy(implementationName, {
        args: [],
        from: deployer.address,
        skipIfAlreadyDeployed: false,
        log: true,
        contract: name,
      });
      implementation = upgradeDeployment.address;
      deployedImplementation = true;
      console.log(`upgrading proxy to implementation logic at: ${implementation}`);

      // Then, upgrade proxy via beacon controller
      const controller = new Contract(controllerDeployment.address, controllerDeployment.abi).connect(deployer);
      const upgrade = await controller.upgrade(beaconAddress, implementation, { gasLimit: BigNumber.from(1_000_000) });
      console.log(`${implementationName} upgrade transaction:`, upgrade.hash);
      const receipt = await upgrade.wait();
      console.log(`${implementationName} upgrade tx mined:`, receipt.transactionHash);
    } else {
      console.log(`no upgrade needed, using implementation at: ${implementation}`);
    }
  } else {
    console.log(`Deploying ${implementationName} with nomad upgradeable scheme`);

    // 1. Deploy implementation
    const implementationDeployment = await hre.deployments.deploy(implementationName, {
      args: [],
      from: deployer.address,
      skipIfAlreadyDeployed: true,
      log: true,
      contract: name,
    });
    implementation = implementationDeployment.address;
    deployedImplementation = true;
    console.log(`deployed implementation: ${implementation}`);

    // 2. Deploy UpgradeBeacon
    const beaconDeployment = await hre.deployments.deploy(upgradeBeaconName, {
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

  const proxy = new Contract(
    proxyDeployment.address,
    (await hre.deployments.getOrNull(implementationName))!.abi,
  ).connect(deployer);

  return proxy as unknown as T;
};

/**
 * Hardhat task defining the contract deployments for nxtp
 *
 * @param hre Hardhat environment to deploy to
 */
const func: DeployFunction = async (hre: HardhatRuntimeEnvironment): Promise<void> => {
  let _deployer: any;
  ({ _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("============================= Deploying Nomad ===============================");
  console.log("deployer: ", deployer.address);

  // Just plug in hardcoded config for testing:
  const nomadConfig: NomadDomainInfo = {
    name: "local31337",
    domain: 31337,
    contracts: {
      bridge: {
        deployHeight: 0,
        bridgeRouter: {
          implementation: constants.AddressZero,
          proxy: constants.AddressZero,
          beacon: constants.AddressZero,
        },
        tokenRegistry: {
          implementation: constants.AddressZero,
          proxy: constants.AddressZero,
          beacon: constants.AddressZero,
        },
        bridgeToken: {
          implementation: constants.AddressZero,
          proxy: constants.AddressZero,
          beacon: constants.AddressZero,
        },
      },
      core: {
        deployHeight: 0,
        upgradeBeaconController: "",
        xAppConnectionManager: "",
        updaterManager: "",
        governanceRouter: {
          implementation: constants.AddressZero,
          proxy: constants.AddressZero,
          beacon: constants.AddressZero,
        },
        home: {
          implementation: constants.AddressZero,
          proxy: constants.AddressZero,
          beacon: constants.AddressZero,
        },
        replicas: {
          "32337": {
            implementation: constants.AddressZero,
            proxy: constants.AddressZero,
            beacon: constants.AddressZero,
          },
        },
      },
    },
  };

  // ========== Start: Nomad BridgeRouter Deployment ==========

  // Deploy xapp connection manager
  console.log("Deploying xapp connection manager...");
  const xappDeploymentName = getDeploymentName("XAppConnectionManager");
  const xappDeployment = await hre.deployments.deploy(xappDeploymentName, {
    from: deployer.address,
    skipIfAlreadyDeployed: true,
    log: true,
    contract: "XAppConnectionManager",
  });
  console.log("deploy tx:", xappDeployment.transactionHash);
  const xappConnectionManagerAddress = xappDeployment.address;
  console.log("xappConnectionManagerAddress:", xappConnectionManagerAddress);

  const xappConnectionManager = (
    await hre.ethers.getContractAt("XAppConnectionManager", xappConnectionManagerAddress)
  ).connect(deployer);

  console.log("Deploying token registry...");
  const tokenRegistry = await deployNomadBeaconProxy(
    "TokenRegistry",
    [nomadConfig.contracts.bridge.bridgeToken.beacon, xappConnectionManagerAddress],
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
  if ((await xappConnectionManager.home()).toLowerCase() !== nomadConfig.contracts.core.home.proxy.toLowerCase()) {
    console.log("setting home....");
    const home = await xappConnectionManager.setHome(nomadConfig.contracts.core.home.proxy);
    const homeTx = await home.wait();
    console.log("setHome:", homeTx.transactionHash);
  } else {
    console.log("home set");
  }

  // Enroll all the replicas
  for (const [replicaName, { proxy }] of Object.entries(nomadConfig.contracts.core.replicas)) {
    if (!(await xappConnectionManager.isReplica(proxy))) {
      console.log(`enrolling replica for ${replicaName}`);
      const enroll = await xappConnectionManager.ownerEnrollReplica(proxy, "32337");
      const tx = await enroll.wait();
      console.log(`enrolled replica for ${replicaName}: ${tx.transactionHash}`);
    } else {
      console.log(`replica for ${replicaName} enrolled`);
    }
  }

  // Deploy bridge router
  console.log("Deploying bridge router...");
  const bridge = (
    await deployNomadBeaconProxy("BridgeRouter", [tokenRegistry.address, xappConnectionManagerAddress], deployer, hre)
  ).connect(deployer);
  console.log("bridge address:", bridge.address);
  console.log("bridge owner:", await bridge.owner());
};
export default func;
func.tags = ["Nomad"];
