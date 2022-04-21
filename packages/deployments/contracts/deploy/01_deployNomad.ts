import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract, Signer, BigNumber, Wallet } from "ethers";

import { getDomainInfoFromChainId, getNomadConfig } from "../src/nomad";
import { verify } from "../src/utils";

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
  let controllerDeployment = await hre.deployments.getOrNull(`UpgradeBeaconController`);
  if (!controllerDeployment) {
    controllerDeployment = await hre.deployments.deploy("UpgradeBeaconController", {
      from: deployer.address,
      log: true,
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
    await verify(hre, implementation);
  }

  const proxy = new Contract(proxyDeployment.address, (await hre.deployments.getOrNull(name))!.abi).connect(deployer);

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
  console.log("============================= Deploying Nomad ===============================");
  console.log("deployer: ", deployer.address);

  // ========== Start: Nomad BridgeRouter Deployment ==========
  const network = await hre.ethers.provider.getNetwork();
  const nomadConfig = getNomadConfig(network.chainId);
  const domainConfig = getDomainInfoFromChainId(network.chainId);

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

  // verify xapp connection manager
  await verify(hre, xappDeployment.address);

  const xappConnectionManager = (
    await hre.ethers.getContractAt("XAppConnectionManager", xappConnectionManagerAddress)
  ).connect(deployer);

  console.log("Deploying token registry...");
  const tokenRegistry = await deployNomadBeaconProxy(
    "TokenRegistry",
    [nomadConfig.bridge[domainConfig.name].bridgeToken.beacon, xappConnectionManagerAddress],
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
  const homeAddr = nomadConfig.core[domainConfig.name].home.proxy;
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
  for (const [replicaDomainName, { proxy }] of Object.entries(nomadConfig.core[domainConfig.name].replicas)) {
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
