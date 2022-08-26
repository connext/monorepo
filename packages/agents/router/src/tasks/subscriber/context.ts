import { ChainData, Logger } from "@connext/nxtp-utils";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import Rabbit from "foo-foo-mq";
import { Wallet } from "ethers";
import { Web3Signer } from "@connext/nxtp-adapters-web3signer";
import { ConnextContractInterfaces, TransactionService } from "@connext/nxtp-txservice";

import { NxtpRouterConfig } from "../../config";

export type AppContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    wallet: Wallet | Web3Signer; // Used for signing metatxs for bids.
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    txservice: TransactionService; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractInterfaces; // Used to read and write to smart contracts.
    mqClient: typeof Rabbit;
  };
  config: NxtpRouterConfig;
  chainData: Map<string, ChainData>;
  routerAddress: string;
};
