import { Counter, Gauge } from "prom-client";
import { collectOnchainLiquidity } from "../helpers/metrics";

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

// Track liquidity added (i.e. investment) in USD
// Collected via analytics subgraph
export const liquidityAdded = new Gauge({
  name: "liquidity_added_usd",
  help: "liquidity_added_usd_help",
  labelNames: ["assetId", "chainId"],
  async collect() {
    const liquidity = await collectLiquidityAdded();
    Object.entries(liquidity).map(([chainId, values]) => {
      values.map(({ assetId, balance }) => {
        this.set({ chainId, assetId }, balance);
      });
    });
  },
});

//////////////////////////
///// Low Level

// All success cases (i.e. sending tx didnt fail) should be
// tracked through the analytics subgraph. All of the failure
// cases are tracked in real-time if the attempt to send a tx
// fails

// NOTE: cannot track receiver fulfill failed
// TODO: is updating these 1/hr enough?
export const senderPrepared = new Counter({
  name: "sender_prepared",
  help: "sender_prepared_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverPrepared = new Counter({
  name: "receiver_prepared",
  help: "receiver_prepared_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const senderFulfilled = new Counter({
  name: "sender_fulfilled",
  help: "sender_fulfilled_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverFulfilled = new Counter({
  name: "receiver_fulfilled",
  help: "receiver_fulfilled_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const senderCancelled = new Counter({
  name: "sender_cancelled",
  help: "sender_cancelled_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverCancelled = new Counter({
  name: "receiver_cancelled",
  help: "receiver_cancelled_help",
  labelNames: ["assetId", "chainId"] as const,
});

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
