import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { WatcherAdapter, OpModeMonitor } from "@connext/nxtp-adapters-watcher";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { ChainData, Logger } from "@connext/nxtp-utils";
import { Wallet } from "ethers";

import { WatcherConfig } from "./config";

export type WatcherContext = {
  config: WatcherConfig;
  adapters: {
    watcher: WatcherAdapter;
    monitor: OpModeMonitor;
    wallet: Wallet | Web3Signer;
    subgraph: SubgraphReader;
  };
  logger: Logger;
  chainData: Map<string, ChainData>;
};
