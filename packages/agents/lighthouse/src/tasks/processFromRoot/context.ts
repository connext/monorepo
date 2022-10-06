import { ChainReader, ConnextContractDeployments } from "@connext/nxtp-txservice";
import { ChainData, Logger } from "@connext/nxtp-utils";

import { NxtpLighthouseConfig } from "../../config";

import { DbClient, Relayer } from "./adapters";

export type ProcessOptimismContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractDeployments; // Used to read and write to smart contracts.
    database: DbClient;
    relayer: Relayer;
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
