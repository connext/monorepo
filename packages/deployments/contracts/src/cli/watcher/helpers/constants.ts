import { utils } from "ethers";

// Period is the duration you have for an alert to randomly fire
export const MIN_PERIOD = 5 * 60 * 1_000; // 5m
export const MAX_PERIOD = 7 * 24 * 60 * 60 * 1_000; // 1w

// Supported domains are the ones where the BigBro token and watcher infrastructure
// are deployed
export const SUPPORTED_DOMAINS: Record<string, string[]> = {
  staging: [
    // "1735353714", /// GOERLI -> hub always excluded, these are mintable domains
    "1735356532", /// OPTIMISM-GOERLI
    // "1734439522", /// ARBITRUM-GOERLI
    // "9991", /// MUMBAI
  ],
};

// Minimum amount of gas wallet should have on chain to trigger watchers
export const MIN_WALLET_GAS = utils.parseUnits("50", "gwei");
