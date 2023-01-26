import { ChainData, Logger } from "@connext/utils";
import { ConnextContractInterfaces, ChainReader } from "@connext/txservice";
import { Web3Signer } from "@connext/adapters-web3signer";
import { Wallet } from "ethers";

import { RouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
  };
  config: RouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
