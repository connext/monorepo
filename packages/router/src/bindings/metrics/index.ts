// TODO: need to keep last block height? contractReader has done it already.
// TODO: export transactions with timestamps to Prometheus
import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import { Counter, Gauge } from "prom-client";
import { collectDefaultMetrics } from "prom-client";
import { getContext } from "../../router";

collectDefaultMetrics({ prefix: "router_" });

// import ERC20 from "@connext/nxtp-contracts/artifacts/contracts/interfaces/IERC20Minimal.sol/IERC20Minimal.json";

export const bindMetrics = async () => {};

//////////////////////////
///// High Level Metrics

// TODO: getBalances() per {router, asset, chain}
// TODO: dynamic assetId set by addAssetId()
export const onchainLiquidity = new Gauge({
  name: "router_onchain_liquidity",
  help: "router_onchain_liquidity_help",
  labelNames: ["chainName", "chainId", "assetName", "assetId"] as const,
  async collect() {
    // TODO
  },
});

// Track volume from sender side (before fees)
export const totalTransferredVolume = new Counter({
  name: "router_transfer_volume",
  help: "router_transfer_volume_help",
  labelNames: ["assetId", "chainId", "amount"] as const,
});

//////////////////////////
///// Auctions

export const receivedAuction = new Counter({
  name: "router_auction_received",
  help: "router_auction_received_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

export const attemptedAuction = new Counter({
  name: "router_auction_attempt",
  help: "router_auction_attempt_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

// export const successfulAuction = new Counter({
//   name: "router_auction_successful",
//   help: "router_auction_successful_help",
//   labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
// });

// export const successfulAuctionRatio = new Gauge({
//   name: "router_auction_chance",
//   help: "router_auction_chance_help",
//   labelNames: ["assetId", "chainId"] as const,
// });

//////////////////////////
///// Transfers

export const attemptedTransfer = new Counter({
  name: "router_transfer_attempt",
  help: "router_transfer_attempt_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

// Track completed transfers
export const completedTransfer = new Counter({
  name: "router_transfer_successful",
  help: "router_transfer_successful_help",
  labelNames: ["sendingAssetId", "receivingAssetId", "sendingChainId", "receivingChainId"] as const,
});

//////////////////////////
///// Financials

export const feesCollected = new Counter({
  name: "router_fees",
  help: "router_fees_help",
  labelNames: ["assetId", "chainId", "amount"] as const,
});

// Track gas consumed
export const gasConsumed = new Counter({
  name: "router_gas_consumed",
  help: "router_gas_consumed_help",
  labelNames: ["reason", "chainId", "amount"] as const,
});

export const roi = new Gauge({
  name: "router_roi",
  help: "router_roi_help",
  labelNames: ["assetId", "chainId"] as const,
});

//////////////////////////
///// Low Level

// TODO how can we track these w/ subgraph loop? Need uniques

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

export const senderFailedPrepare = new Counter({
  name: "sender_failed_prepare",
  help: "sender_failed_prepare_help",
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

export const receiverFailedFulfill = new Counter({
  name: "receiver_failed_fulfill",
  help: "receiver_failed_fulfill_help",
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

export const senderFailedExpired = new Counter({
  name: "sender_expired",
  help: "sender_expired_help",
  labelNames: ["assetId", "chainId"] as const,
});

export const receiverFailedExpired = new Counter({
  name: "receiver_expired",
  help: "receiver_expired_help",
  labelNames: ["assetId", "chainId"] as const,
});

/////////////////////////////////////
///////////// Notes

/*

  What do we want to track?
  1. Liquidity for a given router at current time and over last X time
    a. Filtered by asset + chain
  2. Transfer volume over last X time
    a. Filtered by asset
  3. Transfer attempt
  4. Successful transfers end to end
  5. Auction requests
  6. Responded auction bids
  7. Won auction bids
  8. Number of active transactions at a given time
  9. Claimable tx funds at a given time
  10. Expired transactions?
  11. Fees collected
  12. Gas paid
  13. Onchain tx attempt
  14. Onchain tx fail

*/
