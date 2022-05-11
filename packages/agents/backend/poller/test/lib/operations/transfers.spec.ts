import { createStubInstance, SinonStub, stub, restore, reset } from "sinon";
import * as SharedFns from "../../../src/shared";
import { expect, mock, chainDataToMap, Logger, OriginTransfer } from "@connext/nxtp-utils";
import * as backend from "../../../src/backend";
import { poller } from "../../../src/bindings/poller";

import * as dbClient from "../../../src/adapters/database/client";
import { BackendConfig } from "../../../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

const mockSubgraphResponse = [mock.entity.xtransfer() as OriginTransfer, mock.entity.xtransfer() as OriginTransfer];

const mockConfig: BackendConfig = {
  pollInterval: 15000,
  logLevel: "silent",
  database: { url: "postgres://postgres:qwerty@localhost:5432/connext?sslmode=disable" },
  environment: "production",
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

describe("Backend operations", () => {
  let getSubgraphHealthStub: SinonStub;
  let mockContext: backend.AppContext;

  beforeEach(() => {
    const saveTransfersStub = stub(dbClient, "saveTransfers");
    saveTransfersStub.resolves();
    const getLatestNonceStub = stub(dbClient, "getLatestNonce");
    getLatestNonceStub.resolves(10);
    const getTransfersByStatusStub = stub(dbClient, "getTransfersByStatus");
    getTransfersByStatusStub.resolves(mockSubgraphResponse);
    const saveRouterBalancesStub = stub(dbClient, "saveRouterBalances");
    saveRouterBalancesStub.resolves();

    mockContext = {
      logger: new Logger({
        level: "silent",
        name: "MockBackend",
      }),
      adapters: {
        subgraph: createStubInstance(SubgraphReader, {
          getOriginTransfers: Promise.resolve(mockSubgraphResponse),
          getOriginTransfersForAll: Promise.resolve(mockSubgraphResponse),
          getDestinationTransfers: Promise.resolve(mockSubgraphResponse),
        }),
        database: {
          saveTransfers: dbClient.saveTransfers,
          getLatestNonce: dbClient.getLatestNonce,
          getTransfersByStatus: dbClient.getTransfersByStatus,
          saveRouterBalances: dbClient.saveRouterBalances,
        },
      },
      config: mockConfig as BackendConfig,
      chainData: mockChainData,
      domains: ["1337", "1338"],
    };
    stub(backend, "getContext").returns(mockContext);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should poll subgraph with block zero", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    getSubgraphHealthStub.resolves({
      chainHeadBlock: 0,
      latestBlock: 0,
      lastHealthyBlock: 0,
      network: "mocknet",
      fatalError: undefined,
      health: "healthy",
      synced: true,
      url: "http://example.com",
    });
    await expect(poller()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock non zero block", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    getSubgraphHealthStub.resolves({
      chainHeadBlock: 1234567,
      latestBlock: 1234567,
      lastHealthyBlock: 100,
      network: "mocknet",
      fatalError: undefined,
      health: "healthy",
      synced: true,
      url: "https://example.com",
    });
    await expect(poller()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    getSubgraphHealthStub.resolves({
      chainHeadBlock: 1234567,
      latestBlock: 1234567,
      lastHealthyBlock: 100,
      network: "mocknet",
      fatalError: undefined,
      health: "healthy",
      synced: true,
      url: "http://example.com",
    });
    await expect(poller()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend empty response", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    getSubgraphHealthStub.resolves({
      chainHeadBlock: 1234567,
      latestBlock: 1234567,
      lastHealthyBlock: 100,
      network: "mocknet",
      fatalError: undefined,
      health: "healthy",
      synced: true,
      url: "http://example.com",
    });
    (mockContext.adapters.subgraph.getOriginTransfers as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationTransfers as SinonStub).resolves([]);

    await expect(poller()).to.eventually.not.be.rejected;
  });

  it("should throw error on backend loadup", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await backend.makeBackend();
    } catch (Error) {}
  });
});
