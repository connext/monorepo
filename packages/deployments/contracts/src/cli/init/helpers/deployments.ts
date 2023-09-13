import * as zk from "zksync-web3";
import { ethers, Wallet } from "ethers";

import { getContract, getHubConnectors, getSpokeConnector } from "../../helpers";
import { Deployment } from "../../types";

import { DomainDeployments } from "./types";

export const getDeployments = (args: {
  deployer: Wallet | zk.Wallet;
  chainInfo: { chain: string; rpc: ethers.providers.JsonRpcProvider | zk.Provider; zksync: boolean };
  isHub: boolean;
  useStaging: boolean;
  isDevnet?: boolean;
}): DomainDeployments => {
  const { chainInfo, isHub, useStaging, deployer: _deployer, isDevnet } = args;
  const chain = chainInfo.chain;

  let deployer;
  if (chainInfo.zksync) {
    deployer = (_deployer as zk.Wallet).connect(chainInfo.rpc as zk.Provider);
  } else {
    deployer = (_deployer as Wallet).connect(chainInfo.rpc as ethers.providers.JsonRpcProvider);
  }

  // Get all the Hub connectors, if applicable.
  const connectors: Deployment[] = isHub
    ? getHubConnectors(+chain, useStaging ? "staging" : "production", deployer, isDevnet)
    : [getSpokeConnector(+chain, useStaging ? "staging" : "production", deployer, isDevnet)];

  return {
    Connext: getContract("Connext_DiamondProxy", chain, useStaging, deployer, isDevnet),
    messaging: isHub
      ? {
          RootManager: getContract("RootManager", chain, useStaging, deployer, isDevnet),
          MainnetConnector: getContract("MainnetSpokeConnector", chain, useStaging, deployer, isDevnet),
          WatcherManager: getContract("WatcherManager", chain, useStaging, deployer, isDevnet),
          HubConnectors: connectors,
          MerkleTreeManagerForRoot: getContract(
            "MerkleTreeManagerRootUpgradeBeaconProxy",
            chain,
            useStaging,
            deployer,
            isDevnet,
          ),
          MerkleTreeManagerForSpoke: getContract(
            "MerkleTreeManagerSpokeUpgradeBeaconProxy",
            chain,
            useStaging,
            deployer,
            isDevnet,
          ),
          RelayerProxy: getContract("RelayerProxyHub", chain, useStaging, deployer, isDevnet),
        }
      : {
          SpokeConnector: connectors[0],
          MerkleTreeManager: getContract("MerkleTreeManagerUpgradeBeaconProxy", chain, useStaging, deployer, isDevnet),
          WatcherManager: getContract("WatcherManager", chain, useStaging, deployer, isDevnet),
          RelayerProxy: getContract("RelayerProxy", chain, useStaging, deployer, isDevnet),
        },
  };
};
