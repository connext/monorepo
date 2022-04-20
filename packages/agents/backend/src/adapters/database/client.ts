import { XTransfer } from "@connext/nxtp-utils";
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
    idx: BigNumber.from(transfer.idx).toNumber(),
    router: transfer.router || undefined,
    status: transfer.status,

    xcall: transfer.xcall_block_number
      ? {
          blockNumber: transfer.xcall_block_number,
          caller: transfer.xcall_caller!,
          gasLimit: BigNumber.from(BigInt(transfer.xcall_gas_limit!)).toString(),
          gasPrice: BigNumber.from(BigInt(transfer.xcall_gas_price!)).toString(),
          localAmount: BigNumber.from(BigInt(transfer.xcall_local_amount!)).toString(),
          localAsset: transfer.xcall_local_asset!,
          timestamp: transfer.xcall_timestamp!,
          transactionHash: transfer.xcall_transaction_hash!,
          transferringAmount: BigNumber.from(BigInt(transfer.xcall_transferring_amount!)).toString(),
          transferringAsset: transfer.xcall_transferring_asset!,
        }
      : undefined,

    execute: transfer.execute_block_number
      ? {
          blockNumber: transfer.execute_block_number,
          caller: transfer.execute_caller!,
          gasLimit: BigNumber.from(transfer.execute_gas_limit!).toString(),
          gasPrice: BigNumber.from(transfer.execute_gas_price!).toString(),
          localAmount: BigNumber.from(transfer.execute_local_amount!).toString(),
          localAsset: transfer.execute_local_asset!,
          timestamp: transfer.execute_timestamp!,
          transactionHash: transfer.execute_transaction_hash!,
          transferringAmount: BigNumber.from(transfer.execute_transferring_amount!).toString(),
          transferringAsset: transfer.execute_transferring_asset!,
        }
      : undefined,

    reconcile: transfer.reconcile_block_number
      ? {
          blockNumber: transfer.reconcile_block_number,
          caller: transfer.reconcile_caller!,
          gasLimit: BigNumber.from(transfer.reconcile_gas_limit!).toString(),
          gasPrice: BigNumber.from(transfer.reconcile_gas_price!).toString(),
          localAmount: BigNumber.from(transfer.reconcile_local_amount!).toString(),
          localAsset: transfer.reconcile_local_asset!,
          timestamp: transfer.reconcile_timestamp!,
          transactionHash: transfer.reconcile_transaction_hash!,
          transferringAmount: BigNumber.from(transfer.reconcile_transferring_amount!).toString(),
          transferringAsset: transfer.reconcile_transferring_asset!,
        }
      : undefined,
  };
};

export const saveTransfers = async (xtransfers: XTransfer[], _pool?: Pool): Promise<s.transfers.Insertable[]> => {
  const poolToUse = _pool ?? pool;
  const transfers: s.transfers.Insertable[] = xtransfers.map(convertToDbTransfer);

  return await db.upsert("transfers", transfers, "transfer_id").run(poolToUse);
};

export const getTransferByTransferId = async (transferId: string, _pool?: Pool): Promise<XTransfer | undefined> => {
  const poolToUse = _pool ?? pool;

  const x = await db.selectOne("transfers", { transfer_id: transferId }).run(poolToUse);
  return x ? convertFromDbTransfer(x) : undefined;
};
