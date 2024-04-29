import {
  XTransfer,
  XTransferStatus,
  RouterBalance,
  convertFromDbTransfer,
  XMessage,
  RootMessage,
  convertFromDbAsset,
  convertFromDbMessage,
  convertFromDbRootMessage,
  convertFromDbAggregatedRoot,
  convertFromDbSnapshotRoot,
  convertFromDbReceivedAggregateRoot,
  convertFromDbRootStatus,
  convertFromDbSnapshot,
  AggregatedRoot,
  PropagatedRoot,
  ReceivedAggregateRoot,
  Snapshot,
  StableSwapPool,
  StableSwapExchange,
  XTransferErrorStatus,
  StableSwapPoolEvent,
  RouterDailyTVL,
  SlippageUpdate,
  XTransferMessageStatus,
  Asset,
  OptimisticRootFinalized,
  SpokeOptimisticRoot,
  OptimisticRootPropagated,
  SnapshotRoot,
  AssetPrice,
  StableSwapTransfer,
  StableSwapLpBalance,
  RootMessageStatus,
  convertFromDbSpokeOptimisticRoot,
  RouterLiquidityEvent,
} from "@connext/nxtp-utils";
import { Pool } from "pg";
import * as db from "zapatos/db";
import { conditions as dc } from "zapatos/db";
import type * as s from "zapatos/schema";
import { BigNumber } from "ethers";

import { pool } from "./index";

const DEFAULT_RECORDS_TO_STORE = 1000;
// Max execution time backoff for a transfer
const maxBackoff = 86400 * 7;

const convertToDbTransfer = (transfer: XTransfer): s.transfers.Insertable => {
  return {
    transfer_id: transfer.transferId,
    message_hash: transfer.origin?.messageHash,

    // xparams: call_params
    origin_domain: transfer.xparams!.originDomain,
    destination_domain: transfer.xparams!.destinationDomain,
    canonical_domain: transfer.xparams?.canonicalDomain,
    to: transfer.xparams?.to,
    delegate: transfer.xparams?.delegate,
    receive_local: transfer.xparams?.receiveLocal,
    call_data: transfer.xparams?.callData,
    slippage: transfer.xparams?.slippage as any,
    origin_sender: transfer.xparams?.originSender,
    bridged_amt: transfer.xparams?.bridgedAmt,
    normalized_in: transfer.xparams?.normalizedIn,
    nonce: transfer.xparams?.nonce,
    canonical_id: transfer.xparams?.canonicalId,
    relayer_fees: transfer.origin?.relayerFees,
    error_status: transfer.origin?.errorStatus,
    message_status: transfer.origin?.messageStatus,
    origin_chain: transfer.origin?.chain,
    origin_transacting_asset: transfer.origin?.assets.transacting.asset,
    origin_transacting_amount: transfer.origin?.assets.transacting.amount,
    origin_bridged_asset: transfer.origin?.assets.bridged.asset,
    origin_bridged_amount: transfer.origin?.assets.bridged.amount,
    xcall_caller: transfer.origin?.xcall.caller,
    xcall_transaction_hash: transfer.origin?.xcall?.transactionHash,
    xcall_timestamp: transfer.origin?.xcall?.timestamp,
    xcall_gas_price: transfer.origin?.xcall?.gasPrice,
    xcall_gas_limit: transfer.origin?.xcall?.gasLimit,
    xcall_block_number: transfer.origin?.xcall?.blockNumber,
    xcall_tx_origin: transfer.origin?.xcall?.txOrigin,

    destination_chain: transfer.destination?.chain,
    status: transfer.destination?.status,
    routers: transfer.destination?.routers,
    destination_transacting_asset: transfer.destination?.assets.transacting?.asset,
    destination_transacting_amount: transfer.destination?.assets.transacting?.amount,
    destination_local_asset: transfer.destination?.assets.local?.asset,
    destination_local_amount: transfer.destination?.assets.local?.amount,

    execute_caller: transfer.destination?.execute?.caller,
    execute_transaction_hash: transfer.destination?.execute?.transactionHash,
    execute_timestamp: transfer.destination?.execute?.timestamp,
    execute_gas_price: transfer.destination?.execute?.gasPrice,
    execute_gas_limit: transfer.destination?.execute?.gasLimit,
    execute_block_number: transfer.destination?.execute?.blockNumber,
    execute_origin_sender: transfer.destination?.execute?.originSender,
    execute_tx_origin: transfer.destination?.execute?.txOrigin,
    execute_tx_nonce: transfer.destination?.execute?.txNonce,

    reconcile_caller: transfer.destination?.reconcile?.caller,
    reconcile_transaction_hash: transfer.destination?.reconcile?.transactionHash,
    reconcile_timestamp: transfer.destination?.reconcile?.timestamp,
    reconcile_gas_price: transfer.destination?.reconcile?.gasPrice,
    reconcile_gas_limit: transfer.destination?.reconcile?.gasLimit,
    reconcile_block_number: transfer.destination?.reconcile?.blockNumber,
    reconcile_tx_origin: transfer.destination?.reconcile?.txOrigin,
    reconcile_tx_nonce: transfer.destination?.reconcile?.txNonce,
  };
};

const convertToDbMessage = (message: XMessage): s.messages.Insertable => {
  return {
    leaf: message.leaf,
    origin_domain: message.originDomain,
    destination_domain: message.destinationDomain,
    index: message.origin?.index,
    root: message.origin?.root,
    message: message.origin?.message,
    transfer_id: message.transferId,
    processed: message.destination?.processed,
    return_data: message.destination?.returnData,
  };
};

const convertToDbRootMessage = (message: RootMessage, type: "sent" | "processed"): s.root_messages.Insertable => {
  return {
    id: message.id,
    spoke_domain: message.spokeDomain,
    hub_domain: message.hubDomain,
    root: message.root,
    caller: message.caller,
    sent_transaction_hash: type === "sent" ? message.transactionHash : undefined,
    processed_transaction_hash: type === "processed" ? message.transactionHash : undefined,
    processed: type === "processed" || message.spokeDomain === message.hubDomain ? true : message.processed,
    sent_timestamp: message.timestamp,
    gas_price: message.gasPrice as any,
    gas_limit: message.gasLimit as any,
    block_number: message.blockNumber,
    leaf_count: message.count,
    sent_task_id: message.sentTaskId,
    sent_timestamp_secs: message.sentTimestamp,
    relayer_type: message.relayerType,
  };
};

