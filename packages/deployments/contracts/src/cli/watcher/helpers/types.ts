import { providers } from "ethers";

import { Deployment } from "../../types";

export type NetworkStack = {
  chain: string;
  domain: string;
  rpc: providers.JsonRpcProvider;
  deployments: { WatcherToken: Deployment };
};

export type FiredrillDeployments = {
  WatcherToken: Deployment;
};
