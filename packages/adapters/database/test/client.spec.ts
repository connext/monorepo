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
  ReceivedAggregateRoot,
  mkHash,
  XTransferErrorStatus,
  RelayerType,
  SlippageUpdate,
  getNtpTimeSeconds,
  XTransferMessageStatus,
  getRandomBytes32,
  SnapshotRoot,
  Snapshot,
  OptimisticRootPropagated,
  OptimisticRootFinalized,
  RouterDailyTVL,
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
  saveReceivedAggregateRoot,
  savePropagatedRoots,
  getHubNode,
  getHubNodes,
  putRoot,
  getRoot,
  getMessageRootIndex,
  getLatestMessageRoot,
  getLatestAggregateRoots,
  getAggregateRootCount,
  getUnProcessedMessages,
  getUnProcessedMessagesByIndex,
  getUnProcessedMessagesByDomains,
  getAggregateRoot,
  getBaseAggregateRoot,
  getMessageRootAggregatedFromIndex,
  getMessageRootCount,
  transaction,
  getCompletedTransfersByMessageHashes,
  increaseBackoff,
  resetBackoffs,
  updateErrorStatus,
  markRootMessagesProcessed,
  updateSlippage,
  getPendingTransfersByMessageStatus,
  getMessageRootsFromIndex,
  saveAssets,
  getAssets,
  saveAssetPrice,
  getPendingTransfersByDomains,
  updateExecuteSimulationData,
  saveStableSwapPool,
  saveStableSwapPoolEvent,
  saveStableSwapTransfers,
  saveStableSwapLpBalances,
  getMessageRootStatusFromIndex,
  getAggregateRootByRootAndDomain,
  getMessageByLeaf,
  deleteNonExistTransfers,
  getAggregateRoots,
  saveSnapshotRoots,
  getPendingSnapshots,
  saveProposedSnapshots,
  savePropagatedOptimisticRoots,
  getCurrentProposedSnapshot,
  saveFinalizedRoots,
  saveStableSwapExchange,
  saveRouterDailyTVL,
  getRootMessage,
  getPendingAggregateRoot,
  getMessageByRoot,
  deleteCache,
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
    await pool.query("DELETE FROM asset_prices CASCADE");
    await pool.query("DELETE FROM transfers CASCADE");
    await pool.query("DELETE FROM messages CASCADE");
    await pool.query("DELETE FROM root_messages CASCADE");
    await pool.query("DELETE FROM routers CASCADE");
    await pool.query("DELETE FROM checkpoints CASCADE");
    await pool.query("DELETE FROM aggregated_roots CASCADE");
    await pool.query("DELETE FROM propagated_roots CASCADE");
    await pool.query("DELETE FROM received_aggregate_roots CASCADE");
    await pool.query("DELETE FROM merkle_cache CASCADE");
    await pool.query("DELETE FROM stableswap_pools CASCADE");
    await pool.query("DELETE FROM stableswap_pool_events CASCADE");
    await pool.query("DELETE FROM stableswap_lp_balances CASCADE");
    await pool.query("DELETE FROM stableswap_lp_transfers CASCADE");
    await pool.query("DELETE FROM snapshot_roots CASCADE");
    await pool.query("DELETE FROM snapshots CASCADE");
    await pool.query("DELETE FROM stableswap_exchanges CASCADE");
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

  it("should save single transfer and update it's error status", async () => {
    const xTransfer = mock.entity.xtransfer({
      status: XTransferStatus.Executed,
      errorStatus: XTransferErrorStatus.LowRelayerFee,
    });
    await saveTransfers([xTransfer], pool);

    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.Executed);
    expect(dbTransfer!.origin?.errorStatus).equal(undefined);
  });

  it("should save single transfer and update it's error status to None when CompletedFast", async () => {
    let xTransfer = mock.entity.xtransfer({
      status: XTransferStatus.Reconciled,
      errorStatus: XTransferErrorStatus.LowRelayerFee,
    });
    await saveTransfers([xTransfer], pool);

    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.Reconciled);
    expect(dbTransfer!.origin?.errorStatus).equal(XTransferErrorStatus.LowRelayerFee);

    xTransfer.destination!.status = XTransferStatus.CompletedFast;

    await saveTransfers([xTransfer], pool);

    const dbTransferUpdated = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransferUpdated!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransferUpdated!.origin?.errorStatus).equal(undefined);
  });

  it("should save single transfer and update it's error status to None when CompletedSlow", async () => {
    let xTransfer = mock.entity.xtransfer({
      status: XTransferStatus.Reconciled,
      errorStatus: XTransferErrorStatus.LowRelayerFee,
    });
    await saveTransfers([xTransfer], pool);

    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.Reconciled);
    expect(dbTransfer!.origin?.errorStatus).equal(XTransferErrorStatus.LowRelayerFee);

    xTransfer.destination!.status = XTransferStatus.CompletedSlow;

    await saveTransfers([xTransfer], pool);

    const dbTransferUpdated = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransferUpdated!.destination!.status).equal(XTransferStatus.CompletedSlow);
    expect(dbTransferUpdated!.origin?.errorStatus).equal(undefined);
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
    const bridgedAmt = "100230889509432937";
    xTransfer.xparams.bridgedAmt = bridgedAmt;
    const reconcile_timestamp = xTransfer.destination!.reconcile!.timestamp;
    await saveTransfers([xTransfer], pool);
    const dbTransfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(dbTransfer!.destination!.status).equal(XTransferStatus.CompletedFast);
    expect(dbTransfer!.origin?.xcall.timestamp).equal(xcall_timestamp);
    expect(dbTransfer?.destination?.reconcile?.timestamp).deep.equal(reconcile_timestamp);
    expect(dbTransfer!.transferId).equal(xTransfer.transferId);
    expect(dbTransfer?.origin).deep.equal(origin);
    expect(dbTransfer!.xparams.bridgedAmt).deep.equal(bridgedAmt);
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

  it("should delete duplicated transfers", async () => {
    const transfers: XTransfer[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      transfers.push(mock.entity.xtransfer({ status: XTransferStatus.XCalled, nonce: _i }));
    }
    const duplicated = mock.entity.xtransfer({ status: XTransferStatus.XCalled, nonce: 0 });
    duplicated.origin!.xcall.timestamp = transfers[0].origin!.xcall.timestamp + 1;
    transfers.push(duplicated);

    await saveTransfers(transfers, pool);
    let all = await getTransfersByStatus(XTransferStatus.XCalled, 100, 0, "ASC", pool);
    expect(all.length).to.eq(batchSize + 1);

    const transferIds = await deleteNonExistTransfers(pool);

    all = await getTransfersByStatus(XTransferStatus.XCalled, 100, 0, "ASC", pool);
    expect(all.map((t) => t.transferId).includes(duplicated.transferId)).to.be.true;
    expect(all.length).to.eq(batchSize);
    expect(transferIds.length).to.eq(1);
    expect(transferIds[0]).to.eq(transfers[0].transferId);
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

  it("should get completed transfers by message hash", async () => {
    const transfers = Array(3)
      .fill(0)
      .map((_a, index) => {
        const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.CompletedFast });
        t.xparams.nonce = index + 1;
        t.origin!.xcall.timestamp = index + 1;
        return t;
      })
      .concat(
        Array(3)
          .fill(0)
          .map((_a, index) => {
            const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.CompletedSlow });
            t.xparams.nonce = index + 1;
            t.origin!.xcall.timestamp = index + 1;
            return t;
          }),
      )
      .concat(
        Array(3)
          .fill(0)
          .map((_a, index) => {
            const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Executed });
            t.xparams.nonce = index + 1;
            t.origin!.xcall.timestamp = index + 1;
            return t;
          }),
      )
      .concat(
        Array(3)
          .fill(0)
          .map((_a, index) => {
            const t: XTransfer = mock.entity.xtransfer({ status: XTransferStatus.Reconciled });
            t.xparams.nonce = index + 1;
            t.origin!.xcall.timestamp = index + 1;
            return t;
          }),
      );

    transfers[1].origin!.messageHash = mkHash("0xaaa");
    transfers[5].origin!.messageHash = mkHash("0xbbb");
    transfers[10].origin!.messageHash = mkHash("0xccc");
    await saveTransfers(transfers, pool);
    const set = await getCompletedTransfersByMessageHashes([mkHash("0xaaa"), mkHash("0xbbb"), mkHash("0xccc")], pool);
    expect(set.length).to.eq(3);
    expect([mkHash("0xaaa"), mkHash("0xbbb"), mkHash("0xccc")].includes(set[0].origin!.messageHash)).to.be.true;
    expect([mkHash("0xaaa"), mkHash("0xbbb"), mkHash("0xccc")].includes(set[1].origin!.messageHash)).to.be.true;
    expect([mkHash("0xaaa"), mkHash("0xbbb"), mkHash("0xccc")].includes(set[2].origin!.messageHash)).to.be.true;
  });

  it("should save valid boolean fields", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);
    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.receiveLocal).equal(xTransferLocal.xparams.receiveLocal);
  });

  it("should save receiveLocal when not already in db", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    xTransferLocal.xparams.receiveLocal = true;

    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);

    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.receiveLocal).equal(true);
  });

  it("should not save receiveLocal=false  when true already in db", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    xTransferLocal.xparams.receiveLocal = true;

    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);

    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.receiveLocal).equal(true);

    // Reconciled only destination transfers has receiveLocal = false
    xTransferLocal.xparams.receiveLocal = false;

    await saveTransfers([xTransferLocal], pool);
    const dbTransferUpsert = await getTransferByTransferId(xTransferLocal.transferId, pool);

    expect(dbTransferUpsert!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransferUpsert!.xparams!.receiveLocal).equal(true);
  });

  it("should save receiveLocal=true when false already in db", async () => {
    let xTransferLocal = mock.entity.xtransfer();
    xTransferLocal.xparams.receiveLocal = false;

    await saveTransfers([xTransferLocal], pool);
    const dbTransfer = await getTransferByTransferId(xTransferLocal.transferId, pool);

    expect(dbTransfer!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransfer!.xparams!.receiveLocal).equal(false);

    // Reconciled only destination transfers has receiveLocal = false
    xTransferLocal.xparams.receiveLocal = true;

    await saveTransfers([xTransferLocal], pool);
    const dbTransferUpsert = await getTransferByTransferId(xTransferLocal.transferId, pool);

    expect(dbTransferUpsert!.transferId).equal(xTransferLocal.transferId);
    expect(dbTransferUpsert!.xparams!.receiveLocal).equal(true);
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
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
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
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "1234",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
          },
          {
            canonicalId: mkBytes32("0xbb"),
            adoptedAsset: mkAddress("0xaa"),
            blockNumber: "0",
            domain: "12345",
            id: mkAddress("0xbb"),
            canonicalDomain: "1111",
            key: mkBytes32("0xb"),
            decimal: "18",
            localAsset: mkAddress("0xaa"),
            balance: utils.parseEther("100").toString(),
            locked: utils.parseEther("100").toString(),
            supplied: utils.parseEther("100").toString(),
            removed: utils.parseEther("100").toString(),
            feesEarned: utils.parseEther("100").toString(),
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
        router: mkAddress("0xa"),
        assets: [],
      },
    ];
    await saveRouterBalances(routerBalances as RouterBalance[], pool);
    const res = await pool.query(`SELECT * FROM routers_with_balances`);
    const rb = convertToRouterBalance(res.rows);
    expect(rb).to.deep.eq(routerBalances.map((r) => ({ ...r, assets: [] })));
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
      let message = mock.entity.xMessage();
      message.origin.index = _i;
      messages.push(message);
    }
    await saveMessages(messages, pool);
  });

  it("should upsert multiple messages", async () => {
    const messages: XMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      let message = mock.entity.xMessage();
      message.origin.index = _i;
      messages.push(message);
    }
    await saveMessages(messages, pool);
    for (let message of messages) {
      message.destination!.processed = true;
    }
    await saveMessages(messages, pool);
    const pendingMessages = await getUnProcessedMessagesByIndex(
      mock.domain.A,
      mock.domain.B,
      0,
      batchSize,
      0,
      100,
      "ASC",
      pool,
    );
    for (const message of pendingMessages) {
      expect(message.destination!.processed).equal(true);
    }
    const firstCount = await getMessageRootCount(messages[0].originDomain, messages[0].origin.root, pool);
    expect(firstCount).to.eq(messages[0].origin.index);
    const lastCount = await getMessageRootCount(messages[0].originDomain, messages[batchSize - 1].origin.root, pool);
    expect(lastCount).to.eq(messages[batchSize - 1].origin.index);

    // Get single message
    const byRoot = await getMessageByRoot(messages[0].originDomain, messages[0].origin.root, pool);
    expect(byRoot).to.deep.eq(messages[0]);
    const byRootMissing = await getMessageByRoot(messages[0].originDomain, "", pool);
    expect(byRootMissing).to.deep.eq(undefined);
  });

  it("should get multiple messages by domain", async () => {
    const messages: XMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      let message = mock.entity.xMessage();
      message.origin.index = _i;
      messages.push(message);
    }
    await saveMessages(messages, pool);
    for (let message of messages) {
      message.destination!.processed = false;
    }
    await saveMessages(messages, pool);
    const pendingMessages = await getUnProcessedMessagesByDomains(
      mock.domain.A,
      mock.domain.B,
      0,
      batchSize,
      "ASC",
      pool,
    );
    for (const message of pendingMessages) {
      expect(message.destination!.processed).equal(false);
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

  it("should get single root messages", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);
    const _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages);
    const _message = await getRootMessage(messages[0].spokeDomain, messages[0].root, pool);
    expect(_message).to.deep.eq(messages[0]);
  });

  it("should upsert multiple sent root messages with relayer data", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      messages.push(mock.entity.rootMessage());
    }
    await saveSentRootMessages(messages, pool);
    let _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages);

    for (let _i = 0; _i < 5; _i++) {
      messages[_i].relayerType = RelayerType.Connext;
      messages[_i].sentTaskId = mkBytes32("0x1234");
      messages[_i].sentTimestamp = getNtpTimeSeconds();
    }
    await saveSentRootMessages(messages, pool);
    _messages = await getRootMessages(undefined, 100, "ASC", pool);
    expect(_messages).to.deep.eq(messages);
  });

  it("should upsert multiple processed messages on top of sent messages and set processed = true", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const _m = mock.entity.rootMessage();
      _m.timestamp = _i * 2;
      _m.count = _i * 2;
      messages.push(_m);
    }

    // processed should overwrite and set processed true
    await saveSentRootMessages(messages, pool);
    await saveProcessedRootMessages(messages, pool);

    let firstRoot = await getMessageRootAggregatedFromIndex(messages[0].spokeDomain, 0, pool);
    const messageRoots = await getMessageRootsFromIndex(messages[0].spokeDomain, 0, pool);
    expect(firstRoot).to.eq(undefined);
    expect(messageRoots).to.be.deep.eq(messages.map((i) => ({ ...i, count: i.count.toString(), processed: true })));

    const roots: AggregatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.aggregatedRoot();
      m.index = _i;
      m.receivedRoot = messages[_i].root;
      roots.push(m);
    }
    await saveAggregatedRoots(roots, pool);

    const _messages = await getRootMessages(true, 100, "ASC", pool);
    _messages.sort((a, b) => a.timestamp - b.timestamp);
    expect(_messages).to.deep.eq(
      messages.map((m) => {
        return { ...m, processed: true };
      }),
    );

    firstRoot = await getMessageRootAggregatedFromIndex(messages[0].spokeDomain, 0, pool);
    expect(firstRoot!.root).to.eq(messages[0].root);
    // Index the message leaf just after the count of the previous aggregate root
    const lastRoot = await getMessageRootAggregatedFromIndex(
      messages[batchSize - 1].spokeDomain,
      2 * (batchSize - 2) + 1,
      pool,
    );
    expect(lastRoot!.root).to.eq(messages[batchSize - 1].root);
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

  it("should getMessageByLeaf", async () => {
    const messages: XMessage[] = [];
    for (var _i = 0; _i < batchSize; _i++) {
      let message = mock.entity.xMessage();
      message.origin.index = _i;
      messages.push(message);
    }
    await saveMessages(messages, pool);

    const message = await getMessageByLeaf(mock.entity.xMessage().originDomain, messages[1].leaf, pool);
    expect(message).to.deep.eq(messages[1]);
  });

  it("should filter processed properly", async () => {
    const messages: RootMessage[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      let rootMessage = mock.entity.rootMessage();
      rootMessage.timestamp = _i;
      rootMessage.count = _i;
      messages.push(rootMessage);
    }
    await saveSentRootMessages(messages, pool);
    // process first half of batch
    await saveProcessedRootMessages(messages.slice(batchSize / 2 - 1, batchSize / 2), pool);

    let _messages = await getRootMessages(true, 100, "ASC", pool);
    _messages.sort((a, b) => a.timestamp - b.timestamp);

    expect(_messages).to.deep.eq(messages.slice(0, batchSize / 2).map((m) => ({ ...m, processed: true })));

    _messages = await getRootMessages(false, 100, "ASC", pool);
    _messages.sort((a, b) => a.timestamp - b.timestamp);
    expect(_messages).to.deep.eq(messages.slice(batchSize / 2));
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

    const _messages1 = await getSpokeNodes(mock.domain.A, 1, 4, batchSize, 10000, pool);
    expect(_messages1).to.deep.eq(messages.slice(1, 5).map((m) => m.leaf));
    const _messages2 = await getSpokeNodes(mock.domain.A, 1, 4, batchSize, 1, pool);
    expect(_messages2).to.deep.eq(messages.slice(1, 5).map((m) => m.leaf));
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

    const dbRoots1 = await getHubNodes(3, 7, batchSize, 10000, pool);
    expect(dbRoots1).to.deep.eq(roots.slice(3, 7 + 1).map((r) => r.receivedRoot));

    const dbRoots2 = await getHubNodes(3, 7, batchSize, 1, pool);
    expect(dbRoots2).to.deep.eq(roots.slice(3, 7 + 1).map((r) => r.receivedRoot));
  });

  it("should get getLatestMessageRoot", async () => {
    const messages: RootMessage[] = [];
    const roots: AggregatedRoot[] = [];
    const propRoots: PropagatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const rootMessage = mock.entity.rootMessage();
      rootMessage.count = _i;
      messages.push(rootMessage);
      const m = mock.entity.aggregatedRoot();
      m.index = _i;
      m.receivedRoot = rootMessage.root;
      roots.push(m);
      const propRoot = mock.entity.propagatedRoot();
      propRoot.count = _i + 1;
      propRoots.push(propRoot);
    }

    await saveSentRootMessages(messages, pool);
    await saveAggregatedRoots(roots, pool);
    await savePropagatedRoots(propRoots, pool);

    const dbRoots = await getLatestMessageRoot(
      mock.entity.rootMessage().spokeDomain,
      propRoots[batchSize - 1].aggregate,
      pool,
    );
    dbRoots ? (dbRoots.count = batchSize - 1) : undefined;
    expect(dbRoots).to.deep.eq(messages[batchSize - 1]);
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
    const aggregatedRoots = await getAggregateRoots(batchSize + 1, pool);
    expect(aggregatedRoots.length).to.eq(roots.length);
    const aggregatedRoot = await getAggregateRoot(roots[0].receivedRoot, pool);
    expect(aggregatedRoot).to.eq(roots[0].id.split("-")[0]);
  });

  it("should get base aggregated root", async () => {
    const roots: AggregatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const root = mock.entity.aggregatedRoot();
      root.index = _i;
      roots.push(root);
    }
    await saveAggregatedRoots(roots, pool);
    const aggregatedRoot = await getBaseAggregateRoot(pool);
    expect(aggregatedRoot).to.eq(roots[batchSize - 1].receivedRoot);
  });

  it("should save multiple propagated roots", async () => {
    const roots: PropagatedRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const root = mock.entity.propagatedRoot();
      root.count = _i;
      roots.push(root);
    }
    await expect(savePropagatedRoots(roots, pool)).to.eventually.not.be.rejected;
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
    expect((await getMessageRootAggregatedFromIndex("", 10000000, pool))?.root).to.eq(undefined);
    expect(await getHubNode(10000000, batchSize, pool)).to.eq(undefined);
    expect(await getSpokeNode("", 10000000, batchSize, pool)).to.eq(undefined);
    expect(await getMessageRootCount("", "", pool)).to.eq(undefined);
    expect(await getMessageRootIndex("", "", pool)).to.eq(undefined);
    expect(await getAggregateRootCount("", pool)).to.eq(undefined);
    expect(await getAggregateRoot("", pool)).to.eq(undefined);
    expect(await getLatestMessageRoot("", "", pool)).to.eq(undefined);
    expect(await getLatestAggregateRoots("", 1, "DESC", pool)).to.be.deep.eq([]);
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
    await expect(
      getUnProcessedMessages(
        undefined as any,
        undefined as any,
        undefined as any,
        undefined as any,
        undefined as any,
        undefined as any,
      ),
    ).to.eventually.not.be.rejected;
    await expect(getAggregateRoot(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getAggregateRootCount(undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getMessageRootIndex(undefined as any, undefined as any, undefined as any)).to.eventually.not.be
      .rejected;
    await expect(getMessageRootAggregatedFromIndex(undefined as any, undefined as any, undefined as any)).to.eventually
      .not.be.rejected;
    await expect(getMessageRootCount(undefined as any, undefined as any, undefined as any)).to.eventually.not.be
      .rejected;
    await expect(getSpokeNode(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually.not
      .be.rejected;
    await expect(
      getSpokeNodes(undefined as any, undefined as any, undefined as any, undefined as any, undefined as any),
    ).to.eventually.not.be.rejected;
    await expect(getHubNode(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getHubNodes(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually.not
      .be.rejected;
    await expect(getRoot(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(putRoot(undefined as any, undefined as any, undefined as any, undefined as any)).to.eventually.not.be
      .rejected;
    await expect(getRootMessage(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(getMessageByRoot(undefined as any, undefined as any, undefined as any)).to.eventually.not.be.rejected;
    await expect(deleteCache(undefined as any, undefined as any)).to.eventually.not.be.rejected;
  });

  it("should increase and reset the backoff", async () => {
    const transfer1 = mock.entity.xtransfer();
    const transfer2 = mock.entity.xtransfer();
    const transfer3 = mock.entity.xtransfer();
    await saveTransfers([transfer1, transfer2, transfer3], pool);

    let queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer1.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(32);
    expect(queryRes.rows[0].next_execution_timestamp).to.eq(0);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer2.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(32);
    expect(queryRes.rows[0].next_execution_timestamp).to.eq(0);

    let timestamp1 = Math.floor(Date.now() / 1000);
    await increaseBackoff(transfer1.transferId, pool);
    let timestamp2 = Math.floor(Date.now() / 1000);
    await increaseBackoff(transfer2.transferId, pool);
    let timestamp3 = Math.floor(Date.now() / 1000);
    await increaseBackoff(transfer3.transferId, pool);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer1.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(64);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp1 + 63); // because of rounding

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer2.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(64);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp2 + 63); // because of rounding

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer3.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(64);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp3 + 63); // because of rounding

    timestamp1 = Math.floor(Date.now() / 1000);
    await increaseBackoff(transfer1.transferId, pool);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer1.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(128);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp1 + 127); // because of rounding

    await resetBackoffs([transfer1.transferId, transfer2.transferId], pool);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer1.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(32);
    expect(queryRes.rows[0].next_execution_timestamp).to.eq(0);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer2.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(32);
    expect(queryRes.rows[0].next_execution_timestamp).to.eq(0);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer3.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(64);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp3 + 63); // because of rounding

    for (let i = 0; i < 32; i++) {
      timestamp1 = Math.floor(Date.now() / 1000);
      await increaseBackoff(transfer1.transferId, pool);
    }
    await increaseBackoff("UNKNOWN", pool);

    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer1.transferId]);
    expect(queryRes.rows[0].backoff).to.eq(86400 * 7);
    expect(queryRes.rows[0].next_execution_timestamp).to.gte(timestamp1 + 127); // because of rounding
  });

  it("should saveReceivedAggregateRoot", async () => {
    const roots: ReceivedAggregateRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.receivedAggregateRoot();
      m.blockNumber = _i;
      roots.push(m);
    }
    await saveReceivedAggregateRoot(roots, pool);

    const latest = await getLatestAggregateRoots(roots[0].domain, 1, "DESC", pool);
    expect(latest[0]).to.deep.eq(roots[batchSize - 1]);
  });

  it("should update error status", async () => {
    const transfer = mock.entity.xtransfer();
    await saveTransfers([transfer], pool);
    let queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer.transferId]);
    expect(queryRes.rows[0].error_status).to.eq(null);
    await updateErrorStatus(transfer.transferId, XTransferErrorStatus.LowSlippage, pool);
    queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfer.transferId]);
    expect(queryRes.rows[0].error_status).to.eq(XTransferErrorStatus.LowSlippage);
  });

  it("should update slippage", async () => {
    const transfers: XTransfer[] = [mock.entity.xtransfer(), mock.entity.xtransfer(), mock.entity.xtransfer()];
    const slippageUpdates: SlippageUpdate[] = transfers.map((t, index) => {
      return {
        domain: t.xparams.destinationDomain,
        id: t.transferId,
        slippage: (index + 1).toString(),
        timestamp: getNtpTimeSeconds(),
        transferId: t.transferId,
      };
    });
    await saveTransfers(transfers, pool);
    let queryRes: any;
    for (let i = 0; i < transfers.length; i++) {
      queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfers[i].transferId]);
      expect(queryRes.rows[0].updated_slippage).to.eq(null);
    }
    await updateSlippage(slippageUpdates, pool);

    for (let i = 0; i < transfers.length; i++) {
      queryRes = await pool.query("SELECT * FROM transfers WHERE transfer_id = $1", [transfers[i].transferId]);
      expect(queryRes.rows[0].updated_slippage).to.eq((i + 1).toString());
    }
  });

  it("should mark root messages processed", async () => {
    const roots = [mock.entity.rootMessage(), mock.entity.rootMessage(), mock.entity.rootMessage()];
    await saveSentRootMessages(roots, pool);
    await markRootMessagesProcessed([roots[0], roots[1]], pool);
    let queryRes = await pool.query("SELECT * FROM root_messages WHERE id = $1", [roots[0].id]);
    expect(queryRes.rows[0].processed).to.eq(true);
    queryRes = await pool.query("SELECT * FROM root_messages WHERE id = $1", [roots[1].id]);
    expect(queryRes.rows[0].processed).to.eq(true);
    queryRes = await pool.query("SELECT * FROM root_messages WHERE id = $1", [roots[2].id]);
    expect(queryRes.rows[0].processed).to.eq(false);
  });

  it("should get getAggregateRootByRootAndDomain", async () => {
    const roots: ReceivedAggregateRoot[] = [];
    for (let _i = 0; _i < 10; _i++) {
      const m = mock.entity.receivedAggregateRoot();
      m.domain = mock.domain.A;
      roots.push(m);
    }

    await saveReceivedAggregateRoot(roots, pool);

    const receivedAggregatedRoot = await getAggregateRootByRootAndDomain(mock.domain.A, roots[1].root, "ASC", pool);

    expect(receivedAggregatedRoot).to.deep.eq(roots[1]);
  });

  it("should get getMessageRootStatusFromIndex", async () => {
    const messages: RootMessage[] = [];
    const roots: AggregatedRoot[] = [];
    const totalCount = 100;
    const processedCount = 10;
    const aggregatedCount = 20;
    for (let _i = 0; _i < totalCount; _i++) {
      const rootMessage = mock.entity.rootMessage();
      rootMessage.spokeDomain = mock.domain.A;
      rootMessage.count = _i;
      rootMessage.processed = _i < processedCount;
      messages.push(rootMessage);

      const m = mock.entity.aggregatedRoot();
      m.index = _i;
      m.domain = mock.domain.A;
      m.receivedRoot = _i < aggregatedCount ? rootMessage.root : getRandomBytes32();
      roots.push(m);
    }

    await saveSentRootMessages(messages, pool);
    await saveAggregatedRoots(roots, pool);

    const messageStatus = await getMessageRootStatusFromIndex(mock.domain.A, 0, pool);

    expect(messageStatus).to.deep.eq({
      aggregatedCount: aggregatedCount,
      lastAggregatedRoot: roots[aggregatedCount - 1].id,
      processedCount: processedCount,
      unprocessedCount: totalCount - processedCount,
    });
  });

  it("should save assets", async () => {
    const assets = [mock.entity.asset(), mock.entity.asset(), mock.entity.asset()];
    await saveAssets(assets, pool);
    let queryRes = await pool.query("SELECT * FROM assets");
    assets.forEach((asset) => {
      expect(queryRes.rows).to.deep.include({
        local: asset.localAsset,
        adopted: asset.adoptedAsset,
        domain: asset.domain,
        key: asset.key,
        id: asset.id,
        decimal: asset.decimal,
        canonical_id: asset.canonicalId,
        canonical_domain: asset.canonicalDomain,
      });
    });
  });

  it("should get assets", async () => {
    const assets = [
      mock.entity.asset({
        domain: mock.domain.A,
      }),
      mock.entity.asset({
        domain: mock.domain.B,
      }),
    ];
    await saveAssets(assets, pool);
    let res = await getAssets(10, 0, pool);
    assets.forEach((asset) => {
      expect(res).to.deep.include({
        ...asset,
        decimal: +asset.decimal,
        blockNumber: undefined,
      });
    });
  });

  it("should save asset prices", async () => {
    const assetPrices = [mock.entity.assetPrice(), mock.entity.assetPrice(), mock.entity.assetPrice()];
    await saveAssetPrice(assetPrices, pool);
    let queryRes = await pool.query("SELECT * FROM asset_prices");

    assetPrices.forEach((assetPrice) => {
      expect(queryRes.rows).to.containSubset([
        {
          canonical_id: assetPrice.canonicalId,
          canonical_domain: assetPrice.canonicalDomain,
          timestamp: assetPrice.timestamp,
          price: String(assetPrice.price),
        },
      ]);
    });
  });

  it("should get pending transfers by message status", async () => {
    const originDomain = "1337";
    const transfers: XTransfer[] = [
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.XCalled }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.XCalled }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.XCalled }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.SpokeRootSent }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.SpokeRootSent }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.AggregateRootPropagated }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.Processed }),
      mock.entity.xtransfer({ originDomain, messageStatus: XTransferMessageStatus.Processed }),
    ];
    await saveTransfers(transfers, pool);
    let pendingTransfers = await getPendingTransfersByMessageStatus(originDomain, 0, 100, "ASC", pool);
    expect(pendingTransfers.length).to.be.eq(6);
  });

  it("should get pending transfers by domains", async () => {
    const originDomain = "1337";
    const destinationDomain = "1338";
    const xTransfer0: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.XCalled,
    });
    const xTransfer1: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.Executed,
    });
    const xTransfer2: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.Reconciled,
    });
    const xTransfer3: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.CompletedFast,
    });
    const xTransfer4: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.CompletedSlow,
    });

    await saveTransfers([xTransfer0, xTransfer1, xTransfer2, xTransfer3, xTransfer4], pool);
    const transfers = await getPendingTransfersByDomains(originDomain, destinationDomain, 100, 0, "ASC", pool);
    expect(transfers.length).to.be.eq(3);
    expect(transfers).includes(xTransfer0.transferId);
    expect(transfers).includes(xTransfer1.transferId);
    expect(transfers).includes(xTransfer2.transferId);
  });

  it("should update execution simulation data", async () => {
    const originDomain = "1337";
    const destinationDomain = "1338";
    const xTransfer: XTransfer = mock.entity.xtransfer({
      transferId: getRandomBytes32(),
      originDomain,
      destinationDomain,
      status: XTransferStatus.XCalled,
    });
    await updateExecuteSimulationData(xTransfer.transferId, "0x", "0x", "0x", "0x", pool);
  });

  it("should save stable swap pool", async () => {
    const pools = [mock.entity.stableSwapPool(), mock.entity.stableSwapPool()];
    await saveStableSwapPool(pools, pool);
    let queryRes = await pool.query("SELECT * FROM stableswap_pools");

    pools.forEach((swapPool) => {
      expect(queryRes.rows).to.deep.include({
        key: swapPool.key,
        domain: swapPool.domain,
        is_active: swapPool.isActive,
        lp_token: swapPool.lpToken,
        initial_a: swapPool.initialA,
        future_a: swapPool.futureA,
        initial_a_time: swapPool.initialATime,
        future_a_time: swapPool.futureATime,
        swap_fee: swapPool.swapFee,
        admin_fee: swapPool.adminFee,
        pooled_tokens: swapPool.pooledTokens,
        token_precision_multipliers: swapPool.tokenPrecisionMultipliers,
        pool_token_decimals: swapPool.poolTokenDecimals,
        balances: swapPool.balances,
        virtual_price: swapPool.virtualPrice,
        invariant: swapPool.invariant,
        lp_token_supply: swapPool.lpTokenSupply,
      });
    });
  });

  it("should save stable swap pool events", async () => {
    const poolEvents = [mock.entity.stableswapPoolEvent(), mock.entity.stableswapPoolEvent()];
    await saveStableSwapPoolEvent(poolEvents, pool);
    let queryRes = await pool.query("SELECT * FROM stableswap_pool_events");

    poolEvents.forEach((event) => {
      expect(queryRes.rows).to.deep.include({
        id: event.id,
        domain: event.domain,
        pool_id: event.poolId,
        provider: event.provider,
        action: event.action,
        pooled_tokens: event.pooledTokens,
        pool_token_decimals: event.poolTokenDecimals,
        token_amounts: event.tokenAmounts,
        balances: event.balances,
        lp_token_amount: String(event.lpTokenAmount),
        lp_token_supply: String(event.lpTokenSupply),
        fees: event.fees,
        block_number: event.blockNumber,
        transaction_hash: event.transactionHash,
        timestamp: event.timestamp,
        nonce: String(event.nonce),
      });
    });
  });

  it("should save stable swap lp transfers", async () => {
    const transfers = [mock.entity.stableSwapLpTransfer(), mock.entity.stableSwapLpTransfer()];
    await saveStableSwapTransfers(transfers, pool);
    let queryRes = await pool.query("SELECT * FROM stableswap_lp_transfers");

    transfers.forEach((event) => {
      expect(queryRes.rows).to.deep.include({
        id: event.id,
        pool_id: event.poolId,
        domain: event.domain,
        lp_token: event.lpToken,
        from_address: event.fromAddress,
        to_address: event.toAddress,
        pooled_tokens: event.pooledTokens,
        amount: String(event.amount),
        balances: event.balances,
        block_number: event.blockNumber,
        transaction_hash: event.transactionHash,
        timestamp: event.timestamp,
        nonce: String(event.nonce),
      });
    });
  });

  it("should save stable swap lp balances", async () => {
    const balances = [mock.entity.stableSwapLpBalance(), mock.entity.stableSwapLpBalance()];
    await saveStableSwapLpBalances(balances, pool);
    let queryRes = await pool.query("SELECT * FROM stableswap_lp_balances");

    balances.forEach((event) => {
      expect(queryRes.rows).to.deep.include({
        pool_id: event.poolId,
        domain: event.domain,
        lp_token: event.lpToken,
        provider: event.provider,
        balance: String(event.balance),
        last_timestamp: event.lastTimestamp,
      });
    });
  });

  it("should save stable swap exchange", async () => {
    const balances = [mock.entity.stableSwapExchange(), mock.entity.stableSwapExchange()];
    await saveStableSwapExchange(balances, pool);
    let queryRes = await pool.query("SELECT * FROM stableswap_exchanges");

    balances.forEach((event) => {
      const expected = {
        id: event.id,
        pool_id: event.poolId,
        domain: event.domain,
        buyer: event.buyer,
        bought_id: event.boughtId,
        sold_id: event.soldId,
        tokens_sold: event.tokensSold.toString(),
        tokens_bought: event.tokensBought.toString(),
        block_number: event.blockNumber,
        transaction_hash: event.transactionHash,
        timestamp: event.timestamp,
        balances: event.balances,
        fee: event.fee.toString(),
        nonce: event.nonce.toString(),
      };
      expect(queryRes.rows).to.deep.include(expected);
    });
  });

  it("should save and get snapshot roots", async () => {
    const roots: SnapshotRoot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.snapshotRoot();
      m.id = `${_i}`;
      roots.push(m);
    }
    await saveSnapshotRoots(roots, pool);

    const dbRoots = await getPendingSnapshots(pool);
    expect(dbRoots[0].id).to.eq(roots[batchSize - 1].id);
    expect(dbRoots.length).to.eq(roots.length);
  });

  it("should save and get snapshots", async () => {
    const snapshots: Snapshot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.snapshot();
      m.id = `${_i}`;
      snapshots.push(m);
    }
    await saveProposedSnapshots(snapshots, pool);

    const dbSnapshot = await getCurrentProposedSnapshot(pool);
    expect(dbSnapshot).to.not.eq(undefined);
    expect(dbSnapshot!.id).to.eq(snapshots[batchSize - 1].id);
  });

  it("should save and get single snapshot", async () => {
    const snapshots: Snapshot[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.snapshot();
      m.id = `${_i}`;
      snapshots.push(m);
    }
    await saveProposedSnapshots(snapshots, pool);

    const dbSnapshot = await getPendingAggregateRoot(snapshots[0].aggregateRoot, pool);
    expect(dbSnapshot!.id).to.eq(snapshots[0].id);
    const missingDbSnapshot = await getPendingAggregateRoot("", pool);
    expect(missingDbSnapshot).to.eq(undefined);
  });

  it("should save and get Propagated snapshots", async () => {
    const snapshots: Snapshot[] = [];
    const propagatedRoots: OptimisticRootPropagated[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.optimisticRootPropagated();
      m.id = `${_i}`;
      m.aggregateRoot = `${_i}`;
      propagatedRoots.push(m);
      const s = mock.entity.snapshot();
      s.id = `${_i}`;
      s.aggregateRoot = `${_i}`;
      snapshots.push(s);
    }
    await saveProposedSnapshots(snapshots, pool);
    let queryRes = await pool.query("SELECT * FROM snapshots where status = 'Propagated'");
    expect(queryRes.rows.length).to.eq(0);
    await savePropagatedOptimisticRoots(propagatedRoots, pool);
    queryRes = await pool.query("SELECT * FROM snapshots where status = 'Propagated'");
    expect(queryRes.rows.length).to.eq(propagatedRoots.length);
  });

  it("should save and get Finalized snapshots", async () => {
    const snapshots: Snapshot[] = [];
    const finalizedRoots: OptimisticRootFinalized[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.optimisticRootFinalized();
      m.id = `${_i}`;
      m.aggregateRoot = `${_i}`;
      finalizedRoots.push(m);
      const s = mock.entity.snapshot();
      s.id = `${_i}`;
      s.aggregateRoot = `${_i}`;
      snapshots.push(s);
    }
    await saveProposedSnapshots(snapshots, pool);
    let queryRes = await pool.query("SELECT * FROM snapshots where status = 'Finalized'");
    expect(queryRes.rows.length).to.eq(0);
    await saveFinalizedRoots(finalizedRoots, pool);
    queryRes = await pool.query("SELECT * FROM snapshots where status = 'Finalized'");
    expect(queryRes.rows.length).to.eq(finalizedRoots.length);
  });

  it("should save and get RouterDailyTVL", async () => {
    const tvls: RouterDailyTVL[] = [];
    for (let _i = 0; _i < batchSize; _i++) {
      const m = mock.entity.routerDailyTVL();
      m.id = `${_i}`;
      tvls.push(m);
    }
    await saveRouterDailyTVL(tvls, pool);
    let queryRes = await pool.query("SELECT * FROM daily_router_tvl");
    expect(queryRes.rows.length).to.eq(tvls.length);
  });

  // it.only("should update slippage", async () => {
  //   const originDomain = mock.domain.A;
  //   const destinationDomain = mock.domain.B;
  //   const xTransfer1: XTransfer = mock.entity.xtransfer({
  //     transferId: getRandomBytes32(),
  //     originDomain,
  //     destinationDomain,
  //     status: XTransferStatus.Executed,
  //   });
  //   const xTransfer2: XTransfer = mock.entity.xtransfer({
  //     transferId: getRandomBytes32(),
  //     originDomain,
  //     destinationDomain,
  //     status: XTransferStatus.Reconciled,
  //   });
  //   await saveTransfers([xTransfer1, xTransfer2], pool);
  //   const slippageUpdates = [
  //     mock.entity.slippageUpdate({ transferId: xTransfer1.transferId }),
  //     mock.entity.slippageUpdate({ transferId: xTransfer2.transferId }),
  //   ];
  //   await updateSlippage(slippageUpdates, pool);
  //   const query = `SELECT * FROM transfers where transfer_id in ('${slippageUpdates[0].transferId}','${slippageUpdates[1].transferId}')`;
  //   console.log(query);
  //   let queryRes = await pool.query(query);
  //   console.log(queryRes.rowCount);
  //   const updatedSlippage = [queryRes.rows.map(row) => row.transfer_id]

  //   slippageUpdates.forEach((event) => {
  //     queryRes.rows.forEach((row) => {});
  //     expect(queryRes.rows).to.include({
  //       transfer_id: event.transferId,
  //       updated_slippage: event.slippage,
  //     });
  //   });
  // });
});