const convertToDbAggregatedRoot = (root: AggregatedRoot): s.aggregated_roots.Insertable => {
  return {
    id: root.id,
    domain: root.domain,
    received_root: root.receivedRoot,
    domain_index: root.index,
  };
};

const convertToDbPropagatedRoot = (root: PropagatedRoot): s.propagated_roots.Insertable => {
  return {
    id: root.id,
    aggregate_root: root.aggregate,
    domains_hash: root.domainsHash,
    leaf_count: root.count,
  };
};

const convertToDbSnapshotRoot = (root: SnapshotRoot): s.snapshot_roots.Insertable => {
  return {
    id: root.id,
    root: root.root,
    spoke_domain: root.spokeDomain,
    count: root.count,
    timestamp: root.timestamp,
  };
};

const convertToDbReceivedAggregateRoot = (root: ReceivedAggregateRoot): s.received_aggregate_roots.Insertable => {
  return {
    id: root.id,
    domain: root.domain,
    root: root.root,
    block_number: root.blockNumber,
  };
};

const convertToDbStableSwapPool = (pool: StableSwapPool): s.stableswap_pools.Insertable => {
  return {
    key: pool.key,
    domain: pool.domain,
    is_active: pool.isActive,
    lp_token: pool.lpToken,
    initial_a: pool.initialA,
    future_a: pool.futureA,
    initial_a_time: pool.initialATime,
    future_a_time: pool.futureATime,
    swap_fee: pool.swapFee as any,
    admin_fee: pool.adminFee as any,
    pooled_tokens: pool.pooledTokens,
    token_precision_multipliers: pool.tokenPrecisionMultipliers,
    pool_token_decimals: pool.poolTokenDecimals,
    balances: pool.balances,
    virtual_price: pool.virtualPrice,
    invariant: pool.invariant,
    lp_token_supply: pool.lpTokenSupply,
  };
};

const convertToDbStableSwapExchange = (exchange: StableSwapExchange): s.stableswap_exchanges.Insertable => {
  return {
    id: exchange.id,
    pool_id: exchange.poolId,
    domain: exchange.domain,
    buyer: exchange.buyer,
    bought_id: exchange.boughtId,
    sold_id: exchange.soldId,
    tokens_sold: exchange.tokensSold,
    tokens_bought: exchange.tokensBought,
    balances: exchange.balances,
    fee: exchange.fee,
    block_number: exchange.blockNumber,
    transaction_hash: exchange.transactionHash,
    timestamp: exchange.timestamp,
    nonce: exchange.nonce,
  };
};

const convertToDbStableSwapPoolEvent = (event: StableSwapPoolEvent): s.stableswap_pool_events.Insertable => {
  return {
    id: event.id,
    pool_id: event.poolId,
    domain: event.domain,
    action: event.action,
    provider: event.provider,
    pooled_tokens: event.pooledTokens,
    pool_token_decimals: event.poolTokenDecimals,
    token_amounts: event.tokenAmounts,
    balances: event.balances,
    fees: event.fees,
    lp_token_amount: event.lpTokenAmount,
    lp_token_supply: event.lpTokenSupply,
    block_number: event.blockNumber,
    transaction_hash: event.transactionHash,
    timestamp: event.timestamp,
    nonce: event.nonce,
  };
};

const convertToDbStableSwapTransfer = (event: StableSwapTransfer): s.stableswap_lp_transfers.Insertable => {
  return {
    id: event.id,
    pool_id: event.poolId,
    domain: event.domain,
    lp_token: event.lpToken,
    from_address: event.fromAddress,
    to_address: event.toAddress,
    pooled_tokens: event.pooledTokens,
    amount: event.amount,
    balances: event.balances,
    block_number: event.blockNumber,
    transaction_hash: event.transactionHash,
    timestamp: event.timestamp,
    nonce: event.nonce,
  };
};

const convertToDbStableSwapLpBalance = (event: StableSwapLpBalance): s.stableswap_lp_balances.Insertable => {
  return {
    pool_id: event.poolId,
    domain: event.domain,
    lp_token: event.lpToken,
    provider: event.provider,
    balance: event.balance,
    last_timestamp: event.lastTimestamp,
  };
};

const convertToDbRouterDailyTVL = (tvl: RouterDailyTVL): s.daily_router_tvl.Insertable => {
  return {
    id: tvl.id,
    domain: tvl.domain,
    asset: tvl.asset,
    router: tvl.router,
    day: new Date(tvl.timestamp * 1000),
    balance: tvl.balance,
  };
};

const convertToDbSnapshot = (snapshot: Snapshot): s.snapshots.Insertable => {
  return {
    id: snapshot.id,
    aggregate_root: snapshot.aggregateRoot,
    base_aggregate_root: snapshot.baseAggregateRoot,
    roots: snapshot.roots,
    domains: snapshot.domains,
    end_of_dispute: snapshot.endOfDispute,
    processed: snapshot.processed,
    status: snapshot.status as s.snapshot_status,
    proposed_timestamp: snapshot.proposedTimestamp,
    propagate_timestamp: snapshot.propagateTimestamp,
    propagate_task_id: snapshot.propagateTaskId ?? undefined,
    relayer_type: snapshot.relayerType ?? undefined,
  };
};

const convertToDbSpokeOptimisticRoot = (opRoot: SpokeOptimisticRoot): s.spoke_optimistic_roots.Insertable => {
  return {
    id: opRoot.id,
    root: opRoot.aggregateRoot,
    root_timestamp: opRoot.rootTimestamp,
    end_of_dispute: opRoot.endOfDispute,
    domain: opRoot.domain,
    processed: opRoot.processed,
    status: opRoot.status as s.spoke_root_status,
    propose_timestamp: opRoot.proposeTimestamp,
    propose_task_id: opRoot.proposeTaskId ?? undefined,
    relayer_type: opRoot.relayerType ?? undefined,
  };
};
const convertToDbRouterLiquidityEvent = (event: RouterLiquidityEvent): s.router_liquidity_events.Insertable => {
  return {
    id: event.id,
    domain: event.domain,
    event: event.event as s.event_type,
    asset: event.asset,
    router: event.router,
    amount: event.amount,
    balance: event.balance,
    block_number: event.blockNumber,
    transaction_hash: event.transactionHash,
    timestamp: event.timestamp,
    nonce: event.nonce,
  };
};

