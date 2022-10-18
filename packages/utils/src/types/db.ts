import { BigNumber, constants } from "ethers";

import { XMessage, RootMessage, AggregatedRoot, PropagatedRoot } from "./amb";
import { AssetBalance, RouterBalance, XTransfer, XTransferStatus } from "./xtransfers";

/**
 * This is required to make sure numbers do not lose precision because of Javascript limitations.
 * All BigNumbers are selected as text into JS.
 */
export const transfersCastForUrl =
  "select=" +
  [
    "transfer_id",
    "nonce",
    "to",
    "call_data",
    "origin_domain",
    "canonical_domain",
    "canonical_id",
    "destination_domain",
    "bridged_amt",
    "normalized_in",
    "origin_sender",
    "origin_chain",
    "origin_transacting_asset",
    "origin_transacting_amount::text",
    "origin_bridged_asset",
    "origin_bridged_amount::text",
    "xcall_caller",
    "xcall_transaction_hash",
    "xcall_timestamp",
    "xcall_gas_price::text",
    "xcall_gas_limit::text",
    "xcall_block_number",
    "destination_chain",
    "status",
    "routers",
    "delegate",
    "slippage",
    "destination_transacting_asset",
    "destination_transacting_amount::text",
    "destination_local_asset",
    "destination_local_amount::text",
    "execute_caller",
    "execute_transaction_hash",
    "execute_timestamp",
    "execute_gas_price::text",
    "execute_gas_limit::text",
    "execute_block_number",
    "execute_origin_sender",
    "reconcile_caller",
    "reconcile_transaction_hash",
    "reconcile_timestamp",
    "reconcile_gas_price::text",
    "reconcile_gas_limit::text",
    "reconcile_block_number",
  ].join(",");

/**
 * Converts a transfer from the cartographer db through either DB queries or Postgrest into the XTransfer type
 * @param transfer - the transfer from the cartographer db as a JSON object
 * @returns an XTransfer object
 */
export const convertFromDbTransfer = (transfer: any): XTransfer => {
  return {
    xparams: {
      originDomain: transfer.origin_domain,
      destinationDomain: transfer.destination_domain,
      canonicalDomain: transfer.canonical_domain,
      to: transfer.to || constants.AddressZero,
      delegate: transfer.delegate || constants.AddressZero,
      receiveLocal: transfer.receive_local || false,
      callData: transfer.call_data || "0x",
      slippage: transfer.slippage == "NaN" ? "0" : transfer.slippage.toString() || "0",
      originSender: transfer.origin_sender,
      bridgedAmt: transfer.bridged_amt.toString(),
      normalizedIn: transfer.normalized_in.toString(),
      nonce: BigNumber.from(transfer.nonce).toNumber(),
      canonicalId: transfer.canonical_id,
    },
    transferId: transfer.transfer_id,
    origin: transfer.origin_chain
      ? {
          chain: transfer.origin_chain,
          messageHash: transfer.message_hash,
          assets: {
            transacting: {
              amount: BigNumber.from(BigInt((transfer.origin_transacting_amount as string) ?? "0")).toString(),
              asset: transfer.origin_transacting_asset!,
            },
            bridged: {
              amount: BigNumber.from(BigInt((transfer.origin_bridged_amount as string) ?? "0")).toString(),
              asset: transfer.origin_bridged_asset!,
            },
          },
          xcall: {
            blockNumber: transfer.xcall_block_number!,
            caller: transfer.xcall_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.xcall_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.xcall_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.xcall_timestamp!,
            transactionHash: transfer.xcall_transaction_hash!,
          },
        }
      : undefined,

    destination: transfer.destination_chain
      ? {
          chain: transfer.destination_chain,
          assets: {
            transacting: {
              amount: BigNumber.from(BigInt((transfer.destination_transacting_amount as string) ?? "0")).toString(),
              asset: transfer.destination_transacting_asset!,
            },
            local: {
              amount: BigNumber.from(BigInt((transfer.destination_local_amount as string) ?? "0")).toString(),
              asset: transfer.destination_local_asset!,
            },
          },
          routers: transfer.routers || [],
          status: transfer.status === "XCalled" ? "Executed" : (transfer.status as XTransferStatus),
          execute: {
            blockNumber: transfer.execute_block_number!,
            caller: transfer.execute_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.execute_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.execute_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.execute_timestamp!,
            transactionHash: transfer.execute_transaction_hash!,
            originSender: transfer.execute_origin_sender!,
          },
          reconcile: {
            blockNumber: transfer.reconcile_block_number!,
            caller: transfer.reconcile_caller!,
            gasLimit: BigNumber.from(BigInt((transfer.reconcile_gas_limit as string) ?? "0")).toString(),
            gasPrice: BigNumber.from(BigInt((transfer.reconcile_gas_price as string) ?? "0")).toString(),
            timestamp: transfer.reconcile_timestamp!,
            transactionHash: transfer.reconcile_transaction_hash!,
          },
        }
      : undefined,
  };
};

