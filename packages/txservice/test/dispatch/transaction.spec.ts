import { BigNumber } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import pino from "pino";
import { err, ok } from "neverthrow";

import { TransactionDispatch } from "../../src/dispatch";
import { Transaction } from "../../src/dispatch/transaction";
import { DEFAULT_CONFIG } from "../../src/config";
import {
  TEST_TX,
  TEST_TX_RESPONSE,
  TEST_TX_RECEIPT,
  DEFAULT_GAS_LIMIT,
  TEST_FULL_TX,
  makeChaiReadable,
} from "../constants";
import {
  AlreadyMined,
  RpcError,
  TimeoutError,
  TransactionKilled,
  TransactionReplaced,
  TransactionReverted,
  TransactionServiceFailure,
} from "../../src/error";
import { mkHash, expect } from "@connext/nxtp-utils";
import { Gas } from "../../src/types";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let transaction: Transaction;
let dispatch: SinonStubbedInstance<TransactionDispatch>;
let gas: SinonStubbedInstance<Gas>;
let gasPrice: BigNumber;
let nonce: number;

describe.skip("Transaction", () => {
  beforeEach(async () => {
    // These values would be set before the tx is created.
    nonce = TEST_FULL_TX.nonce;
    gasPrice = TEST_TX_RESPONSE.gasPrice;

    // Stub dispatch.
    dispatch = createStubInstance(TransactionDispatch);

    // These configured values are usually read by Transaction in some methods.
    (dispatch as any).confirmationTimeout = 60_000;
    (dispatch as any).confirmationsRequired = 1;

    dispatch.estimateGas.resolves(ok(DEFAULT_GAS_LIMIT));
    dispatch.getGasPrice.resolves(ok(TEST_TX_RESPONSE.gasPrice));
    dispatch.sendTransaction.resolves(ok(TEST_TX_RESPONSE));
    dispatch.confirmTransaction.resolves(ok(TEST_TX_RECEIPT));
    (dispatch as any).config = DEFAULT_CONFIG;

    gas = createStubInstance(Gas);
    (gas as any).limit = DEFAULT_GAS_LIMIT;
    Sinon.stub(gas, "price").get(() => TEST_TX_RESPONSE.gasPrice);
    Sinon.stub(gas, "price").set((value: BigNumber) => {
      gasPrice = value;
    });

    transaction = new Transaction(
      logger,
      dispatch as unknown as TransactionDispatch,
      TEST_TX,
      nonce,
      gas as unknown as Gas,
    );
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#submit", () => {
    it("should return true if transaction was submitted", async () => {
      await transaction.submit();
      expect(transaction.didSubmit).to.be.true;
    });

    it("should return false if transaction was not submitted", async () => {
      expect(transaction.didSubmit).to.be.false;
    });
  });

  describe("didFinish", () => {
    it("should return true if transaction was finished", async () => {
      await transaction.submit();
      await transaction.validate();
      await transaction.confirm();
      expect(transaction.didFinish).to.be.true;
    });

    it("should return false if transaction has no receipt", async () => {
      await transaction.submit();
      expect(transaction.didFinish).to.be.false;
    });

    it("should return false if transaction has receipt but not enough confirmations", async () => {
      const timeoutError = new TimeoutError();
      dispatch.confirmTransaction.rejects(timeoutError);

      await transaction.submit();
      await expect(transaction.validate()).to.be.rejectedWith(timeoutError);
      expect(transaction.didFinish).to.be.false;
    });
  });

  describe("#submit", () => {
    it("happy: submit returns correct response", async () => {
      const response = await transaction.submit();
      // Expect response to be correct.

      expect(makeChaiReadable(response)).to.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
      // Ensure that we called the nested chain provider method.
      expect(dispatch.sendTransaction.callCount).eq(1);
      const sendTransactionCall = dispatch.sendTransaction.getCall(0);
      const targetTx = sendTransactionCall.args[0];

      expect(makeChaiReadable(targetTx.params)).to.deep.eq(makeChaiReadable(TEST_FULL_TX));
    });

    it("won't replace transaction without a higher gas price", async () => {
      // First call should go through fine.
      const response = await transaction.submit();
      expect(response).to.deep.eq(TEST_TX_RESPONSE);

      // Now we send off another tx to replace the last one. It should reject before sending.
      await expect(transaction.submit()).to.be.rejectedWith(TransactionServiceFailure);
    });

    it("increments attempt, even if tx fails", async () => {
      await transaction.submit();
      expect(transaction.attempt).eq(1);

      const testError = new RpcError(RpcError.reasons.ConnectionReset);
      dispatch.sendTransaction.rejects(testError);
      // Now we send off another tx to replace the last one. It should reject before sending.
      await expect(transaction.submit()).to.be.rejectedWith(testError);
      expect(transaction.attempt).eq(2);
    });

    it("throws if you try to submit after the tx already didFinish", async () => {
      await transaction.submit();
      await transaction.validate();
      await transaction.confirm();
      await expect(transaction.submit()).to.be.rejectedWith(TransactionServiceFailure);
    });

    it("handles nonce expired cases by retrying", async () => {
      // Computed test attempts to make sure this test stays working.
      const testAttempts = Math.floor((transaction as any).config.maxNonceErrorCount / 2);
      const nonceExpiredError = new AlreadyMined(AlreadyMined.reasons.NonceExpired);
      dispatch.sendTransaction.resolves(err(nonceExpiredError));
      dispatch.sendTransaction.onCall(testAttempts - 1).resolves(ok(TEST_TX_RESPONSE));
      await transaction.submit();
      expect(dispatch.sendTransaction.callCount).eq(testAttempts);
    });

    it("won't handle nonce expired case if we've already submitted once before", async () => {
      const nonceExpiredError = new AlreadyMined(AlreadyMined.reasons.NonceExpired);
      await transaction.submit();
      dispatch.sendTransaction.resolves(err(nonceExpiredError));

      // Simulate confirmation, for test reliability.
      dispatch.confirmTransaction.resolves(err(new TimeoutError()));
      await expect(transaction.confirm()).to.be.rejectedWith(TimeoutError);
      await transaction.bumpGasPrice();

      // Now we should get the nonce expired error.
      await expect(transaction.submit()).to.be.rejectedWith(nonceExpiredError);
    });
  });

  describe("#validate", async () => {
    it("happy: confirmation on first loop", async () => {
      const response = await transaction.validate();
      expect(response).to.be.true;
    });

    it("should throw if you have not submitted yet", async () => {
      const response = await transaction.validate();
      expect(response).to.be.false;
    });

    it("escalates error if confirmation times out", async () => {
      const timeoutError = new TimeoutError();
      dispatch.confirmTransaction.resolves(err(timeoutError));
      await transaction.submit();
      await expect(transaction.confirm()).to.be.rejectedWith(timeoutError);
    });

    it("will confirm the mined transaction when multiple have been submitted", async () => {
      // This test functioning is dependent on the confirmations required being set to 1!
      // Just to be sure this test stays working, we set it to 1 again here.
      (dispatch as any).confirmationsRequired = 1;
      TEST_TX_RECEIPT.confirmations = 1;

      // We'll send 8 tx's in total (meaning 7 are gas bumps), and the fifth will be the one that got mined.
      // This is pretty unrealistic, but it's how we can be sure that transaction handles replacements correctly.
      const sendCount = 8;
      const minedTxIndex = 5;
      const txs = new Array(sendCount).fill(0).map((_, i) => {
        const tx = {
          ...TEST_TX_RESPONSE,
          hash: mkHash(),
        };
        dispatch.sendTransaction.onCall(i).resolves(ok(tx));
        dispatch.confirmTransaction.onCall(i).resolves(err(new TimeoutError()));
        return tx;
      });

      // The last confirm attempt in the stack should give us the replacement error, including the receipt for the mined tx.
      dispatch.confirmTransaction.onCall(sendCount - 1).resolves(
        err(
          new TransactionReplaced(
            {
              ...TEST_TX_RECEIPT,
              transactionHash: txs[minedTxIndex].hash,
            },
            txs[minedTxIndex],
          ),
        ),
      );

      // Simulate sending (and attempting to confirm) many transactions.
      for (let i = 0; i < sendCount - 1; i++) {
        await transaction.submit();
        await expect(transaction.confirm()).to.be.rejectedWith(TimeoutError);
        await transaction.bumpGasPrice();
      }

      // The last transaction should be confirmed with the replacement receipt.
      const receipt = await transaction.confirm();
      // Just the compare the hashes, make sure the receipt is the correct one.
      expect(receipt.transactionHash).to.deep.eq(txs[minedTxIndex].hash);
      // Make sure the privately set (mined) response is the correct one.
      expect(makeChaiReadable((transaction as any).response)).to.deep.eq(makeChaiReadable(txs[minedTxIndex]));
    });

    it.skip("handles event where transaction is replaced by unfamiliar transaction", async () => {});

    it("will confirm the mined transaction when multiple have been submitted", async () => {});
  });

  describe("#confirm", async () => {
    it("happy: confirmation on first loop", async () => {
      await transaction.submit();
      const receipt = await transaction.confirm();
      // Expect receipt to be correct.
      expect(receipt).to.deep.eq(TEST_TX_RECEIPT);
      // Ensure confirmTransaction was called.
      expect(dispatch.confirmTransaction.callCount).eq(1);
      const confirmTransaction = dispatch.confirmTransaction.getCall(0);
      // Ensure we pass the correct response.
      expect(confirmTransaction.args[0]).to.deep.eq(TEST_TX_RESPONSE);
    });

    it("throws if you have not submitted yet", async () => {
      await expect(transaction.confirm()).to.be.rejectedWith(TransactionServiceFailure);
    });

    it("throws if you have not validated yet", async () => {
      await transaction.submit();
      await expect(transaction.confirm()).to.be.rejectedWith(TransactionServiceFailure);

      // Set validated to true (should fail, response is undefined).
      // Set mined response (should fail, receipt is still undefined).
      // Set receipt (this should work).
    });

    it("escalates error if confirmation times out", async () => {
      const timeoutError = new TimeoutError();
      dispatch.confirmTransaction.resolves(err(timeoutError));
      await transaction.submit();
      await expect(transaction.confirm()).to.be.rejectedWith(timeoutError);
    });

    it("won't return until it has the required number of confirmations", async () => {
      // Raise confirmations required count for this test to 10.
      const testConfirmationsRequired = 10;
      (dispatch as any).confirmationsRequired = testConfirmationsRequired;

      // We should call confirm transaction twice, once for the first confirmation, and
      // again to get the required number of confirmations.
      dispatch.confirmTransaction.onCall(0).resolves(
        ok({
          ...TEST_TX_RECEIPT,
          confirmations: 1,
        }),
      );
      dispatch.confirmTransaction.onCall(1).resolves(
        ok({
          ...TEST_TX_RECEIPT,
          confirmations: testConfirmationsRequired,
        }),
      );

      await transaction.submit();
      const receipt = await transaction.confirm();
      expect(receipt.confirmations).to.eq(testConfirmationsRequired);
      expect(dispatch.confirmTransaction.callCount).eq(2);
    });

    it("does not handle case where transaction is replaced", async () => {});

    it("if receipt status == 0, errors out immediately with appropriate error", async () => {
      dispatch.confirmTransaction.resolves(
        err(
          new TransactionReverted(TransactionReverted.reasons.CallException, {
            ...TEST_TX_RECEIPT,
            status: 0,
          }),
        ),
      );
      await transaction.submit();
      await expect(transaction.confirm()).to.be.rejectedWith(TransactionReverted);
      // Make sure we save the above receipt.
      expect(transaction.receipt).to.not.be.undefined;
      expect(transaction.receipt.status).to.eq(0);
    });
  });

  describe("#bumpGasPrice", async () => {
    it("happy: bumps by configured percentage", async () => {
      const originalGasPrice = transaction.params.gasPrice;
      await transaction.bumpGasPrice();
      expect(gas.price.gt(originalGasPrice)).to.be.true;
    });

    // TODO:Should instead rely on max attempts here.
    it.skip("throws if it would bump above max gas price", async () => {
      // Make it so the gas price will return exactly == the maximum (which is acceptable).
      (transaction as any).gasPrice._gasPrice = BigNumber.from(DEFAULT_CONFIG.gasMaximum);

      // First call should go through fine.
      const response = await transaction.submit();
      expect(response).to.deep.eq(TEST_TX_RESPONSE);

      // This should throw, as we are attempting to bump above the maximum.
      expect(await transaction.bumpGasPrice()).to.throw(TransactionServiceFailure.reasons.MaxAttemptsReached);
    });
  });

  describe("#kill", async () => {
    it("happy: kills the transaction, preventing further submits", async () => {
      transaction.kill();
      expect(transaction.discontinued).to.be.true;
      expect(await transaction.submit()).to.be.rejectedWith(TransactionKilled);
    });

    it("still allows transaction to confirm", async () => {
      await transaction.submit();
      transaction.kill();
      // expect(await transaction.confirm()).to.deep.eq();
    });
  });
});
