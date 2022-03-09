import { TransactionService } from "@connext/nxtp-txservice";
import { StoreManager, TransactionsCache } from "@connext/nxtp-adapters-cache";
import { SubgraphReader } from "@connext/nxtp-adapters-subgraph";
import {
  txReceiptMock,
  sigMock,
  Logger,
  mkAddress,
  CrossChainTx,
  CrossChainTxStatus,
  getRandomBytes32,
} from "@connext/nxtp-utils";
import { Wallet, BigNumber, utils } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { createStubInstance } from "sinon";
import { routerAddrMock, chainDataMock } from "./utils";
import { AppContext } from "../src/context";

export const createMockContext = (): AppContext => {
  const wallet = createStubInstance(Wallet);
  // need to do this differently bc the function doesnt exist on the interface
  (wallet as any).address = routerAddrMock;
  wallet.getAddress.resolves(routerAddrMock);
  wallet.signMessage.resolves(sigMock);

  const subgraph = createStubInstance(SubgraphReader);
  subgraph.getPreparedTransactions.resolves([]);
  subgraph.getTransactionsWithStatuses.resolves([]);

  const cache = createStubInstance(StoreManager);
  const transactions = createStubInstance(TransactionsCache);
  (cache as any).transactions = transactions;
  transactions.getLatestNonce.resolves(0);

  const txservice = createStubInstance(TransactionService);
  txservice.getBalance.resolves(parseEther("1"));
  txservice.sendTx.resolves(txReceiptMock);
  txservice.getDecimalsForAsset.resolves(18);
  txservice.getBlockTime.resolves(Math.floor(Date.now() / 1000));
  txservice.getTransactionReceipt.resolves(txReceiptMock);
  txservice.calculateGasFee.resolves(BigNumber.from(100));
  txservice.calculateGasFeeInReceivingToken.resolves(BigNumber.from(100));
  txservice.calculateGasFeeInReceivingTokenForFulfill.resolves(BigNumber.from(120));
  txservice.getTokenPrice.resolves(BigNumber.from(1));
  txservice.getGasEstimate.resolves(BigNumber.from(24001));

  return {
    adapters: {
      wallet,
      subgraph,
      cache,
      txservice,
    },
    config: {
      chains: {
        "1337": {
          assets: [],
          subgraph: {
            analytics: [],
            runtime: [],
            maxLag: 10,
          },
          providers: [],
          deployments: {
            transactionManager: mkAddress("0xabcdef123"),
          },
          gasStations: [],
          confirmations: 10,
        },
        "1338": {
          assets: [],
          subgraph: {
            analytics: [],
            runtime: [],
            maxLag: 10,
          },
          providers: [],
          deployments: {
            transactionManager: mkAddress("0xabcdef123"),
          },
          gasStations: [],
          confirmations: 10,
        },
      },
    } as any,
    chainData: chainDataMock,
    routerAddress: routerAddrMock,
    logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
  };
};

export const createMockCrossChainTx = (
  origin: string,
  destination: string,
  status: CrossChainTxStatus = CrossChainTxStatus.Prepared,
): CrossChainTx => {
  return {
    // Meta
    originDomain: origin,
    destinationDomain: destination,
    status,

    // Transfer Data
    nonce: 1234,
    transactionId: getRandomBytes32(),
    recipient: mkAddress("0xcbacba"),
    router: routerAddrMock,

    // Prepared
    prepareCaller: mkAddress("0xcbacba"),
    prepareTransactingAmount: "1000",
    prepareLocalAmount: "1000",
    prepareTransactingAsset: mkAddress("0x321321"),
    prepareLocalAsset: mkAddress("0x321321"),
    callTo: mkAddress("0x0"),
    callData: "0x0",

    // TransactionPrepared
    prepareTransactionHash: getRandomBytes32(),
    prepareTimestamp: Math.floor(Date.now() / 1000 - 30),
    prepareGasPrice: utils.parseUnits("5", "gwei").toString(),
    prepareGasLimit: "80000",
    prepareBlockNumber: 7654321,

    // Fulfill
    fulfillCaller: "0x0",
    fulfillTransactingAmount: "0",
    fulfillLocalAmount: "0",
    fulfillTransactingAsset: mkAddress("0x321321"),
    fulfillLocalAsset: mkAddress("0x321321"),

    // TransactionFulfilled
    fulfillTransactionHash: "0x0",
    fulfillTimestamp: "0x0",
    fulfillGasPrice: "0",
    fulfillGasLimit: "0",
    fulfillBlockNumber: 0,

    // Reconciled
    externalCallHash: "0x0",
    reconciledTransactionHash: "0x0",
    reconciledTimestamp: "0x0",
    reconciledGasPrice: "0",
    reconciledGasLimit: "0",
    reconciledBlockNumber: 0,
  };
};
