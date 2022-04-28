import { ChainData, Logger } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";

import { RelayerConfig } from ".";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // For reading blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to encode/decode fn data for smart contracts.
  };
  config: RelayerConfig;
  chainData: Map<string, ChainData>;
};
