import {
  mkAddress,
  UserNxtpNatsMessagingService,
  getRandomBytes32,
  InvariantTransactionData,
  VariantTransactionData,
  AuctionBid,
} from "@connext/nxtp-utils";
import { err, ok } from "neverthrow";
import { expect } from "chai";
import { providers, Wallet, constants, utils, BigNumber } from "ethers";
import { GraphQLClient } from "graphql-request";
import pino from "pino";
import { createStubInstance, SinonStubbedInstance, SinonStub, stub } from "sinon";

import { Subgraph, getDeployedSubgraphUri, SubgraphUri } from "../../src/subgraph";
import { Transaction, TransactionStatus, User, Router, Sdk, getSdk } from "../../src/graphqlsdk";

import { TransactionManager, TransactionManagerError } from "../../src/transactionManager";
import { TxResponse, EmptyBytes, EmptyCallDataHash } from "../helper";

import * as nxtpUtils from "@connext/nxtp-utils";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

const { AddressZero } = constants;
const response = "connected";

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

  it("happy: getDeployedSubgraphUri", () => {
    const chainId = 4;
    const res = getDeployedSubgraphUri(chainId);

    expect(res).to.be.eq(SubgraphUri[chainId]);
  });

  it("happy: getDeployedSubgraphUri undefined for unknown chainId", () => {
    const chainId = 1300;
    const res = getDeployedSubgraphUri(chainId);

    expect(res).to.be.undefined;
  });

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
      // (subgraph as any).sdks[sendingChainId] = getSdk(client);
      // (subgraph as any).sdks[receivingChainId] = createStubInstance(Sdk);
    });

    it("happy: constructor", () => {
      const subgraph = new Subgraph(signer, chainConfig, logger);
    });

    it.skip("happy: getActiveTransactions", async () => {
      const transaction = await getMockTransaction();
      (({} as any).GetSenderTransactions.resolves(transaction));
      const res = await subgraph.getActiveTransactions();
    });
  });
});
