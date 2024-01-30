import { providers } from "ethers";

import { Deployment } from "../../helpers";

export type NetworkStack = {
  chain: string;
  domain: string;
  rpc: providers.JsonRpcProvider;
  deployments: { WatcherToken: Deployment };
};

export type FiredrillDeployments = {
  WatcherToken: Deployment;
};
