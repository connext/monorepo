import { BigNumber, constants } from "ethers";

import { XTransfer, XTransferStatus } from "./xtransfers";

export const convertFromDbTransfer = (transfer: any): XTransfer => {
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
              amount: BigNumber.from(BigInt((transfer.origin_transacting_amount as string) ?? "0")).toString(),
              asset: transfer.origin_transacting_asset!,
            },
            bridged: {
              amount: BigNumber.from(BigInt((transfer.origin_bridged_amount as string) ?? "0")).toString(),
              asset: transfer.origin_bridged_asset!,
            },
          },
          xcall: {
            blockNumber: transfer.xcall_block_number!,
            caller: transfer.xcall_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.xcall_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.xcall_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.xcall_timestamp!,
            transactionHash: transfer.xcall_transaction_hash!,
            relayerFee: BigNumber.from(BigInt((transfer.xcall_relayer_fee as string) ?? "0")).toString(),
          },
        }
      : undefined,

    destination: transfer.destination_chain
      ? {
          chain: transfer.destination_chain,
          assets: {
            transacting: {
              amount: BigNumber.from(BigInt((transfer.destination_transacting_amount as string) ?? "0")).toString(),
              asset: transfer.destination_transacting_asset!,
            },
            local: {
              amount: BigNumber.from(BigInt((transfer.destination_local_amount as string) ?? "0")).toString(),
              asset: transfer.destination_local_asset!,
            },
          },
          routers: transfer.routers || [],
          status: transfer.status === "XCalled" ? "Executed" : (transfer.status as XTransferStatus),
          execute: {
            blockNumber: transfer.execute_block_number!,
            caller: transfer.execute_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.execute_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.execute_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.execute_timestamp!,
            transactionHash: transfer.execute_transaction_hash!,
          },
          reconcile: {
            blockNumber: transfer.reconcile_block_number!,
            caller: transfer.reconcile_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.reconcile_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.reconcile_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.reconcile_timestamp!,
            transactionHash: transfer.reconcile_transaction_hash!,
          },
        }
      : undefined,
  };
};
