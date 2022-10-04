import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { BigNumber, Contract, Signer, Wallet } from "ethers";

import { getDeploymentName } from "../src/utils";

export const deployBeaconProxy = async <T extends Contract = Contract>(
  name: string,
  args: any[],
  deployer: Signer & { address: string },
  hre: HardhatRuntimeEnvironment,
  implementationArgs: any[] = [],
  deployName?: string,
): Promise<T> => {
  // get names
  deployName = deployName ?? name;

  const implementationName = getDeploymentName(deployName);
  const upgradeBeaconName = getDeploymentName(`${deployName}UpgradeBeacon`);
  const proxyName = getDeploymentName(`${deployName}UpgradeBeaconProxy`);
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
  console.log("\n============================= Deploying Bridge Token ===============================");
  console.log("deployer: ", deployer.address);

  // Deploy the bridge token to get the token beacon address when deploying connext
  (await deployBeaconProxy("BridgeToken", [18, "", ""], deployer, hre)).connect(deployer);
};

export default func;

func.tags = ["BridgeToken", "prod", "local", "mainnet"];
