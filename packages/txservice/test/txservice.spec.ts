import { providers, Signer, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { TransactionService } from "../src/txservice";
import { Transaction } from "../src/transaction";
import { ChainRpcProvider } from "../src/provider";
import { makeChaiReadable, tx, txReceipt, txResponse } from "./constants";
import { TimeoutError } from "../src/error";
import { getRandomBytes32, RequestContext } from "@connext/nxtp-utils";

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let signer: SinonStubbedInstance<Signer>;
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

  beforeEach(() => {
    didFinish = false;
    confirmCount = 0;

    chainProvider = createStubInstance(ChainRpcProvider);
    transaction = createStubInstance(Transaction);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);
    // chainProvider.confirmationTimeout = 60_000;
    // chainProvider.confirmationsRequired = txReceipt.confirmations;

    const chains = {
      "1337": {
        providers: [{ url: "https://-------------.com" }],
        confirmations: 1,
      },
      "1338": {
        providers: [{ url: "https://-------------.com" }],
        confirmations: 1,
      },
    };

    txService = new TransactionService(logger, signer, { chains });
    (txService as any).getProvider = () => chainProvider;

    Sinon.stub(Transaction, "create").callsFake(async (): Promise<Transaction> => {
      return transaction as unknown as Transaction;
    });
    transaction.submit.resolves(txResponse);
    // This will be updated once the transaction resolver is called.
    // transaction.confirm.restore();
    transaction.confirm.callsFake(async (): Promise<providers.TransactionReceipt> => {
      if (confirmCount === confirmAttemptShouldSucceed) {
        didFinish = true;
        transaction.receipt = txReceipt;
        return txReceipt;
      } else {
        confirmCount++;
        throw new TimeoutError();
      }
    });
    // transaction.didFinish.restore();
    transaction.didFinish.callsFake((): boolean => {
      return didFinish;
    });
    Sinon.stub(transaction, "data").get(() => tx);

    context.id = getRandomBytes32();
    context.origin = "TransactionServiceTest"
  });

  afterEach(() => {
    restore();
    reset();
  });

  // TODO: Test read and events/listeners.

  describe("sendTx", () => {
    // TODO: Error cases to handle:
    // nonce is expired
    // invalid data ?

    // TODO: Fix issue with this unit test.
    // it.skip("errors if cannot get provider", async () => {
    //   // Replacing this method with the original fn not working.
    //   (txService as any).getProvider.restore();
    //   await expect(txService.sendTx({ ...tx, chainId: 9999 }, context)).to.be.rejectedWith(TransactionServiceFailure);
    // });

    it("retries transaction with higher gas price", async () => {
      console.log("onCall setting");
      // We would expect transaction to reject with confirmation timeout in this edge case.
      confirmAttemptShouldSucceed = 1;
      // This should send the tx, then attempt to confirm, fail, bump gas, and receive confirmation the second time.
      console.log("sending")
      await txService.sendTx(tx, context);

      expect(transaction.confirm.callCount).to.equal(2);
      expect(transaction.bumpGasPrice.callCount).to.equal(1);
    });

    it("happy: tx sent and confirmed", async () => {
      const receipt = await txService.sendTx(tx, context);
      console.log(receipt);
      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(txReceipt));
    });
  });

  describe("readTx", () => {});
});