const sanitizeNull = (obj: { [s: string]: any }): any => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const saveTransfers = async (
  _xtransfers: XTransfer[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  let start = 0;
  let done = false;
  while (!done) {
    const xtransfers = _xtransfers.slice(start, start + DEFAULT_RECORDS_TO_STORE);
    let transfers: s.transfers.Insertable[] = xtransfers.map(convertToDbTransfer).map(sanitizeNull);
    const dbTransfers = await getTransfersByTransferIds(
      xtransfers.map((xtransfer) => xtransfer.transferId),
      poolToUse,
    );

    transfers = transfers.map((_transfer) => {
      const dbTransfer = dbTransfers.find((dbTransfer) => dbTransfer.transfer_id === _transfer.transfer_id);

      if (dbTransfer !== undefined) {
        // Special handling as boolean fields defualt to false, when upstream subgraph data is null
        _transfer.receive_local = dbTransfer?.receive_local || _transfer.receive_local;
      }

      if (_transfer.status === undefined) {
        _transfer.status = dbTransfer?.status ? dbTransfer.status : XTransferStatus.XCalled;
      } else if (
        _transfer.status == XTransferStatus.Executed ||
        _transfer.status == XTransferStatus.CompletedFast ||
        _transfer.status == XTransferStatus.CompletedSlow
      ) {
        _transfer.error_status = undefined;
      }

      if (!_transfer.message_status) {
        _transfer.message_status = dbTransfer ? dbTransfer.message_status : XTransferMessageStatus.XCalled;
      }

      const transfer: s.transfers.Insertable = { ...dbTransfer, ..._transfer };
      return transfer;
    });

    const uniqueTransfers = transfers.filter((transfer, index) => {
      return transfers.findIndex((it) => it.transfer_id == transfer.transfer_id) === index;
    });

    // TODO: Perfomance implications to be evaluated. Upgrade to batching of configured batch size N.
    await db.upsert("transfers", uniqueTransfers, ["transfer_id"]).run(poolToUse);

    if (xtransfers.length == DEFAULT_RECORDS_TO_STORE) start += DEFAULT_RECORDS_TO_STORE;
    else done = true;
  }
};

export const deleteNonExistTransfers = async (_pool?: Pool | db.TxnClientForRepeatableRead): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  const result = await db.sql`WITH duplicates AS (
        SELECT *,
            ROW_NUMBER() OVER (
              PARTITION BY origin_domain, nonce
              ORDER BY xcall_timestamp desc nulls first) AS row_number
        FROM transfers 
        where nonce IS NOT NULL
      )
      DELETE FROM transfers
      WHERE (transfer_id, origin_domain, nonce) IN (
        SELECT transfer_id, origin_domain, nonce
        FROM duplicates
        WHERE row_number > 1
      )
      RETURNING *;
  `.run(poolToUse);
  return result.map((t) => t.transfer_id);
};

