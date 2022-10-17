import { createStubInstance, SinonStub, stub, restore, reset } from "sinon";
import { expect, mock, chainDataToMap, Logger, AggregatedRoot, PropagatedRoot } from "@connext/nxtp-utils";
import * as rootsPoller from "../../../src/pollers/rootsPoller";
import { bindRoots } from "../../../src/bindings/roots";

import { CartographerConfig } from "../../../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { AppContext } from "../../../src/shared";
import * as shared from "../../../src/shared";
import { mockDatabase } from "@connext/nxtp-adapters-database/test/mock";

const mockAggregatedRootSubgraphResponse = [
  mock.entity.aggregatedRoot() as AggregatedRoot,
  mock.entity.aggregatedRoot() as AggregatedRoot,
];
const mockPropagatedRootSubgraphResponse = [
  mock.entity.propagatedRoot() as PropagatedRoot,
  mock.entity.propagatedRoot() as PropagatedRoot,
];

const mockConfig: CartographerConfig = {
  pollInterval: 15000,
  logLevel: "silent",
  database: { url: "postgres://postgres:qwery@localhost:5432/connext?sslmode=disable" },
  environment: "production",
  chains: {},
};

const mockChainData = chainDataToMap([
  {
    name: "Ethereum Testnet Rinkeby",
    chainId: 4,
    domainId: "2000",
    type: "testnet",
    confirmations: 1,
    shortName: "rin",
    network: "rinkeby",
    assetId: {},
  },
  {
    name: "Ethereum Testnet Kovan",
    chainId: 42,
    domainId: "3000",
    type: "testnet",
    confirmations: 1,
    shortName: "kov",
    chain: "ETH",
    network: "kovan",
    networkId: 42,
    assetId: {},
  },
  {
    name: "Local Testnet 1337",
    chainId: 1337,
    domainId: "1337",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1337",
    network: "lt-1337",
    assetId: {},
  },
  {
    name: "Local Testnet 1338",
    chainId: 1338,
    domainId: "1338",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1338",
    network: "lt-1338",
    assetId: {},
  },
  {
    name: "Optimistic Ethereum",
    chainId: 10,
    domainId: "10",
    type: "mainnet",
    confirmations: 1,
    shortName: "optimism",
    network: "optimism",
    assetId: {},
  },
]);

describe("Aggregated root operations", () => {
  let mockContext: AppContext;

  beforeEach(() => {
    mockContext = {
      logger: new Logger({
        level: "silent",
        name: "MockBackend",
      }),
      adapters: {
        subgraph: createStubInstance(SubgraphReader, {
          getGetAggregatedRootsByDomain: Promise.resolve(mockAggregatedRootSubgraphResponse),
          getGetPropagatedRoots: Promise.resolve(mockPropagatedRootSubgraphResponse),
        }),
        database: mockDatabase(),
      },
      config: mockConfig as CartographerConfig,
      chainData: mockChainData,
      domains: ["1337", "1338"],
    };
    stub(shared, "getContext").returns(mockContext);

    process.env.DATABASE_URL = "postgres://postgres:qwerty@localhost:5432/connext?sslmode=disable";
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should poll subgraph for aggreated and propagated roots with mock backend", async () => {
    await expect(bindRoots()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph for aggreated and propagated roots with empty response", async () => {
    (mockContext.adapters.subgraph.getGetAggregatedRootsByDomain as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getGetPropagatedRoots as SinonStub).resolves([]);

    await expect(bindRoots()).to.eventually.not.be.rejected;
  });

  it("should throw error on backend loadup for messages", async () => {
    const badConfig = {};
    await expect(rootsPoller.makeRootsPoller(badConfig as CartographerConfig)).to.eventually.be.rejectedWith(Error);
  });

  it("should loadup", async () => {
    await expect(rootsPoller.makeRootsPoller()).to.eventually.not.be.rejectedWith(Error);
  });
});
