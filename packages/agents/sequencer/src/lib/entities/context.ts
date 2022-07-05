import { ChainData, Logger } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { AMQPClient } from "@cloudamqp/amqp-client";

import { Relayer } from "../../adapters";

import { SequencerConfig } from ".";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // For reading blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to encode/decode fn data for smart contracts.
    relayer: Relayer; // Relayer for sending transactions to the blockchain.
  };
  config: SequencerConfig;
  chainData: Map<string, ChainData>;
  mqClient: AMQPClient;
};
