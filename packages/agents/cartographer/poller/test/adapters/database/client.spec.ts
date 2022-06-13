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
  getLatestXCallTimestamp,
  getLatestExecuteTimestamp,
  getLatestReconcileTimestamp,
} from "../../../src/adapters/database/client";

describe("Database client", () => {
  let pool: pg.Pool;
  const batchSize = 10;

  beforeEach(async () => {
    const db = newDb();
    const { Pool } = db.adapters.createPg();
    pool = new Pool();
    await pool.query(`
    CREATE TYPE transfer_status AS ENUM (
      'XCalled',
      'Executed',
      'Reconciled',
      'CompletedSlow',
      'CompletedFast'
    );
    CREATE TABLE asset_balances (
      asset_canonical_id character(66) NOT NULL,
      asset_domain character varying(255) NOT NULL,
      router_address character(42) NOT NULL,
      balance numeric DEFAULT 0 NOT NULL
    );
    CREATE TABLE assets (
      local character(42) NOT NULL,
      adopted character(42) NOT NULL,
      canonical_id character(66) NOT NULL,
      canonical_domain character varying(255) NOT NULL,
      domain character varying(255) NOT NULL
    );
    CREATE TABLE routers (address character(42) NOT NULL);
    CREATE VIEW routers_with_balances AS
    SELECT routers.address,
      asset_balances.asset_canonical_id,
      asset_balances.asset_domain,
      asset_balances.router_address,
      asset_balances.balance,
      assets.local,
      assets.adopted,
      assets.canonical_id,
      assets.canonical_domain,
      assets.domain
    FROM (
        (
          routers
          JOIN asset_balances ON (
            (routers.address = asset_balances.router_address)
          )
        )
        JOIN assets ON (
          (
            (
              asset_balances.asset_canonical_id = assets.canonical_id
            )
            AND (
              (asset_balances.asset_domain)::text = (assets.domain)::text
            )
          )
        )
      );
    CREATE TABLE transfers (
      origin_domain character varying(255) NOT NULL,
      destination_domain character varying(255),
      nonce bigint,
      "to" character(42),
      call_data text,
      idx bigint,
      transfer_id character(66) NOT NULL,
      origin_chain character varying(255),
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
      destination_chain character varying(255),
      status transfer_status DEFAULT 'XCalled'::transfer_status NOT NULL,
      routers character(42) [],
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
      reconcile_block_number integer,
      force_slow boolean,
      receive_local boolean,
      callback character(42),
      recovery character(42),
      callback_fee numeric,
      execute_relayer_fee numeric
    );
    --
    -- Name: asset_balances asset_balances_pkey; Type: CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY asset_balances
    ADD CONSTRAINT asset_balances_pkey PRIMARY KEY (asset_canonical_id, asset_domain, router_address);
    --
    -- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (canonical_id, domain);
    --
    -- Name: routers routers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY routers
    ADD CONSTRAINT routers_pkey PRIMARY KEY (address);
    --
    -- Name: transfers transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (transfer_id);
    --
    -- Name: asset_balances fk_asset; Type: FK CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY asset_balances
    ADD CONSTRAINT fk_asset FOREIGN KEY (asset_canonical_id, asset_domain) REFERENCES assets(canonical_id, domain);
    --
    -- Name: asset_balances fk_router; Type: FK CONSTRAINT; Schema: public; Owner: -
    --
    ALTER TABLE ONLY asset_balances
    ADD CONSTRAINT fk_router FOREIGN KEY (router_address) REFERENCES routers(address);
    --
    `);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should handle undefined status", async () => {
    const statusTransfers = await getTransfersByStatus(undefined, 10, 0, "ASC", pool);
    expect(statusTransfers.length).equal(0);
  });

  it("should get latest nonce of new or unkonwn chain", async () => {
    const nonce = await getLatestNonce("unknown_chain", pool);
    expect(nonce).equal(0);
  });

  it("should save single transfer", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
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
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer.destination.status = XTransferStatus.CompletedFast;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer.destination.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer.transferId).equal(xTransfer.transferId);
  });

  it("should save multiple transfers", async () => {
    const transfers: XTransfer[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      transfers.push(mock.entity.xtransfer({ status: XTransferStatus.Executed }));
    }
    await saveTransfers(transfers, pool);
  });

  it("should upsert multiple transfers", async () => {
    const transfers: XTransfer[] = [];
    for (let transfer of transfers) {
      transfer.destination.status = XTransferStatus.CompletedSlow;
    }
    await saveTransfers(transfers, pool);
    for (let transfer of transfers) {
      const dbTransfer = await getTransferByTransferId(transfer.transferId, pool);
      expect(dbTransfer.destination.status).equal(XTransferStatus.CompletedSlow);
      expect(dbTransfer.transferId).equal(transfer.transferId);
    }
  });

  it("should get transfer by status", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
    await saveTransfers([xTransfer], pool);

    const statusTransfers = await getTransfersByStatus(XTransferStatus.CompletedFast, 10, 0, "ASC", pool);
    expect(statusTransfers.length).greaterThan(0);
    expect(statusTransfers[0].destination.status).equal(xTransfer.destination.status);
  });

  it("should get transfer by status with limit and ascending order", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.nonce = index + 1;
        t.origin.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 4, 0, "ASC", pool);
    expect(set1[0].nonce).to.eq(1);
  });

  it("should get transfer by status with limit and descending order", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.nonce = index + 1;
        t.origin.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 4, 0, "DESC", pool);
    expect(set1[0].nonce).to.eq(10);
  });

  it("should get transfer by status with limit", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.nonce = index + 1;
        t.origin.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 4, 0, "DESC", pool);
    expect(set1.length).to.eq(4);
  });

  it("should get transfer by status with limit from offset", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.nonce = index + 1;
        t.origin.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 1, 9, "DESC", pool);
    expect(set1.length).to.eq(1);
    expect(set1[0].nonce).to.eq(1);
  });

  it("should save valid boolean fields", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    xTransferLocal.xparams.forceSlow = true;
    xTransferLocal.xparams.receiveLocal = true;
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer.xparams.forceSlow).equal(true);
    expect(dbTransfer.xparams.receiveLocal).equal(true);
  });

  it("should save missing boolean fields with defaults", async () => {
    const xTransferLocal = mock.entity.xtransfer();
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer.xparams.forceSlow).equal(false);
    expect(dbTransfer.xparams.receiveLocal).equal(false);
  });

  it("should get latest nonce", async () => {
    const xTransfer = mock.entity.xtransfer();
    await saveTransfers([xTransfer], pool);
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

  it("should get latest xcall timestamp", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    xTransfer1.origin.xcall.timestamp = 1;
    const xTransfer2: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    xTransfer2.origin.xcall.timestamp = 2;
    const xTransfer3: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    xTransfer3.origin.xcall.timestamp = 3;
    await saveTransfers([xTransfer1, xTransfer2, xTransfer3], pool);
    const timestamp = await getLatestXCallTimestamp(xTransfer1.originDomain, pool);
    expect(timestamp).equal(3);
  });

  it("should get latest execute timestamp", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer1.destination.execute.timestamp = 1;
    const xTransfer2: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer2.destination.execute.timestamp = 2;
    const xTransfer3: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer3.destination.execute.timestamp = 3;
    await saveTransfers([xTransfer1, xTransfer2, xTransfer3], pool);
    const timestamp = await getLatestExecuteTimestamp(xTransfer1.destinationDomain, pool);
    expect(timestamp).equal(3);
  });

  it("should get latest reconcile timestamp", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    xTransfer1.destination.reconcile.timestamp = 1;
    const xTransfer2: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    xTransfer2.destination.reconcile.timestamp = 2;
    const xTransfer3: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    xTransfer3.destination.reconcile.timestamp = 3;
    await saveTransfers([xTransfer1, xTransfer2, xTransfer3], pool);
    const timestamp = await getLatestReconcileTimestamp(xTransfer1.destinationDomain, pool);
    expect(timestamp).equal(3);
  });

  it("should get latest nonce when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    const nonce = await getLatestNonce(xTransfer1.destinationDomain, pool);
    expect(nonce).equal(0);
  });

  it("should get latest xcall timestamp when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    const timestamp = await getLatestXCallTimestamp(xTransfer1.originDomain, pool);
    expect(timestamp).equal(0);
  });

  it("should get latest execute timestamp when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    const timestamp = await getLatestExecuteTimestamp(xTransfer1.destinationDomain, pool);
    expect(timestamp).equal(0);
  });

  it("should get latest reconcile timestamp when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    const timestamp = await getLatestReconcileTimestamp(xTransfer1.destinationDomain, pool);
    expect(timestamp).equal(0);
  });
});
