import { mkAddress, getRandomBytes32 } from "@connext/nxtp-utils";
import { transactionSubgraphMock, txDataMock } from "@connext/nxtp-utils/src/mock";
import { expect } from "@connext/nxtp-utils/src/expect";
import { Wallet, BigNumber } from "ethers";
import { GraphQLClient } from "graphql-request";
import pino from "pino";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";

import { Subgraph, convertTransactionToTxData } from "../../src/subgraph";
import { Transaction, TransactionStatus, User, Router, getSdk } from "../../src/graphqlsdk";

import { EmptyCallDataHash } from "../helper";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

describe("NxtpSdk", () => {
  let subgraph: Subgraph;
  let signer: SinonStubbedInstance<Wallet>;
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let user: string = mkAddress("0xa");

  const chainConfig = {
    [sendingChainId]: {
      subgraph: "http://example.com",
    },
    [receivingChainId]: {
      subgraph: "http://example.com",
    },
  };

  const getMockTransaction = async (overrides: Partial<Transaction> = {}): Promise<Transaction> => {
    const day = 24 * 60 * 60;

    const transaction: Transaction = {
      id: "123",
      status: TransactionStatus.Prepared,
      chainId: sendingChainId,
      user: {} as User,
      router: {} as Router,
      sendingAssetId: mkAddress("0xc"),
      receivingAssetId: mkAddress("0xd"),
      sendingChainFallback: user,
      callTo: mkAddress("0xe"),
      receivingAddress: mkAddress("0xf"),
      callDataHash: getRandomBytes32(),
      transactionId: getRandomBytes32(),
      sendingChainId: sendingChainId,
      receivingChainId: receivingChainId,
      amount: BigNumber.from(1),
      expiry: Math.floor(Date.now() / 1000) + day + 5_000,
      preparedBlockNumber: BigNumber.from(1),
      encryptedCallData: EmptyCallDataHash,
      prepareCaller: user,
      bidSignature: EmptyCallDataHash,
      encodedBid: EmptyCallDataHash,
      prepareTransactionHash: EmptyCallDataHash,
    };
    return transaction;
  };

  describe("class Subgraph", () => {
    beforeEach(() => {
      signer = createStubInstance(Wallet);
      signer.getAddress.resolves(user);

      subgraph = new Subgraph(signer, chainConfig, logger);

      const client = createStubInstance(GraphQLClient);
      (subgraph as any).sdks[sendingChainId] = (subgraph as any).sdks[receivingChainId] = getSdk(client as any);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("happy: constructor", () => {
      const subgraph = new Subgraph(signer, chainConfig, logger);
    });

    it("happy convertTransactionToTxData", () => {
      const res = convertTransactionToTxData(transactionSubgraphMock);
      expect(res).to.include(txDataMock);
    });

    it.skip("happy: getActiveTransactions", async () => {
      const transaction = await getMockTransaction();
      (({} as any).GetSenderTransactions.resolves(transaction));
      const res = await subgraph.getActiveTransactions();
    });
  });
});
