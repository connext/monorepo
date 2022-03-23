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
    xcall: {
      caller: subgEntity.caller,
      transferringAmount: subgEntity.transferringAmount,
      localAmount: subgEntity.localAmount,
      transferringAsset: subgEntity.transferringAsset,
      localAsset: subgEntity.localAsset,
      transactionHash: subgEntity.transactionHash,
      timestamp: subgEntity.timestamp,
      gasPrice: subgEntity.gasPrice,
      gasLimit: subgEntity.gasLimit,
      blockNumber: subgEntity.blockNumber,
    },

    execute: {
      caller: subgEntity.caller,
      transferringAmount: subgEntity.transferringAmount,
      localAmount: subgEntity.localAmount,
      transferringAsset: subgEntity.transferringAsset,
      localAsset: subgEntity.localAsset,
      transactionHash: subgEntity.transactionHash,
      timestamp: subgEntity.timestamp,
      gasPrice: subgEntity.gasPrice,
      gasLimit: subgEntity.gasLimit,
      blockNumber: subgEntity.blockNumber,
    },
  };
};
