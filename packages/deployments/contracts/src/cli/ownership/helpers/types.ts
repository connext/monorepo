import { Deployment } from "../../helpers";

export type ExecutionLayerDeployments = {
  Connext: Deployment;
  Unwrapper: Deployment;
};

export type SpokeMessagingOwnableDeployments = {
  SpokeConnector: Deployment;
  MerkleTreeManager: Deployment;
  UpgradeBeaconController: Deployment;
  RelayerProxy: Deployment;
  WatcherManager: Deployment;
};

export type HubMessagingOwnableDeployments = SpokeMessagingOwnableDeployments & {
  HubConnectors: Deployment[];
  RootManager: Deployment;
  RootMerkleTreeManager: Deployment;
};

export type OwnableDeployment = {
  execution: ExecutionLayerDeployments;
  messaging: HubMessagingOwnableDeployments | SpokeMessagingOwnableDeployments;
};
