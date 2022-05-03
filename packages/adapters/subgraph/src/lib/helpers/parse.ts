import { XTransfer } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { getHelpers } from ".";
import { getContext } from "../../reader";

// Used for sanity checking: must have these fields to be identified as a Transfer entity.
export const TRANSFER_ENTITY_REQUIREMENTS = [
  "transferId",
  "nonce",
  "to",
  "callData",
  "originDomain",
  "destinationDomain",
];

export const transferEntitySanityCheck = (entity: any) => {
  if (!entity) {
    throw new Error("Subgraph entity parser: Transfer entity is `undefined`.");
  }
  for (const field of TRANSFER_ENTITY_REQUIREMENTS) {
    if (!entity[field]) {
      throw new Error(`Subgraph entity parser: Transfer entity missing required field: ${field}`);
    }
  }
};

export const originTransfer = (entity: any): XTransfer => {
  transferEntitySanityCheck(entity);
  return {
    // Meta Data
    idx: entity.idx ? entity.idx : undefined,
    transferId: entity.transferId,
    nonce: BigNumber.from(entity.nonce ?? "0").toNumber(),

    // Call Params
    to: entity.to,
    callData: entity.callData,

    // Origin Info
    origin: {
      domain: entity.originDomain,

      // Assets
      assets: {
        transactingAsset: entity.transactingAsset,
        transactingAmount: entity.transactingAmount,
        bridgedAsset: entity.bridgedAsset,
        bridgedAmount: entity.bridgedAmount,
      },

      // XCall
      xcall: {
        // Event Data
        relayerFee: entity.relayerFee,
        // Transaction Data
        caller: entity.xcalledCaller,
        transactionHash: entity.xcalledTransactionHash,
        timestamp: BigNumber.from(entity.xcalledTimestamp ?? "0").toNumber(),
        gasPrice: entity.xcalledGasPrice,
        gasLimit: entity.xcalledGasLimit,
        blockNumber: BigNumber.from(entity.xcalledBlockNumber ?? "0").toNumber(),
      },
    },

    // Destination Info
    destination: {
      domain: entity.destinationDomain,

      status: undefined,
      assets: undefined,
      execute: undefined,
      reconcile: undefined,
    },
  };
};

export const destinationTransfer = (entity: any): XTransfer => {
  return {
    // Meta Data
    idx: entity.idx ? entity.idx : undefined,
    transferId: entity.transferId,
    nonce: BigNumber.from(entity.nonce ?? "0").toNumber(),

    // Call Params
    to: entity.to,
    callData: entity.callData,

    // Origin Info
    origin: {
      domain: entity.originDomain,

      assets: undefined,
      xcall: undefined,
    },

    // Destination Info
    destination: {
      domain: entity.destinationDomain,

      // Status (Executed | Reconciled | Completed)
      status: entity.status,

      // Assets
      assets: {
        transactingAmount: entity.transactingAmount,
        transactingAsset: entity.transactingAsset,
        localAmount: entity.localAmount,
        localAsset: entity.localAsset,
      },

      // Execute
      execute: entity.executedTransactionHash
        ? {
            // Event Data
            routers: entity.routers,
            originSender: entity.originSender,
            // Transaction Data
            caller: entity.executedCaller,
            transactionHash: entity.executedTransactionHash,
            timestamp: BigNumber.from(entity.executedTimestamp ?? "0").toNumber(),
            gasPrice: entity.executedGasPrice,
            gasLimit: entity.executedGasLimit,
            blockNumber: BigNumber.from(entity.executedBlockNumber ?? "0").toNumber(),
          }
        : undefined,

      // Reconcile
      reconcile: entity.reconciledTransactionHash
        ? {
            // Transaction Data
            caller: entity.reconciledCaller,
            transactionHash: entity.reconciledTransactionHash,
            timestamp: BigNumber.from(entity.reconciledTimestamp ?? "0").toNumber(),
            gasPrice: entity.reconciledGasPrice,
            gasLimit: entity.reconciledGasLimit,
            blockNumber: BigNumber.from(entity.reconciledBlockNumber ?? "0").toNumber(),
          }
        : undefined,
    },
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
