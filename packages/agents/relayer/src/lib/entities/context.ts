import { Wallet } from "ethers";
import { Web3Signer } from "@connext/adapters-web3signer";
import { ChainData, Logger } from "@connext/utils";
import { StoreManager } from "@connext/adapters-cache";
import { TransactionService, ConnextContractInterfaces } from "@connext/txservice";

import { RelayerConfig } from ".";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer;
    cache: StoreManager; // Used to cache important data locally.
    txservice: TransactionService; // For reading blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to encode/decode fn data for smart contracts.
  };
  config: RelayerConfig;
  chainData: Map<string, ChainData>;
  chainToDomainMap: Map<number, number>; // For convenience.
};
