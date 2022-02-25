import { CrossChainTx } from "@connext/nxtp-utils";

export const crossChainTx = (subgEntity: any): CrossChainTx => {
  return {
    // Meta
    originDomain: subgEntity.originDomain,
    destinationDomain: subgEntity.destinationDomain,
    status: subgEntity.status,

    // Transfer Data
    nonce: subgEntity.nonce,
    transactionId: subgEntity.transactionId,
    recipient: subgEntity.recipient,
    router: subgEntity.router,

    // Prepared
    prepareCaller: subgEntity.prepareCaller,
    prepareTransactingAmount: subgEntity.prepareTransactingAmount,
    prepareLocalAmount: subgEntity.prepareLocalAmount,
    prepareTransactingAsset: subgEntity.prepareTransactingAsset,
    prepareLocalAsset: subgEntity.prepareLocalAsset,
    callTo: subgEntity.callTo,
    callData: subgEntity.callData,

    // TransactionPrepared
    prepareTransactionHash: subgEntity.prepareTransactionHash,
    prepareTimestamp: subgEntity.prepareTimestamp,
    prepareGasPrice: subgEntity.prepareGasPrice,
    prepareGasLimit: subgEntity.prepareGasLimit,
    prepareBlockNumber: subgEntity.prepareBlockNumber,

    // Fulfill
    fulfillCaller: subgEntity.fulfillCaller,
    fulfillTransactingAmount: subgEntity.fulfillTransactingAmount,
    fulfillLocalAmount: subgEntity.fulfillLocalAmount,
    fulfillTransactingAsset: subgEntity.fulfillTransactingAsset,
    fulfillLocalAsset: subgEntity.fulfillLocalAsset,

    // TransactionFulfilled
    fulfillTransactionHash: subgEntity.fulfillTransactionHash,
    fulfillTimestamp: subgEntity.fulfillTimestamp,
    fulfillGasPrice: subgEntity.fulfillGasPrice,
    fulfillGasLimit: subgEntity.fulfillGasLimit,
    fulfillBlockNumber: subgEntity.fulfillBlockNumber,

    // Reconciled
    externalCallHash: subgEntity.externalCallHash,
    reconciledTransactionHash: subgEntity.reconciledTransactionHash,
    reconciledTimestamp: subgEntity.reconciledTimestamp,
    reconciledGasPrice: subgEntity.reconciledGasPrice,
    reconciledGasLimit: subgEntity.reconciledGasLimit,
    reconciledBlockNumber: subgEntity.reconciledBlockNumber,
  };
};