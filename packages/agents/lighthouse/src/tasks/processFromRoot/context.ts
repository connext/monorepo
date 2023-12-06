import { ChainReader, ConnextContractDeployments } from "@connext/nxtp-txservice";
import { ChainData, Logger, RelayerType } from "@connext/nxtp-utils";
import { Database } from "@connext/nxtp-adapters-database";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

import { NxtpLighthouseConfig } from "../../config";

export type ProcessFromRootContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    contracts: ConnextContractDeployments; // Used to read and write to smart contracts.
    database: Database;
    subgraph: SubgraphReader;
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[];
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
