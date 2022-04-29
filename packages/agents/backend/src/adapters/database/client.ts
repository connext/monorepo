import { XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { Pool } from "pg";
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";

import { pool } from "./index";

const convertToDbTransfer = (transfer: XTransfer): s.transfers.Insertable => {
  return {
    transfer_id: transfer.transferId,
    destination_domain: transfer.destinationDomain,
    origin_domain: transfer.originDomain,
    nonce: transfer.nonce,
    to: transfer.to,
    call_data: transfer.callData,
    call_to: transfer.callTo,
    idx: transfer.idx,
    router: transfer.router,
    status: transfer.status,

    execute_block_number: transfer.execute?.blockNumber,
    execute_caller: transfer.execute?.caller,
    execute_gas_limit: transfer.execute?.gasLimit as any,
    execute_gas_price: transfer.execute?.gasPrice as any,
    execute_local_amount: transfer.execute?.localAmount as any,
    execute_local_asset: transfer.execute?.localAsset,
    execute_timestamp: transfer.execute?.timestamp,
    execute_transaction_hash: transfer.execute?.transactionHash,
    execute_transferring_amount: transfer.execute?.transferringAmount as any,
    execute_transferring_asset: transfer.execute?.transferringAsset,

    reconcile_block_number: transfer.reconcile?.blockNumber,
    reconcile_caller: transfer.reconcile?.caller,
    reconcile_gas_limit: transfer.reconcile?.gasLimit as any,
    reconcile_gas_price: transfer.reconcile?.gasPrice as any,
    reconcile_local_amount: transfer.reconcile?.localAmount as any,
    reconcile_local_asset: transfer.reconcile?.localAsset,
    reconcile_timestamp: transfer.reconcile?.timestamp,
    reconcile_transaction_hash: transfer.reconcile?.transactionHash,
    reconcile_transferring_amount: transfer.reconcile?.transferringAmount as any,
    reconcile_transferring_asset: transfer.reconcile?.transferringAsset,

    xcall_block_number: transfer.xcall?.blockNumber,
    xcall_caller: transfer.xcall?.caller,
    xcall_gas_limit: transfer.xcall?.gasLimit as any,
    xcall_gas_price: transfer.xcall?.gasPrice as any,
    xcall_local_amount: transfer.xcall?.localAmount as any,
    xcall_local_asset: transfer.xcall?.localAsset,
    xcall_timestamp: transfer.xcall?.timestamp,
    xcall_transaction_hash: transfer.xcall?.transactionHash,
    xcall_transferring_amount: transfer.xcall?.transferringAmount as any,
    xcall_transferring_asset: transfer.xcall?.transferringAsset,
  };
};

const convertFromDbTransfer = (transfer: s.transfers.JSONSelectable): XTransfer => {
  return {
    transferId: transfer.transfer_id,
    destinationDomain: transfer.destination_domain,
    originDomain: transfer.origin_domain,
    nonce: BigNumber.from(transfer.nonce).toNumber(),
    to: transfer.to,
    callData: transfer.call_data || "0x",
    callTo: transfer.call_to,
    idx: BigNumber.from(transfer.idx ?? 0).toNumber(),
    router: transfer.router || undefined,
    status: transfer.status,

    xcall: transfer.xcall_block_number
      ? {
          blockNumber: transfer.xcall_block_number,
          caller: transfer.xcall_caller!,
          gasLimit: BigNumber.from(BigInt(transfer.xcall_gas_limit ?? "0")).toString(),
          gasPrice: BigNumber.from(BigInt(transfer.xcall_gas_price ?? "0")).toString(),
          localAmount: BigNumber.from(BigInt(transfer.xcall_local_amount ?? "0")).toString(),
          localAsset: transfer.xcall_local_asset!,
          timestamp: transfer.xcall_timestamp!,
          transactionHash: transfer.xcall_transaction_hash!,
          transferringAmount: BigNumber.from(BigInt(transfer.xcall_transferring_amount ?? "0")).toString(),
          transferringAsset: transfer.xcall_transferring_asset!,
        }
      : undefined,

    execute: transfer.execute_block_number
      ? {
          blockNumber: transfer.execute_block_number,
          caller: transfer.execute_caller!,
          gasLimit: BigNumber.from(BigInt(transfer.execute_gas_limit ?? "0")).toString(),
          gasPrice: BigNumber.from(BigInt(transfer.execute_gas_price ?? "0")).toString(),
          localAmount: BigNumber.from(BigInt(transfer.execute_local_amount ?? "0")).toString(),
          localAsset: transfer.execute_local_asset!,
          timestamp: transfer.execute_timestamp!,
          transactionHash: transfer.execute_transaction_hash!,
          transferringAmount: BigNumber.from(BigInt(transfer.execute_transferring_amount ?? "0")).toString(),
          transferringAsset: transfer.execute_transferring_asset!,
        }
      : undefined,

    reconcile: transfer.reconcile_block_number
      ? {
          blockNumber: transfer.reconcile_block_number,
          caller: transfer.reconcile_caller!,
          gasLimit: BigNumber.from(BigInt(transfer.reconcile_gas_limit ?? "0")).toString(),
          gasPrice: BigNumber.from(BigInt(transfer.reconcile_gas_price ?? "0")).toString(),
          localAmount: BigNumber.from(BigInt(transfer.reconcile_local_amount ?? "0")).toString(),
          localAsset: transfer.reconcile_local_asset!,
          timestamp: transfer.reconcile_timestamp!,
          transactionHash: transfer.reconcile_transaction_hash!,
          transferringAmount: BigNumber.from(BigInt(transfer.reconcile_transferring_amount ?? "0")).toString(),
          transferringAsset: transfer.reconcile_transferring_asset!,
        }
      : undefined,
  };
};

export const saveTransfers = async (xtransfers: XTransfer[], _pool?: Pool): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const transfers: s.transfers.Insertable[] = xtransfers.map(convertToDbTransfer);

  //TODO: Perfomance implications to be evaluated. Upgrade to batching of configured batch size N.
  for (const oneTransfer of transfers) {
    await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`INSERT INTO ${"transfers"} (${db.cols(oneTransfer)})
    VALUES (${db.vals(oneTransfer)}) ON CONFLICT ("transfer_id") DO UPDATE SET (${db.cols(oneTransfer)}) = (${db.vals(
      oneTransfer,
    )}) RETURNING *`.run(poolToUse);
  }
};

export const getTransferByTransferId = async (transferId: string, _pool?: Pool): Promise<XTransfer | undefined> => {
  const poolToUse = _pool ?? pool;
  const x = await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`SELECT * FROM ${"transfers"} LIMIT 1`.run(
    poolToUse,
  );
  return x ? convertFromDbTransfer(x[0]) : undefined;
};

export const getTransfersByStatus = async (status: XTransferStatus, _pool?: Pool): Promise<XTransfer[]> => {
  const poolToUse = _pool ?? pool;
  const x = await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`SELECT * FROM ${"transfers"} WHERE ${{
    status,
  }}`.run(poolToUse);
  return x.map(convertFromDbTransfer);
};

export const getLatestNonce = async (domain: string, _pool?: Pool): Promise<number> => {
  const poolToUse = _pool ?? pool;
  const transfer = await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`SELECT * FROM ${"transfers"} WHERE ${{
    origin_domain: domain,
  }} ORDER BY "nonce" DESC`.run(poolToUse);
  return transfer[0]?.nonce ?? 0;
};
