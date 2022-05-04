import { XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";
import { Pool } from "pg";
import * as db from "zapatos/db";
import type * as s from "zapatos/schema";

import { pool } from "./index";

const convertToDbTransfer = (transfer: XTransfer): s.transfers.Insertable => {
  return {
    destination_domain: transfer.destinationDomain,
    origin_domain: transfer.originDomain,

    nonce: transfer.nonce,

    to: transfer.xparams?.to,
    call_data: transfer.xparams?.callData,

    idx: BigNumber.from(transfer.idx ?? "0").toNumber(),
    transfer_id: transfer.transferId,

    origin_chain: transfer.origin?.chain,
    origin_transacting_asset: transfer.origin?.assets.transacting.asset,
    origin_transacting_amount: transfer.origin?.assets.transacting.amount as any,
    origin_bridged_asset: transfer.origin?.assets.bridged.asset,
    origin_bridged_amount: transfer.origin?.assets.bridged.amount as any,
    xcall_caller: transfer.origin?.xcall.caller,
    xcall_transaction_hash: transfer.origin?.xcall?.transactionHash,
    xcall_timestamp: transfer.origin?.xcall?.timestamp,
    xcall_gas_price: transfer.origin?.xcall?.gasPrice as any,
    xcall_gas_limit: transfer.origin?.xcall?.gasLimit as any,
    xcall_block_number: transfer.origin?.xcall?.blockNumber,

    destination_chain: transfer.destination?.chain,
    status: transfer.destination?.status ?? "XCalled",
    routers: transfer.destination?.routers,
    destination_transacting_asset: transfer.destination?.assets.transacting?.asset,
    destination_transacting_amount: transfer.destination?.assets.transacting?.amount as any,
    destination_local_asset: transfer.destination?.assets.local?.asset,
    destination_local_amount: transfer.destination?.assets.local?.amount as any,
    execute_caller: transfer.destination?.execute?.caller,
    execute_transaction_hash: transfer.destination?.execute?.transactionHash,
    execute_timestamp: transfer.destination?.execute?.timestamp,
    execute_gas_price: transfer.destination?.execute?.gasPrice as any,
    execute_gas_limit: transfer.destination?.execute?.gasLimit as any,
    execute_block_number: transfer.destination?.execute?.blockNumber,
    execute_origin_sender: transfer.destination?.execute?.originSender,
    reconcile_caller: transfer.destination?.reconcile?.caller,
    reconcile_transaction_hash: transfer.destination?.reconcile?.transactionHash,
    reconcile_timestamp: transfer.destination?.reconcile?.timestamp,
    reconcile_gas_price: transfer.destination?.reconcile?.gasPrice as any,
    reconcile_gas_limit: transfer.destination?.reconcile?.gasLimit as any,
    reconcile_block_number: transfer.destination?.reconcile?.blockNumber,
  };
};

const convertFromDbTransfer = (transfer: s.transfers.JSONSelectable): XTransfer => {
  return {
    originDomain: transfer.origin_domain,
    destinationDomain: transfer.destination_domain || undefined,
    nonce: BigNumber.from(transfer.nonce).toNumber(),
    xparams: {
      to: transfer.to || constants.AddressZero,
      callData: transfer.call_data || "0x",
    },

    idx: BigNumber.from(transfer.idx ?? 0).toString(),
    transferId: transfer.transfer_id,

    origin: transfer.origin_chain
      ? {
          chain: transfer.origin_chain,
          assets: {
            transacting: {
              amount: BigNumber.from(BigInt(transfer.origin_transacting_amount ?? "0")).toString(),
              asset: transfer.origin_transacting_asset!,
            },
            bridged: {
              amount: BigNumber.from(BigInt(transfer.origin_bridged_amount ?? "0")).toString(),
              asset: transfer.origin_bridged_asset!,
            },
          },
          xcall: {
            blockNumber: transfer.xcall_block_number!,
            caller: transfer.xcall_caller!,
            gasLimit: BigNumber.from(BigInt(transfer.xcall_gas_limit ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt(transfer.xcall_gas_price ?? "0")).toString(),
            timestamp: transfer.xcall_timestamp!,
            transactionHash: transfer.xcall_transaction_hash!,
            relayerFee: BigNumber.from(BigInt(transfer.xcall_relayer_fee ?? "0")).toString(),
          },
        }
      : undefined,

    destination: transfer.destination_chain
      ? {
          chain: transfer.destination_chain,
          assets: {
            transacting: {
              amount: BigNumber.from(BigInt(transfer.destination_transacting_amount ?? "0")).toString(),
              asset: transfer.destination_transacting_asset!,
            },
            local: {
              amount: BigNumber.from(BigInt(transfer.destination_local_amount ?? "0")).toString(),
              asset: transfer.destination_local_asset!,
            },
          },
          routers: transfer.routers || [],
          status: transfer.status === "XCalled" ? "Executed" : (transfer.status as XTransferStatus),
          execute: {
            blockNumber: transfer.execute_block_number!,
            caller: transfer.execute_caller!,
            gasLimit: BigNumber.from(BigInt(transfer.execute_gas_limit ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt(transfer.execute_gas_price ?? "0")).toString(),
            timestamp: transfer.execute_timestamp!,
            transactionHash: transfer.execute_transaction_hash!,
          },
          reconcile: {
            blockNumber: transfer.reconcile_block_number!,
            caller: transfer.reconcile_caller!,
            gasLimit: BigNumber.from(BigInt(transfer.reconcile_gas_limit ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt(transfer.reconcile_gas_price ?? "0")).toString(),
            timestamp: transfer.reconcile_timestamp!,
            transactionHash: transfer.reconcile_transaction_hash!,
          },
        }
      : undefined,
  };
};

export const saveTransfers = async (xtransfers: XTransfer[], _pool?: Pool): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const transfers: s.transfers.Insertable[] = xtransfers.map(convertToDbTransfer);

  //TODO: Perfomance implications to be evaluated. Upgrade to batching of configured batch size N.
  for (const oneTransfer of transfers) {
    const transfer = { ...oneTransfer };
    await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`INSERT INTO ${"transfers"} (${db.cols(transfer)})
    VALUES (${db.vals(transfer)}) ON CONFLICT ("transfer_id") DO UPDATE SET (${db.cols(transfer)}) = (${db.vals(
      transfer,
    )}) RETURNING *`.run(poolToUse);
  }
};

export const getTransferByTransferId = async (transfer_id: string, _pool?: Pool): Promise<XTransfer | undefined> => {
  const poolToUse = _pool ?? pool;
  const x = await db.sql<s.transfers.SQL, s.transfers.JSONSelectable[]>`SELECT * FROM ${"transfers"} WHERE ${{
    transfer_id,
  }}`.run(poolToUse);
  return x.length ? convertFromDbTransfer(x[0]) : undefined;
};

export const getTransfersByStatus = async (status: XTransferStatus | "XCalled", _pool?: Pool): Promise<XTransfer[]> => {
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
  }} ORDER BY "nonce" DESC LIMIT 1`.run(poolToUse);
  return transfer[0]?.nonce ?? 0;
};
