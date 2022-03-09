import {
  mkAddress,
  variantDataMock,
  invariantDataMock,
  mkBytes32,
  chainDataToMap,
  Bid,
  FulfillArgs,
  CallParams,
  SignedBid,
} from "@connext/nxtp-utils";
import { parseEther } from "ethers/lib/utils";

import { NxtpRouterConfig } from "../src/config";

export const routerAddrMock = mkAddress("0xb");
export const routerContractAddressMock = mkAddress("0xccc");

export const MUTATED_AMOUNT = "100000000000000000000";
export const MUTATED_BUFFER = 123400;
export const BID_EXPIRY = 123401;

export const configMock: NxtpRouterConfig = {
  chains: {
    "1337": {
      assets: [
        {
          name: "TEST",
          address: mkAddress("0xbeefbeefbeef"),
        },
      ],
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: {
        runtime: ["http://example.com"],
        analytics: ["http://example.com"],
        maxLag: 10,
      },
      deployments: {
        transactionManager: mkAddress("0xaaa"),
      },
      gasStations: [],
    },
    "1338": {
      assets: [
        {
          name: "TEST",
          address: mkAddress("0xbeefbeefbeef"),
        },
      ],
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: {
        runtime: ["http://example.com"],
        analytics: ["http://example.com"],
        maxLag: 10,
      },
      deployments: {
        transactionManager: mkAddress("0xaaa"),
      },
      gasStations: [],
    },
  },
  mnemonic: "hello world",
  logLevel: "info",
  redisUrl: "redis://localhost:6379",
  sequencerUrl: "http://localhost:8081",
  server: {
    host: "0.0.0.0",
    port: 3000,
    requestLimit: 2000,
    adminToken: "blahblahblah",
  },
  network: "testnet",
  maxSlippage: 0,
  mode: {
    diagnostic: false,
    cleanup: false,
    priceCaching: false,
  },
};

export const mockHashes = {
  prepareHash: mkBytes32("0xa"),
};

export const callParamsMock: CallParams = {
  recipient: mkAddress("0xrecipient"),
  callTo: mkAddress("0xcallTo"),
  callData: "0x",
  originDomain: "1337",
  destinationDomain: "1338",
};

export const fulfillArgsMock: FulfillArgs = {
  params: callParamsMock,
  local: mkAddress("0xlocal"),
  router: mkAddress("0xrouter"),
  feePercentage: "1",
  nonce: "0",
  amount: parseEther("1").toString(),
  relayerSignature: "0xsig",
};

export const bidDataMock: Bid = {
  transactionId: "0xtxid",
  data: fulfillArgsMock,
};

export const signedBidDataMock: SignedBid = {
  bid: bidDataMock,
  signature: "0xsig",
};

export const chainDataMock = chainDataToMap([
  {
    name: "Unit Test Chain 1",
    chainId: 1337,
    confirmations: 1,
    assetId: {},
  },
  {
    name: "Unit Test Chain 2",
    chainId: 1338,
    confirmations: 1,
    assetId: {},
  },
]);

export const relayerFeePercentageMock = "1"; // 1%

export const callDataMock = "0xabc";
