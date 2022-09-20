import { createStubInstance, SinonStub, stub, restore, reset } from "sinon";
import {
  expect,
  mock,
  chainDataToMap,
  Logger,
  OriginMessage,
  DestinationMessage,
  XMessage,
  RootMessage,
} from "@connext/nxtp-utils";
import * as transfersPoller from "../../../src/pollers/transfersPoller";
import * as routersPoller from "../../../src/pollers/routersPoller";
import * as messagesPoller from "../../../src/pollers/messagePoller";
import { bindTransfers } from "../../../src/bindings/transfers";
import { bindRouters } from "../../../src/bindings/routers";
import { bindMessages } from "../../../src/bindings/messages";

import * as dbClient from "../../../src/adapters/database/client";
import { CartographerConfig } from "../../../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import { AppContext } from "../../../src/shared";
import * as shared from "../../../src/shared";

const mockRootSubgraphResponse = [mock.entity.rootMessage() as RootMessage, mock.entity.rootMessage() as RootMessage];
const mockOriginMessageSubgraphResponse = [
  mock.entity.originMessage() as OriginMessage,
  mock.entity.originMessage() as OriginMessage,
];
const mockDestinationMessageSubgraphResponse = [
  mock.entity.destinationMessage() as DestinationMessage,
  mock.entity.destinationMessage() as DestinationMessage,
];
const mockXMessageSubgraphResponse = [mock.entity.xMessage() as XMessage, mock.entity.xMessage() as XMessage];

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

describe("Message operations", () => {
  let mockContext: AppContext;

  beforeEach(() => {
    const getCheckPointStub = stub(dbClient, "getCheckPoint");
    getCheckPointStub.resolves(0);
    const saveCheckPointStub = stub(dbClient, "saveCheckPoint");
    saveCheckPointStub.resolves();
    const saveMessages = stub(dbClient, "saveMessages");
    saveMessages.resolves();
    const saveSentRootMessagesStub = stub(dbClient, "saveSentRootMessages");
    saveSentRootMessagesStub.resolves();
    const saveProcessedRootMessagesStub = stub(dbClient, "saveProcessedRootMessages");
    saveProcessedRootMessagesStub.resolves();
    const getPendingMessagesStub = stub(dbClient, "getPendingMessages");
    getPendingMessagesStub.resolves([]);

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
        }),
        database: {
          getCheckPoint: dbClient.getCheckPoint,
          saveCheckPoint: dbClient.saveCheckPoint,
          saveMessages: dbClient.saveMessages,
          saveSentRootMessages: dbClient.saveSentRootMessages,
          saveProcessedRootMessages: dbClient.saveProcessedRootMessages,
          getPendingMessages: dbClient.getPendingMessages,
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

  it("should poll subgraph for messages with mock backend", async () => {
    await expect(bindMessages()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph for messages with pending messages", async () => {
    let pendingMessages: XMessage[] = [];
    const firstMessage: XMessage = mock.entity.xMessage({ leaf: mockDestinationMessageSubgraphResponse[0].leaf });
    const secondMessage: XMessage = mock.entity.xMessage({ leaf: mockDestinationMessageSubgraphResponse[1].leaf });
    pendingMessages.push(firstMessage);
    pendingMessages.push(secondMessage);

    (mockContext.adapters.database.getPendingMessages as SinonStub).resolves(pendingMessages);
    await expect(bindMessages()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend empty response for messages", async () => {
    (mockContext.adapters.subgraph.getOriginMessagesByDomain as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getDestinationMessagesByDomainAndLeaf as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getSentRootMessagesByDomain as SinonStub).resolves([]);
    (mockContext.adapters.subgraph.getProcessedRootMessagesByDomain as SinonStub).resolves([]);

    await expect(bindMessages()).to.eventually.not.be.rejected;
  });

  it("should poll subgraph with mock backend with valid data", async () => {
    // TODO: Resolves stubs with valid data
    // (mockContext.adapters.subgraph.getOriginMessagesByDomain as SinonStub).resolves([]);
    // (mockContext.adapters.subgraph.getDestinationMessagesByDomainAndLeaf as SinonStub).resolves([]);

    await expect(bindMessages()).to.eventually.not.be.rejected;
  });

  it("should throw error on backend loadup for messages", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await messagesPoller.makeMessagesPoller();
    } catch (Error) {}
  });
});
