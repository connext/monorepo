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
  RootManagerMode,
  SpokeConnectorMode,
  OptimisticRootFinalized,
  OptimisticRootPropagated,
  SnapshotRoot,
  ReceivedAggregateRoot,
  StableSwapPool,
  StableSwapExchange,
  RelayerFeesIncrease,
  SlippageUpdate,
  StableSwapPoolEvent,
  StableSwapTransfer,
  PoolActionType,
  RouterDailyTVL,
  isValidBytes32,
  Snapshot,
  SpokeOptimisticRoot,
  RouterLiquidityEvent,
  RouterLiquidityEventType,
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
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `OriginTransfer` entity parser: Transfer entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  // get the decimals
  // FIXME: https://github.com/connext/nxtp/issues/2862
  const transactingAsset = entity.transactingAsset ?? constants.AddressZero;
  const originDecimals = getDecimals(asset, transactingAsset as string);

  const relayerFees: Record<string, string> = {};
  if (entity.relayerFees) {
    for (const relayerFee of entity.relayerFees) {
      relayerFees[relayerFee.asset] = relayerFee.fee;
    }
  } else {
    // TODO: Remove after all routers support multiple relayer fee assets
    // INFO: https://github.com/connext/monorepo/issues/3811
    // Handle entity from previous subgraph for backwards compatibility
    relayerFees[constants.AddressZero] = entity?.relayerFee ?? "0";
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
      normalizedIn: entity.normalizedIn,
      nonce: BigNumber.from(entity.nonce).toNumber(),
      canonicalId: entity.canonicalId,
    },

    // Origin Info
    origin: {
      chain: entity.chainId,

      // Event Data
      messageHash: entity.messageHash,

      relayerFees: relayerFees,

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
    if (entity[field] === undefined || entity[field] === null) {
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
            txNonce: BigNumber.from(entity.executedTxNonce ?? "0").toNumber(),
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
            txNonce: BigNumber.from(entity.reconciledTxNonce ?? "0").toNumber(),
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
    if (entity[field] === undefined || entity[field] === null) {
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
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `RootMessage` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }
  const [idRoot, ...idRest] = entity.id.split("-");
  return {
    id: isValidBytes32(idRoot) ? entity.id : [`0x${idRoot.slice(-64)}`].concat(idRest as string[]).join("-"),
    spokeDomain: entity.spokeDomain,
    hubDomain: entity.hubDomain,
    // root will be final 32 if not 32 bytes
    root: isValidBytes32(entity.root) ? entity.root : `0x${entity.root.slice(-64)}`,
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
    if (entity[field] === undefined || entity[field] === null) {
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
    if (entity[field] === undefined || entity[field] === null) {
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

export const proposedRoot = (entity: any): Snapshot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `proposedRoot` entity parser: proposedRoot, entity is `undefined`.");
  }
  for (const field of [
    "id",
    "disputeCliff",
    "aggregateRoot",
    "snapshotsRoots",
    "domains",
    "baseAggregateRoot",
    "timestamp",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `proposedRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    endOfDispute: entity.disputeCliff,
    aggregateRoot: entity.aggregateRoot,
    roots: entity.snapshotsRoots,
    domains: entity.domains,
    baseAggregateRoot: entity.baseAggregateRoot,
    proposedTimestamp: entity.timestamp,
  };
};
export const proposedSpokeOptimisticRoot = (entity: any): SpokeOptimisticRoot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `SpokeOptimisticRoot` entity parser: SpokeOptimisticRoot, entity is `undefined`.");
  }
  for (const field of ["id", "aggregateRoot", "rootTimestamp", "endOfDispute", "domain", "timestamp"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `SpokeOptimisticRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    aggregateRoot: entity.aggregateRoot,
    rootTimestamp: entity.rootTimestamp,
    endOfDispute: entity.endOfDispute,
    domain: entity.domain,
    proposeTimestamp: entity.timestamp,
  };
};
export const snapshotRoot = (entity: any): SnapshotRoot => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `snapshotRoot` entity parser: snapshotRoot, entity is `undefined`.");
  }
  for (const field of ["id", "spokeDomain", "root", "count", "timestamp", "blockNumber"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `snapshotRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    spokeDomain: entity.spokeDomain,
    root: entity.root,
    count: entity.count,
    timestamp: entity.timestamp,
    blockNumber: entity.blockNumber,
  };
};

export const finalizedRoot = (entity: any): OptimisticRootFinalized => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `finalizedRoot` entity parser: finalizedRoot, entity is `undefined`.");
  }
  for (const field of ["id", "aggregateRoot", "timestamp"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `finalizedRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    aggregateRoot: entity.aggregateRoot,
    timestamp: entity.timestamp,
  };
};

export const propagatedOptimisticRoot = (entity: any): OptimisticRootPropagated => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError(
      "Subgraph `propagatedOptimisticRoot` entity parser: propagatedOptimisticRoot, entity is `undefined`.",
    );
  }
  for (const field of ["id", "aggregateRoot", "domainsHash", "timestamp"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `propagatedOptimisticRoot` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    aggregateRoot: entity.aggregateRoot,
    domainsHash: entity.domainsHash,
    timestamp: entity.timestamp,
  };
};

export const connectorMeta = (entity: any): ConnectorMeta => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `ConnectorMeta` entity parser: ConnectorMeta, entity is `undefined`.");
  }
  for (const field of ["id", "spokeDomain", "hubDomain", "rootManager", "mirrorConnector", "amb"]) {
    if (entity[field] === undefined || entity[field] === null) {
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
    if (entity[field] === undefined || entity[field] === null) {
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

export const rootManagerMode = (entity: any): RootManagerMode => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `RootManagerMode` entity parser: RootManagerMode, entity is `undefined`.");
  }
  for (const field of ["id", "mode"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `RootManagerMode` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    mode: entity.mode,
  };
};

export const spokeConnectorMode = (entity: any): SpokeConnectorMode => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `SpokeConnectorMode` entity parser: SpokeConnectorMode, entity is `undefined`.");
  }
  for (const field of ["id", "mode"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `SpokeConnectorMode` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    mode: entity.mode,
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
    if (entity[field] === undefined || entity[field] === null) {
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

export const stableSwapPool = (entity: any): StableSwapPool => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `StableSwapPool` entity parser: StableSwapPool, entity is `undefined`.");
  }

  for (const field of [
    "key",
    "domain",
    "isActive",
    "lpToken",
    "balances",
    "pooledTokens",
    "tokenPrecisionMultipliers",
    "swapFee",
    "adminFee",
    "virtualPrice",
    "invariant",
    "lpTokenSupply",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `StableSwapPool` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    key: entity.key,
    domain: entity.domain,
    isActive: entity.isActive,
    lpToken: entity.lpToken,
    initialA: BigNumber.from(entity.initialA ?? "0").toNumber(),
    futureA: BigNumber.from(entity.futureA ?? "0").toNumber(),
    initialATime: BigNumber.from(entity.initialATime ?? "0").toNumber(),
    futureATime: BigNumber.from(entity.futureATime ?? "0").toNumber(),
    swapFee: entity.swapFee,
    adminFee: entity.adminFee,
    pooledTokens: entity.pooledTokens,
    tokenPrecisionMultipliers: entity.tokenPrecisionMultipliers,
    poolTokenDecimals: entity.tokenPrecisionMultipliers.map((m: string) => 18 - m.length + 1),
    balances: entity.balances,
    virtualPrice: entity.virtualPrice,
    invariant: entity.invariant,
    lpTokenSupply: entity.lpTokenSupply,
  };
};

export const stableSwapExchange = (entity: any): StableSwapExchange => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `stableSwapExchange` entity parser: stableSwapExchange, entity is `undefined`.");
  }

  for (const field of [
    "id",
    "domain",
    "buyer",
    "boughtId",
    "soldId",
    "tokensSold",
    "tokensBought",
    "balances",
    "fee",
    "block",
    "transaction",
    "timestamp",
    "nonce",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `stableSwapExchange` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  const boughtId = BigNumber.from(entity.boughtId).toNumber();
  const soldId = BigNumber.from(entity.soldId).toNumber();
  const tokenDecimals: number[] = entity.stableSwap.tokenPrecisionMultipliers.map((m: string) => 18 - (m.length - 1));

  const tokensSold = +utils.formatUnits(String(entity.tokensSold), tokenDecimals[soldId]);
  const tokensBought = +utils.formatUnits(String(entity.tokensBought), tokenDecimals[boughtId]);
  const balances = entity.balances.map((a: string, index: number) => +utils.formatUnits(a, tokenDecimals[index]));
  const fee = +utils.formatUnits(String(entity.fee), tokenDecimals[boughtId]);

  return {
    id: entity.id,
    domain: entity.domain,
    poolId: entity.stableSwap.key,
    buyer: entity.buyer,
    boughtId,
    soldId,
    tokensSold,
    tokensBought,
    balances,
    fee,
    blockNumber: BigNumber.from(entity.block).toNumber(),
    timestamp: BigNumber.from(entity.timestamp).toNumber(),
    nonce: BigNumber.from(entity.nonce).toNumber(),
    transactionHash: entity.transaction,
  };
};

export const stableSwapPoolEvent = (entity: any): StableSwapPoolEvent => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `stableSwapPoolEvent` entity parser: stableSwapPoolEvent, entity is `undefined`.");
  }

  for (const field of [
    "id",
    "domain",
    "stableSwap",
    "provider",
    "tokenAmounts",
    "balances",
    "lpTokenSupply",
    "lpTokenAmount",
    "block",
    "transaction",
    "timestamp",
    "nonce",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `stableSwapPoolEvent` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  const tokenDecimals: number[] = entity.stableSwap.tokenPrecisionMultipliers.map((m: string) => 18 - (m.length - 1));
  const tokenAmounts = entity.tokenAmounts.map(
    (a: string, index: number) => +utils.formatUnits(a, tokenDecimals[index]),
  );
  const balances = entity.balances.map((a: string, index: number) => +utils.formatUnits(a, tokenDecimals[index]));
  const fees = !entity.fees
    ? new Array(entity.tokenAmounts.length).fill(0)
    : entity.fees.map((a: string, index: number) => +utils.formatUnits(a, tokenDecimals[index]));

  return {
    id: entity.id,
    domain: entity.domain,
    poolId: entity.stableSwap.key,
    provider: entity.provider,
    action: entity.id.includes("add_liquidity") ? PoolActionType.Add : PoolActionType.Remove,
    pooledTokens: entity.stableSwap.pooledTokens,
    poolTokenDecimals: tokenDecimals,
    tokenAmounts,
    balances,
    fees,
    lpTokenSupply: +utils.formatEther(String(entity.lpTokenSupply)),
    lpTokenAmount: +utils.formatEther(String(entity.lpTokenAmount)),
    blockNumber: BigNumber.from(entity.block).toNumber(),
    timestamp: BigNumber.from(entity.timestamp).toNumber(),
    nonce: BigNumber.from(entity.nonce).toNumber(),
    transactionHash: entity.transaction,
  };
};

export const stableSwapLpTransfer = (entity: any): StableSwapTransfer => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `stableSwapLpTransfer` entity parser: stableSwapLpTransfer, entity is `undefined`.");
  }

  for (const field of [
    "id",
    "token",
    "domain",
    "from",
    "to",
    "fromBalance",
    "toBalance",
    "amount",
    "block",
    "transaction",
    "timestamp",
    "nonce",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `stableSwapLpTransfer` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  const balances = [+entity.fromBalance, +entity.toBalance];

  return {
    id: `${entity.domain}-${entity.id}`,
    domain: entity.domain,
    poolId: entity.token.stableSwap.key,
    lpToken: entity.token.address,
    pooledTokens: entity.token.stableSwap.pooledTokens,
    fromAddress: entity.from,
    toAddress: entity.to,
    amount: +entity.amount,
    balances,
    blockNumber: BigNumber.from(entity.block).toNumber(),
    timestamp: BigNumber.from(entity.timestamp).toNumber(),
    nonce: BigNumber.from(entity.nonce).toNumber(),
    transactionHash: entity.transaction,
  };
};

export const relayerFeesIncrease = (entity: any): RelayerFeesIncrease => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `RelayerFeesIncrease` entity parser: RelayerFeesIncrease, entity is `undefined`.");
  }
  for (const field of ["id", "increase"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `RelayerFeesIncrease` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    increase: entity.increase,
    transferId: entity.transfer.id,
    timestamp: entity.timestamp,
    asset: entity.asset,
    domain: entity.domain,
  };
};

export const slippageUpdate = (entity: any): SlippageUpdate => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `SlippageUpdate` entity parser: SlippageUpdate, entity is `undefined`.");
  }
  for (const field of ["id", "slippage"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `SlippageUpdate` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    slippage: entity.slippage,
    transferId: entity.transfer.id,
    timestamp: entity.timestamp,
    domain: entity.domain,
  };
};

export const routerDailyTvl = (entity: any): RouterDailyTVL => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `RouterDailyTVL` entity parser: RouterDailyTVL, entity is `undefined`.");
  }
  for (const field of ["id", "asset", "router", "timestamp", "balance"]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `RouterDailyTVL` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: `${entity.domain}-${entity.id}`,
    asset: entity.asset.id,
    router: entity.router.id,
    domain: entity.domain,
    timestamp: entity.timestamp,
    // TODO: why negative router balances on subgraph?
    balance: BigNumber.from(entity.balance).isNegative() ? "0" : entity.balance,
  };
};

