import { Wallet } from "ethers";
import { ChainData, Logger, RelayerType } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { ChainReader, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { Database } from "@connext/nxtp-adapters-database";
import Broker from "amqplib";

import { SequencerConfig } from ".";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    cache: StoreManager; // Used to cache important data locally.
    chainreader: ChainReader; // For reading blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to encode/decode fn data for smart contracts.
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[]; // Relayer for sending transactions to the blockchain.
    // Should be signer for sequencer's allowlisted EOA. Used for signing permits.
    wallet: Wallet | Web3Signer;
    mqClient: Broker.Connection; // Broker for interacting with the message queue
    database: Database;
  };
  config: SequencerConfig;
  chainData: Map<string, ChainData>;
};
