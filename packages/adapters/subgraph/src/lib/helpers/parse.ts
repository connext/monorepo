import { XTransfer } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { getHelpers } from ".";
import { getContext } from "../../reader";

export const xtransfer = (subgEntity: any): XTransfer => {
  return {
    // Meta
    originDomain: subgEntity.originDomain,
    destinationDomain: subgEntity.destinationDomain,
    status: subgEntity.status,
    // Transfer Data
    to: subgEntity.to,
    transferId: subgEntity.transferId,
    callData: subgEntity.callData,
    idx: subgEntity.idx ? subgEntity.idx : undefined,
    nonce: BigNumber.from(subgEntity.nonce ?? "0").toNumber(),
    routers:
      subgEntity.routers && subgEntity.routers.length > 0
        ? subgEntity.routers.map((router: any) => router.id)
        : undefined,
    relayerFee: subgEntity.relayerFee,

    // XCall
    xcall: subgEntity.xcalledTransactionHash
      ? {
          caller: subgEntity.xcalledCaller,
          transferringAmount: subgEntity.xcalledTransactingAmount,
          localAmount: subgEntity.xcalledLocalAmount,
          transferringAsset: subgEntity.xcalledTransactingAsset,
          localAsset: subgEntity.xcalledLocalAsset,
          transactionHash: subgEntity.xcalledTransactionHash,
          timestamp: BigNumber.from(subgEntity.xcalledTimestamp ?? "0").toNumber(),
          gasPrice: subgEntity.xcalledGasPrice,
          gasLimit: subgEntity.xcalledGasLimit,
          blockNumber: BigNumber.from(subgEntity.xcalledBlockNumber ?? "0").toNumber(),
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
          timestamp: BigNumber.from(subgEntity.executedTimestamp ?? "0").toNumber(),
          gasPrice: subgEntity.executedGasPrice,
          gasLimit: subgEntity.executedGasLimit,
          blockNumber: BigNumber.from(subgEntity.executedBlockNumber ?? "0").toNumber(),
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
          timestamp: BigNumber.from(subgEntity.reconciledTimestamp ?? "0").toNumber(),
          gasPrice: subgEntity.reconciledGasPrice,
          gasLimit: subgEntity.reconciledGasLimit,
          blockNumber: BigNumber.from(subgEntity.reconciledBlockNumber ?? "0").toNumber(),
        }
      : undefined,
  };
};

/**
 * Parses the response of crosschain query
 *
 * @param subgEntity The object you're going to parse
 * @returns domain => XTranfers mapping
 */
export const xtransfers = (subgEntity: any): Map<string, XTransfer[]> => {
  throw Error(`Not implemented yet`);
};

/**
 * Parses raw response of crosschain query request and group by domain
 * @param response The raw response from endpoints
 */
export const xquery = (response: any): Map<string, any[]> => {
  const { config } = getContext();
  const { getDomainByPrefix } = getHelpers();
  const result: Map<string, any[]> = new Map();
  if (response.data) {
    const entityRes = response.data;
    for (const key of Object.keys(entityRes)) {
      const prefix = key.split("_")[0].toLowerCase();
      const domain = getDomainByPrefix(prefix);
      if (domain) {
        const value = entityRes[key];
        if (result.has(domain)) {
          result.get(domain)!.push(value);
        } else {
          result.set(domain, [value]);
        }
      }
    }

    return result;
  } else {
    throw new Error(`Parsing subgraph response failed!`);
  }
};
