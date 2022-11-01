import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { ChainData, Logger, RelayerType } from "@connext/nxtp-utils";
import { Database } from "@connext/nxtp-adapters-database";
import { Relayer } from "@connext/nxtp-adapters-relayer";

import { NxtpLighthouseConfig } from "../../config";

export type ProverContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[]; // Used to send txs to relayer.
    database: Database;
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
