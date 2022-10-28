import { createStubInstance, stub, restore, reset } from "sinon";
import { Logger } from "@connext/nxtp-utils";

import { CartographerConfig } from "../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { AppContext } from "../src/shared";
import * as shared from "../src/shared";
import { mockDatabase } from "../../../../adapters/database/test/mock";

import {
  mockChainData,
  mockOriginMessageSubgraphResponse,
  mockDestinationMessageSubgraphResponse,
  mockRootSubgraphResponse,
  mockConfig,
  mockBlockNumber,
  mockAggregatedRootSubgraphResponse,
  mockPropagatedRootSubgraphResponse,
  mockOriginSubgraphResponse,
  mockDestinationSubgraphResponse,
  mockRouterResponse,
  mockConnectorMeta,
} from "./mock";

export let mockContext: AppContext;

export const mochaHooks = {
  async beforeEach() {
    mockContext = {
      logger: new Logger({
        level: "silent",
        name: "MockBackend",
      }),
      adapters: {
        subgraph: createStubInstance(SubgraphReader, {
          getOriginMessagesByDomain: Promise.resolve(mockOriginMessageSubgraphResponse),
          getDestinationMessagesByDomainAndLeaf: Promise.resolve(mockDestinationMessageSubgraphResponse),
          getSentRootMessagesByDomain: Promise.resolve(mockRootSubgraphResponse),
          getProcessedRootMessagesByDomain: Promise.resolve(mockRootSubgraphResponse),
          getLatestBlockNumber: Promise.resolve(mockBlockNumber),
          getGetAggregatedRootsByDomain: Promise.resolve(mockAggregatedRootSubgraphResponse),
          getGetPropagatedRoots: Promise.resolve(mockPropagatedRootSubgraphResponse),
          getOriginTransfersByNonce: Promise.resolve(mockOriginSubgraphResponse),
          getDestinationTransfersByNonce: Promise.resolve(mockDestinationSubgraphResponse),
          getDestinationTransfersByDomainAndReconcileTimestamp: Promise.resolve(mockDestinationSubgraphResponse),
          getOriginTransfersById: Promise.resolve(mockOriginSubgraphResponse),
          getDestinationTransfersById: Promise.resolve(mockDestinationSubgraphResponse),
          getAssetBalancesRouters: Promise.resolve(mockRouterResponse) as any,
          getConnectorMeta: Promise.resolve(mockConnectorMeta) as any,
        }),
        database: mockDatabase(),
      },
      config: mockConfig as CartographerConfig,
      chainData: mockChainData,
      domains: ["1337", "1338"],
    };
    stub(shared, "getContext").returns(mockContext);
  },
  afterEach() {
    restore();
    reset();
  },
};
