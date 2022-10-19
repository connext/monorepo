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
  RootMessage,
  AggregatedRoot,
  PropagatedRoot,
} from "@connext/nxtp-utils";
import { Pool } from "pg";
import { utils } from "ethers";

import {
  getTransferByTransferId,
  getTransfersByTransferIds,
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
  getRootMessages,
  getSpokeNodes,
  getSpokeNode,
  saveAggregatedRoots,
  savePropagatedRoots,
  getHubNode,
  getHubNodes,
  putRoot,
  getRoot,
  getMessageRootIndex,
  getAggregateRootCount,
  getUnProcessedMessages,
  getAggregateRoot,
  getMessageRootFromIndex,
  getMessageRootCount,
  transaction,
} from "../src/client";

describe("Database client", () => {
  let pool: Pool;
  const batchSize = 10;

  beforeEach(async () => {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL || "postgres://postgres:qwerty@localhost:5432/connext?sslmode=disable",
      idleTimeoutMillis: 3000,
      allowExitOnIdle: true,
    });
  });

  afterEach(async () => {
    await pool.query("DELETE FROM asset_balances CASCADE");
    await pool.query("DELETE FROM assets CASCADE");
    await pool.query("DELETE FROM transfers CASCADE");
    await pool.query("DELETE FROM messages CASCADE");
    await pool.query("DELETE FROM root_messages CASCADE");
    await pool.query("DELETE FROM routers CASCADE");
    await pool.query("DELETE FROM checkpoints CASCADE");
    await pool.query("DELETE FROM aggregated_roots CASCADE");
    await pool.query("DELETE FROM propagated_roots CASCADE");
    await pool.query("DELETE FROM merkle_cache CASCADE");

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
    xTransferLocal.xparams.destinationDomain = null as any;
    await saveTransfers([xTransferLocal], pool);
  });

  it("should upsert single transfer", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
    xTransfer.destination!.status = XTransferStatus.CompletedFast;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer!.transferId).equal(xTransfer.transferId);
  });

  it("should upsert origin and then destination side transfer", async () => {
    const xTransfer = mock.entity.xtransfer({ status: XTransferStatus.XCalled });
    const xcall_timestamp = xTransfer.origin!.xcall.timestamp;
    xTransfer.destination = undefined;
    const origin = xTransfer.origin;
    await saveTransfers([xTransfer], pool);
    const xTransferDestination = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
    xTransfer.destination = xTransferDestination.destination;
    xTransfer.origin = undefined;
    const reconcile_timestamp = xTransfer.destination!.reconcile!.timestamp;
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
    const reconcile_timestamp = xTransfer.destination!.reconcile!.timestamp;
    await saveTransfers([xTransfer], pool);
    xTransfer.origin = origin;
    xTransfer.destination = undefined;
    const xcall_timestamp = xTransfer.origin!.xcall.timestamp;
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
    expect(statusTransfers[0]!.destination!.status).equal(xTransfer.destination!.status);
  });

  it("should get transfer by status with limit and ascending order", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.xparams.nonce = index + 1;
        t.origin!.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 4, 0, "ASC", pool);
    expect(set1[0].xparams.nonce).to.eq(1);
  });

  it("should get transfer by status with limit and descending order", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.xparams.nonce = index + 1;
        t.origin!.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 4, 0, "DESC", pool);
    expect(set1[0].xparams.nonce).to.eq(10);
  });

  it("should get transfer by status with limit", async () => {
    const transfers = Array(10)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
        t.xparams.nonce = index + 1;
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
        t.xparams.nonce = index + 1;
        t.origin!.xcall.timestamp = index + 1;
        return t;
      });
    await saveTransfers(transfers, pool);
    const set1 = await getTransfersByStatus(XTransferStatus.Executed, 1, 9, "DESC", pool);
    expect(set1.length).to.eq(1);
    expect(set1[0].xparams.nonce).to.eq(1);
  });

  it("should save valid boolean fields", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    xTransferLocal.xparams.receiveLocal = true;
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.receiveLocal).equal(true);
  });

  it("should save missing boolean fields with defaults", async () => {
    const xTransferLocal = mock.entity.xtransfer();
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
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
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("99").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("98").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
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
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("99").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("98").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("97").toString(),
          },
        ],
      },
    ];
    await saveRouterBalances(routerBalances, pool);
    const res = await pool.query(`SELECT * FROM routers_with_balances order by address, domain, canonical_id`);
    const rb = convertToRouterBalance(res.rows);
    expect(rb).to.deep.eq(routerBalances);
  });

  it("should router balance when partial data", async () => {
    const routerBalances: any = [
      {
        router: mkAddress("0xc"),
        assets: [],
      },
      {
        router: "",
        assets: [],
      },
      { router: "0xaaa" },
    ];
    await saveRouterBalances(routerBalances as RouterBalance[], pool);
    const res = await pool.query(`SELECT * FROM routers_with_balances`);
    const rb = convertToRouterBalance(res.rows);
    expect(rb.length).to.eq(0);
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
    const pendingMessages = await getUnProcessedMessages(100, "ASC", pool);
    for (const message of pendingMessages) {
      expect(message.destination!.processed).equal(true);
    }
    const firstCount = await getMessageRootCount(messages[0].originDomain, messages[0].origin.root, pool);
    expect(firstCount).to.eq(messages[0].origin.index);
    const lastCount = await getMessageRootCount(messages[0].originDomain, messages[batchSize - 1].origin.root, pool);
    expect(lastCount).to.eq(messages[batchSize - 1].origin.index);
  });

  it("should save multiple sent root messages", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);
    const _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages);
  });

  it("should upsert multiple processed messages on top of sent messages and set processed = true", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const _m = mock.entity.rootMessage();
      _m.count = _i * 2;
      messages.push(_m);
    }

    // processed should overwrite and set processed true
    await saveSentRootMessages(messages, pool);
    await saveProcessedRootMessages(messages, pool);

    const _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(
      messages.map((m) => {
        return { ...m, processed: true };
      }),
    );

    const firstRoot = await getMessageRootFromIndex(messages[0].spokeDomain, 0, pool);
    expect(firstRoot).to.eq(messages[0].root);
    // Index the message leaf just after the count of the previous aggregate root
    const lastRoot = await getMessageRootFromIndex(messages[batchSize - 1].spokeDomain, 2 * (batchSize - 2) + 1, pool);
    expect(lastRoot).to.eq(messages[batchSize - 1].root);
  });

  it("should not set processed to false", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }

    // sent should not overwrite to processed = false
    await saveProcessedRootMessages(messages, pool);
    await saveSentRootMessages(messages, pool);

    const _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(
      messages.map((m) => {
        return { ...m, processed: true };
      }),
    );
  });

  it("should filter processed properly", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);
    // process first half of batch
    await saveProcessedRootMessages(messages.slice(0, batchSize / 2 - 1), pool);

    let _messages = await getRootMessages(true, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages.slice(0, batchSize / 2 - 1).map((m) => ({ ...m, processed: true })));

    _messages = await getRootMessages(false, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages.slice(batchSize / 2 - 1));
  });

  it("should get spoke node", async () => {
    const messages: XMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.xMessage();
      if (_i === 0) {
        m.originDomain = "test";
      }
      m.origin.index = _i;
      messages.push(m);
    }
    await saveMessages(messages, pool);

    const _message = await getSpokeNode(mock.domain.A, 5, batchSize, pool);
    expect(_message).to.eq(messages[5].leaf);
  });

  it("should get spoke nodes", async () => {
    const messages: XMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.xMessage();
      if (_i === 0) {
        m.originDomain = "test";
      }
      m.origin.index = _i;
      messages.push(m);
    }
    await saveMessages(messages, pool);

    const _messages = await getSpokeNodes(mock.domain.A, 0, 3, batchSize, pool);
    expect(_messages).to.deep.eq(messages.slice(1, 4).map((m) => m.leaf));
  });

  it("should get hub node", async () => {
    const roots: AggregatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.aggregatedRoot();
      m.index = _i;
      roots.push(m);
    }
    await saveAggregatedRoots(roots, pool);

    const root = await getHubNode(4, batchSize, pool);
    expect(root).to.eq(roots[4].receivedRoot);
  });

  it("should get hub nodes", async () => {
    const roots: AggregatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.aggregatedRoot();
      m.index = _i;
      roots.push(m);
    }
    await saveAggregatedRoots(roots, pool);

    const dbRoots = await getHubNodes(3, 7, batchSize, pool);
    expect(dbRoots).to.deep.eq(roots.slice(3, 7 + 1).map((r) => r.receivedRoot));
  });

  it("should upsert roots properly", async () => {
    for (let _i = 0; _i < batchSize; _i++) {
      await putRoot(mock.domain.A, _i <= 3 ? "1" : _i <= 6 ? "2" : "3", mkBytes32(`0x${_i}`), pool);
    }

    let root = await getRoot(mock.domain.A, "1", pool);
    expect(root).to.eq(mkBytes32("0x0"));

    root = await getRoot(mock.domain.A, "2", pool);
    expect(root).to.eq(mkBytes32("0x4"));

    root = await getRoot(mock.domain.A, "3", pool);
    expect(root).to.eq(mkBytes32("0x7"));
  });

  it("should save multiple aggregated roots", async () => {
    const roots: AggregatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const root = mock.entity.aggregatedRoot();
      root.index = _i;
      roots.push(root);
    }
    await saveAggregatedRoots(roots, pool);
    const rootFirst = await getMessageRootIndex(roots[0].domain, roots[0].receivedRoot, pool);
    expect(rootFirst).to.eq(roots[0].index);
    const rootLast = await getMessageRootIndex(roots[batchSize - 1].domain, roots[batchSize - 1].receivedRoot, pool);
    expect(rootLast).to.eq(roots[batchSize - 1].index);
  });

  it("should save multiple propagated roots", async () => {
    const roots: PropagatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const root = mock.entity.propagatedRoot();
      root.count = _i;
      roots.push(root);
    }
    await savePropagatedRoots(roots, pool);
    const firstIndex = await getAggregateRootCount(roots[0].aggregate, pool);
    expect(firstIndex).to.eq(roots[0].count);
    const lastIndex = await getAggregateRootCount(roots[batchSize - 1].aggregate, pool);
    expect(lastIndex).to.eq(roots[batchSize - 1].count);
    const firstRoot = await getAggregateRoot(0, pool);
    expect(firstRoot).to.eq(roots[0].aggregate);
    const lastRoot = await getAggregateRoot(batchSize - 1, pool);
    expect(lastRoot).to.eq(roots[batchSize - 1].aggregate);
  });

  it("should start a transaction", async () => {
    await transaction(async (txnClient) => {
      await saveMessages([mock.entity.xMessage()], txnClient);
      // Reset offset at the end of the cycle.
      await saveCheckPoint("message_" + "test", 1, txnClient);
    });
  });

  it("should return undefined", async () => {
    expect(await getTransferByTransferId("", pool)).to.eq(undefined);
    expect(await getMessageRootFromIndex("", 10000000, pool)).to.eq(undefined);
    expect(await getHubNode(10000000, batchSize, pool)).to.eq(undefined);
    expect(await getSpokeNode("", 10000000, batchSize, pool)).to.eq(undefined);
    expect(await getMessageRootCount("", "", pool)).to.eq(undefined);
    expect(await getMessageRootIndex("", "", pool)).to.eq(undefined);
    expect(await getAggregateRootCount("", pool)).to.eq(undefined);
    expect(await getAggregateRoot(10000000, pool)).to.eq(undefined);
  });

  it("should throw errors", async () => {
    await expect(getTransferByTransferId(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getTransfersByStatus(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(saveTransfers(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveSentRootMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveProcessedRootMessages(undefined as any)).to.eventually.not.be.rejected;
    await expect(saveRouterBalances([])).to.eventually.not.be.rejected;
    await expect(getTransfersWithDestinationPending(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getTransfersWithOriginPending(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getCheckPoint(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(saveCheckPoint(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getRootMessages(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually
      .not.be.rejected;
    await expect(saveAggregatedRoots(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(savePropagatedRoots(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getTransfersByTransferIds(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getUnProcessedMessages(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getAggregateRoot(undefined as any, undefined as any)).to.eventually;
    await expect(getAggregateRootCount(undefined as any, undefined as any)).to.eventually;
    await expect(getMessageRootIndex(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getMessageRootFromIndex(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getMessageRootCount(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getSpokeNode(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(
      getSpokeNodes(undefined as any, undefined as any, undefined as any, undefined as any, undefined as any),
    ).to.eventually;
    await expect(getHubNode(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getHubNodes(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(getRoot(undefined as any, undefined as any, undefined as any)).to.eventually;
    await expect(putRoot(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually;
  });
});
