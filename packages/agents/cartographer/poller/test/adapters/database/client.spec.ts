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
  XMessage,
} from "@connext/nxtp-utils";
import pg from "pg";
import { newDb } from "pg-mem";
import { utils } from "ethers";

import {
  getTransferByTransferId,
  getTransfersByStatus,
  saveTransfers,
  saveCheckPoint,
  saveRouterBalances,
  getTransfersWithOriginPending,
  getTransfersWithDestinationPending,
  getCheckPoint,
  saveMessages,
  saveSentRootMessages,
  saveProcessedRootMessages,
  getPendingMessages,
} from "../../../src/adapters/database/client";

describe("Database client", () => {
  let pool: pg.Pool;
  const batchSize = 10;

  beforeEach(async () => {
    const db = newDb();
    const { Pool } = db.adapters.createPg();
    pool = new Pool();
    await pool.query(`

    CREATE TYPE public.transfer_status AS ENUM (
      'XCalled',
      'Executed',
      'Reconciled',
      'CompletedSlow',
      'CompletedFast'
    );
    CREATE TABLE public.asset_balances (
        asset_canonical_id character(66) NOT NULL,
        asset_domain character varying(255) NOT NULL,
        router_address character(42) NOT NULL,
        balance numeric DEFAULT 0 NOT NULL
    );
    CREATE TABLE public.assets (
        local character(42) NOT NULL,
        adopted character(42) NOT NULL,
        canonical_id character(66) NOT NULL,
        canonical_domain character varying(255) NOT NULL,
        domain character varying(255) NOT NULL
    );
    CREATE TABLE public.checkpoints (
        check_name character varying(255) NOT NULL,
        check_point numeric DEFAULT 0 NOT NULL
    );
    CREATE TABLE public.routers (
        address character(42) NOT NULL
    );
    CREATE VIEW public.routers_with_balances AS
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
      FROM ((public.routers
        JOIN public.asset_balances ON ((routers.address = asset_balances.router_address)))
        JOIN public.assets ON (((asset_balances.asset_canonical_id = assets.canonical_id) AND ((asset_balances.asset_domain)::text = (assets.domain)::text))));
    CREATE TABLE public.transfers (
        transfer_id character(66) NOT NULL,
        nonce bigint,
        "to" character(42),
        call_data text,
        origin_domain character varying(255) NOT NULL,
        destination_domain character varying(255),
        recovery character(42),
        force_slow boolean,
        receive_local boolean,
        callback character(42),
        callback_fee numeric,
        relayer_fee numeric,
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
        destination_chain character varying(255),
        status public.transfer_status DEFAULT 'XCalled'::public.transfer_status NOT NULL,
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
        reconcile_block_number integer,
        update_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        agent character(42),
        destination_min_out numeric,
        transfer_status_update_by_agent character(42),
        transfer_status_message_by_agent character(42)
    );
    CREATE TABLE public.messages (
        leaf character(66) NOT NULL,
        origin_domain character varying(255) NOT NULL,
        destination_domain character varying(255),
        index numeric,
        root character(66),
        message character varying,
        processed boolean DEFAULT false,
        return_data character varying(255)
    );
    CREATE TABLE public.processed_root_messages (
        id character(66) NOT NULL,
        spoke_domain character varying(255),
        hub_domain character varying(255),
        root character(66),
        caller character(42),
        transaction_hash character(66),
        processed_timestamp integer,
        gas_price numeric,
        gas_limit numeric,
        block_number integer
    );
    CREATE TABLE public.sent_root_messages (
        id character(66) NOT NULL,
        spoke_domain character varying(255),
        hub_domain character varying(255),
        root character(66),
        caller character(42),
        transaction_hash character(66),
        sent_timestamp integer,
        gas_price numeric,
        gas_limit numeric,
        block_number integer
    );
    ALTER TABLE ONLY public.asset_balances
        ADD CONSTRAINT asset_balances_pkey PRIMARY KEY (asset_canonical_id, asset_domain, router_address);
    ALTER TABLE ONLY public.assets
        ADD CONSTRAINT assets_pkey PRIMARY KEY (canonical_id, domain);
    ALTER TABLE ONLY public.checkpoints
        ADD CONSTRAINT checkpoints_pkey PRIMARY KEY (check_name);
    ALTER TABLE ONLY public.messages
        ADD CONSTRAINT messages_pkey PRIMARY KEY (leaf);
    ALTER TABLE ONLY public.processed_root_messages
        ADD CONSTRAINT processed_root_messages_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.routers
        ADD CONSTRAINT routers_pkey PRIMARY KEY (address);
    ALTER TABLE ONLY public.sent_root_messages
        ADD CONSTRAINT sent_root_messages_pkey PRIMARY KEY (id);
    ALTER TABLE ONLY public.transfers
        ADD CONSTRAINT transfers_pkey PRIMARY KEY (transfer_id);
    ALTER TABLE ONLY public.asset_balances
        ADD CONSTRAINT fk_asset FOREIGN KEY (asset_canonical_id, asset_domain) REFERENCES public.assets(canonical_id, domain);
    ALTER TABLE ONLY public.asset_balances
        ADD CONSTRAINT fk_router FOREIGN KEY (router_address) REFERENCES public.routers(address);
    `);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should handle undefined status", async () => {
    const statusTransfers = await getTransfersByStatus(undefined as any, 10, 0, "ASC", pool);
    expect(statusTransfers.length).equal(0);
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
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer!.transferId).equal(xTransfer.transferId);
  });

  it("should upsert origin and then destination side transfer", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    const xcall_timestamp = xTransfer.origin.xcall.timestamp;
    xTransfer.destination = undefined;
    const origin = xTransfer.origin;
    await saveTransfers([xTransfer], pool);
    const xTransferDestination = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
    xTransfer.destination = xTransferDestination.destination;
    xTransfer.origin = undefined;
    const reconcile_timestamp = xTransfer.destination.reconcile.timestamp;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer!.origin?.xcall.timestamp).equal(xcall_timestamp);
    expect(dbTransfer?.destination?.reconcile?.timestamp).deep.equal(reconcile_timestamp);
    expect(dbTransfer!.transferId).equal(xTransfer.transferId);
    expect(dbTransfer?.origin).deep.equal(origin);
  });

  it("should upsert destination and then origin side transfer", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
    const origin = xTransfer.origin;
    xTransfer.origin = undefined;
    const reconcile_timestamp = xTransfer.destination.reconcile.timestamp;
    await saveTransfers([xTransfer], pool);
    xTransfer.origin = origin;
    xTransfer.destination = undefined;
    const xcall_timestamp = xTransfer.origin.xcall.timestamp;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer!.origin?.xcall.timestamp).equal(xcall_timestamp);
    expect(dbTransfer?.destination?.reconcile?.timestamp).deep.equal(reconcile_timestamp);
    expect(dbTransfer!.transferId).equal(xTransfer.transferId);
    expect(dbTransfer?.origin).deep.equal(origin);
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
      transfer!.destination!.status = XTransferStatus.CompletedSlow;
    }
    await saveTransfers(transfers, pool);
    for (let transfer of transfers) {
      const dbTransfer = await getTransferByTransferId(transfer.transferId, pool);
      expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedSlow);
      expect(dbTransfer!.transferId).equal(transfer.transferId);
    }
  });

  it("should get transfer by status", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
    await saveTransfers([xTransfer], pool);

    const statusTransfers = await getTransfersByStatus(XTransferStatus.CompletedFast, 10, 0, "ASC", pool);
    expect(statusTransfers.length).greaterThan(0);
    expect(statusTransfers[0]!.destination!.status).equal(xTransfer.destination.status);
  });

  it("should get transfer by status with limit and ascending order", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.nonce = index + 1;
        t.origin!.xcall.timestamp = index + 1;
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
        t.origin!.xcall.timestamp = index + 1;
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
        t.origin!.xcall.timestamp = index + 1;
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
        t.origin!.xcall.timestamp = index + 1;
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
    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.forceSlow).equal(true);
    expect(dbTransfer!.xparams!.receiveLocal).equal(true);
  });

  it("should save missing boolean fields with defaults", async () => {
    const xTransferLocal = mock.entity.xtransfer();
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.forceSlow).equal(false);
    expect(dbTransfer!.xparams!.receiveLocal).equal(false);
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

  it("should router balance when no data", async () => {
    const routerBalances: RouterBalance[] = [];
    await saveRouterBalances(routerBalances, pool);
    const res = await pool.query(`SELECT * FROM routers_with_balances`);
    const rb = convertToRouterBalance(res.rows);
    expect(rb).to.deep.eq(routerBalances);
  });

  it("should set and get checkpoint", async () => {
    const nonce = 8239764;
    const name = "nonce_checkpoint";
    await saveCheckPoint(name, nonce, pool);
    const result = await getCheckPoint(name, pool);
    expect(result).equal(nonce);
  });

  it("should get transfers missing origin data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer1.destination!.execute!.timestamp = 1;
    const xTransfer2: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer2.destination!.execute!.timestamp = 2;
    const xTransfer3 = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    xTransfer3.origin = undefined;
    const xTransfer3Id = xTransfer3.transferId;
    await saveTransfers([xTransfer3], pool);
    const xTransfer4: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer4.destination!.execute!.timestamp = 4;
    await saveTransfers([xTransfer1, xTransfer2, xTransfer3], pool);
    const transfers = await getTransfersWithOriginPending(xTransfer3.xparams.originDomain, 100, "ASC", pool);
    expect(transfers.length).greaterThan(0);
    expect(transfers).includes(xTransfer3Id);
  });

  it("should get transfers missing destination data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer1.destination!.execute!.timestamp = 1;
    const xTransfer2: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer2.destination!.execute!.timestamp = 2;
    const xTransfer3 = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    xTransfer3.destination = undefined;
    const xTransfer3Id = xTransfer3.transferId;
    await saveTransfers([xTransfer3], pool);
    const xTransfer4: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer4.destination!.execute!.timestamp = 4;
    await saveTransfers([xTransfer1, xTransfer2, xTransfer3], pool);
    const transfers = await getTransfersWithDestinationPending(xTransfer3.xparams.destinationDomain, 100, "ASC", pool);
    expect(transfers.length).greaterThan(0);
    expect(transfers).includes(xTransfer3Id);
  });

  it("should get checkpoint when no data", async () => {
    const timestamp = await getCheckPoint(undefined as any, pool);
    expect(timestamp).equal(0);
  });

  it("should get pending origin transfers when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    const transfers = await getTransfersWithOriginPending(xTransfer1.xparams!.originDomain, 100, undefined, pool);
    expect(transfers.length).equal(0);
  });

  it("should get destination transfers when no data", async () => {
    const xTransfer1: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
    const transfers = await getTransfersWithDestinationPending(
      xTransfer1.xparams!.destinationDomain,
      100,
      undefined,
      pool,
    );
    expect(transfers.length).equal(0);
  });

  it("should save multiple messages", async () => {
    const messages: XMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.xMessage());
    }
    await saveMessages(messages, pool);
  });

  it("should upsert multiple messages", async () => {
    const messages: XMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.xMessage());
    }
    await saveMessages(messages, pool);
    for (let message of messages) {
      message.destination!.processed = true;
    }
    await saveMessages(messages, pool);
    const pendingMessages = await getPendingMessages(pool);
    for (const message of pendingMessages) {
      expect(message.destination!.processed).equal(true);
    }
  });

  it("should save multiple sent root messages", async () => {
    const messages: RootMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);
  });

  it("should upsert multiple sent messages", async () => {
    const messages: RootMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);

    for (let message of messages) {
      message.root = "0xroot";
    }
    await saveSentRootMessages(messages, pool);
  });

  it("should save multiple processed root messages", async () => {
    const messages: RootMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveProcessedRootMessages(messages, pool);
  });

  it("should upsert multiple processed messages", async () => {
    const messages: RootMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveProcessedRootMessages(messages, pool);

    for (let message of messages) {
      message.root = "0xroot";
    }
    await saveSentRootMessages(messages, pool);
  });

  it("should throw errors", async () => {
    await expect(getTransferByTransferId("")).to.eventually.not.be.rejected;
    await expect(getTransfersByStatus(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(saveTransfers(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveSentRootMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveProcessedRootMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(getPendingMessages(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(saveRouterBalances([])).to.eventually.not.be.rejected;
    await expect(getTransfersWithDestinationPending(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getTransfersWithOriginPending(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getCheckPoint(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(saveCheckPoint(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
  });
});
