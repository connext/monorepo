import { CrossChainTx } from "@connext/nxtp-utils";

export const crossChainTx = (subgEntity: any): CrossChainTx => {
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

    // XCalled
    xcalledCaller: subgEntity.xcalledCaller,
    xcalledTransferringAmount: subgEntity.xcalledTransferringAmount,
    xcalledLocalAmount: subgEntity.xcalledLocalAmount,
    xcalledTransferringAsset: subgEntity.xcalledTransferringAsset,
    xcalledLocalAsset: subgEntity.xcalledLocalAsset,

    // XCalled
    xcalledTransactionHash: subgEntity.xcalledTransactionHash,
    xcalledTimestamp: subgEntity.xcalledTimestamp,
    xcalledGasPrice: subgEntity.xcalledGasPrice,
    xcalledGasLimit: subgEntity.xcalledGasLimit,
    xcalledBlockNumber: subgEntity.xcalledBlockNumber,

    // Fulfill
    executedCaller: subgEntity.executedCaller,
    executedTransferringAmount: subgEntity.executedTransferringAmount,
    executedLocalAmount: subgEntity.executedLocalAmount,
    executedTransferringAsset: subgEntity.executedTransferringAsset,
    executedLocalAsset: subgEntity.executedLocalAsset,

    // TransactionFulfilled
    executedTransactionHash: subgEntity.executedTransactionHash,
    executedTimestamp: subgEntity.executedTimestamp,
    executedGasPrice: subgEntity.executedGasPrice,
    executedGasLimit: subgEntity.executedGasLimit,
    executedBlockNumber: subgEntity.executedBlockNumber,
  };
};
