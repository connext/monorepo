import { ethers, Wallet } from "ethers";

import { getContract, getHubConnectors, getSpokeConnector } from "../../helpers";
import { Deployment } from "../../types";

import { DomainDeployments } from "./types";

export const getDeployments = (args: {
  deployer: Wallet;
  chainInfo: { chain: string; rpc: ethers.providers.JsonRpcProvider };
  isHub: boolean;
  useStaging: boolean;
}): DomainDeployments => {
  const { chainInfo, isHub, useStaging, deployer: _deployer } = args;
  const chain = chainInfo.chain;

  const deployer = _deployer.connect(chainInfo.rpc);

  // Get all the Hub connectors, if applicable.
  const connectors: Deployment[] = isHub
    ? getHubConnectors(+chain, useStaging ? "staging" : "production", deployer)
    : [getSpokeConnector(+chain, useStaging ? "staging" : "production", deployer)];

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
