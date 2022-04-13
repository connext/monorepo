import { XTransfer } from "@connext/nxtp-utils";

export const xtransfer = (subgEntity: any): XTransfer => {
  return {
    // Meta
    originDomain: subgEntity.originDomain,
    destinationDomain: subgEntity.destinationDomain,
    status: subgEntity.status,

    // Transfer Data
    to: subgEntity.to,
    transferId: subgEntity.transferId,
    callTo: subgEntity.callTo,
    callData: subgEntity.callData,
    idx: subgEntity.idx,
    nonce: subgEntity.nonce,
    router: subgEntity.router,

    // XCall
    xcall: subgEntity.xcalledTransactionHash
      ? {
          caller: subgEntity.xcalledCaller,
          transferringAmount: subgEntity.xcalledTransactingAmount,
          localAmount: subgEntity.xcalledLocalAmount,
          transferringAsset: subgEntity.xcalledTransactingAsset,
          localAsset: subgEntity.xcalledLocalAsset,
          transactionHash: subgEntity.xcalledTransactionHash,
          timestamp: subgEntity.xcalledTimestamp,
          gasPrice: subgEntity.xcalledGasPrice,
          gasLimit: subgEntity.xcalledGasLimit,
          blockNumber: subgEntity.xcalledBlockNumber,
        }
      : undefined,

    execute: subgEntity.executedTransactionHash
      ? {
          caller: subgEntity.executedCaller,
          transferringAmount: subgEntity.executedTransactingAmount,
          localAmount: subgEntity.executedLocalAmount,
          transferringAsset: subgEntity.executedTransactingAsset,
          localAsset: subgEntity.executedLocalAsset,
          transactionHash: subgEntity.executedTransactionHash,
          timestamp: subgEntity.executedTimestamp,
          gasPrice: subgEntity.executedGasPrice,
          gasLimit: subgEntity.executedGasLimit,
          blockNumber: subgEntity.executedBlockNumber,
        }
      : undefined,

    reconcile: subgEntity.reconciledTransactionHash
      ? {
          caller: subgEntity.reconciledCaller,
          transferringAmount: subgEntity.reconciledTransactingAmount,
          localAmount: subgEntity.reconciledLocalAmount,
          transferringAsset: subgEntity.reconciledTransactingAsset,
          localAsset: subgEntity.reconciledLocalAsset,
          transactionHash: subgEntity.reconciledTransactionHash,
          timestamp: subgEntity.reconciledTimestamp,
          gasPrice: subgEntity.reconciledGasPrice,
          gasLimit: subgEntity.reconciledGasLimit,
          blockNumber: subgEntity.reconciledBlockNumber,
        }
      : undefined,
  };
};
