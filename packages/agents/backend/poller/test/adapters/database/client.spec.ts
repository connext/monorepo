import { restore, reset } from "sinon";
import {
  expect,
  mkAddress,
  mkBytes32,
  mock,
  RouterBalance,
  XTransfer,
  XTransferStatus,
  convertToRouterBalance,
} from "@connext/nxtp-utils";
import pg from "pg";
import { newDb } from "pg-mem";
import { utils } from "ethers";

import {
  getTransferByTransferId,
  getTransfersByStatus,
  getLatestNonce,
  saveTransfers,
  saveRouterBalances,
} from "../../../src/adapters/database/client";

const db = newDb();
const { Pool } = db.adapters.createPg();

describe("Database client", () => {
  let pool: pg.Pool;
  let xTransfer: XTransfer;
  let transfers: XTransfer[] = [];
  const batchSize = 10;

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
    
    create table routers ("address" character(42) primary key);
    create table assets (
      "local" character(42) not null,
      adopted character(42) not null,
      canonical_id character(66) not null,
      canonical_domain varchar(255) not null,
      domain varchar(255) not null,
      primary key (canonical_id, domain)
    );
    create table asset_balances (
      asset_canonical_id character(66) not null,
      asset_domain varchar(255) not null,
      router_address character(42) not null,
      balance numeric not null default 0,
      primary key (asset_canonical_id, asset_domain, router_address),
      constraint fk_router foreign key(router_address) references routers("address"),
      constraint fk_asset foreign key(asset_canonical_id, asset_domain) references assets(canonical_id, domain)
    );

    create view routers_with_balances as
    select *
    from routers
      join asset_balances on routers."address" = asset_balances.router_address
      join assets on asset_balances.asset_canonical_id = assets.canonical_id
      and asset_balances.asset_domain = assets.domain;
    `);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should handle undefined status", async () => {
    const statusTransfers = await getTransfersByStatus(undefined, pool);
    expect(statusTransfers.length).equal(0);
  });

  it("should get latest nonce of new or unkonwn chain", async () => {
    const nonce = await getLatestNonce("unknown_chain", pool);
    expect(nonce).equal(0);
  });

  it("should save single transfer", async () => {
    await saveTransfers([xTransfer], pool);
  });

  it("should save single transfer null destination", async () => {
    let xTransferLocal = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransferLocal.destination = null;
    await saveTransfers([xTransferLocal], pool);
  });

  it("should save single transfer null destination", async () => {
    let xTransferLocal = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransferLocal.origin = null;
    await saveTransfers([xTransferLocal], pool);
  });

  it("should upsert single transfer", async () => {
    xTransfer.destination.status = XTransferStatus.Completed;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer.destination.status).equal(XTransferStatus.Completed);
    expect(dbTransfer.transferId).equal(xTransfer.transferId);
  });

  it("should save multiple transfers", async () => {
    for (var _i = 0; _i < batchSize; _i++) {
      transfers.push(mock.entity.xtransfer({ status: XTransferStatus.Executed }));
    }
    await saveTransfers(transfers, pool);
  });

  it("should upsert multiple transfers", async () => {
    for (let transfer of transfers) {
      transfer.destination.status = XTransferStatus.Completed;
    }
    await saveTransfers(transfers, pool);
    for (let transfer of transfers) {
      const dbTransfer = await getTransferByTransferId(transfer.transferId, pool);
      expect(dbTransfer.destination.status).equal(XTransferStatus.Completed);
      expect(dbTransfer.transferId).equal(transfer.transferId);
    }
  });

  it("should get transfer by status", async () => {
    const statusTransfers = await getTransfersByStatus(XTransferStatus.Completed, pool);
    expect(statusTransfers.length).greaterThan(0);
    expect(statusTransfers[0].destination.status).equal(xTransfer.destination.status);
  });

  it("should get latest nonce", async () => {
    const nonce = await getLatestNonce("1337", pool);
    expect(nonce).equal(1234);
  });

  it("should set a router balance", async () => {
    const routerBalances: RouterBalance[] = [
      {
        router: mkAddress("0xa"),
        assets: [
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            local: mkAddress("0xbb"),
            canonicalDomain: "1111",
            balance: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            canonicalDomain: "1111",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("99").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            canonicalDomain: "2221",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("98").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            canonicalDomain: "2221",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("97").toString(),
          },
        ],
      },
      {
        router: mkAddress("0xb"),
        assets: [
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            local: mkAddress("0xbb"),
            canonicalDomain: "1111",
            balance: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            canonicalDomain: "1111",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("99").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            canonicalDomain: "2221",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("98").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            canonicalDomain: "2221",
            local: mkAddress("0xbb"),
            balance: utils.parseEther("97").toString(),
          },
        ],
      },
    ];
    await saveRouterBalances(routerBalances, pool);
    const res = await pool.query(`SELECT * FROM routers_with_balances`);
    const rb = convertToRouterBalance(res.rows);
    expect(rb).to.deep.eq(routerBalances);
  });
});
