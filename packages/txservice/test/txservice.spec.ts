import { Signer } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { TransactionService } from "../src/txservice";
import { TransactionSigner } from "../src/signer";
import { Transaction } from "../src/transaction";
import { ChainRpcProvider } from "../src/provider";
import { tx, txReceipt, txResponse } from "./constants";
import { ChainError } from "../src/error";

let signer: SinonStubbedInstance<Signer>;
let txService: TransactionService;
let transaction: SinonStubbedInstance<Transaction>;

/// In these tests, we are testing the outer shell of txservice - the interface, not the core functionality.
/// For core functionality tests, see transaction.spec.ts and provider.spec.ts.
const log = pino({ level: "debug", name: "TransactionServiceTest" });
describe("TransactionService unit test", () => {
  beforeEach(() => {
    signer = createStubInstance(TransactionSigner);
    signer.connect.returns(signer as any);
    (signer as any)._isSigner = true;

    const chainProvider = createStubInstance(ChainRpcProvider);
    // chainProvider.confirmationTimeout = 60_000;
    // chainProvider.confirmationsRequired = txReceipt.confirmations;
    // // Object.setPrototypeOf(JsonRpcProvider, Sinon.stub().callsFake(() => _chainProvider));
    // const _coreProvider = createStubInstance(JsonRpcProvider);
    // // (_chainProvider as any).provider = _coreProvider;
    // _coreProvider.sendTransaction.resolves(txResponse);
    // _coreProvider.waitForTransaction.resolves(txReceipt);

    // chainProvider.getGasPrice.resolves(txResponse.gasPrice);
    // chainProvider.sendTransaction.resolves({ response: txResponse, success: true });
    // chainProvider.confirmTransaction.resolves({ receipt: txReceipt, success: true });

    const chains = {
      "1337": {
        providers: [
          { url: "https://fakeurl.com" },
          // { url: "" },
        ],
        confirmations: 1,
      },
      "1338": {
        providers: [{ url: "https://fakeurl.com" }],
        confirmations: 1,
      },
    };

    txService = new TransactionService(log, signer, { chains });
    // (signer as any).provider = _coreProvider;
    // signer.sendTransaction.resolves(txResponse);
    (txService as any).getProvider = (chainId: number) => chainProvider;

    transaction = Sinon.createStubInstance(Transaction);
    transaction.send.resolves(txResponse);
    transaction.confirm.resolves(txReceipt);
    (txService as any).createTx = () => transaction;
  });

  afterEach(() => {
    restore();
    reset();
  });

  // TODO: Test read and events/listeners.

  describe("sendTx", () => {
    // Error cases to handle:
    // rpc failure
    // provider stops responding
    // no providers are in sync
    // nonce is expired
    // invalid data ?

    it.skip("errors if cannot get provider", async () => {
      // TODO: Use original fn not working.
      (txService as any).getProvider = (TransactionService as any).getProvider;
      await expect(txService.sendTx(99999, tx)).to.be.rejectedWith(ChainError.reasons.ProviderNotFound);
    });

    it("retries transaction with higher gas price", async () => {
      // We would expect transaction to reject with confirmation timeout in this edge case.
      transaction.confirm.onCall(0).rejects(new ChainError(ChainError.reasons.ConfirmationTimeout));
      transaction.confirm.onCall(1).resolves(txReceipt);
      // This should send the tx, then attempt to confirm, fail, bump gas, and receive confirmation the second time.
      const result = await txService.sendTx(1337, tx);
      expect(result).to.deep.eq(txReceipt);
      expect(transaction.confirm.callCount).to.equal(2);
      expect(transaction.bumpGasPrice.callCount).to.equal(1);
      
    });

    it("should throw if gas price goes above maximum", async () => {
      transaction.bumpGasPrice.rejects(new ChainError(ChainError.reasons.MaxGasPriceReached));

    });

    it("happy: tx sent and confirmed", async () => {
      const result = await txService.sendTx(1337, tx);
      expect(result).to.deep.eq(txReceipt);
    });
  });

  describe("readTx", () => {
  });
});
