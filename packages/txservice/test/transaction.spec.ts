import { BigNumber } from "ethers";
import { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { ChainRpcProvider } from "../src/provider";
import { Transaction } from "../src/transaction";
import { DEFAULT_CONFIG } from "../src/config";
import { tx, txReceipt, txResponse } from "./constants";
import { ok } from "neverthrow";
import { TransactionServiceFailure } from "../src/error";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let transaction: Transaction;
let chainProvider: SinonStubbedInstance<ChainRpcProvider>;

describe("Transaction", () => {
  beforeEach(async () => {
    chainProvider = createStubInstance(ChainRpcProvider);
    chainProvider.confirmationTimeout = 60_000;
    chainProvider.confirmationsRequired = txReceipt.confirmations;
    chainProvider.getGasPrice.resolves(ok(txResponse.gasPrice));
    chainProvider.sendTransaction.resolves(ok(txResponse));
    (chainProvider as any).config = DEFAULT_CONFIG;

    transaction = await Transaction.create(logger, chainProvider as unknown as ChainRpcProvider, tx, DEFAULT_CONFIG);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("submit", () => {
    // Error cases to handle:
    // nonce is expired
    // invalid data ?

    it("won't replace transaction without a higher gas price", async () => {
      // First call should go through fine.
      const response = await transaction.submit();
      expect(response).to.deep.eq(txResponse);

      // Now we send off another tx to replace the last one. It should reject before sending.
      await expect(transaction.submit()).to.be.rejectedWith(TransactionServiceFailure);
    });

    it("happy: submit returns correct response", async () => {
      const response = await transaction.submit();
      // Expect response to be correct.

      expect(response).to.deep.eq(txResponse);
      // Ensure that we called the nested chain provider method.
      expect(chainProvider.sendTransaction.callCount).eq(1);
      const sendTransactionCall = chainProvider.sendTransaction.getCall(0);
      const targetTx = sendTransactionCall.args[0];

      expect({
        ...targetTx,
        gasPrice: targetTx.gasPrice.toString(),
      }).to.deep.eq({
        ...tx,
        gasPrice: txResponse.gasPrice.toString(),
        nonce: undefined,
      });
    });
  });

  describe("confirm", async () => {
    it("throws if you have not submitted yet", async () => {
      await expect(transaction.confirm()).to.be.rejectedWith(TransactionServiceFailure);
    });

    // it("won't return until it gets enough confirmations", async () => {
    //   // 1/10th of a second timeout for testing.
    //   chainProvider.confirmationTimeout = 100;
    //   // Wow, that's a lot of confirmations!
    //   chainProvider.confirmationsRequired = 99;
    //   chainProvider.confirmTransaction.resolves({
    //     receipt: {
    //       ...txReceipt,
    //       // Going to be specific in only having 1 confirmation this time around.
    //       confirmations: 1,
    //     },
    //     success: true,
    //   });
    //   chainProvider.confirmTransaction.onCall(1).resolves({

    //   });

    //   await transaction.confirm();
    // });

    it.skip("handles event where confirmation times out", async () => {
      // 1/10th of a second timeout for testing.
      chainProvider.confirmationTimeout = 100;
      // chainProvider.confirmTransaction.resolves({
      //   receipt: new Error("timeout exceeded"),
      //   success: false,
      // });
    });

    it("if receipt status == 0 (for only 1 tx), errors out immediately", async () => {});

    it("if all the receipts have a status == 0, errors out immediately", async () => {});

    it("will attempt to confirm all previously attempted transactions", async () => {});

    it.skip("happy: confirmation on first loop", async () => {
      const response = await transaction.submit();
      const receipt = await transaction.confirm();
      // Expect receipt to be correct.
      expect(receipt).to.deep.eq(txReceipt);
      // Ensure confirmTransaction was called.
      // expect(chainProvider.confirmTransaction.callCount).eq(1);
      // const confirmTransaction = chainProvider.confirmTransaction.getCall(0);
      // Ensure we passed correct hash.
      // expect(confirmTransaction.args[0]).to.eq(response.hash);
    });
  });

  describe("bumpGasPrice", async () => {
    it("throws if it would bump above max gas price", async () => {
      // Make it so the gas price will return exactly == the limit (which is acceptable).
      (transaction as any).gasPrice._gasPrice = BigNumber.from(DEFAULT_CONFIG.gasLimit)

      // First call should go through fine.
      const response = await transaction.submit();
      expect(response).to.deep.eq(txResponse);

      // This should throw, as we are attempting to bump above the limit.
      expect(() => transaction.bumpGasPrice()).to.throw(TransactionServiceFailure.reasons.MaxGasPriceReached);
    });
  });
});
