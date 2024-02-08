import { providers, Wallet } from "ethers";

import { Env } from "../../../utils";
import { Deployment, getContract, getHubConnectors, getSpokeConnector } from "../../helpers";

import { OwnableDeployment, SpokeMessagingOwnableDeployments } from "./types";

export const getOwnableDeployments = (
  chainId: number,
  connection: Wallet | providers.JsonRpcProvider,
  isHub: boolean,
  env: Env,
): OwnableDeployment => {
  // Get all the Hub connectors, if applicable.
  const connectors: Deployment[] = isHub
    ? getHubConnectors(chainId, env, connection)
    : [getSpokeConnector(chainId, env, connection)];

  const chainStr = `${chainId}`;
  const useStaging = env === "staging";

  const spokeDeployments: SpokeMessagingOwnableDeployments = {
    SpokeConnector: isHub ? getContract("MainnetSpokeConnector", chainStr, useStaging, connection) : connectors[0],
    MerkleTreeManager: getContract(
      isHub ? "MerkleTreeManagerSpokeUpgradeBeaconProxy" : "MerkleTreeManagerUpgradeBeaconProxy",
      chainStr,
      useStaging,
      connection,
    ),
    UpgradeBeaconController: getContract("UpgradeBeaconController", chainStr, useStaging, connection),
    RelayerProxy: getContract(isHub ? "RelayerProxyHub" : "RelayerProxy", chainStr, useStaging, connection),
    WatcherManager: getContract("WatcherManager", chainStr, useStaging, connection),
  };
  return {
    execution: {
      Connext: getContract("Connext_DiamondProxy", chainStr, useStaging, connection),
      Unwrapper: getContract("Unwrapper", chainStr, false, connection), // no staging deployment
    },
    messaging: isHub
      ? {
          ...spokeDeployments,
          HubConnectors: connectors,
          RootManager: getContract("RootManager", chainStr, useStaging, connection),
          RootMerkleTreeManager: getContract(
            "MerkleTreeManagerRootUpgradeBeaconProxy",
            chainStr,
            useStaging,
            connection,
          ),
        }
      : spokeDeployments,
  };
};
