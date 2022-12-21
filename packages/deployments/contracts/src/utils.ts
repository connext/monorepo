import { config } from "dotenv";
import { BigNumber, constants, Contract, ContractInterface, providers, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { CrossChainMessenger, MessageStatus } from "@eth-optimism/sdk";

import { HUB_PREFIX, MessagingProtocolConfig, MESSAGING_PROTOCOL_CONFIGS, SPOKE_PREFIX } from "../deployConfig/shared";
import deploymentRecords from "../deployments.json";

import { hardhatNetworks } from "./config";

config();

export type Env = "staging" | "production" | "local";

export const mustGetEnv = (_env?: string) => {
  const env = _env ?? process.env.ENV ?? "staging";
  if (env !== "staging" && env !== "production" && env !== "local") {
    throw new Error(`Unrecognized env: ${env}`);
  }
  return env;
};

export enum ProtocolNetwork {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  LOCAL = "local",
}

export const ProtocolNetworks: Record<string, string> = {
  // local networks
  "1337": ProtocolNetwork.LOCAL,
  "1338": ProtocolNetwork.LOCAL,

  // testnets
  "5": ProtocolNetwork.TESTNET,
  "420": ProtocolNetwork.TESTNET,
  "80001": ProtocolNetwork.TESTNET,
  "97": ProtocolNetwork.TESTNET,
  "421613": ProtocolNetwork.TESTNET,

  // mainnets
  "1": ProtocolNetwork.MAINNET,
  "10": ProtocolNetwork.MAINNET,
  "56": ProtocolNetwork.MAINNET,
  "137": ProtocolNetwork.MAINNET,
  "42161": ProtocolNetwork.MAINNET,
  "100": ProtocolNetwork.MAINNET,
};

export const getProtocolNetwork = (_chain: string | number): string => {
  const chain = _chain.toString();
  // If chain 1337 or 1338, use local network.
  return ProtocolNetworks[chain] ?? ProtocolNetwork.LOCAL;
};

export type RelayerProxyConfig = {
  gelatoRelayer: string;
  feeCollector: string;
};

export const getRelayerProxyConfig = (_chain: string | number): RelayerProxyConfig => {
  const feeCollector = constants.AddressZero;
  const gelatoRelayer = constants.AddressZero;

  return { feeCollector, gelatoRelayer };
};

export const getConnectorName = (
  config: MessagingProtocolConfig,
  connectorChainId: number,
  deployChainId?: number | undefined,
): string => {
  deployChainId = deployChainId ?? connectorChainId;

  const naming = config.configs[connectorChainId];
  if (!naming) {
    throw new Error(`Could not find ${connectorChainId} in config`);
  }
  // Only spoke connectors deployed for mainnet contracts
  return `${naming.prefix}${
    config.hub === deployChainId && !naming.prefix.includes("Mainnet") ? HUB_PREFIX : SPOKE_PREFIX
  }Connector`;
};

// These contracts do not have a `Staging` deployment
const NON_STAGING_CONTRACTS = ["TestERC20", "TestWETH", "LPToken"];

export const getDeploymentName = (_contractName: string, _env?: string, _networkName?: string) => {
  const env = mustGetEnv(_env);
  let contractName = _contractName;
  console.log(contractName, _env, _networkName);
  if (contractName.includes("Multichain")) {
    const networkName = _networkName!.charAt(0).toUpperCase() + _networkName!.slice(1).toLowerCase();
    contractName = contractName.replace("Multichain", networkName);
  }

  if (env !== "staging" || NON_STAGING_CONTRACTS.includes(contractName)) {
    return contractName;
  }
  return `${contractName}Staging`;
};

export const verify = async (
  hre: HardhatRuntimeEnvironment,
  address: string,
  constructorArguments: any[] = [],
  libraries: Record<string, string> = {},
) => {
  try {
    await hre.run("verify:verify", {
      address,
      constructorArguments,
      libraries,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log(`${address} already verified`);
      return;
    }
    console.log(`Error verifying contract at ${address}:`, e);
  }
};

// Gets the messaging protocol config for a given chain
export const getMessagingProtocolConfig = (protocolNetwork: ProtocolNetwork): MessagingProtocolConfig => {
  // TODO: "tesnet"  => "mainnet"  for production
  const protocol = MESSAGING_PROTOCOL_CONFIGS[protocolNetwork];

  if (!protocol || !protocol.configs[protocol.hub]) {
    throw new Error(`Network ${protocolNetwork} is not supported! (no messaging config)`);
  }
  return protocol;
};

// This function is useful for tasks that should be executed across all connectors
export type ConnectorDeployment = {
  address: string;
  abi: ContractInterface;
  mirrorConnector?: string;
  mirrorChain?: number;
  chain: number;
  name: string;
};

export const getConnectorDeployments = (env: Env, protocolNetwork: ProtocolNetwork): ConnectorDeployment[] => {
  const protocol = getMessagingProtocolConfig(protocolNetwork);

  const connectors: { name: string; chain: number; mirrorName?: string; mirrorChain?: number }[] = [];
  Object.keys(protocol.configs).forEach((_chainId) => {
    const chainId = +_chainId;
    if (protocol.hub === chainId) {
      // On the hub, you only need to connect the mainnet l1 connector (no mirror)
      connectors.push({
        chain: protocol.hub,
        name: getDeploymentName(getConnectorName(protocol, protocol.hub), env),
        mirrorName: undefined,
        mirrorChain: undefined,
      });
      return;
    }
    // When not on the hub, there will be a name for both the hub and spoke side connectors
    const hubName = getDeploymentName(getConnectorName(protocol, chainId, protocol.hub), env);
    const spokeName = getDeploymentName(getConnectorName(protocol, chainId), env);
    connectors.push({
      chain: protocol.hub,
      name: hubName,
      mirrorName: spokeName,
      mirrorChain: chainId,
    });
    connectors.push({
      chain: chainId,
      name: spokeName,
      mirrorName: hubName,
      mirrorChain: protocol.hub,
    });
  });

  const getAddressAndAbi = (name: string, chain: number): { address: string; abi: ContractInterface } => {
    const [record] = (deploymentRecords as any)[chain.toString()] ?? [undefined];
    if (!record) {
      throw new Error(`Deployment records not found for ${chain}`);
    }
    const { address, abi } = record.contracts[name] ?? {};
    if (!address || !abi) {
      throw new Error(`Deployment values not found for ${name} on ${chain}`);
    }
    return { address, abi };
  };

  // get deployments for connectors
  const deployments = connectors.map(({ name, chain, mirrorName, mirrorChain }) => {
    // Get deployment records
    const { address, abi } = getAddressAndAbi(name, chain);
    const mirrorConnector = mirrorName && mirrorChain ? getAddressAndAbi(mirrorName, mirrorChain).address : undefined;
    return { address, abi, mirrorConnector, chain, mirrorChain, name };
  });

  return deployments;
};

export const getProviderFromHardhatConfig = (chainId: number): providers.JsonRpcProvider => {
  // Get the provider address from the hardhat config on given chain
  const url = (Object.values(hardhatNetworks).find((n: any) => n?.chainId === chainId) as any)?.url;
  if (!url) {
    throw new Error(`No provider url found for ${chainId}`);
  }
  return new providers.JsonRpcProvider(url as string, chainId);
};

export const executeOnAllConnectors = async <T = any>(
  env: Env,
  protocolNetwork: ProtocolNetwork,
  fn: (d: ConnectorDeployment, provider: providers.JsonRpcProvider) => Promise<T>,
): Promise<T[]> => {
  const deployments = getConnectorDeployments(env, protocolNetwork);
  const results = [];
  for (const deploy of deployments) {
    results.push(await fn(deploy, getProviderFromHardhatConfig(deploy.chain)));
  }
  return results;
};

// Retrieves the status of an optimism message
export const queryOptimismMessageStatus = async (
  hash: string,
  l1ChainId: number,
  l2ChainId: number,
  l1Provider: providers.JsonRpcProvider,
  l2Provider: providers.JsonRpcProvider,
  relay: boolean,
  signer: Signer,
): Promise<string> => {
  const crossChainMessenger = new CrossChainMessenger({
    l1ChainId,
    l2ChainId,
    l1SignerOrProvider: l1Provider,
    l2SignerOrProvider: l2Provider,
  });
  const status = await crossChainMessenger.getMessageStatus(hash);
  const [message] = await crossChainMessenger.getMessagesByTransaction(hash);
  console.log("message", { ...message, minGasLimit: message.minGasLimit.toString() });
  const mapping = {
    [MessageStatus.UNCONFIRMED_L1_TO_L2_MESSAGE]: "Unconfirmed L1 -> L2",
    [MessageStatus.FAILED_L1_TO_L2_MESSAGE]: "Failed L1 -> L2",
    [MessageStatus.STATE_ROOT_NOT_PUBLISHED]: "State root not published",
    [MessageStatus.IN_CHALLENGE_PERIOD]: "In challenge period",
    [MessageStatus.READY_FOR_RELAY]: "Ready for relay",
    [MessageStatus.RELAYED]: "Relayed",
  };
  if (relay && status === MessageStatus.READY_FOR_RELAY) {
    const tx = await crossChainMessenger.finalizeMessage(hash, { signer });
    console.log("relay message tx submitted:", tx.hash);
    const receipt = await tx.wait();
    console.log("relay message tx mined:", receipt.transactionHash);
  }
  return mapping[status];
};

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
    console.log(`Deploying ${implementationName} with upgradeable scheme`);

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
