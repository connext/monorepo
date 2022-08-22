import { ChainData, Logger } from "@connext/nxtp-utils";
import { ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";

import { NxtpRouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  };
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
};
