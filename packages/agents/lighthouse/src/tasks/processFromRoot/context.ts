import { ChainReader, ConnextContractDeployments } from "@connext/txservice";
import { ChainData, Logger, RelayerType } from "@connext/utils";
import { Database } from "@connext/adapters-database";
import { Relayer } from "@connext/adapters-relayer";

import { LighthouseConfig } from "../../config";

export type ProcessFromRootContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractDeployments; // Used to read and write to smart contracts.
    database: Database;
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[];
  };
  config: LighthouseConfig;
  chainData: Map<string, ChainData>;
};
