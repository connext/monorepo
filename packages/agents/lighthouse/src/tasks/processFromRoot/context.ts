import { ChainReader, ConnextContractDeployments } from "@connext/nxtp-txservice";
import { ChainData, Logger } from "@connext/nxtp-utils";
import { Database } from "@connext/nxtp-adapters-database";

import { NxtpLighthouseConfig } from "../../config";
import { Relayer } from "../../adapters";

export type ProcessFromRootContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractDeployments; // Used to read and write to smart contracts.
    database: Database;
    relayer: Relayer;
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
