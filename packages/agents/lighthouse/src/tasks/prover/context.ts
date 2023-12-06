import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { ChainData, Logger, RelayerType } from "@connext/nxtp-utils";
import { Database } from "@connext/nxtp-adapters-database";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import Broker from "amqplib";
import { Pool } from "pg";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

export type ProverContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[]; // Used to send txs to relayer.
    database: Database;
    databaseWriter: { database: Database; pool: Pool };
    cache: StoreManager;
    mqClient: Broker.Connection;
    subgraph: SubgraphReader;
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
  mode: string;
};
