import { createStubInstance, SinonStub, stub, restore, reset } from "sinon";
import * as SharedFns from "../../../src/shared";
import { expect, mock, XTransfer, chainDataToMap, Logger, XTransferStatus, OriginTransfer } from "@connext/nxtp-utils";
import pg from "pg";
import * as backend from "../../../src/backend";
import { poller } from "../../../src/bindings/poller";
import { Database } from "../../../src/adapters/database";

import {
  getLatestNonce,
  getTransfersByStatus,
  saveTransfers,
  saveRouterBalances,
} from "../../../src/adapters/database/client";
import { newDb } from "pg-mem";
import { BackendConfig } from "../../../src/config";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";

const db = newDb();
const { Pool } = db.adapters.createPg();

const mockConfig: BackendConfig = {
  server: {
    port: 8080,
    host: "0.0.0.0",
    requestLimit: 500,
    adminToken: "blahblah",
  },
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
const mockContext: backend.AppContext = {
  logger: new Logger({
    level: "silent",
    name: "MockBackend",
  }),
  adapters: {
    subgraph: createStubInstance(SubgraphReader),
    database: {
      saveTransfers,
      getLatestNonce,
      getTransfersByStatus,
      saveRouterBalances,
    } as Database,
  },
  config: mockConfig as BackendConfig,
  chainData: mockChainData,
  domains: ["1337", "1338"],
};

describe("Database client", () => {
  let pool: pg.Pool;
  let xTransfer: XTransfer;
  let getSubgraphHealthStub: SinonStub;

  before(async () => {
    xTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    pool = new Pool();
    await pool.query(`
    create type transfer_status as enum ('XCalled', 'Executed', 'Reconciled', 'Completed');
    create table transfers (
      origin_domain varchar(255) not null,
      destination_domain varchar(255),

      nonce bigint,

      -- xparams
      "to" character(42),
      call_data text,

      -- XTransferCoreSchema
      idx bigint,
      transfer_id character(66) primary key,

      -- origin
      origin_chain varchar(255),
      origin_transacting_asset character(42),
      origin_transacting_amount numeric,
      origin_bridged_asset character(42),
      origin_bridged_amount numeric,
      xcall_caller character(42),
      xcall_transaction_hash character(66),
      xcall_timestamp integer,
      xcall_gas_price numeric,
      xcall_gas_limit numeric,
      xcall_block_number integer,
      xcall_relayer_fee numeric,

      -- destination
      destination_chain varchar(255),
      status transfer_status not null default 'XCalled',
      routers character(42)[],
      destination_transacting_asset character(42),
      destination_transacting_amount numeric,
      destination_local_asset character(42),
      destination_local_amount numeric,
      execute_caller character(42),
      execute_transaction_hash character(66),
      execute_timestamp integer,
      execute_gas_price numeric,
      execute_gas_limit numeric,
      execute_block_number integer,
      execute_origin_sender character(42),
      reconcile_caller character(42),
      reconcile_transaction_hash character(66),
      reconcile_timestamp integer,
      reconcile_gas_price numeric,
      reconcile_gas_limit numeric,
      reconcile_block_number integer
    );
    `);
  });
  beforeEach(() => {
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
    await poller();
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
    await poller();
  });
  it("should poll subgraph with mock backend", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    await backend.makeBackend(mockConfig);
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
    let mockgetOriginTransfers = stub(mockContext.adapters.subgraph, "getOriginTransfers");
    let mockgetOriginTransfersForAll = stub(mockContext.adapters.subgraph, "getOriginTransfersForAll");
    let mockgetDestinationTransfers = stub(mockContext.adapters.subgraph, "getDestinationTransfers");
    const mockSubgraphResponse = [mock.entity.xtransfer() as OriginTransfer, mock.entity.xtransfer() as OriginTransfer];
    mockgetOriginTransfers.resolves(mockSubgraphResponse);
    mockgetOriginTransfersForAll.resolves(mockSubgraphResponse);
    mockgetDestinationTransfers.resolves(mockSubgraphResponse);
    await poller();
  });
  it("should poll subgraph with mock backend empty response", async () => {
    getSubgraphHealthStub = stub(SharedFns, "getSubgraphHealth");
    await backend.makeBackend(mockConfig);
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
    let mockgetOriginTransfers = stub(mockContext.adapters.subgraph, "getOriginTransfers");
    let mockgetDestinationTransfers = stub(mockContext.adapters.subgraph, "getDestinationTransfers");
    const mockSubgraphResponse = [];
    mockgetOriginTransfers.resolves(mockSubgraphResponse);
    mockgetDestinationTransfers.resolves(mockSubgraphResponse);

    await poller();
  });
  it("throw error on backend loadup", async () => {
    process.env.DATABASE_URL = "invalid_URI";
    try {
      await backend.makeBackend();
    } catch (Error) {}
  });
});
