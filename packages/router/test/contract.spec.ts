import { expect } from "chai";
import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import pino from "pino";
import { TransactionService } from "@connext/nxtp-txservice";
import { mkAddress, mkBytes32 } from "@connext/nxtp-utils";
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
    let amount = "";

    it(`should work`, async () => {
      await txManager.prepare(1337, { amount, encryptedCallData, bidSignature, encodedBid, expiry, txData });

      expect(txManagerInterface.encodeFunctionData.callCount).to.eq(1);
      const call = txManagerInterface.encodeFunctionData.getCall(0);
      expect(call.args[0]).to.eq("prepare");
      expect(call.args[1]).to.deep.eq([
        {
          user: txData.user,
          router: txData.router,
          sendingAssetId: txData.sendingAssetId,
          receivingAssetId: txData.receivingAssetId,
          sendingChainFallback: txData.sendingChainFallback,
          receivingAddress: txData.receivingAddress,
          sendingChainId: txData.sendingChainId,
          receivingChainId: txData.receivingChainId,
          callDataHash: txData.callDataHash,
          transactionId: txData.transactionId,
        },
        amount,
        expiry,
        encryptedCallData,
        encodedBid,
        bidSignature,
      ]);

      expect(txService.sendAndConfirmTx.callCount).to.eq(1);
      // assert call params
    });

    it("should throw an error if txService.sendAndConfirmTx throws an error", async () => {
      txService.sendAndConfirmTx.rejects("foo");

      await expect(
        txManager.prepare(1337, { amount, encryptedCallData, bidSignature, encodedBid, expiry, txData }),
      ).to.eventually.be.rejectedWith("foo");
    });
  });
});
