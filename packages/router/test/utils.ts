import { mkAddress } from "@connext/nxtp-utils";
import { variantDataMock, invariantDataMock } from "@connext/nxtp-utils/src/mock";

import { TransactionStatus as SdkTransactionStatus } from "../src/adapters/subgraph/graphqlsdk";
import { NxtpRouterConfig } from "../src/config";
import { ActiveTransaction, SingleChainTransaction, TransactionStatus } from "../src/lib/entities";

export const routerAddrMock = mkAddress("0xb");

export const MUTATED_AMOUNT = "100";
export const MUTATED_EXPIRY = 123400;
export const BID_EXPIRY = 123401;

export const configMock: NxtpRouterConfig = {
  adminToken: "foo",
  authUrl: "http://example.com",
  chainConfig: {
    1337: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
      minGas: "100",
    },
    1338: {
      confirmations: 1,
      providers: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xbbb"),
      minGas: "100",
    },
  },
  mnemonic: "hello world",
  natsUrl: "http://example.com",
  logLevel: "info",
  swapPools: [
    {
      name: "TEST",
      assets: [
        { assetId: mkAddress("0xc"), chainId: 1337 },
        { assetId: mkAddress("0xf"), chainId: 1338 },
      ],
    },
  ],
  host: "0.0.0.0",
  port: 8080,
};

export const activeTransactionMock: ActiveTransaction = {
  bidSignature: "0xdbc",
  encodedBid: "0xdef",
  encryptedCallData: "0xabc",
  status: TransactionStatus.SenderPrepared,
  crosschainTx: { sending: variantDataMock, invariant: invariantDataMock },
};

export const singleChainTransactionMock: SingleChainTransaction = {
  bidSignature: "0xdbc",
  signature: "0xfee",
  relayerFee: "12",
  encodedBid: "0xdef",
  encryptedCallData: "0xabc",
  status: SdkTransactionStatus.Fulfilled,
  txData: { ...invariantDataMock, ...variantDataMock },
};
