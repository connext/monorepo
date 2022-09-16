import { createStubInstance, SinonStub, stub, restore, reset } from "sinon";
import {
  expect,
  mock,
  chainDataToMap,
  Logger,
  OriginTransfer,
  DestinationTransfer,
  XTransferStatus,
} from "@connext/nxtp-utils";
import * as transfersPoller from "../../../src/pollers/transfersPoller";
import * as routersPoller from "../../../src/pollers/routersPoller";
import * as messagesPoller from "../../../src/pollers/messagePoller";
import { bindTransfers } from "../../../src/bindings/transfers";
import { bindRouters } from "../../../src/bindings/routers";

import * as dbClient from "../../../src/adapters/database/client";
import { CartographerConfig } from "../../../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { AppContext } from "../../../src/shared";
import * as shared from "../../../src/shared";

const mockOriginSubgraphResponse = [
  mock.entity.xtransfer({ originDomain: "1337", destinationDomain: "1338" }) as OriginTransfer,
  mock.entity.xtransfer({ originDomain: "1337", destinationDomain: "1338" }) as OriginTransfer,
];
const mockDestinationSubgraphResponse = [
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    status: XTransferStatus.Reconciled,
  }) as DestinationTransfer,
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    status: XTransferStatus.Reconciled,
  }) as DestinationTransfer,
];
const mockRouterResponse = [{}, {}];

const mockConfig: CartographerConfig = {
  pollInterval: 15000,
  logLevel: "silent",
  database: { url: "postgres://postgres:qwery@localhost:5432/connext?sslmode=disable" },
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

const mockBlockNumber: Map<string, number> = new Map();
mockBlockNumber.set("2000", 1234567);
mockBlockNumber.set("3000", 1234567);
mockBlockNumber.set("1337", 1234567);
mockBlockNumber.set("1338", 1234567);
mockBlockNumber.set("10", 1234567);

const mockNoBlockNumber: Map<string, number> = new Map();
mockNoBlockNumber.set("99999", 1234567);

describe("Backend operations", () => {
  let mockContext: AppContext;

  beforeEach(() => {
    const saveTransfersStub = stub(dbClient, "saveTransfers");
    saveTransfersStub.resolves();
    const getTransfersByStatusStub = stub(dbClient, "getTransfersByStatus");
    getTransfersByStatusStub.onFirstCall().resolves(mockOriginSubgraphResponse);
    getTransfersByStatusStub.onSecondCall().resolves(mockOriginSubgraphResponse);
    getTransfersByStatusStub.onThirdCall().resolves(mockOriginSubgraphResponse);
    const saveRouterBalancesStub = stub(dbClient, "saveRouterBalances");
    saveRouterBalancesStub.resolves();
    const getCheckPointStub = stub(dbClient, "getCheckPoint");
    getCheckPointStub.resolves(0);
    const saveCheckPointStub = stub(dbClient, "saveCheckPoint");
    saveCheckPointStub.resolves();
    const getTransfersWithOriginPendingStub = stub(dbClient, "getTransfersWithOriginPending");
    getTransfersWithOriginPendingStub.resolves([]);
    const getTransfersWithDestinationPendingStub = stub(dbClient, "getTransfersWithDestinationPending");
    getTransfersWithDestinationPendingStub.resolves([]);
    const saveMessages = stub(dbClient, "saveMessages");
    saveMessages.resolves();
    const getPendingMessagesStub = stub(dbClient, "getPendingMessages");
    getPendingMessagesStub.resolves([]);

    mockContext = {
      logger: new Logger({
        level: "silent",
        name: "MockBackend",
      }),
      adapters: {
        subgraph: createStubInstance(SubgraphReader, {
          getOriginTransfersByNonce: Promise.resolve(mockOriginSubgraphResponse),
          getDestinationTransfersByNonce: Promise.resolve(mockDestinationSubgraphResponse),
          getDestinationTransfersByDomainAndReconcileTimestamp: Promise.resolve(mockDestinationSubgraphResponse),
          getOriginTransfersById: Promise.resolve(mockOriginSubgraphResponse),
          getDestinationTransfersById: Promise.resolve(mockDestinationSubgraphResponse),
          getAssetBalancesRouters: Promise.resolve(mockRouterResponse),
        }),
        database: {
          saveTransfers: dbClient.saveTransfers,
          getTransfersByStatus: dbClient.getTransfersByStatus,
          saveRouterBalances: dbClient.saveRouterBalances,
          getTransfersWithOriginPending: dbClient.getTransfersWithOriginPending,
          getTransfersWithDestinationPending: dbClient.getTransfersWithDestinationPending,
          getCheckPoint: dbClient.getCheckPoint,
          saveCheckPoint: dbClient.saveCheckPoint,
        },
      },
      config: mockConfig as CartographerConfig,
      chainData: mockChainData,
      domains: ["1337", "1338"],
    };
    stub(shared, "getContext").returns(mockContext);

    (mockContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockBlockNumber);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should poll subgraph with mock backend", async () => {
    await expect(bindTransfers()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend empty response", async () => {
    (mockContext.adapters.subgraph.getOriginTransfersByNonce as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationTransfersByNonce as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getOriginTransfersById as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationTransfersById as SinonStub).resolves([]);

    await expect(bindTransfers()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend no block number", async () => {
    (mockContext.adapters.subgraph.getLatestBlockNumber as SinonStub).resolves(mockNoBlockNumber);
    (mockContext.adapters.subgraph.getOriginTransfersByNonce as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationTransfersByNonce as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getOriginTransfersById as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationTransfersById as SinonStub).resolves([]);

    await expect(bindTransfers()).to.eventually.not.be.rejected;
  });

  it("should throw error on backend loadup", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await transfersPoller.makeTransfersPoller();
    } catch (Error) {}
  });

  it("should poll subgraph with mock non zero block", async () => {
    await expect(bindRouters()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend empty response", async () => {
    (mockContext.adapters.subgraph.getAssetBalancesRouters as SinonStub).resolves([]);
    await expect(bindRouters()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock response", async () => {
    (mockContext.adapters.subgraph.getAssetBalancesRouters as SinonStub).resolves(mockRouterResponse);

    await expect(bindRouters()).to.eventually.not.be.rejected;
  });

  it("should throw error on backend loadup", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await routersPoller.makeRoutersPoller();
    } catch (Error) {}
  });
});
