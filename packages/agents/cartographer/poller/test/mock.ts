import { chainDataToMap, mkAddress } from "@connext/nxtp-utils";

import { CartographerConfig } from "../src/config";

export const mockChainData = chainDataToMap([
  {
    name: "Ethereum Testnet Rinkeby",
    chainId: 4,
    domainId: "2000",
    type: "testnet",
    confirmations: 1,
    shortName: "rin",
    network: "rinkeby",
    assetId: {},
  },
  {
    name: "Ethereum Testnet Kovan",
    chainId: 42,
    domainId: "3000",
    type: "testnet",
    confirmations: 1,
    shortName: "kov",
    chain: "ETH",
    network: "kovan",
    networkId: 42,
    assetId: {},
  },
  {
    name: "Local Testnet 1337",
    chainId: 1337,
    domainId: "1337",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1337",
    network: "lt-1337",
    assetId: {
      [mkAddress("0xb")]: {
        name: "Wrapped Ether",
        symbol: "WETH",
        mainnetEquivalent: mkAddress("0xb"),
        decimals: 18,
        coingeckoId: "ethereum",
      },
    },
  },
  {
    name: "Local Testnet 1338",
    chainId: 1338,
    domainId: "1338",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1338",
    network: "lt-1338",
    assetId: {},
  },
  {
    name: "Optimistic Ethereum",
    chainId: 10,
    domainId: "10",
    type: "mainnet",
    confirmations: 1,
    shortName: "optimism",
    network: "optimism",
    assetId: {},
  },
]);

export const mockConfig: CartographerConfig = {
  pollInterval: 15000,
  logLevel: "silent",
  database: { url: "postgres://postgres:qwery@localhost:5432/connext?sslmode=disable" },
  environment: "production",
  chains: {},
  healthUrls: {},
  service: "transfers",
};
