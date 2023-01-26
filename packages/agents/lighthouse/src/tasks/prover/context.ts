import { ChainReader, ConnextContractInterfaces } from "@connext/txservice";
import { ChainData, Logger, RelayerType } from "@connext/utils";
import { Database } from "@connext/adapters-database";
import { Relayer } from "@connext/adapters-relayer";

import { LighthouseConfig } from "../../config";

export type ProverContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[]; // Used to send txs to relayer.
    database: Database;
  };
  config: LighthouseConfig;
  chainData: Map<string, ChainData>;
};
