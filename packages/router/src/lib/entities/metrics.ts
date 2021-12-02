import { Counter, Gauge } from "prom-client";
import { collectOnchainLiquidity, collectExpressiveLiquidity } from "../helpers/metrics";

//////////////////////////
///// Types
export const TransactionReasons = {
  PrepareReceiver: "PrepareReceiver",
  FulfillSender: "FulfillSender",
  CancelSender: "CancelSender",
  CancelReceiver: "CancelReceiver",
  Relay: "Relay",
} as const;

export type TransactionReason = typeof TransactionReasons[keyof typeof TransactionReasons];

//////////////////////////
///// High Level Metrics

// Track the current onchain liquidity, will be set periodically based on
// what the subgraph values said. Subgraph querying logic is in the
// `collectCurrentLiquidity` helper function. NOTE: this is the available
// liquidity and does *not* include anything in the transfers
export const onchainLiquidity = new Gauge({
  name: "router_onchain_liquidity",
  help: "router_onchain_liquidity_help",
  labelNames: ["chainId", "assetId"] as const,
  async collect() {
    const liquidity = await collectOnchainLiquidity();
    Object.entries(liquidity).map(([chainId, values]) => {
      values.map(({ assetId, balance }) => {
        this.set({ chainId, assetId }, balance);
      });
    });
  },
});

// TODO: sender or receiver volume?
// Track volume from receiver side (before fees). Incremented by the
// exit liquidity provided by router on transfer completion via the
// `incrementTotalTransferredVolume` function
export const totalTransferredVolume = new Counter({
  name: "router_transfer_volume",
  help: "router_transfer_volume_help",
  labelNames: ["assetId", "chainId", "amount"] as const,
});

//////////////////////////
///// Auctions

// Incremented whenever an auction message is received
export const receivedAuction = new Counter({
  name: "router_auction_received",
  help: "router_auction_received_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

// Incremented when an auction response is sent
export const attemptedAuction = new Counter({
  name: "router_auction_attempt",
  help: "router_auction_attempt_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

// Incremented when receiver transaction first handled (either prepared or cancelled)
export const successfulAuction = new Counter({
  name: "router_auction_successful",
  help: "router_auction_successful_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

//////////////////////////
///// Transfers

// Incremented when a transaction is successfully prepared
// and router funds are locked
export const attemptedTransfer = new Counter({
  name: "router_transfer_attempt",
  help: "router_transfer_attempt_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

// Track completed transfers. Incremented when a router unlocks
// sender-side funds
export const completedTransfer = new Counter({
  name: "router_transfer_successful",
  help: "router_transfer_successful_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

//////////////////////////
///// Financials

// Fees taken in USD -- incremented via `incrementFees` function that
// handles conversion
export const feesCollected = new Counter({
  name: "router_fees_usd",
  help: "router_fees_help",
  labelNames: ["assetId", "chainId"] as const,
});

// Track gas consumed in USD -- incremented via `incrementGas` function that
// handles conversion
export const gasConsumed = new Counter({
  name: "router_gas_consumed_usd",
  help: "router_gas_consumed_help",
  labelNames: ["reason", "chainId"] as const,
});

// Track liquidity supplied (i.e. investment) in USD
// Collected via analytics subgraph
export const liquiditySupplied = new Gauge({
  name: "liquidity_supplied_usd",
  help: "liquidity_supplied_usd_help",
  labelNames: ["assetId", "chainId", "assetName"],
  async collect() {
    const liquidity = await collectExpressiveLiquidity();
    Object.entries(liquidity).map(([chainId, values]) => {
      values.map(({ assetId, supplied }) => {
        this.set({ chainId, assetId }, supplied);
      });
    });
  },
});

// Track liquidity supplied (i.e. investment) in USD
// Collected via analytics subgraph
export const liquidityLocked = new Gauge({
  name: "liquidity_locked_usd",
  help: "liquidity_locked_usd_help",
  labelNames: ["assetId", "chainId", "assetName"],
  async collect() {
    const liquidity = await collectExpressiveLiquidity();
    Object.entries(liquidity).map(([chainId, values]) => {
      values.map(({ assetId, locked }) => {
        this.set({ chainId, assetId }, locked);
      });
    });
  },
});

//////////////////////////
///// Low Level

export const senderExpired = new Counter({
  name: "sender_expired",
  help: "sender_expired_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverExpired = new Counter({
  name: "receiver_expired",
  help: "receiver_expired_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverFailedPrepare = new Counter({
  name: "receiver_failed_prepare",
  help: "receiver_failed_prepare_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const senderFailedFulfill = new Counter({
  name: "sender_failed_fulfill",
  help: "sender_failed_fulfill_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const senderFailedCancel = new Counter({
  name: "sender_failed_cancel",
  help: "sender_failed_cancel_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverFailedCancel = new Counter({
  name: "receiver_failed_cancel",
  help: "receiver_failed_cancel_help",
  labelNames: ["assetId", "chainId"] as const,
});
