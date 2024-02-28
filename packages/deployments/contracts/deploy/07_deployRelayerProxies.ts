import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { constants, Wallet } from "ethers";
import { chainIdToDomain } from "@connext/nxtp-utils";
import { getConnectorName, getDeploymentName, getProtocolNetwork, getRelayerProxyConfig } from "../src/utils";
import { MESSAGING_PROTOCOL_CONFIGS } from "../deployConfig/shared";

const KEEP3R_ADDRESSES: Record<number, string> = {
  1: "0xeb02addCfD8B773A5FFA6B9d1FE99c566f8c44CC",
  5: "0x85063437C02Ba7F4f82F898859e4992380DEd3bb",
};

const PROPAGATE_COOLDOWN = 60 * 30; // 30 minutes

/**
 * Hardhat task defining the contract deployments for Connext
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
  console.log("\n============================= Deploying Relayer Proxy Contracts ===============================");
  console.log("deployer: ", deployer.address);

  const network = await hre.ethers.provider.getNetwork();
  console.log("network: ", network);
  const domain = chainIdToDomain(network.chainId);
  console.log("domain: ", domain);
  const price = await hre.ethers.provider.getGasPrice();
  console.log("price: ", price.toString());
  const zksync = hre.network.config.zksync || false;
  console.log("zksync: ", zksync);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("balance: ", balance.toString());

  // Get connector manager
  const messagingNetwork = getProtocolNetwork(chainId, network.name);
  const protocol = MESSAGING_PROTOCOL_CONFIGS[messagingNetwork];

  if (!protocol.configs[protocol.hub.chain]) {
    throw new Error(`Network ${messagingNetwork} is not supported! (no messaging config)`);
  }

  const connext = (await hre.deployments.getOrNull(getDeploymentName("Connext")))!;
  const connextAddress = connext.address;
  console.log("connextAddress: ", connextAddress);

  console.log("Deploying Relayer Proxy...");

  const { feeCollector, gelatoRelayer } = getRelayerProxyConfig(chainId);
  const spokeConnector = await hre.ethers.getContract(
    getDeploymentName(getConnectorName(protocol, +chainId), undefined, protocol.configs[Number(chainId)].networkName),
  );

  const { configs } = protocol;

  if (protocol.hub.chain === network.chainId) {
    const chains = [];
    const hubConnectors = [];
    for (const spokeChain of Object.keys(configs)) {
      const contract = getConnectorName(protocol, +spokeChain, protocol.hub.chain);
      const deploymentName = getDeploymentName(contract, undefined, protocol.configs[+spokeChain].networkName);
      const hubConnector = await hre.ethers.getContract(deploymentName);
      chains.push(+spokeChain);
      hubConnectors.push(hubConnector.address);
    }
    const rootManager = await hre.ethers.getContract(getDeploymentName("RootManager"));
    const relayerProxyHub = await hre.deployments.deploy(getDeploymentName("RelayerProxyHub"), {
      from: deployer.address,
      log: true,
      contract: "RelayerProxyHub",
      args: [
        {
          connext: connextAddress,
          spokeConnector: spokeConnector.address,
          gelatoRelayer: gelatoRelayer,
          feeCollector: feeCollector,
          keep3r: KEEP3R_ADDRESSES[network.chainId] ?? constants.AddressZero,
          rootManager: rootManager.address,
          autonolas: constants.AddressZero,
          propagateCooldown: PROPAGATE_COOLDOWN,
          finalizeCooldown: PROPAGATE_COOLDOWN,
          proposeAggregateRootCooldown: PROPAGATE_COOLDOWN,
          hubConnectors: hubConnectors,
          hubConnectorChains: chains,
        },
      ],
    });

    console.log("relayerProxyHub: ", relayerProxyHub.address);
  } else {
    const relayerProxy = await hre.deployments.deploy(getDeploymentName("RelayerProxy"), {
      from: deployer.address,
      log: true,
      contract: "RelayerProxy",
      args: [
        {
          connext: connextAddress,
          spokeConnector: spokeConnector.address,
          gelatoRelayer: gelatoRelayer,
          feeCollector: feeCollector,
          keep3r: KEEP3R_ADDRESSES[network.chainId] ?? constants.AddressZero,
          proposeAggregateRootCooldown: PROPAGATE_COOLDOWN,
          finalizeCooldown: PROPAGATE_COOLDOWN,
        },
      ],
    });

    console.log("relayerProxy: ", relayerProxy.address);
  }
};

export default func;

func.tags = ["Messaging", "prod", "local", "mainnet", "devnet", "relayer"];
