import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Signer, BigNumber, Wallet } from "ethers";
import { config } from "dotenv";

import { getDeploymentName } from "../src/utils";
import { getDomainInfoFromChainId, getNomadConfig } from "../src/nomad";

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

  if (proxyDeployment) {
    console.log(`${implementationName} proxy deployed. upgrading...`);
    // Get beacon and implementation addresses
    beaconAddress = (await hre.deployments.getOrNull(upgradeBeaconName))?.address;
    implementation = (await hre.deployments.getOrNull(implementationName))?.address;
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
  ({ deployer: _deployer } = await hre.ethers.getNamedSigners());
  if (!_deployer) {
    [_deployer] = await hre.ethers.getUnnamedSigners();
  }
  const deployer = _deployer as Wallet;
  console.log("\n============================= Deploying Nomad ===============================");
  console.log("deployer: ", deployer.address);

  // ========== Start: Nomad BridgeRouter Deployment ==========
  const network = await hre.ethers.provider.getNetwork();
  const nomadConfig = getNomadConfig(network.chainId);
  const domainConfig = getDomainInfoFromChainId(network.chainId);

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

  // TODO: Expose the domain publicly or something so we dont have to do this every time.
  console.log("Deploying token registry...");
  const tokenRegistry = await deployNomadBeaconProxy(
    "TokenRegistry",
    [domainConfig.contracts.bridge.bridgeToken.beacon, xappConnectionManagerAddress],
    deployer,
    hre,
  );

  // Set token registry local domain
  console.log(`Setting local domain of token registry as ${domainConfig.domain}...`);
  const setDomain = await tokenRegistry.setLocalDomain(domainConfig.domain);
  console.log("setDomain tx:", setDomain.hash);
  const setDomainReceipt = await setDomain.wait();
  console.log("setDomain tx mined:", setDomainReceipt);

  // Set the home
  const xappOwner = await xappConnectionManager.owner();
  console.log("xapp owner", xappOwner);
  const homeAddr = domainConfig.contracts.core.home.proxy.toLowerCase();
  if ((await xappConnectionManager.home()).toLowerCase() !== homeAddr.toLowerCase()) {
    if (xappOwner.toLowerCase() !== deployer.address.toLowerCase()) {
      throw new Error(
        `Need to update home, but deployer is not owner. Deployer: ${deployer.address}, owner: ${xappOwner}`,
      );
    }
    console.log(`setting home as ${homeAddr} on ${domainConfig.name}....`);
    const home = await xappConnectionManager.setHome(homeAddr);
    const homeTx = await home.wait();
    console.log("setHome:", homeTx.transactionHash);
  } else {
    console.log("home set");
  }

  // Enroll all the replicas
  for (const [replicaDomainName, { proxy }] of Object.entries(domainConfig.contracts.core.replicas)) {
    const replicaDomain = nomadConfig.protocol.networks[replicaDomainName].domain;
    if (!(await xappConnectionManager.isReplica(proxy))) {
      console.log(`enrolling ${domainConfig.name} replica for ${replicaDomainName} (${replicaDomain})`);
      const enroll = await xappConnectionManager.ownerEnrollReplica(proxy, replicaDomain);
      const tx = await enroll.wait();
      console.log(
        `enrolled ${domainConfig.name} replica for ${replicaDomainName} (${replicaDomain}): ${tx.transactionHash}`,
      );
    } else {
      console.log(`replica for ${replicaDomainName} (${replicaDomain}) enrolled`);
    }
  }
  // Deploy relayer fee router
  console.log("Deploying relayer fee router...");
  const relayerFeeRouter = (
    await deployNomadBeaconProxy("RelayerFeeRouter", [xappConnectionManagerAddress], deployer, hre)
  ).connect(deployer);
  console.log("relayer fee router address:", relayerFeeRouter.address);
  console.log("relayer fee router owner:", await relayerFeeRouter.owner());
};

export default func;
func.tags = ["Nomad"];
