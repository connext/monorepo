import { restore, reset } from "sinon";
import { expect, mock, XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { utils } from "ethers";
import pg from "pg";

import {
  getTransferByTransferId,
  getTransfersByStatus,
  getLatestNonce,
  saveTransfers,
} from "../../../src/adapters/database/client";
import { newDb } from "pg-mem";

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
    `);
  });

  afterEach(() => {
    restore();
    reset();
  });
  it("should handle invalid transfer ID", async () => {
    const transfer = await getTransferByTransferId("invalid_transfer_id", pool);
    expect(transfer).equal(undefined);
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
  it("should get transfer by Id", async () => {
    const transfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(transfer.transferId).equal(xTransfer.transferId);
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
});
