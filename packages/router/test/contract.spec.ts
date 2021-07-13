import { expect } from "chai";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { TransactionService } from "@connext/nxtp-txservice";
import {
  CancelParams,
  FulfillParams,
  InvariantTransactionData,
  mkAddress,
  mkBytes32,
  PrepareParams, TransactionData,
  VariantTransactionData,
} from "@connext/nxtp-utils";
import { constants, providers, Signer, utils } from "ethers";

import { TransactionManager as TxManager } from "../src/contract";
import * as config from "../src/config";
import { fakeConfig } from "./utils";
import {okAsync} from "neverthrow";

const fakeTxReceipt = {
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
} as unknown as providers.TransactionReceipt;

const fakeTxData:InvariantTransactionData = {
  user: "",
  router: "",
  sendingAssetId: "",
  receivingAssetId: "",
  sendingChainFallback: "",
  receivingAddress: "",
  sendingChainId: 4,
  receivingChainId: 5,
  callDataHash: "",
  transactionId: "",
}
const fakePrepareParams:PrepareParams = {
  txData: fakeTxData,
  amount: "",
  expiry: "",
  bidSignature: "",
  encodedBid: "",
  encryptedCallData: "",
}

describe("Router Contract/Transaction Manager Test", () => {
  let txManager: TxManager;
  let txService: SinonStubbedInstance<TransactionService>;
  let txManagerInterface: SinonStubbedInstance<utils.Interface>;
  let erc20Interface: SinonStubbedInstance<utils.Interface>;

  beforeEach(() => {
    const signer = createStubInstance(Signer);
    (signer as any).getAddress = () => Promise.resolve(mkAddress("0xdeadbeef"));

    txService = createStubInstance(TransactionService, {
      sendAndConfirmTx: Promise.resolve(fakeTxReceipt),
    });
    // txService.sendAndConfirmTx.resolves(faketxreceipt)
    stub(config, "getConfig").returns(fakeConfig);

    txManager = new TxManager(txService as any, mkAddress("0xa"), pino());
    txManagerInterface = createStubInstance(utils.Interface, {
      encodeFunctionData: "foo",
    });
    erc20Interface = createStubInstance(utils.Interface, {
      encodeFunctionData: "bar",
    });
    (txManager as any).txManagerInterface = txManagerInterface;
    (txManager as any).erc20Interface = erc20Interface;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("Prepare", () => {
    const amount = "";

    it(`Should Prepare`, async () => {
      await txManager.prepare(1337, fakePrepareParams);

      expect(txManagerInterface.encodeFunctionData.callCount).to.eq(1);
      const call = txManagerInterface.encodeFunctionData.getCall(0);
      expect(call.args[0]).to.eq("prepare");
      expect(call.args[1]).to.deep.eq([
        {
          user: fakeTxData.user,
          router: fakeTxData.router,
          sendingAssetId: fakeTxData.sendingAssetId,
          receivingAssetId: fakeTxData.receivingAssetId,
          sendingChainFallback: fakeTxData.sendingChainFallback,
          receivingAddress: fakeTxData.receivingAddress,
          sendingChainId: fakeTxData.sendingChainId,
          receivingChainId: fakeTxData.receivingChainId,
          callDataHash: fakeTxData.callDataHash,
          transactionId: fakeTxData.transactionId,
        },
        fakePrepareParams.amount,
        fakePrepareParams.expiry,
        fakePrepareParams.encryptedCallData,
        fakePrepareParams.encodedBid,
        fakePrepareParams.bidSignature,
      ]);

      expect(txService.sendAndConfirmTx.callCount).to.eq(1);
      // assert call params
    });

    it("should throw an error if txService.sendAndConfirmTx throws an error", async () => {
      txService.sendAndConfirmTx.rejects("foo");

      await expect(
        txManager.prepare(1337, fakePrepareParams),
      ).to.eventually.be.rejectedWith("");
    });
  });
  describe("Fulfill", () => {
    it("should fulfill", async ()=>{

      const fakeVariantTxData:VariantTransactionData = {amount: "", expiry:"", preparedBlockNumber:1};
      const fakeFufillParams:FulfillParams = {
        txData: ({...fakeTxData,...fakeVariantTxData}) as TransactionData,
        callData: "",
        relayerFee: "",
        signature: "",
      }
      await txManager.fulfill(1337, fakeFufillParams);
      expect(txManagerInterface.encodeFunctionData.callCount).to.eq(1);
      const call = txManagerInterface.encodeFunctionData.getCall(0);
      expect(txService.sendAndConfirmTx.callCount).to.eq(1);


    })
  });
  describe("Cancel,", ()=>{
    it("should cancel", async()=>{
      const fakeVariantTxData:VariantTransactionData = {amount: "", expiry:"", preparedBlockNumber:1};

      const fakeCancelParams:CancelParams = {txData:({...fakeTxData,...fakeVariantTxData}) as TransactionData, relayerFee:"0",
      signature:"0xdeadbeef",}
      await txManager.cancel(4, fakeCancelParams);

      expect(txManagerInterface.encodeFunctionData.callCount).to.eq(1);

      const call = txManagerInterface.encodeFunctionData.getCall(0);
      // expect(txService.sendAndConfirmTx.callCount).to.eq(1);


    })
  })
  describe("Send Tx Wrapper,", ()=>{
    it("shoudlnt use try catch", async()=>{

      await txManager.sendTransactionWrapper(4, "0x00");

      expect(1 === 1);

    })
  })
});
