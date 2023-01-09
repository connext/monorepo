import {
  NxtpError,
  DestinationTransfer,
  OriginMessage,
  RootMessage,
  AggregatedRoot,
  PropagatedRoot,
  OriginTransfer,
  ConnectorMeta,
  RootManagerMeta,
  ReceivedAggregateRoot,
} from "@connext/nxtp-utils";
import { BigNumber, constants, utils } from "ethers";

import { XQueryResultParseError } from "../errors";
import { AssetId } from "../entities";

import { getHelpers } from ".";

// Used for sanity checking: both OriginTransfer and DestinationTransfer will have these fields defined.
export const SHARED_TRANSFER_ENTITY_REQUIREMENTS = ["transferId"];

// helper to find decimals from key in chaindata record of given domain. defaults to 18 if not found
const getDecimals = (assets: Record<string, AssetId>, assetId: string): number => {
  return (
    assets[assetId]?.decimals ??
    assets[assetId.toLowerCase()]?.decimals ??
    assets[utils.getAddress(assetId)]?.decimals ??
    assets[assetId.toUpperCase()]?.decimals ??
    18
  );
};

export const originTransfer = (entity: any, asset: Record<string, AssetId>): OriginTransfer => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `OriginTransfer` entity parser: Transfer entity is `undefined`.");
  }
  if (entity.executedTransactionHash || entity.reconciledTransactionHash) {
    // Wrong transfer type. This is a destination transfer entity!
    throw new NxtpError("Subgraph `OriginTransfer` entity parser: Transfer entity is a destination transfer entity.");
  }
  for (const field of [
    ...SHARED_TRANSFER_ENTITY_REQUIREMENTS,
    "originDomain",
    "destinationDomain",
    "nonce",
    "to",
    "callData",
  ]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `OriginTransfer` entity parser: Transfer entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  // get the decimals
  // FIXME: https://github.com/connext/nxtp/issues/2862
  const transactingAsset = entity.asset?.adoptedAsset ?? constants.AddressZero;
  const originDecimals = getDecimals(asset, transactingAsset as string);

  return {
    // Meta Data
    transferId: entity.transferId,

    // Call Params
    xparams: {
      originDomain: entity.originDomain,
      destinationDomain: entity.destinationDomain,
      canonicalDomain: entity.canonicalDomain,
      to: entity.to,
      delegate: entity.delegate,
      receiveLocal: entity.receiveLocal,
      callData: entity.callData,
      slippage: entity.slippage,
      originSender: entity.originSender,
      bridgedAmt: entity.bridgedAmt,
      normalizedIn: entity.normalizedIn,
      nonce: BigNumber.from(entity.nonce).toNumber(),
      canonicalId: entity.canonicalId,
    },

    // Origin Info
    origin: {
      chain: entity.chainId,

      // Event Data
      messageHash: entity.messageHash,

      relayerFee: entity.relayerFee,

      // Assets
      // FIXME: https://github.com/connext/nxtp/issues/2862
      assets: {
        transacting: {
          asset: transactingAsset,
          // convert to proper units from 18
          amount:
            originDecimals === 18
              ? entity.normalizedIn // shortcut
              : BigNumber.from(entity.normalizedIn as string)
                  .div(BigNumber.from(10).pow(18 - originDecimals))
                  .toString(),
        },
        bridged: {
          asset: entity.asset?.id ?? constants.AddressZero,
          amount: entity.bridgedAmt,
        },
      },

      // XCall
      xcall: {
        // Transaction Data
        caller: entity.caller,
        transactionHash: entity.transactionHash,
        timestamp: BigNumber.from(entity.timestamp ?? "0").toNumber(),
        gasPrice: entity.gasPrice,
        gasLimit: entity.gasLimit,
        blockNumber: BigNumber.from(entity.blockNumber ?? "0").toNumber(),
        txOrigin: entity.txOrigin,
      },
    },

    // Destination Info
    destination: undefined,
  };
};