/**
 * Converts router balance rows into a RouterBalance array
 * Example rows:
[
  {
    address: '0xa000000000000000000000000000000000000000',
    asset_canonical_id: '0xb000000000000000000000000000000000000000000000000000000000000000',
    asset_domain: '1234',
    router_address: '0xa000000000000000000000000000000000000000',
    balance: 100000000000000000000,
    local: '0xbb00000000000000000000000000000000000000',
    adopted: '0xaa00000000000000000000000000000000000000',
    canonical_id: '0xb000000000000000000000000000000000000000000000000000000000000000',
    canonical_domain: '1111',
    domain: '1234'
  },
  {
    address: '0xa000000000000000000000000000000000000000',
    asset_canonical_id: '0xbb00000000000000000000000000000000000000000000000000000000000000',
    asset_domain: '1234',
    router_address: '0xa000000000000000000000000000000000000000',
    balance: 99000000000000000000,
    local: '0xbb00000000000000000000000000000000000000',
    adopted: '0xaa00000000000000000000000000000000000000',
    canonical_id: '0xbb00000000000000000000000000000000000000000000000000000000000000',
    canonical_domain: '1111',
    domain: '1234'
  },
]
 * @param routerBalanceRows
 */
export const convertToRouterBalance = (routerBalanceRows: any[]): RouterBalance[] => {
  const routerBalances: RouterBalance[] = [];
  routerBalanceRows.forEach((routerBalanceRow) => {
    const assetBalance: AssetBalance = {
      adoptedAsset: routerBalanceRow.adopted,
      balance: BigNumber.from(BigInt(routerBalanceRow.balance as string)).toString(),
      blockNumber: "0",
      canonicalDomain: routerBalanceRow.canonical_domain,
      canonicalId: routerBalanceRow.canonical_id,
      domain: routerBalanceRow.asset_domain,
      id: routerBalanceRow.id,
      localAsset: routerBalanceRow.local,
      key: routerBalanceRow.key,
    };
    const found = routerBalances.find((r) => r.router === routerBalanceRow.router_address);
    if (found) {
      const asset = found.assets.find(
        (a) => a.canonicalId === routerBalanceRow.asset_canonical_id && a.domain === routerBalanceRow.asset_domain,
      );
      if (asset) {
        asset.balance = BigNumber.from(BigInt(routerBalanceRow.balance as string)).toString();
      } else {
        found.assets.push(assetBalance);
      }
    } else {
      routerBalances.push({ router: routerBalanceRow.router_address, assets: [assetBalance] });
    }
  });

  return routerBalances;
};

/**
 * Converts a message from the cartographer db through either DB queries or Postgrest into the XMessage type
 * @param message - the message from the cartographer db as a JSON object
 * @returns an XMessage object
 */
export const convertFromDbMessage = (message: any): XMessage => {
  return {
    leaf: message.leaf,
    originDomain: message.origin_domain,
    destinationDomain: message.destination_domain,
    transferId: message.transferId,
    origin: {
      index: BigNumber.from(message.index).toNumber(),
      root: message.root,
      message: message.message,
    },
    destination: {
      processed: message.processed || false,
      returnData: message.return_data,
    },
  };
};

/**
 * Converts a root message from the cartographer db through either DB queries or Postgrest into the RootMessage type
 * @param message - the message from the cartographer db as a JSON object
 * @returns an RootMessage object
 */
export const convertFromDbRootMessage = (message: any): RootMessage => {
  return {
    id: message.id,
    spokeDomain: message.spoke_domain,
    hubDomain: message.hub_domain,
    root: message.root,
    caller: message.caller,
    transactionHash: message.sent_transaction_hash,
    timestamp: message.sent_timestamp,
    gasPrice: BigNumber.from(message.gas_price).toString(),
    gasLimit: BigNumber.from(message.gas_limit).toString(),
    blockNumber: message.block_number,
    processed: message.processed,
    count: message.leaf_count,
  };
};

/**
 * Converts a aggregated root message from the cartographer db through
 * either DB queries or Postgrest into the AggregatedRoot type
 * @param message - the message from the cartographer db as a JSON object
 * @returns an AggregatedRoot object
 */
export const convertFromDbAggregatedRoot = (message: any): AggregatedRoot => {
  return {
    id: message.id,
    domain: message.domain,
    receivedRoot: message.received_root,
    index: message.domain_index,
  };
};

/**
 * Converts a propagated root message from the cartographer db through
 * either DB queries or Postgrest into the PropagatedRoot type
 * @param message - the message from the cartographer db as a JSON object
 * @returns an PropagatedRoot object
 */
export const convertFromDbPropagatedRoot = (message: any): PropagatedRoot => {
  return {
    id: message.id,
    aggregate: message.aggregate_root,
    domains: message.domains,
    count: message.leaf_count,
  };
};
