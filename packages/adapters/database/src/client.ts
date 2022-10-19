import {
  XTransfer,
  XTransferStatus,
  RouterBalance,
  convertFromDbTransfer,
  XMessage,
  RootMessage,
  convertFromDbMessage,
  convertFromDbRootMessage,
  convertFromDbAggregatedRoot,
  convertFromDbPropagatedRoot,
  AggregatedRoot,
  PropagatedRoot,
} from "@connext/nxtp-utils";
import { Pool } from "pg";
import * as db from "zapatos/db";
import { conditions as dc } from "zapatos/db";
import type * as s from "zapatos/schema";
import { BigNumber } from "ethers";

import { pool } from "./index";

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
    slippage: parseInt(transfer.xparams!.slippage),
    origin_sender: transfer.xparams?.originSender,
    bridged_amt: transfer.xparams?.bridgedAmt as any,
    normalized_in: transfer.xparams?.normalizedIn as any,
    nonce: transfer.xparams?.nonce,
    canonical_id: transfer.xparams?.canonicalId,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion

    origin_chain: transfer.origin?.chain,
    origin_transacting_asset: transfer.origin?.assets.transacting.asset,
    origin_transacting_amount: transfer.origin?.assets.transacting.amount as any,
    origin_bridged_asset: transfer.origin?.assets.bridged.asset,
    origin_bridged_amount: transfer.origin?.assets.bridged.amount as any,
    xcall_caller: transfer.origin?.xcall.caller,
    xcall_transaction_hash: transfer.origin?.xcall?.transactionHash,
    xcall_timestamp: transfer.origin?.xcall?.timestamp,
    xcall_gas_price: transfer.origin?.xcall?.gasPrice as any,
    xcall_gas_limit: transfer.origin?.xcall?.gasLimit as any,
    xcall_block_number: transfer.origin?.xcall?.blockNumber,

    destination_chain: transfer.destination?.chain,
    status: transfer.destination?.status,
    routers: transfer.destination?.routers,
    destination_transacting_asset: transfer.destination?.assets.transacting?.asset,
    destination_transacting_amount: transfer.destination?.assets.transacting?.amount as any,
    destination_local_asset: transfer.destination?.assets.local?.asset,
    destination_local_amount: transfer.destination?.assets.local?.amount as any,

    execute_caller: transfer.destination?.execute?.caller,
    execute_transaction_hash: transfer.destination?.execute?.transactionHash,
    execute_timestamp: transfer.destination?.execute?.timestamp,
    execute_gas_price: transfer.destination?.execute?.gasPrice as any,
    execute_gas_limit: transfer.destination?.execute?.gasLimit as any,
    execute_block_number: transfer.destination?.execute?.blockNumber,
    execute_origin_sender: transfer.destination?.execute?.originSender,

    reconcile_caller: transfer.destination?.reconcile?.caller,
    reconcile_transaction_hash: transfer.destination?.reconcile?.transactionHash,
    reconcile_timestamp: transfer.destination?.reconcile?.timestamp,
    reconcile_gas_price: transfer.destination?.reconcile?.gasPrice as any,
    reconcile_gas_limit: transfer.destination?.reconcile?.gasLimit as any,
    reconcile_block_number: transfer.destination?.reconcile?.blockNumber,
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
    domains: root.domains,
    leaf_count: root.count,
  };
};

const sanitizeNull = (obj: { [s: string]: any }): any => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};

export const saveTransfers = async (
  xtransfers: XTransfer[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  const poolToUse = _pool ?? pool;
  let transfers: s.transfers.Insertable[] = xtransfers.map(convertToDbTransfer).map(sanitizeNull);

  const dbTransfers = await getTransfersByTransferIds(
    xtransfers.map((xtransfer) => xtransfer.transferId),
    poolToUse,
  );

  transfers = transfers.map((_transfer) => {
    const dbTransfer = dbTransfers.find((dbTransfer) => dbTransfer.transfer_id === _transfer.transfer_id);
    if (_transfer.status === undefined) {
      _transfer.status = dbTransfer?.status ? dbTransfer.status : XTransferStatus.XCalled;
    }

    const transfer: any = { ...dbTransfer, ..._transfer };
    return transfer;
  });

  // TODO: Perfomance implications to be evaluated. Upgrade to batching of configured batch size N.
  await db.upsert("transfers", transfers, ["transfer_id"]).run(poolToUse);
};

export const saveMessages = async (
  xMessages: XMessage[],
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<void> => {
  // The `xMessages` are the ones retrieved only from the origin or destination domain
  const poolToUse = _pool ?? pool;
  const messages: s.messages.Insertable[] = xMessages.map(convertToDbMessage).map(sanitizeNull);

  await db.upsert("messages", messages, ["leaf"]).run(poolToUse);
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
  await db.upsert("root_messages", messages, ["id"], { updateColumns: ["sent_transaction_hash"] }).run(poolToUse);
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
        },
        asset: {
          key: b.key,
          id: b.id,
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

export const transaction = async (
  callback: (client: db.TxnClientForRepeatableRead) => Promise<void>,
): Promise<void> => {
  db.repeatableRead(pool, async (txnClient) => callback(txnClient));
};

export const getUnProcessedMessages = async (
  limit = 100,
  orderDirection: "ASC" | "DESC" = "ASC",
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<XMessage[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select("messages", { processed: false }, { limit, order: { by: "index", direction: orderDirection } })
    .run(poolToUse);
  return messages.map(convertFromDbMessage);
};

export const getAggregateRoot = async (
  messageRootIndex: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  // Get the most recent unprocessed propagated root
  const root = await db
    .selectOne(
      "propagated_roots",
      { leaf_count: dc.gte(messageRootIndex) },
      { limit: 1, order: { by: "leaf_count", direction: "ASC" } },
    )
    .run(poolToUse);
  return root ? convertFromDbPropagatedRoot(root).aggregate : undefined;
};

export const getAggregateRootCount = async (
  aggreateRoot: string,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<number | undefined> => {
  const poolToUse = _pool ?? pool;
  // Get the leaf count at the aggregated root
  const root = await db.selectOne("propagated_roots", { aggregate_root: aggreateRoot }).run(poolToUse);
  return root ? convertFromDbPropagatedRoot(root).count : undefined;
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

export const getMessageRootFromIndex = async (
  domain: string,
  index: number,
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string | undefined> => {
  const poolToUse = _pool ?? pool;
  // Find the first published outbound root that contains the index, for a given domain
  const dbRoot = await db
    .selectOne(
      "root_messages",
      { spoke_domain: domain, leaf_count: dc.gte(index) },
      { limit: 1, order: { by: "leaf_count", direction: "ASC" } },
    )
    .run(poolToUse);
  return dbRoot ? convertFromDbRootMessage(dbRoot).root : undefined;
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
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  const messages = await db
    .select(
      "messages",
      { origin_domain: domain, index: dc.and(dc.gte(start), dc.lte(end), dc.lt(count)) },
      { order: { by: "index", direction: "ASC" } },
    )
    .run(poolToUse);
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
  _pool?: Pool | db.TxnClientForRepeatableRead,
): Promise<string[]> => {
  const poolToUse = _pool ?? pool;
  const roots = await db
    .select(
      "aggregated_roots",
      { domain_index: dc.and(dc.gte(start), dc.lte(end), dc.lt(count)) },
      { order: { by: "domain_index", direction: "ASC" } },
    )
    .run(poolToUse);
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