export const destinationTransfer = (entity: any): DestinationTransfer => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `DestinationTransfer` entity parser: Transfer entity is `undefined`.");
  }
  if (entity.transactionHash) {
    // Wrong transfer type. This is an origin transfer entity!
    throw new NxtpError("Subgraph `DestinationTransfer` entity parser: Transfer entity is an origin transfer entity.");
  }
  for (const field of [
    ...SHARED_TRANSFER_ENTITY_REQUIREMENTS,
    "destinationDomain",
    "originDomain",
    "status",
    "routers",
  ]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `DestinationTransfer` entity parser: Transfer entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    // Meta Data
    transferId: entity.transferId,

    // Call Params
    xparams: {
      originDomain: entity.originDomain,
      destinationDomain: entity.destinationDomain,
      canonicalDomain: entity.canonicalDomain,
      to: entity.to,
      delegate: entity.delegate,
      receiveLocal: entity.receiveLocal,
      callData: entity.callData,
      slippage: entity.slippage,
      originSender: entity.originSender,
      bridgedAmt: entity.bridgedAmt,
      amount: entity.amount,
      normalizedIn: entity.normalizedIn,
      nonce: entity.nonce ? BigNumber.from(entity.nonce).toNumber() : undefined,
      canonicalId: entity.canonicalId,
    },

    // Origin Info
    origin: undefined,

    // Destination Info
    destination: {
      chain: entity.chainId,

      // Status (Executed | Reconciled | Completed)
      status: entity.status,
      routers: entity.routers.map((router: any) => router.id),

      // Assets
      assets: {
        transacting:
          entity.amount && entity.asset
            ? {
                asset: entity.asset?.adoptedAsset ?? constants.AddressZero,
                amount: entity.amount,
              }
            : undefined,
        local: {
          asset: entity.asset?.id ?? constants.AddressZero,
          amount: entity.bridgedAmt,
        },
      },

      // Execute
      execute: entity.executedTransactionHash
        ? {
            // Event Data
            originSender: entity.originSender,
            // Transaction Data
            caller: entity.executedCaller,
            transactionHash: entity.executedTransactionHash,
            timestamp: BigNumber.from(entity.executedTimestamp ?? "0").toNumber(),
            gasPrice: entity.executedGasPrice,
            gasLimit: entity.executedGasLimit,
            blockNumber: BigNumber.from(entity.executedBlockNumber ?? "0").toNumber(),
            txOrigin: entity.executedTxOrigin,
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
            txOrigin: entity.reconciledTxOrigin,
          }
        : undefined,
    },
  };
};

export const originMessage = (entity: any): OriginMessage => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `OriginMessage` entity parser: OriginMessage entity is `undefined`.");
  }
  for (const field of ["index", "leaf", "root", "domain", "destinationDomain", "transferId", "message"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `OriginMessage` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    domain: entity.domain,
    destinationDomain: entity.destinationDomain,
    transferId: entity.transferId,
    index: entity.index,
    leaf: entity.leaf,
    root: entity.root,
    message: entity.message,
  };
};

/**
 * Parses raw response of crosschain query request and group by domain
 * @param response The raw response from endpoints
 */
export const xquery = (response: any): Map<string, any[]> => {
  const { getDomainFromPrefix } = getHelpers();
  const result: Map<string, any[]> = new Map();
  if (response.data) {
    const entityRes = response.data as Record<string, any[]>;
    for (const key of Object.keys(entityRes)) {
      const prefix = key.split("_")[0].toLowerCase();
      const domain = getDomainFromPrefix(prefix);
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
    throw new XQueryResultParseError({ response });
  }
};

export const rootMessage = (entity: any): RootMessage => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `RootMessage` entity parser: RootMessage, entity is `undefined`.");
  }
  for (const field of ["id", "spokeDomain", "hubDomain", "root", "timestamp", "gasPrice", "gasLimit", "blockNumber"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `RootMessage` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    spokeDomain: entity.spokeDomain,
    hubDomain: entity.hubDomain,
    root: entity.root,
    caller: entity.caller,
    transactionHash: entity.transactionHash,
    timestamp: entity.timestamp,
    gasPrice: entity.gasPrice,
    gasLimit: entity.gasLimit,
    blockNumber: entity.blockNumber,
    processed: entity.processed,
    count: entity.count || undefined,
  };
};

export const aggregatedRoot = (entity: any): AggregatedRoot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `AggregatedRoot` entity parser: AggregatedRoot, entity is `undefined`.");
  }
  for (const field of ["id", "domain", "receivedRoot", "index"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `AggregatedRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    domain: entity.domain,
    receivedRoot: entity.receivedRoot,
    index: entity.index,
  };
};

export const propagatedRoot = (entity: any): PropagatedRoot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `PropagatedRoot` entity parser: PropagatedRoot, entity is `undefined`.");
  }
  for (const field of ["id", "aggregate", "domainsHash", "count"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `PropagatedRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    aggregate: entity.aggregate,
    domainsHash: entity.domainsHash,
    count: entity.count,
  };
};

export const connectorMeta = (entity: any): ConnectorMeta => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `ConnectorMeta` entity parser: ConnectorMeta, entity is `undefined`.");
  }
  for (const field of ["id", "spokeDomain", "hubDomain", "rootManager", "mirrorConnector", "amb"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `ConnectorMeta` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    spokeDomain: entity.spokeDomain,
    hubDomain: entity.hubDomain,
    amb: entity.amb,
    mirrorConnector: entity.mirrorConnector,
    rootManager: entity.rootManager,
  };
};

export const rootManagerMeta = (entity: any): RootManagerMeta => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `RootManagerMeta` entity parser: RootManagerMeta, entity is `undefined`.");
  }
  for (const field of ["id", "connectors", "domains"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `RootManagerMeta` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    connectors: entity.connectors,
    domains: entity.domains,
  };
};

export const receivedAggregateRoot = (entity: any): ReceivedAggregateRoot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError(
      "Subgraph `ReceivedAggregateRoot` entity parser: ReceivedAggregateRoot, entity is `undefined`.",
    );
  }
  for (const field of ["id", "root", "domain", "blockNumber"]) {
    if (!entity[field]) {
      throw new NxtpError("Subgraph `ReceivedAggregateRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    root: entity.root,
    domain: entity.domain,
    blockNumber: entity.blockNumber,
  };
};