export const saveMessages = async (
  _xMessages: XMessage[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  // The `xMessages` are the ones retrieved only from the origin or destination domain
  const poolToUse = _pool ?? pool;

  let start = 0;
  let done = false;
  while (!done) {
    const xMessages = _xMessages.slice(start, start + DEFAULT_RECORDS_TO_STORE);
    const _messages: s.messages.Insertable[] = xMessages.map(convertToDbMessage).map(sanitizeNull);

    const uniqueMessages = _messages.filter((_message, index) => {
      return (
        _messages.findIndex((it) => it.origin_domain == _message.origin_domain && it.index == _message.index) === index
      );
    });

    await db.upsert("messages", uniqueMessages, ["origin_domain", "index"]).run(poolToUse);
    if (xMessages.length == DEFAULT_RECORDS_TO_STORE) start += DEFAULT_RECORDS_TO_STORE;
    else done = true;
  }
};

export const saveSentRootMessages = async (
  _messages: RootMessage[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const messages: s.root_messages.Insertable[] = _messages
    .map((m) => convertToDbRootMessage(m, "sent"))
    .map(sanitizeNull);

  // use upsert here. if the message exists, we don't want to overwrite anything, just add the sent tx hash
  await db
    .upsert("root_messages", messages, ["id"], {
      updateColumns: ["sent_transaction_hash", "sent_timestamp_secs", "sent_task_id", "relayer_type"],
    })
    .run(poolToUse);
};

export const saveProcessedRootMessages = async (
  _messages: RootMessage[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const messages: s.root_messages.Insertable[] = _messages
    .map((m) => convertToDbRootMessage(m, "processed"))
    .map(sanitizeNull);

  // upsert to set processed tx hash and processed boolean only
  await db
    .upsert("root_messages", messages, ["id"], {
      updateColumns: ["processed_transaction_hash", "processed"],
    })
    .run(poolToUse);

  // update `processed` to true for previous root messages.
  for (const message of _messages) {
    const spoke_domain = message.spokeDomain;

    const latestLeafCountRes = await db
      .selectOne(
        "root_messages",
        {
          spoke_domain,
          processed: true,
          leaf_count: dc.isNotNull,
        },
        { limit: 1, order: { by: "leaf_count", direction: "DESC" } },
      )
      .run(poolToUse);

    const latestProcessedLeafCount = latestLeafCountRes?.leaf_count;
    if (latestProcessedLeafCount) {
      await db
        .update(
          "root_messages",
          { processed: true },
          { processed: false, spoke_domain, leaf_count: dc.lte(latestProcessedLeafCount) },
        )
        .run(poolToUse);
    }
  }
};

export const getRootMessages = async (
  processed: boolean | undefined,
  limit = 100,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessage[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select("root_messages", processed === undefined ? {} : { processed }, {
      limit,
      order: { by: "block_number", direction: orderDirection },
    })
    .run(poolToUse);
  return messages.map(convertFromDbRootMessage);
};

export const getRootMessage = async (
  spoke_domain: string,
  root: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessage | undefined> => {
  const poolToUse = _pool ?? pool;
  const message = await db.select("root_messages", { spoke_domain, root }).run(poolToUse);
  return message.length > 0 ? convertFromDbRootMessage(message[0]) : undefined;
};

export const saveAggregatedRoots = async (
  _roots: AggregatedRoot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const roots: s.aggregated_roots.Insertable[] = _roots.map((r) => convertToDbAggregatedRoot(r)).map(sanitizeNull);

  // If the root exists, we don't want to overwrite anything
  await db.upsert("aggregated_roots", roots, ["domain", "domain_index"], { updateColumns: [] }).run(poolToUse);
};

export const savePropagatedRoots = async (
  _roots: PropagatedRoot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const roots: s.propagated_roots.Insertable[] = _roots.map((r) => convertToDbPropagatedRoot(r)).map(sanitizeNull);

  // use upsert here. if the root exists, we don't want to overwrite anything
  await db.upsert("propagated_roots", roots, ["id"], { updateColumns: [] }).run(poolToUse);
};

export const saveSnapshotRoots = async (
  _roots: SnapshotRoot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const roots: s.snapshot_roots.Insertable[] = _roots.map((r) => convertToDbSnapshotRoot(r)).map(sanitizeNull);

  // use upsert here. if the root exists, we don't want to overwrite anything
  await db.upsert("snapshot_roots", roots, ["spoke_domain", "root"], { updateColumns: [] }).run(poolToUse);
};

export const saveCheckPoint = async (
  check: string,
  point: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const checkpoint = { check_name: check, check_point: point };

  await db.upsert("checkpoints", checkpoint, ["check_name"]).run(poolToUse);
};

export const getCheckPoint = async (
  check_name: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number> => {
  const poolToUse = _pool ?? pool;

  const result = await db.selectOne("checkpoints", { check_name }).run(poolToUse);
  return BigNumber.from(result?.check_point ?? 0).toNumber();
};

export const getTransferByTransferId = async (
  transfer_id: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XTransfer | undefined> => {
  const poolToUse = _pool ?? pool;

  const x = await db.selectOne("transfers", { transfer_id }).run(poolToUse);
  return x ? convertFromDbTransfer(x) : undefined;
};

export const getTransfersByTransferIds = async (
  transfer_ids: string[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<s.transfers.JSONSelectable[]> => {
  const poolToUse = _pool ?? pool;

  const x = await db.select("transfers", { transfer_id: db.conditions.isIn(transfer_ids) }).run(poolToUse);
  return x;
};

export const getTransfersByStatus = async (
  status: XTransferStatus,
  limit: number,
  offset = 0,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XTransfer[]> => {
  const poolToUse = _pool ?? pool;

  const x = await db
    .select(
      "transfers",
      { status },
      { limit, offset, order: { by: "nonce", direction: orderDirection, nulls: "LAST" } },
    )
    .run(poolToUse);
  return x.map(convertFromDbTransfer);
};

export const getTransfersWithOriginPending = async (
  domain: string,
  limit: number,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;

  const transfers = await db
    .select("transfers", db.sql<s.transfers.SQL>`${{ origin_domain: domain }} AND xcall_timestamp IS NULL`, {
      limit,
      order: { by: "update_time", direction: orderDirection },
    })
    .run(poolToUse);

  const transfer_ids = transfers.map((transfer) => transfer.transfer_id);
  return transfer_ids;
};

export const getTransfersWithDestinationPending = async (
  domain: string,
  limit: number,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;

  const transfers = await db
    .select(
      "transfers",
      db.sql<s.transfers.SQL>`
      (${{ destination_domain: domain }} 
      OR "destination_domain" IS NULL)
      AND ("xcall_timestamp" IS NOT NULL AND ("execute_timestamp" IS NULL 
      OR "reconcile_timestamp" IS NULL))
      `,
      { order: { by: "update_time", direction: orderDirection }, limit },
    )
    .run(poolToUse);

  const transfer_ids = transfers.map((transfer) => transfer.transfer_id);
  return transfer_ids;
};

export const getCompletedTransfersByMessageHashes = async (
  message_hashes: string[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XTransfer[]> => {
  const poolToUse = _pool ?? pool;

  const x = await db
    .select("transfers", {
      message_hash: db.conditions.isIn(message_hashes),
      status: db.conditions.isIn([
        XTransferStatus.CompletedFast,
        XTransferStatus.CompletedSlow,
        XTransferStatus.Reconciled,
      ]),
    })
    .run(poolToUse);
  return x.map(convertFromDbTransfer);
};

export const getPendingTransfersByDomains = async (
  origin_domain: string,
  destination_domain: string,
  limit: number,
  offset = 0,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;

  const transfers = await db
    .select(
      "transfers",
      {
        origin_domain,
        destination_domain,
        status: db.conditions.isNotIn(["CompletedFast", "CompletedSlow"]),
        error_status: db.conditions.or(db.conditions.isNull, db.conditions.isIn(["NoBidsReceived"])),
      },
      {
        offset,
        limit,
        order: [
          { by: "update_time", direction: orderDirection },
          { by: "nonce", direction: orderDirection },
        ],
      },
    )
    .run(poolToUse);

  const transfer_ids = transfers.map((transfer) => transfer.transfer_id);
  return transfer_ids;
};

export const saveRouterBalances = async (
  routerBalances: RouterBalance[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const routers: s.routers.Insertable[] = routerBalances.map((router) => {
    return { address: router.router };
  });

  await db.upsert("routers", routers, ["address"], { updateColumns: db.doNothing }).run(poolToUse);

  for (const router of routers) {
    const balances = (routerBalances.find((r) => r.router === router.address) ?? {}).assets ?? [];
    const dbBalances: { balance: s.asset_balances.Insertable; asset: s.assets.Insertable }[] = balances.map((b) => {
      return {
        balance: {
          asset_canonical_id: b.canonicalId,
          asset_domain: b.domain,
          router_address: router.address,
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          balance: b.balance as any,
          locked: b.locked as any,
          supplied: b.supplied as any,
          removed: b.removed as any,
          fees_earned: b.feesEarned as any,
        },
        asset: {
          key: b.key,
          id: b.id,
          decimal: b.decimal as any,
          adopted_decimal: b.adoptedDecimal as any,
          local: b.localAsset,
          adopted: b.adoptedAsset,
          canonical_id: b.canonicalId,
          canonical_domain: b.canonicalDomain,
          domain: b.domain,
        },
      };
    });
    await db
      .upsert(
        "assets",
        dbBalances.map((b) => b.asset),
        ["canonical_id", "domain"],
      )
      .run(poolToUse);

    await db
      .upsert(
        "asset_balances",
        dbBalances.map((b) => b.balance),
        ["asset_canonical_id", "asset_domain", "router_address"],
      )
      .run(poolToUse);
  }
};

export const saveAssets = async (assets: Asset[], _pool?: Pool | db.TxnClientForRepeatableRead): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const dbAssets: s.assets.Insertable[] = assets.map((asset) => {
    return {
      key: asset.key,
      id: asset.id,
      decimal: asset.decimal as any,
      adopted_decimal: asset.adoptedDecimal as any,
      local: asset.localAsset,
      adopted: asset.adoptedAsset,
      canonical_id: asset.canonicalId,
      canonical_domain: asset.canonicalDomain,
      domain: asset.domain,
    };
  });
  await db.upsert("assets", dbAssets, ["canonical_id", "domain"]).run(poolToUse);
};

export const getAssets = async (
  limit = 100,
  offset = 0,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Asset[]> => {
  const poolToUse = _pool ?? pool;
  const assets = await db
    .select(
      "assets",
      { canonical_domain: dc.not(dc.eq("0")) },
      {
        limit,
        offset,
        order: { by: "domain", direction: "ASC" },
      },
    )
    .run(poolToUse);
  return assets.map(convertFromDbAsset);
};

export const saveAssetPrice = async (
  prices: AssetPrice[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const records: s.asset_prices.Insertable[] = prices.map((p) => {
    return {
      canonical_id: p.canonicalId,
      canonical_domain: p.canonicalDomain,
      timestamp: p.timestamp,
      price: p.price,
    };
  });

  await db.upsert("asset_prices", records, ["canonical_domain", "canonical_id", "timestamp"]).run(poolToUse);
};

export const transaction = async (
  callback: (client: db.TxnClientForRepeatableRead) => Promise<void>,
): Promise<void> => {
  db.repeatableRead(pool, async (txnClient) => callback(txnClient));
};

export const getUnProcessedMessages = async (
  origin_domain: string,
  limit = 100,
  offset = 0,
  startIndex = 0,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select(
      "messages",
      { processed: false, origin_domain, index: dc.gte(startIndex) },
      {
        limit,
        offset,
        order: { by: "index", direction: orderDirection },
      },
    )
    .run(poolToUse);
  return messages.map(convertFromDbMessage);
};

export const getUnProcessedMessagesByDomains = async (
  origin_domain: string,
  destination_domain: string,
  limit = 100,
  offset = 0,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select(
      "messages",
      { processed: false, origin_domain, destination_domain },
      {
        limit,
        offset,
        order: { by: "index", direction: orderDirection },
      },
    )
    .run(poolToUse);
  return messages.map(convertFromDbMessage);
};

export const getUnProcessedMessagesByIndex = async (
  origin_domain: string,
  destination_domain: string,
  startIndex: number,
  endIndex: number,
  offset: number,
  limit = 100,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select(
      "messages",
      {
        processed: false,
        origin_domain: origin_domain,
        destination_domain: destination_domain,
        index: dc.and(dc.gte(startIndex), dc.lte(endIndex)),
      },
      { offset, limit, order: { by: "index", direction: orderDirection } },
    )
    .run(poolToUse);
  return messages.map(convertFromDbMessage);
};

export const getMessageByLeaf = async (
  origin_domain: string,
  leaf: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage | undefined> => {
  const poolToUse = _pool ?? pool;
  const message = await db.selectOne("messages", { origin_domain, leaf }).run(poolToUse);

  return message ? convertFromDbMessage(message) : undefined;
};

export const getAggregateRoot = async (
  messageRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  // Get the most recent unprocessed propagated root
  const root = await db
    .selectOne(
      "aggregated_roots",
      { received_root: messageRoot },
      { limit: 1, order: { by: "domain_index", direction: "DESC" } },
    )
    .run(poolToUse);
  if (!root) return undefined;

  // NOTE: id is made up of propagated_root and aggregateRoot index in subgraph ==> id = `${propagated_root}-${index}`
  const aggregateRootId = convertFromDbAggregatedRoot(root).id;
  return aggregateRootId.split("-")[0] ?? undefined;
};

export const getBaseAggregateRootCount = async (
  received_root: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;
  // Get the leaf count at the aggregated root
  const root = await db.selectOne("aggregated_roots", { received_root }).run(poolToUse);
  return root ? convertFromDbAggregatedRoot(root).index : undefined;
};

export const getAggregateRootCount = async (
  aggregateRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;

  const idExp = `${aggregateRoot}%`;

  // Get the leaf count at the aggregated root
  const root = await db
    .selectOne("aggregated_roots", { id: dc.like(idExp) }, { order: { by: "domain_index", direction: "DESC" } })
    .run(poolToUse);
  return root ? convertFromDbAggregatedRoot(root).index + 1 : undefined;
};

export const getAggregateRoots = async (
  count: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  // Get the leaf count at the aggregated root
  const roots = await db
    .select("aggregated_roots", { domain_index: dc.lte(count) }, { order: { by: "domain_index", direction: "ASC" } })
    .run(poolToUse);
  return roots.length > 0 ? roots.map((root) => convertFromDbAggregatedRoot(root).receivedRoot) : [];
};

export const getBaseAggregateRoot = async (
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  const root = await db
    .select("aggregated_roots", {}, { limit: 1, order: { by: "domain_index", direction: "DESC" } })
    .run(poolToUse);
  return root.length > 0 ? convertFromDbAggregatedRoot(root[0]).receivedRoot : undefined;
};

export const getMessageRootIndex = async (
  domain: string,
  messageRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;
  // Find the index emitted from the RootAggregated event
  const root = await db.selectOne("aggregated_roots", { domain: domain, received_root: messageRoot }).run(poolToUse);
  return root ? convertFromDbAggregatedRoot(root).index : undefined;
};

export const getLatestMessageRoot = async (
  spoke_domain: string,
  aggregate_root: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessage | undefined> => {
  const poolToUse = _pool ?? pool;

  type rootAggregatedSQL = s.root_messages.SQL | s.aggregated_roots.SQL;
  type rootAggregatedelectable = s.root_messages.Selectable & { author: s.aggregated_roots.Selectable };
  const idExp = `${aggregate_root}%`;

  const root = await db.sql<
    rootAggregatedSQL,
    rootAggregatedelectable[]
  >`select * from ${"root_messages"} where ${"root"} in (select received_root from aggregated_roots where id <= (select id from aggregated_roots where ${{
    id: dc.like(idExp),
  }} order by id desc limit 1)) and ${{
    spoke_domain,
  }} order by ${"leaf_count"} desc nulls last limit 1`.run(poolToUse);
  return root.length > 0 ? convertFromDbRootMessage(root[0]) : undefined;
};

export const getLatestAggregateRoots = async (
  domain: string,
  limit = 1,
  orderDirection: "ASC" | "DESC" = "DESC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<ReceivedAggregateRoot[]> => {
  const poolToUse = _pool ?? pool;
  const roots = await db
    .select(
      "received_aggregate_roots",
      { domain: domain },
      { limit, order: { by: "block_number", direction: orderDirection } },
    )
    .run(poolToUse);
  return roots.map(convertFromDbReceivedAggregateRoot);
};

export const getSnapshot = async (
  aggregate_root: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Snapshot | undefined> => {
  const poolToUse = _pool ?? pool;

  const snapshot = await db
    .selectOne("snapshots", {
      aggregate_root,
    })
    .run(poolToUse);
  return snapshot ? convertFromDbSnapshot(snapshot) : undefined;
};

export const getFinalizedSnapshot = async (
  aggregate_root: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Snapshot | undefined> => {
  const poolToUse = _pool ?? pool;

  const snapshot = await db
    .selectOne("snapshots", {
      status: dc.or(dc.eq("Propagated"), dc.eq("Finalized")),
      aggregate_root,
    })
    .run(poolToUse);
  return snapshot ? convertFromDbSnapshot(snapshot) : undefined;
};

export const getLatestPendingSnapshotRootByDomain = async (
  spoke_domain: number,
  id: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SnapshotRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const snapshot = await db
    .select(
      "snapshot_roots",
      { processed: false, spoke_domain, id },
      { limit: 1, order: { by: "id", direction: "DESC" } },
    )
    .run(poolToUse);
  return snapshot.length > 0 ? convertFromDbSnapshotRoot(snapshot[0]) : undefined;
};

export const getLatestPendingSpokeOptimisticRootByDomain = async (
  domain: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SpokeOptimisticRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const opRoot = await db
    .select(
      "spoke_optimistic_roots",
      { processed: false, domain },
      { limit: 1, order: { by: "id", direction: "DESC" } },
    )
    .run(poolToUse);
  return opRoot.length > 0 ? convertFromDbSpokeOptimisticRoot(opRoot[0]) : undefined;
};

export const saveProposedSnapshots = async (
  _snapshots: Snapshot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const snapshots: s.snapshots.Insertable[] = _snapshots
    .map((m) => {
      m.status = "Proposed" as s.snapshot_status;
      return convertToDbSnapshot(m);
    })
    .map(sanitizeNull);

  await db.upsert("snapshots", snapshots, ["id"]).run(poolToUse);
};

export const getCurrentProposedSnapshot = async (
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Snapshot | undefined> => {
  const poolToUse = _pool ?? pool;

  const snapshot = await db
    .selectOne("snapshots", { status: "Proposed" }, { limit: 1, order: { by: "id", direction: "DESC" } })
    .run(poolToUse);
  return snapshot ? convertFromDbSnapshot(snapshot) : undefined;
};

export const getCurrentFinalizedSnapshot = async (
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Snapshot | undefined> => {
  const poolToUse = _pool ?? pool;

  const snapshot = await db
    .selectOne("snapshots", { status: "Finalized" }, { limit: 1, order: { by: "id", direction: "DESC" } })
    .run(poolToUse);
  return snapshot ? convertFromDbSnapshot(snapshot) : undefined;
};

export const getLatestSnapshot = async (
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<Snapshot | undefined> => {
  const poolToUse = _pool ?? pool;

  const snapshot = await db
    .selectOne("snapshots", {}, { limit: 1, order: { by: "id", direction: "DESC" } })
    .run(poolToUse);
  return snapshot ? convertFromDbSnapshot(snapshot) : undefined;
};

export const getCurrentProposedOptimisticRoot = async (
  domain: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SpokeOptimisticRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const opRoot = await db
    .selectOne(
      "spoke_optimistic_roots",
      { domain, status: "Proposed" },
      { limit: 1, order: { by: "end_of_dispute", direction: "DESC" } },
    )
    .run(poolToUse);
  return opRoot ? convertFromDbSpokeOptimisticRoot(opRoot) : undefined;
};

export const getLatestFinalizedOptimisticRoot = async (
  domain: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SpokeOptimisticRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const opRoot = await db
    .selectOne(
      "spoke_optimistic_roots",
      { domain, status: "Finalized" },
      { limit: 1, order: { by: "root_timestamp", direction: "DESC" } },
    )
    .run(poolToUse);
  return opRoot ? convertFromDbSpokeOptimisticRoot(opRoot) : undefined;
};

export const getLatestSpokeOptimisticRoot = async (
  domain: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SpokeOptimisticRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const opRoot = await db
    .selectOne(
      "spoke_optimistic_roots",
      { domain },
      { limit: 1, order: { by: "propose_timestamp", direction: "DESC" } },
    )
    .run(poolToUse);
  return opRoot ? convertFromDbSpokeOptimisticRoot(opRoot) : undefined;
};

export const getSpokeOptimisticRoot = async (
  root: string,
  domain: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<SpokeOptimisticRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const opRoot = await db.selectOne("spoke_optimistic_roots", { root, domain }).run(poolToUse);
  return opRoot ? convertFromDbSpokeOptimisticRoot(opRoot) : undefined;
};

export const savePropagatedOptimisticRoots = async (
  roots: OptimisticRootPropagated[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  await Promise.all(
    roots.map(async (root) => {
      await db
        .update(
          "snapshots",
          // The key of both `Propagated` and `Finalized` is aggregateRoot.
          // Ideally, finalized_timestamp shouldn't be null but we don't have a way to stop the same root being proposed.
          // So it makes us hard to pick up the correct entity and update the corresponding timestamp with only aggregateRoot and timestamp.
          // As of now, making the finalized_timestamp undefined cause it's no longer in use once the root propagated.
          { status: "Propagated", propagate_timestamp: root.timestamp, finalized_timestamp: undefined },
          { aggregate_root: root.aggregateRoot, proposed_timestamp: dc.lte(root.timestamp) },
        )
        .run(poolToUse);
    }),
  );
};

export const saveFinalizedRoots = async (
  roots: OptimisticRootFinalized[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  await Promise.all(
    roots.map(async (root) => {
      await db
        .update(
          "snapshots",
          { status: "Finalized", finalized_timestamp: root.timestamp },
          { status: "Proposed", aggregate_root: root.aggregateRoot, proposed_timestamp: dc.lte(root.timestamp) },
        )
        .run(poolToUse);
    }),
  );
};

export const saveProposedSpokeRoots = async (
  _roots: SpokeOptimisticRoot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const roots: s.spoke_optimistic_roots.Insertable[] = _roots
    .map((r) => {
      r.status = "Proposed" as s.spoke_root_status;
      return convertToDbSpokeOptimisticRoot(r);
    })
    .map(sanitizeNull);

  await db.upsert("spoke_optimistic_roots", roots, ["id"]).run(poolToUse);
};

export const saveFinalizedSpokeRoots = async (
  domain: string,
  roots: OptimisticRootFinalized[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  await Promise.all(
    roots.map(async (root) => {
      await db
        .update(
          "spoke_optimistic_roots",
          { status: "Finalized" },
          { domain: domain, root: root.aggregateRoot, propose_timestamp: dc.lte(root.timestamp) },
        )
        .run(poolToUse);
    }),
  );
};

export const getAggregateRootByRootAndDomain = async (
  domain: string,
  aggregatedRoot: string,
  orderDirection: "ASC" | "DESC" = "DESC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<ReceivedAggregateRoot | undefined> => {
  const poolToUse = _pool ?? pool;
  const root = await db
    .selectOne(
      "received_aggregate_roots",
      { domain: domain, root: aggregatedRoot },
      { limit: 1, order: { by: "block_number", direction: orderDirection } },
    )
    .run(poolToUse);
  return root ? convertFromDbReceivedAggregateRoot(root) : undefined;
};

export const getMessageRootAggregatedFromIndex = async (
  spoke_domain: string,
  index: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessage | undefined> => {
  const poolToUse = _pool ?? pool;
  // Find the first published outbound root that contains the index, for a given domain
  const root = await db.sql<
    s.root_messages.SQL,
    s.root_messages.Selectable[]
  >`select * from ${"root_messages"} where ${"root"} in (select received_root from aggregated_roots) and ${{
    spoke_domain,
  }} and ${{ leaf_count: dc.gte(index) }} order by ${"leaf_count"} asc nulls last limit 1`.run(poolToUse);
  return root.length > 0 ? convertFromDbRootMessage(root[0]) : undefined;
};

export const getMessageRootsFromIndex = async (
  spoke_domain: string,
  index: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessage[]> => {
  const poolToUse = _pool ?? pool;
  // Find the first published outbound root that contains the index, for a given domain
  const root = await db.sql<
    s.root_messages.SQL,
    s.root_messages.Selectable[]
  >`select * from ${"root_messages"} where ${{
    spoke_domain,
  }} and ${{ leaf_count: dc.gte(index) }} order by ${"leaf_count"} asc nulls last limit 100`.run(poolToUse);
  return root.length > 0 ? root.map(convertFromDbRootMessage) : [];
};

export const getMessageRootCount = async (
  domain: string,
  messageRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;
  // Find the index of the last message in the published messageRoot.
  // This will be the count at the time messageRoot was sent
  const message = await db.selectOne("messages", { origin_domain: domain, root: messageRoot }).run(poolToUse);
  return message ? convertFromDbMessage(message).origin?.index : undefined;
};

export const getOutboundRootTimestamp = async (
  domain: string,
  messageRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;
  // Find the index of the last message in the published messageRoot.
  // This will be the count at the time messageRoot was sent
  const message = await db.selectOne("messages", { origin_domain: domain, root: messageRoot }).run(poolToUse);
  if (!message) return undefined;

  const transfer = await db
    .selectOne("transfers", { transfer_id: convertFromDbMessage(message).transferId })
    .run(poolToUse);
  return transfer ? convertFromDbTransfer(transfer).origin?.xcall.timestamp : undefined;
};

export const getMessageRootStatusFromIndex = async (
  spoke_domain: string,
  index: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<RootMessageStatus> => {
  const poolToUse = _pool ?? pool;
  // Find the processed, unprocessed count, aggregated root count that contains the index, for a given domain
  const status = await db.sql<s.root_messages.SQL, s.root_messages.Selectable[]>`with cte as (
    select *, aggregated.id as aggregated_id
			from 
				((select * from root_messages where ${{
          spoke_domain,
        }} and ${{ leaf_count: dc.gte(index) }}) as roots 
					left join aggregated_roots as aggregated 
					on roots.root=aggregated.received_root) 
    )
    select
    COUNT(CASE WHEN processed=true THEN 1 END) AS processed_count, 
    COUNT(CASE WHEN processed=false THEN 1 END) AS unprocessed_count, 
    COUNT(CASE WHEN aggregated_id IS not null then 1 END) aggregated_count,
    (
        SELECT aggregated_id
        FROM cte
        ORDER BY domain_index desc nulls last
        LIMIT 1
      ) as last_aggregated_id
    from 
      cte
  `.run(poolToUse);
  return status.length > 0
    ? convertFromDbRootStatus(status[0])
    : {
        processedCount: 0,
        unprocessedCount: 0,
        aggregatedCount: 0,
        lastAggregatedRoot: undefined,
      };
};

export const getMessageByRoot = async (
  domain: string,
  messageRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage | undefined> => {
  const poolToUse = _pool ?? pool;
  const message = await db.selectOne("messages", { origin_domain: domain, root: messageRoot }).run(poolToUse);
  return message ? convertFromDbMessage(message) : undefined;
};

export const getSpokeNode = async (
  domain: string,
  index: number,
  count: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  const message = await db
    .selectOne("messages", { origin_domain: domain, index: dc.and(dc.eq(index), dc.lt(count)) })
    .run(poolToUse);
  return message ? convertFromDbMessage(message).leaf : undefined;
};

export const getSpokeNodes = async (
  domain: string,
  start: number,
  end: number,
  count: number,
  pageSize = 10000,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  let messages: any[] = [];
  let _start = start;
  let _end = end - start > pageSize ? start + pageSize - 1 : end;
  let done = false;
  while (!done) {
    const subMessages = await db
      .select(
        "messages",
        { origin_domain: domain, index: dc.and(dc.gte(_start), dc.lte(_end), dc.lt(count)) },
        { order: { by: "index", direction: "ASC" } },
      )
      .run(poolToUse);
    messages = messages.concat(subMessages);
    if (subMessages.length == pageSize) {
      _start += pageSize;
      _end = end - _start > pageSize ? _start + pageSize - 1 : end;
    } else done = true;
  }
  return messages.map((message) => convertFromDbMessage(message).leaf);
};

export const getHubNode = async (
  index: number,
  count: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  const root = await db
    .selectOne("aggregated_roots", { domain_index: dc.and(dc.eq(index), dc.lt(count)) })
    .run(poolToUse);
  return root ? convertFromDbAggregatedRoot(root).receivedRoot : undefined;
};

export const getHubNodes = async (
  start: number,
  end: number,
  count: number,
  pageSize = 10000,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  let roots: any[] = [];
  let _start = start;
  let _end = end - start > pageSize ? start + pageSize - 1 : end;
  let done = false;
  while (!done) {
    const subRoots = await db
      .select(
        "aggregated_roots",
        { domain_index: dc.and(dc.gte(_start), dc.lte(_end), dc.lt(count)) },
        { order: { by: "domain_index", direction: "ASC" } },
      )
      .run(poolToUse);

    roots = roots.concat(subRoots);
    if (subRoots.length == pageSize) {
      _start += pageSize;
      _end = end - _start > pageSize ? _start + pageSize - 1 : end;
    } else done = true;
  }
  return roots.map((root) => convertFromDbAggregatedRoot(root).receivedRoot);
};

export const getRoot = async (
  domain: string,
  path: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  const root = await db.selectOne("merkle_cache", { domain: domain, domain_path: path }).run(poolToUse);
  return root?.tree_root;
};

export const putRoot = async (
  domain: string,
  path: string,
  hash: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const root = { domain: domain, domain_path: path, tree_root: hash };
  await db.upsert("merkle_cache", root, ["domain", "domain_path"], { updateColumns: [] }).run(poolToUse);
};

export const deleteCache = async (domain: string, _pool?: Pool | db.TxnClientForRepeatableRead): Promise<void> => {
  const poolToUse = _pool ?? pool;
  await db.deletes("merkle_cache", { domain }).run(poolToUse);
};

export const saveReceivedAggregateRoot = async (
  _roots: ReceivedAggregateRoot[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const roots: s.received_aggregate_roots.Insertable[] = _roots
    .map((m) => convertToDbReceivedAggregateRoot(m))
    .map(sanitizeNull);

  await db.upsert("received_aggregate_roots", roots, ["root", "domain"]).run(poolToUse);
};

/**
 * Uses an exponential backoff forumla to increase the backoff time for a transfer execution.
 * @param transferId
 * @param _pool
 * @returns
 */
export const increaseBackoff = async (
  transferId: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const transfer = await db.selectOne("transfers", { transfer_id: transferId }).run(poolToUse);
  if (!transfer) {
    return;
  }
  const backoff = Math.min(transfer.backoff * 2, maxBackoff);
  const next_execution_timestamp = Math.floor(Date.now() / 1000) + backoff;
  await db.update("transfers", { backoff, next_execution_timestamp }, { transfer_id: transferId }).run(poolToUse);
};

export const resetBackoffs = async (
  transferIds: string[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const backoff = 32;
  await db
    .update(
      "transfers",
      { backoff, next_execution_timestamp: 0, error_status: null },
      { transfer_id: dc.isIn(transferIds) },
    )
    .run(poolToUse);
};

export const saveStableSwapPool = async (
  _swapPools: StableSwapPool[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const pools: s.stableswap_pools.Insertable[] = _swapPools.map((m) => convertToDbStableSwapPool(m)).map(sanitizeNull);

  await db.upsert("stableswap_pools", pools, ["key", "domain"]).run(poolToUse);
};

export const saveStableSwapExchange = async (
  _swapExchanges: StableSwapExchange[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const exchanges: s.stableswap_exchanges.Insertable[] = _swapExchanges
    .map((m) => convertToDbStableSwapExchange(m))
    .map(sanitizeNull);

  await db.upsert("stableswap_exchanges", exchanges, ["domain", "id"]).run(poolToUse);
};

export const updateErrorStatus = async (
  transferId: string,
  error: XTransferErrorStatus,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  await db.update("transfers", { error_status: error }, { transfer_id: transferId }).run(poolToUse);
};

export const saveStableSwapPoolEvent = async (
  _poolEvents: StableSwapPoolEvent[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const poolEvents: s.stableswap_pool_events.Insertable[] = _poolEvents
    .map((m) => convertToDbStableSwapPoolEvent(m))
    .map(sanitizeNull);

  await db.upsert("stableswap_pool_events", poolEvents, ["id"]).run(poolToUse);
};

export const saveStableSwapTransfers = async (
  _transfers: StableSwapTransfer[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const transfers: s.stableswap_lp_transfers.Insertable[] = _transfers
    .map((m) => convertToDbStableSwapTransfer(m))
    .map(sanitizeNull);

  await db.upsert("stableswap_lp_transfers", transfers, ["id"]).run(poolToUse);
};

export const saveStableSwapLpBalances = async (
  _balances: StableSwapLpBalance[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const balances: s.stableswap_lp_balances.Insertable[] = _balances
    .map((m) => convertToDbStableSwapLpBalance(m))
    .map(sanitizeNull);

  await db.upsert("stableswap_lp_balances", balances, ["pool_id", "domain", "provider"]).run(poolToUse);
};

export const saveRouterDailyTVL = async (
  _tvls: RouterDailyTVL[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const tvls: s.daily_router_tvl.Insertable[] = _tvls.map((m) => convertToDbRouterDailyTVL(m)).map(sanitizeNull);

  await db.upsert("daily_router_tvl", tvls, ["id"]).run(poolToUse);
};

export const saveRouterLiquidityEvents = async (
  _events: RouterLiquidityEvent[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const events: s.router_liquidity_events.Insertable[] = _events
    .map((m) => convertToDbRouterLiquidityEvent(m))
    .map(sanitizeNull);

  await db.upsert("router_liquidity_events", events, ["id"]).run(poolToUse);
};

export const updateSlippage = async (
  _slippageUpdates: SlippageUpdate[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  // todo can this be done in a single query?
  for (const update of _slippageUpdates) {
    await db
      .update("transfers", { updated_slippage: Number(update.slippage) }, { transfer_id: update.transferId })
      .run(poolToUse);
  }
};

export const markRootMessagesProcessed = async (
  rootMessages: RootMessage[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  const rootMessageIds = rootMessages.map((m) => m.id);
  await db.update("root_messages", { processed: true }, { id: dc.isIn(rootMessageIds) }).run(poolToUse);
};

export const updateExecuteSimulationData = async (
  transferId: string,
  executeSimulationInput: string,
  executeSimulationFrom: string,
  executeSimulationTo: string,
  executeSimulationNetwork: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;

  await db
    .update(
      "transfers",
      {
        execute_simulation_input: executeSimulationInput,
        execute_simulation_from: executeSimulationFrom,
        execute_simulation_to: executeSimulationTo,
        execute_simulation_network: executeSimulationNetwork,
      },
      { transfer_id: transferId },
    )
    .run(poolToUse);
};

export const getPendingTransfersByMessageStatus = async (
  domain: string,
  offset: number,
  limit: number,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XTransfer[]> => {
  const poolToUse = _pool ?? pool;
  const completedMessageStatus = [XTransferMessageStatus.Processed];

  const x = await db
    .select(
      "transfers",
      {
        message_status: db.conditions.or(db.conditions.isNull, db.conditions.isNotIn(completedMessageStatus)),
        origin_domain: domain,
      },
      { limit, offset, order: { by: "nonce", direction: orderDirection, nulls: "LAST" } },
    )
    .run(poolToUse);
  return x.map(convertFromDbTransfer);
};
