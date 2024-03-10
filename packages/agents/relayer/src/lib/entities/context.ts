import { Wallet } from "ethers";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { ChainData, Logger } from "@connext/nxtp-utils";
import { StoreManager } from "@connext/nxtp-adapters-cache";
import { TransactionService, ConnextContractInterfaces } from "@connext/nxtp-txservice";

import { RelayerConfig } from ".";
import { Interface } from "ethers/lib/utils";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer;
    cache: StoreManager; // Used to cache important data locally.
    txservice: TransactionService; // For reading blockchain using RPC providers.
    contracts: ConnextContractInterfaces & { automationVault: Interface; xKeeperRelayer: Interface }; // Used to encode/decode fn data for smart contracts.
  };
  config: RelayerConfig;
  chainData: Map<string, ChainData>;
  chainToDomainMap: Map<number, number>; // For convenience.
};
