import { providers, Signer, BigNumber } from "ethers";
import { AddressZero, One, Zero } from "@ethersproject/constants";
import { mkHash, mkAddress, jsonifyError } from "@connext/nxtp-utils";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance, stub } from "sinon";
import { expect } from "chai";
import pino from "pino";

import { TransactionService } from "../src/txservice";
import { MinimalTransaction } from "../src/types";
import { TransactionSigner } from "../src/signer";
import { ChainRpcProvider } from "../src/provider";
import { ChainError } from "../src/error";
import { Transaction } from "../src/transaction";
import { DEFAULT_CONFIG } from "../src/config";
import { tx, txReceipt, txResponse } from "./constants";

type TransactionReceipt = providers.TransactionReceipt;
type TransactionResponse = providers.TransactionResponse;

let transaction: Transaction;
let chainProvider: SinonStubbedInstance<ChainRpcProvider>;

const log = pino({ level: "debug", name: "TransactionServiceTest" });
describe("TransactionService unit test", () => {
  beforeEach(() => {
    chainProvider = createStubInstance(ChainRpcProvider);
    chainProvider.confirmationTimeout = 60_000;
    chainProvider.confirmationsRequired = txReceipt.confirmations;
    chainProvider.getGasPrice.resolves(txResponse.gasPrice);
    chainProvider.sendTransaction.resolves({ response: txResponse, success: true });
    chainProvider.confirmTransaction.resolves({ receipt: txReceipt, success: true });
    (chainProvider as any).config = DEFAULT_CONFIG;

    transaction = new Transaction(log, chainProvider as unknown as ChainRpcProvider, tx, DEFAULT_CONFIG);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("send", () => {
    // beforeEach(() => {

    // });

    // Error cases to handle:
    // rpc failure
    // provider stops responding
    // no providers are in sync
    // nonce is expired
    // invalid data ?

    it("handles event where confirmation times out", async () => {
      chainProvider.confirmTransaction.onCall(0).resolves({
        receipt: new Error("timeout exceeded"),
        success: false,
      });
    });

    // it("errors if cannot get a signer", async () => {

    // });

    // it("errors if cannot get provider", async () => {

    // });

    // it("if receipt status == 0, errors out", async () => {

    // });

    // it("retries transaction with higher gas price", async () => {

    // });

    it("throws if you try to bump above max gas price", async () => {
      chainProvider.getGasPrice.resolves(BigNumber.from(DEFAULT_CONFIG.gasLimit));

      // First call should go through.
      const response = await transaction.send();
      expect(response).to.deep.eq(txResponse);

      // This should throw.
      transaction.bumpGasPrice();
      // chainProvider.confirmTransaction.onCall(1).resolves({ receipt: txReceipt, success: true });
      // expect(async () => await txService.sendTx(1337, tx)).to.throw(ChainError.reasons.MaxGasPriceReached);
    });

    it("happy: send returns correct response", async () => {
      const response = await transaction.send();
      // Expect response to be correct.
      expect(response).to.deep.eq(txResponse);
      // Ensure that we called the nested chain provider method.
      expect(chainProvider.sendTransaction.callCount).eq(1);
      const sendTransactionCall = chainProvider.sendTransaction.getCall(0);
      expect(sendTransactionCall.args[0]).to.deep.eq({
        ...tx,
        nonce: undefined,
        gasPrice: txResponse.gasPrice,
      });
    });
  });

  describe("confirm", async () => {
    it("throws if you have not submitted yet", async () => {
      await expect(transaction.confirm()).to.be.rejectedWith(ChainError.reasons.TxNotFound);
    });

    it("happy: confirmation on first loop", async () => {
      const response = await transaction.send();
      const receipt = await transaction.confirm();
      // Expect receipt to be correct.
      expect(receipt).to.deep.eq(txReceipt);
      // Ensure confirmTransaction was called.
      expect(chainProvider.confirmTransaction.callCount).eq(1);
      const confirmTransaction = chainProvider.confirmTransaction.getCall(0);
      // Ensure we passed correct hash.
      expect(confirmTransaction.args[0]).to.eq(response.hash);
    });
  });
});
