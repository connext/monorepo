import { Contract, ethers, Wallet } from "ethers";
import * as zk from "zksync-web3";

import _Deployments from "../../../../deployments.json";
import { getContract } from "../../helpers";
import { Deployment } from "../../types";

import { DomainDeployments } from "./types";

const Deployments = _Deployments as any;

export const getDeployments = (args: {
  deployer: Wallet | zk.Wallet;
  chainInfo: { chain: string; rpc: ethers.providers.JsonRpcProvider | zk.Provider; zksync: boolean };
  isHub: boolean;
  useStaging: boolean;
}): DomainDeployments => {
  const { chainInfo, isHub, useStaging, deployer: _deployer } = args;
  const chain = chainInfo.chain;
  const deployments = Deployments[chain];
  if (!deployments) {
    throw new Error(`No deployments found for chain ${chain}!`);
  }
  const contracts = deployments[0]["contracts"] as { [contract: string]: any };
  if (!contracts) {
    throw new Error(`No contracts found under deployments for chain ${chain}!`);
  }
  const env = useStaging ? "Staging" : "";

  let deployer;
  if (chainInfo.zksync) {
    deployer = (_deployer as zk.Wallet).connect(chainInfo.rpc as zk.Provider);
  } else {
    deployer = (_deployer as Wallet).connect(chainInfo.rpc as ethers.providers.JsonRpcProvider);
  }

  // Get all the Hub connectors, if applicable.
  const connectors: Deployment[] = [];
  if (isHub) {
    for (const key of Object.keys(contracts)) {
      // TODO: Use regex? Or a more flexible method?
      // Ignore accidental L2 or Spoke Connector deployments...
      if (key.includes("L2") || key.includes("Spoke")) {
        continue;
      }
      if (key.endsWith("Connector" + env) && !key.includes("Mainnet")) {
        const contract = contracts[key];
        connectors.push({
          name: key,
          address: contract.address,
          abi: contract.abi,
          contract: new Contract(contract.address as string, contract.abi as any[], deployer),
        });
      }
    }
  } else {
    for (const key of Object.keys(contracts)) {
      if (key.endsWith("L2Connector" + env) || key.endsWith("SpokeConnector" + env)) {
        const contract = contracts[key];
        connectors.push({
          name: key,
          address: contract.address,
          abi: contract.abi,
          contract: chainInfo.zksync
            ? new zk.Contract(contract.address as string, contract.abi as any[], deployer)
            : new Contract(contract.address as string, contract.abi as any[], deployer),
        });
      }
    }
    if (connectors.length > 1) {
      throw new Error(
        `Multiple L2/Spoke Connectors found on spoke chain ${chain} while consulting deployments.json! ` +
          "Please ensure outdated Connector deployment is deleted and removed.",
      );
    }
  }

  return {
    Connext: getContract("Connext_DiamondProxy", chain, useStaging, deployer),
    messaging: isHub
      ? {
          RootManager: getContract("RootManager", chain, useStaging, deployer),
          MainnetConnector: getContract("MainnetSpokeConnector", chain, useStaging, deployer),
          WatcherManager: getContract("WatcherManager", chain, useStaging, deployer),
          HubConnectors: connectors,
          MerkleTreeManagerForRoot: getContract("MerkleTreeManagerRootUpgradeBeaconProxy", chain, useStaging, deployer),
          MerkleTreeManagerForSpoke: getContract(
            "MerkleTreeManagerSpokeUpgradeBeaconProxy",
            chain,
            useStaging,
            deployer,
          ),
          RelayerProxy: getContract("RelayerProxyHub", chain, useStaging, deployer),
        }
      : {
          SpokeConnector: connectors[0],
          MerkleTreeManager: getContract("MerkleTreeManagerUpgradeBeaconProxy", chain, useStaging, deployer),
          WatcherManager: getContract("WatcherManager", chain, useStaging, deployer),
          RelayerProxy: getContract("RelayerProxy", chain, useStaging, deployer),
        },
  };
};
