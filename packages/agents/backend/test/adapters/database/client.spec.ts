import { restore, reset } from "sinon";
import { expect, mock, XTransfer } from "@connext/nxtp-utils";
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

  before(async () => {
    xTransfer = mock.entity.xtransfer(mock.chain.A, mock.chain.B, utils.parseEther("1000000").toString());
    pool = new Pool();
    await pool.query(`
      create type transfer_status as enum ('Pending', 'XCalled', 'Executed', 'Reconciled', 'Failed');
      create table transfers (
        -- meta
        transfer_id character(66) primary key,
        origin_domain varchar(255) not null,
        destination_domain varchar(255) not null,
        status transfer_status not null default 'pending',
      
        -- transfer data
        "to" character(42) not null,
        call_to character(42) not null default '0x0000000000000000000000000000000000000000',
        call_data text,
        idx bigint,
        nonce bigint not null,
        router character(42),
      
        -- xcall
        xcall_caller character(42),
        xcall_transferring_amount numeric,
        xcall_local_amount numeric,
        xcall_transferring_asset character(42),
        xcall_local_asset character(42),
        xcall_transaction_hash character(66),
        xcall_timestamp integer,
        xcall_gas_price numeric,
        xcall_gas_limit numeric,
        xcall_block_number integer,
      
        -- execute
        execute_caller character(42),
        execute_transferring_amount numeric,
        execute_local_amount numeric,
        execute_transferring_asset character(42),
        execute_local_asset character(42),
        execute_transaction_hash character(66),
        execute_timestamp integer,
        execute_gas_price numeric,
        execute_gas_limit numeric,
        execute_block_number integer,
      
        -- reconcile
        reconcile_caller character(42),
        reconcile_transferring_amount numeric,
        reconcile_local_amount numeric,
        reconcile_transferring_asset character(42),
        reconcile_local_asset character(42),
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

  it("should save transfers", async () => {
    await saveTransfers([xTransfer], pool);
  });
  it("should get transfer by Id", async () => {
    const transfer = await getTransferByTransferId(xTransfer.transferId, pool);
    expect(transfer.transferId).equal(xTransfer.transferId);
  });
  it("should get transfer by status", async () => {
    const statusTransfers = await getTransfersByStatus(xTransfer.status, pool);
    expect(statusTransfers[0].status).equal(xTransfer.status);
    expect(statusTransfers.length).greaterThan(0);
  });
  it("should get latest nonce", async () => {
    const nonce = await getLatestNonce("1337", pool);
    expect(nonce).equal(1234);
  });
});
