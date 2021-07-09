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
    // beforeEach(() => {

    // });

    // Error cases to handle:
    // rpc failure
    // provider stops responding
    // no providers are in sync
    // nonce is expired
    // invalid data ?

    // it("errors if cannot get a signer", async () => {

    // });

    it("errors if cannot get provider", async () => {
      (txService as any).getProvider = (TransactionService as any).getProvider;
      expect(async () => await txService.sendTx(99999, tx)).to.throw(ChainError.reasons.ProviderNotFound);
    });

    // it("if receipt status == 0, errors out", async () => {

    // });

    // it("retries transaction with higher gas price", async () => {

    // });

    // it("stops trying to send if at max gas price", async () => {
    //   chainProvider.getGasPrice.resolves((txService as any).config.gasLimit);
    //   chainProvider.confirmTransaction.onCall(0).resolves({
    //     receipt: new Error("timeout exceeded"),
    //     success: false,
    //   });
    //   chainProvider.confirmTransaction.onCall(1).resolves({ receipt: txReceipt, success: true });
    //   expect(async () => await txService.sendTx(1337, tx)).to.throw(ChainError.reasons.MaxGasPriceReached);
    // });

    it("happy: tx sent and confirmed", async () => {
      const result = await txService.sendTx(1337, tx);
      expect(result).to.deep.eq(txReceipt);
    });
  });

  describe("readTx", () => {
    // it.skip("happy: confirmation on first loop", async () => {
    //   const result = await txService.sendTx(1337, tx);
    //   expect(signer.sendTransaction.callCount).eq(1);
    //   const sendTransactionCall = signer.sendTransaction.getCall(0);
    //   expect(sendTransactionCall.args[0]).eq(tx);
    //   expect(result).to.deep.eq(txReceipt);
    // });
  });
});
