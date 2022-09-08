import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, Contract, Signer, Wallet } from "ethers";

import { getConnectorName, getDeploymentName, getProtocolNetwork } from "../src/utils";
import { MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig/shared";
import { deployConfigs } from "../deployConfig";

export const deployBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
  implementationArgs: any[] = [],
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
        args: implementationArgs,
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
      args: implementationArgs,
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

// List of all the router contracts to deploy (by name).
const ROUTERS = ["PromiseRouter", "RelayerFeeRouter", "BridgeRouter"];

/**
 * Hardhat task for deploying the Routers.
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
  console.log("\n============================= Deploying Routers ===============================");
  console.log("deployer: ", deployer.address);

  const chainId = +(await hre.getChainId());

  const network = getProtocolNetwork(chainId);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[network];

  if (!protocol.configs[protocol.hub]) {
    throw new Error(`Network ${network} is not supported! (no messaging config)`);
  }

  const connectorName = getConnectorName(protocol, chainId);
  console.log(`using connector: ${connectorName}`);

  // Find the connector that exists on this domain / chain
  // and use it as the connectorManager address
  const connector = await hre.ethers.getContractOrNull(getDeploymentName(connectorName), deployer);
  if (!connector) {
    throw new Error(`No connector manager deployed to this chain (looking for: ${connectorName})`);
  }

  // Find the token registry (and deploy if needed)
  let tokenRegistryAddress = deployConfigs[chainId]?.TokenRegistry;
  if (!tokenRegistryAddress) {
    // Deploy token beacon
    const tokenDeployment = await deployBeaconProxy("BridgeToken", [], deployer, hre);
    // Deploy token registry
    const tokenRegistryDeployment = await deployBeaconProxy(
      "TokenRegistry",
      [tokenDeployment.address, connector.address],
      deployer,
      hre,
    );
    tokenRegistryAddress = tokenRegistryDeployment.address;
  }

  for (const router of ROUTERS) {
    // NOTE: the connector manager address will *NOT* be known until the connectors are deployed
    console.log(`Deploying ${router}`);
    const deployment = (
      await deployBeaconProxy(
        router,
        router.includes("Bridge") ? [tokenRegistryAddress, connector.address] : [connector.address],
        deployer,
        hre,
      )
    ).connect(deployer);
    // const deployment = await hre.deployments.getOrNull(getDeploymentName(`${router}UpgradeBeaconProxy`));
    if (!deployment) {
      throw new Error(`No deployment (looking for: ${getDeploymentName(`${router}UpgradeBeaconProxy`)})`);
    }
    const implementation = await hre.deployments.getOrNull(getDeploymentName(router));
    if (!implementation) {
      throw new Error(`No implementation (looking for: ${getDeploymentName(`${router}`)})`);
    }
    const contract = new Contract(deployment.address, implementation.abi, deployer);

    console.log(`${router} deployed to ${contract.address}`);
    const owner = await contract.owner();
    console.log(`${router} owner set to ${owner}`);

    if ((await contract.xAppConnectionManager()).toLowerCase() !== connector.address.toLowerCase()) {
      const setXAppConnectionManagerTx = await contract.setXAppConnectionManager(connector.address);
      console.log(`setXAppConnectionManager tx submitted:`, setXAppConnectionManagerTx.hash);
      const receipt = await setXAppConnectionManagerTx.wait();
      console.log(`setXAppConnectionManager tx mined:`, receipt.transactionHash);
    }

    // whitelist the router on the connector
    if (await connector.whitelistedSenders(deployment.address)) {
      console.log(`router already whitelisted on connector`);
      continue;
    }
    console.log(`whitelisting router on connector: ${connector.address}`);
    const whitelist = await connector.addSender(deployment.address);
    console.log(`whitelist tx:`, whitelist.hash);
    await whitelist.wait();
    console.log(`whitelist tx mined`);
  }
};

export default func;

func.tags = ["Routers", "prod", "local", "mainnet"];
func.dependencies = ["Messaging"];