export const routerLiquidityEvent = (entity: any): RouterLiquidityEvent => {
  // Sanity checks.
  if (!entity) {
    throw new NxtpError("Subgraph `routerLiquidityEvent` entity parser: routerLiquidityEvent, entity is `undefined`.");
  }

  for (const field of [
    "id",
    "domain",
    "type",
    "router",
    "asset",
    "amount",
    "balance",
    "blockNumber",
    "transactionHash",
    "timestamp",
    "nonce",
  ]) {
    if (entity[field] === undefined || entity[field] === null) {
      throw new NxtpError("Subgraph `routerLiquidityEvent` entity parser: Message entity missing required field", {
        missingField: field,
        entity,
      });
    }
  }

  return {
    id: entity.id,
    domain: entity.domain,
    event: entity.type as RouterLiquidityEventType,
    asset: entity.asset.id,
    router: entity.router.id,
    amount: +utils.formatUnits(String(entity.amount), +entity.asset.decimal),
    balance: +utils.formatUnits(String(entity.balance), +entity.asset.decimal),
    blockNumber: BigNumber.from(entity.blockNumber).toNumber(),
    timestamp: BigNumber.from(entity.timestamp).toNumber(),
    nonce: BigNumber.from(entity.nonce).toNumber(),
    transactionHash: entity.transactionHash,
  };
};
