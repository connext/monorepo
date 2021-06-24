import { mkAddress, mkBytes32, NatsNxtpMessagingService } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { describe } from "mocha";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { SenderPrepareData, SubgraphTransactionManagerListener } from "../transactionManagerListener";
import pino from "pino";
import { constants, providers, Signer } from "ethers";

import { Handler } from "../handler";
import * as config from "../config";

const logger = pino();

const fakeTxReceipt: providers.TransactionReceipt = {
  blockHash: "foo",
  blockNumber: 1,
  byzantium: true,
  confirmations: 1,
  contractAddress: mkAddress(),
  cumulativeGasUsed: constants.One,
  from: mkAddress(),
  transactionHash: mkBytes32(),
  gasUsed: constants.One,
  to: mkAddress(),
  logs: [],
  logsBloom: "",
  transactionIndex: 1,
};

const fakeConfig: config.NxtpRouterConfig = {
  adminToken: "foo",
  authUrl: "http://example.com",
  chainConfig: {
    1337: {
      confirmations: 1,
      provider: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
    },
    1338: {
      confirmations: 1,
      provider: ["http://example.com"],
      subgraph: "http://example.com",
      transactionManagerAddress: mkAddress("0xaaa"),
    },
  },
  mnemonic: "hello world",
  natsUrl: "http://example.com",
  logLevel: "info",
};

const futureTime = Date.now() + 3600 * 24 * 7; // 1 week

const senderPrepareData: SenderPrepareData = {
  amount: "1",
  blockNumber: 1,
  callData: "0x",
  chainId: 1337,
  expiry: futureTime,
  sendingAssetId: constants.AddressZero,
  sendingChainId: 1337,
  receivingAddress: mkAddress(),
  receivingAssetId: constants.AddressZero,
  receivingChainId: 1338,
  router: mkAddress(),
  transactionId: mkBytes32(),
  user: mkAddress(),
};

describe("Handler", () => {
  let handler: Handler;
  let txService: SinonStubbedInstance<TransactionService>;
  beforeEach(() => {
    const messaging = createStubInstance(NatsNxtpMessagingService);

    const subgraph = createStubInstance(SubgraphTransactionManagerListener);

    const signer = createStubInstance(Signer);
    console.log("signer: ", signer);
    (signer as any).getAddress = () => Promise.resolve(mkAddress("0xabc"));

    txService = createStubInstance(TransactionService);
    txService.sendAndConfirmTx.resolves(fakeTxReceipt);
    stub(config, "getConfig").returns(fakeConfig);

    handler = new Handler(messaging, subgraph, signer, txService as any, logger);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("handleSenderPrepare", () => {
    it.only("should send prepare for receiving chain with ETH asset", async () => {
      await handler.handleSenderPrepare(senderPrepareData);

      expect(txService.sendAndConfirmTx.callCount).to.be.eq(1);
      txService.sendAndConfirmTx.getCall(0);
      console.log("txService.sendAndConfirmTx.getCall(0): ", txService.sendAndConfirmTx.getCall(0));
      // TODO: assert the args to txService.sendAndConfirmTx.getCall(0)
      // expect(txService.sendAndConfirmTx.getCall(0))
    });

    it("should send prepare for receiving chain with token asset", async () => {});
  });
});
