import { SubgraphReader } from "@connext/adapters-subgraph";
import { WatcherAdapter } from "@connext/adapters-watcher";
import { Web3Signer } from "@connext/adapters-web3signer";
import { ChainData, Logger } from "@connext/utils";
import { Wallet } from "ethers";

import { WatcherConfig } from "./config";

export type WatcherContext = {
  config: WatcherConfig;
  adapters: {
    watcher: WatcherAdapter;
    wallet: Wallet | Web3Signer;
    subgraph: SubgraphReader;
  };
  logger: Logger;
  chainData: Map<string, ChainData>;
};
