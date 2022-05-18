import { ChainData, Logger } from "@connext/nxtp-utils";
import { ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";

import { Relayer } from "../../adapters";
import { NxtpLighthouseConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    relayer: Relayer; // Relayer for sending transactions to the blockchain.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
