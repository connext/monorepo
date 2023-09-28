import {
  ChainReader,
  ConnextContractDeployments,
  AmbContractABIs,
  ConnextContractInterfaces,
} from "@connext/nxtp-txservice";
import { ChainData, Logger, RelayerType } from "@connext/nxtp-utils";
import { Relayer } from "@connext/nxtp-adapters-relayer";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { Database } from "@connext/nxtp-adapters-database";

import { NxtpLighthouseConfig } from "../../config";

export type PropagateContext = {
  logger: Logger;
  adapters: {
    // Stateful interfaces for peripherals.
    chainreader: ChainReader; // For reading and executing txs on blockchain using RPC providers.
    deployments: ConnextContractDeployments; // Used to read and write to smart contracts.
    contracts: ConnextContractInterfaces; // Used to get contracts interface
    ambs: AmbContractABIs;
    relayers: { instance: Relayer; apiKey: string; type: RelayerType }[];
    subgraph: SubgraphReader; // Aggregates subgraphs in a FallbackSubgraph for each chain.
    database: Database;
  };
  config: NxtpLighthouseConfig;
  chainData: Map<string, ChainData>;
};
