import {
  ChainReader,
  ConnextContractDeployments,
  AmbContractABIs,
  ConnextContractInterfaces,
} from "@connext/txservice";
import { ChainData, Logger, RelayerType } from "@connext/utils";
import { Relayer } from "@connext/adapters-relayer";
import { SubgraphReader } from "@connext/adapters-subgraph";

import { LighthouseConfig } from "../../config";

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
  };
  config: LighthouseConfig;
  chainData: Map<string, ChainData>;
};
