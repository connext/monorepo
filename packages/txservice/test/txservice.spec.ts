import { BigNumber, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { NxtpTxServiceEvents, TransactionService } from "../src/txservice";
import { Transaction } from "../src/transaction";
import { ChainRpcProvider } from "../src/provider";
import { makeChaiReadable, TEST_SENDER_CHAIN_ID, TEST_TX, TEST_TX_RESPONSE, TEST_TX_RECEIPT, TEST_READ_TX } from "./constants";
import { TimeoutError, TransactionServiceFailure } from "../src/error";
import { getRandomAddress, getRandomBytes32, RequestContext } from "@connext/nxtp-utils";
import { DEFAULT_CONFIG } from "../src/config";
import { ok } from "neverthrow";
import { EvtError } from "evt";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let signer: SinonStubbedInstance<Wallet>;
let txService: TransactionService;
let chainProvider: SinonStubbedInstance<ChainRpcProvider>;
let transaction: SinonStubbedInstance<Transaction>;
let context: RequestContext = {
  id: "",
  origin: ""
}

/// In these tests, we are testing the outer shell of txservice - the interface, not the core functionality.
/// For core functionality tests, see transaction.spec.ts and provider.spec.ts.
describe("TransactionService", () => {
  let didFinish = false;
  let confirmCount = 0;
  let confirmAttemptShouldSucceed = 0;
  let gasPrice = 

  beforeEach(() => {
    didFinish = false;
    confirmCount = 0;
    confirmAttemptShouldSucceed = 0;

    chainProvider = createStubInstance(ChainRpcProvider);
    transaction = createStubInstance(Transaction);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);
    // chainProvider.confirmationTimeout = 60_000;
    // chainProvider.confirmationsRequired = txReceipt.confirmations;

    const chains = {
      [TEST_SENDER_CHAIN_ID.toString()]: {
        providers: [{ url: "https://-------------" }],
        confirmations: 1,
      },
    };

    txService = new TransactionService(logger, signer, { chains });
    Sinon.stub(txService as any, "getProvider").callsFake((chainId: number) => {
      // NOTE: We check to make sure we are only getting the one chainId we expect
      // to get in these unit tests.
      expect(chainId).to.be.eq(TEST_SENDER_CHAIN_ID);
      return chainProvider;
    });
    // (txService as any).getProvider = (chainId: number) => {
    //   // NOTE: We check to make sure we are only getting the one chainId we expect
    //   // to get in these unit tests.
    //   expect(chainId).to.be.eq(TEST_SENDER_CHAIN_ID);
    //   return chainProvider;
    // };

    Sinon.stub(Transaction, "create").callsFake(async (): Promise<Transaction> => {
      return transaction as unknown as Transaction;
    });
    transaction.submit.resolves(TEST_TX_RESPONSE);
    // This will be updated once the transaction resolver is called.
    transaction.confirm.callsFake(async (): Promise<providers.TransactionReceipt> => {
      if (confirmCount === confirmAttemptShouldSucceed) {
        didFinish = true;
        transaction.receipt = TEST_TX_RECEIPT;
        return TEST_TX_RECEIPT;
      } else {
        confirmCount++;
        throw new TimeoutError();
      }
    });
    transaction.didFinish.callsFake((): boolean => {
      return didFinish;
    });
    Sinon.stub(transaction, "data").get(() => ({
      ...TEST_TX,
      nonce: undefined,
      gasLimit: DEFAULT_CONFIG.gasLimit,
    }));

    context.id = getRandomBytes32();
    context.origin = "TransactionServiceTest"
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("sendTx", () => {
    it("happy: tx sent and confirmed", async () => {
      const receipt = await txService.sendTx(TEST_TX, context);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("retries transaction with higher gas price", async () => {
      // We would expect transaction to reject with confirmation timeout in this edge case.
      confirmAttemptShouldSucceed = 1;
      // This should send the tx, then attempt to confirm, fail, bump gas, and receive confirmation the second time.
      await txService.sendTx(TEST_TX, context);

      expect(transaction.confirm.callCount).to.equal(2);
      expect(transaction.bumpGasPrice.callCount).to.equal(1);
    });
  });

  describe("readTx", () => {
    it("happy: returns exactly what it reads", async () => {
      const fakeData = getRandomBytes32();
      chainProvider.readTransaction.resolves(ok(fakeData));

      const data = await txService.readTx(TEST_READ_TX);
      expect(data).to.deep.eq(fakeData);
      expect(chainProvider.readTransaction.callCount).to.equal(1);
      expect(chainProvider.readTransaction.args[0][0]).to.deep.eq(TEST_READ_TX);
    });
  });

  describe("getProvider", () => {
    it("errors if cannot get provider", async () => {
      // Replacing this method with the original fn not working.
      (txService as any).getProvider.restore();
      await expect(txService.sendTx({ ...TEST_TX, chainId: 9999 }, context)).to.be.rejectedWith(TransactionServiceFailure);
    });
  });

  describe("getBalance", () => {
    it("happy", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();

      chainProvider.getBalance.resolves(ok(testBalance));
      const balance = await txService.getBalance(TEST_SENDER_CHAIN_ID, testAddress);
      expect(balance.eq(testBalance)).to.be.true;
      expect(chainProvider.getBalance.callCount).to.equal(1);
      expect(chainProvider.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });
  });

  // describe("estimateGas", () => {
  //   it("happy", async () => {
  //     const testGas = utils.parseUnits("42", "eth");
  //     const testAddress = TEST_TX.from;

  //     chainProvider.estimateGas.resolves(ok(testGas));
  //     const gas = await txService.estimateGas(TEST_SENDER_CHAIN_ID, testAddress);
  //     expect(gas.eq(testGas));
  //     expect(chainProvider.estimateGas.callCount).to.equal(1);
  //     expect(chainProvider.estimateGas.args[0][0]).to.deep.eq(testAddress);
  //   });
  // });

  // TODO: Maybe we should test whether the events are firing for each event type?
  describe("attach", () => {
    it("should attach callback to event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // We want to be certain that the event will be triggered each time.
      const testAttempts = 5;
      confirmAttemptShouldSucceed = testAttempts - 1;
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(testAttempts);
    });

    it("should properly use filtering condition", async () => {
      // Fake bumping up the gas price. We'll use this as part of the filtering condition below.
      const testAttempts = 8;
      for (let i = 1; i <= testAttempts; i++) {
        transaction.submit.onCall(i).resolves({
          ...TEST_TX_RESPONSE,
          gasPrice: BigNumber.from(i),
        });
      }

      // Spy should only be called 'targetCalls' number of times.
      const targetCalls = 3;
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy, (data): boolean => {
        return data.response.gasPrice.gt(testAttempts - targetCalls);
      });

      confirmAttemptShouldSucceed = testAttempts;
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(targetCalls);
    });
  });

  describe("attachOnce", () => {
    it("should attach listener to event, and only be called once", async () => {
      const spy = Sinon.spy();
      txService.attachOnce(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // We want to be certain that the event will be triggered only once.
      confirmAttemptShouldSucceed = 5;
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(1);
    });

    it("should properly use filtering condition", async () => {
      // Rinse and repeat the last filtering condition test.
      const testAttempts = 8;
      for (let i = 1; i <= testAttempts; i++) {
        transaction.submit.onCall(i).resolves({
          ...TEST_TX_RESPONSE,
          gasPrice: BigNumber.from(i),
        });
      }

      // Spy should only be called once.
      const spy = Sinon.spy();
      // The attempt # that will trigger the spy.
      const targetAttemptTrigger = 5;
      txService.attachOnce(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy, (data): boolean => {
        return data.response.gasPrice.gt(targetAttemptTrigger);
      });

      confirmAttemptShouldSucceed = testAttempts;
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(1);
      expect(spy.args[0][0].response.gasPrice.eq(targetAttemptTrigger));
    });
  });

  describe("detach", () => {
    it("should remove listener from event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // Event should be triggered for this round.
      await txService.sendTx(TEST_TX, context);
      expect(spy.callCount).to.equal(1);

      // Event should NOT be triggered for this round.
      txService.detach(NxtpTxServiceEvents.TransactionAttemptSubmitted);
      await txService.sendTx(TEST_TX, context);
      // Call count should remain the same.
      expect(spy.callCount).to.equal(1);
    });
  });

  describe("waitFor", () => {
    it("should wait for event", async () => {
      const spy = Sinon.spy();
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, spy);

      // Wrap in a promise here to be sure that the waitFor call is blocking.
      const promise = new Promise<boolean>(async (resolve) => {
        await txService.waitFor(NxtpTxServiceEvents.TransactionAttemptSubmitted, 10_000);
        resolve(spy.callCount === 1);
      });

      expect(promise).to.eventually.be.true;
      await txService.sendTx(TEST_TX, context);
    });

    it("should expire after timeout", async () => {
      txService.attach(NxtpTxServiceEvents.TransactionAttemptSubmitted, () => {});
      await expect(txService.waitFor(NxtpTxServiceEvents.TransactionAttemptSubmitted, 10)).to.be.rejectedWith(EvtError.Timeout);
    });
  });
});
