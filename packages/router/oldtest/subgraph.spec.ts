import { expect, getRandomBytes32, mkAddress, transactionSubgraphMock, txDataMock } from "@connext/nxtp-utils";
import pino from "pino";
import { GraphQLClient } from "graphql-request";
import { providers, Wallet, constants, utils, BigNumber } from "ethers";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { convertTransactionToTxData, Subgraph, createEvts } from "../src/subgraph";
import { getSdk } from "../src/graphqlsdk";

import { okAsync } from "neverthrow";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent" });

describe("subgraph", () => {
  let subgraph: Subgraph;
  let client: SinonStubbedInstance<GraphQLClient>;
  let signer: SinonStubbedInstance<Wallet>;
  let sendingChainId: number = 1337;
  let receivingChainId: number = 1338;
  let user: string = mkAddress("0xa");
  let router: string = mkAddress("0xb");
  let transactionId = getRandomBytes32();
  let sdk;

  const chainConfig = {
    [sendingChainId]: {
      subgraph: "http://example.com",
    },
    [receivingChainId]: {
      subgraph: "http://example.com",
    },
  };

  beforeEach(() => {
    signer = createStubInstance(Wallet);
    signer.getAddress.resolves(user);

    subgraph = new Subgraph(chainConfig, router, logger);

    client = createStubInstance(GraphQLClient);
    sdk = getSdk(client as any);
    (subgraph as any).sdks[sendingChainId] = (subgraph as any).sdks[receivingChainId] = getSdk(client as any);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("happy convertTransactionToTxData", () => {
    const res = convertTransactionToTxData(transactionSubgraphMock);
    expect(res).to.include(txDataMock);
  });

  describe("class subgraph", () => {
    it.skip("happy getTransactionForChain", () => {
      const res = subgraph.getTransactionForChain(transactionId, user, sendingChainId);

      sdk.GetTransaction.returns(okAsync({} as any));
    });
  });
});
