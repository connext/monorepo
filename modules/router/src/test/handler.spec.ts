import { mkAddress, mkBytes32, NatsNxtpMessagingService } from "@connext/nxtp-utils";
import { TransactionService } from "@connext/nxtp-txservice";
import { expect } from "chai";
import { describe } from "mocha";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { BigNumber, constants, providers, Signer, utils } from "ethers";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { TransactionManager, IERC20 } from "@connext/nxtp-contracts";

import {
  ReceiverFulfillData,
  SenderPrepareData,
  SubgraphTransactionManagerListener
} from "../transactionManagerListener";
import { EXPIRY_DECREMENT, Handler } from "../handler";
import * as config from "../config";
import { parseEther } from "@ethersproject/units";

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
  amount: parseEther("100").toString(),
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
  const nxtpContract = new utils.Interface(TransactionManagerArtifact.abi) as TransactionManager["interface"];

  beforeEach(() => {
    const messaging = createStubInstance(NatsNxtpMessagingService);

    const subgraph = createStubInstance(SubgraphTransactionManagerListener);

    const signer = createStubInstance(Signer);
    (signer as any).getAddress = () => Promise.resolve(mkAddress("0xabc")); // need to do this differently bc the function doesnt exist on the interface

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
    it("should send prepare for receiving chain with ETH asset", async () => {
      await handler.handleSenderPrepare(senderPrepareData);

      expect(txService.sendAndConfirmTx.callCount).to.be.eq(1);
      txService.sendAndConfirmTx.getCall(0);
      const call = txService.sendAndConfirmTx.getCall(0);
      expect(call.args[0]).to.eq(1338);

      const receiverAmount = "99500000000000000000"; // based on input amount
      const receiverExpiry = futureTime - EXPIRY_DECREMENT;
      const encodedData = nxtpContract.encodeFunctionData("prepare", [
        {
          callData: senderPrepareData.callData,
          receivingAddress: senderPrepareData.receivingAddress,
          receivingAssetId: senderPrepareData.receivingAssetId,
          receivingChainId: senderPrepareData.receivingChainId,
          router: senderPrepareData.router,
          sendingAssetId: senderPrepareData.sendingAssetId,
          sendingChainId: senderPrepareData.sendingChainId,
          transactionId: senderPrepareData.transactionId,
          user: senderPrepareData.user,
        },
        receiverAmount,
        receiverExpiry,
      ]);

      expect(call.args[1]).to.deep.eq({
        to: mkAddress("0xaaa"),
        value: BigNumber.from(receiverAmount),
        data: encodedData,
        chainId: 1338,
        from: mkAddress("0xabc"),
      });
    });

    it("should send prepare for receiving chain with token asset", async () => {
      const rinkebyTestTokenAddress = '0x8bad6f387643Ae621714Cd739d26071cFBE3d0C9'
      const goerliTestTokenAddress = '0xbd69fC70FA1c3AED524Bb4E82Adc5fcCFFcD79Fa'
      let tokenPrepareData = {...senderPrepareData, sendingAssetId: rinkebyTestTokenAddress, receivingAssetId: goerliTestTokenAddress }

      await handler.handleSenderPrepare(tokenPrepareData);

      txService.sendAndConfirmTx.getCall(1);
      const call = txService.sendAndConfirmTx.getCall(1);
      expect(call.args[0]).to.eq(1338);

      const receiverAmount = "99500000000000000000"; // based on input amount
      const receiverExpiry = futureTime - EXPIRY_DECREMENT;

      const encodedData = nxtpContract.encodeFunctionData("prepare", [
        {
         ...tokenPrepareData
        },
        receiverAmount,
        receiverExpiry,
      ]);


      expect(call.args[1]).to.deep.eq({
        to: mkAddress("0xaaa"),
        //todo:this breaks
        value: BigNumber.from(0),
        data: encodedData,
        chainId: 1338,
        from: mkAddress("0xabc"),
      });

      // assert that there are two txService.sendAndConfirmTx calls, one for approve, and one for prepare
      expect(txService.sendAndConfirmTx.callCount).to.be.eq(2);

    });
  });
  describe("handleReceiverFulfill", ()=>{
    it('should fulfill eth asset',async ()=>{

      const recieverFufillDataMock:ReceiverFulfillData = {

        amount: parseEther("100").toString(),
        blockNumber: 1,
        callData: "0x",
        chainId: 1337,
        expiry: futureTime,
        sendingAssetId: constants.AddressZero,
        sendingChainId: 1337,
        receivingAddress: mkAddress("0xaaa"),
        receivingAssetId: constants.AddressZero,
        receivingChainId: 1338,
        router: mkAddress(),
        transactionId: mkBytes32(),
        user: mkAddress(),
        relayerFee: "0",
        signature: "0xdeadbeef",

      }
      await handler.handleReceiverFulfill(recieverFufillDataMock)
      txService.sendAndConfirmTx.getCall(0);
      const call = txService.sendAndConfirmTx.getCall(0);
      expect(call.args[0]).to.eq(1337);

      const encodedData = nxtpContract.encodeFunctionData("fulfill", [
        {
          ...recieverFufillDataMock
        },
          recieverFufillDataMock.relayerFee,
          recieverFufillDataMock.signature
      ]);

      // console.log(`res data ${call.args[1].data}  comp data: ${encodedData}`)

      expect(call.args[1]).to.deep.eq({
        to: mkAddress("0xaaa"),
        //todo:this breaks
        value: 0,
        data: encodedData,
        chainId: 1337,
        from: mkAddress("0xabc"),
      });


    })
  })
});
