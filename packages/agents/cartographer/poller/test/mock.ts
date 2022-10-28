import {
  mock,
  chainDataToMap,
  OriginMessage,
  DestinationMessage,
  XMessage,
  RootMessage,
  AggregatedRoot,
  PropagatedRoot,
  OriginTransfer,
  DestinationTransfer,
  XTransferStatus,
  RouterBalance,
  mkAddress,
  mkBytes32,
} from "@connext/nxtp-utils";

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
    assetId: {},
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

export const mockRootSubgraphResponse = [
  mock.entity.rootMessage() as RootMessage,
  mock.entity.rootMessage() as RootMessage,
];

export const mockOriginMessageSubgraphResponse = [
  mock.entity.originMessage() as OriginMessage,
  mock.entity.originMessage() as OriginMessage,
];

export const mockDestinationMessageSubgraphResponse = [
  mock.entity.destinationMessage() as DestinationMessage,
  mock.entity.destinationMessage() as DestinationMessage,
];

export const mockAggregatedRootSubgraphResponse = [
  mock.entity.aggregatedRoot() as AggregatedRoot,
  mock.entity.aggregatedRoot() as AggregatedRoot,
];

export const mockPropagatedRootSubgraphResponse = [
  mock.entity.propagatedRoot() as PropagatedRoot,
  mock.entity.propagatedRoot() as PropagatedRoot,
];
export const mockXMessageSubgraphResponse = [mock.entity.xMessage() as XMessage, mock.entity.xMessage() as XMessage];

export const mockConfig: CartographerConfig = {
  pollInterval: 15000,
  logLevel: "silent",
  database: { url: "postgres://postgres:qwery@localhost:5432/connext?sslmode=disable" },
  environment: "production",
  chains: {},
  healthUrls: {},
};

export const mockConnectorMeta = [
  {
    hubDomain: "1337",
  },
];

export const mockBlockNumber: Map<string, number> = new Map();
mockBlockNumber.set("2000", 1234567);
mockBlockNumber.set("3000", 1234567);
mockBlockNumber.set("1337", 1234567);
mockBlockNumber.set("1338", 1234567);
mockBlockNumber.set("10", 1234567);

export const mockNoBlockNumber: Map<string, number> = new Map();
mockNoBlockNumber.set("99999", 1234567);

export const mockOriginSubgraphResponse = [
  mock.entity.xtransfer({ originDomain: "1337", destinationDomain: "1338" }) as OriginTransfer,
  mock.entity.xtransfer({ originDomain: "1337", destinationDomain: "1338" }) as OriginTransfer,
];

export const mockDestinationSubgraphResponse = [
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    status: XTransferStatus.Reconciled,
  }) as DestinationTransfer,
  mock.entity.xtransfer({
    originDomain: "1337",
    destinationDomain: "1338",
    status: XTransferStatus.Reconciled,
  }) as DestinationTransfer,
];

export const mockRouterResponse: RouterBalance[] = [
  { assets: [], router: mkAddress("0xa") },
  {
    assets: [
      {
        adoptedAsset: mkAddress(),
        balance: "123",
        blockNumber: "42",
        canonicalDomain: "1337",
        canonicalId: mkBytes32(),
        domain: "1337",
        feesEarned: "12",
        id: mkBytes32(),
        key: mkBytes32(),
        localAsset: mkAddress(),
      },
    ],
    router: mkBytes32("0xb"),
  },
];
