import { BigNumber, Signer, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";
import { expect } from "chai";
import pino from "pino";
import { ok } from "neverthrow";

import { ChainRpcProvider } from "../src/provider";
import { Transaction } from "../src/transaction";
import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
import {
  makeChaiReadable,
  TEST_FULL_TX,
  TEST_READ_TX,
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_TX_RECEIPT,
  TEST_TX_RESPONSE,
} from "./constants";
import { FullTransaction } from "../src/types";
import { getRandomAddress, getRandomBytes32 } from "@connext/nxtp-utils";
import { TransactionReadError } from "../src/error";

// TODO: main tests:
// - isReady
// - sendTransaction
// - readTransaction
// - getGasPrice
// - getBalance
// - estimateGas

// TODO: Error cases to handle here (i.e. make sure ChainRpcProvider handles correctly):
// - rpc failure
// - provider stops responding
// - no providers are in sync
// - bad data ?

const logger = pino({ level: process.env.LOG_LEVEL ?? "silent", name: "TransactionServiceTest" });

let signer: SinonStubbedInstance<Wallet>;
let chainProvider: ChainRpcProvider;

describe("ChainRpcProvider", () => {
  beforeEach(async () => {
    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TEST_TX_RESPONSE);
    signer.getTransactionCount.resolves(TEST_TX_RESPONSE.nonce);
    signer.connect.returns(signer);

    const chainId = TEST_SENDER_CHAIN_ID;
    const chainConfig: ChainConfig = {
      providers: [
        {
          url: "https://-------------",
        },
      ],
      confirmations: 1,
      confirmationTimeout: 10_000,
    };
    chainProvider = new ChainRpcProvider(logger, signer, chainId, chainConfig, DEFAULT_CONFIG);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("sendTransaction", () => {
    it("happy: should send the transaction", async () => {
      const result = await chainProvider.sendTransaction(TEST_FULL_TX);
      expect(signer.sendTransaction.callCount).to.equal(1);
      expect(makeChaiReadable(signer.sendTransaction.getCall(0).args[0])).to.deep.equal(
        makeChaiReadable({
          ...TEST_FULL_TX,
          nonce: TEST_TX_RESPONSE.nonce,
        }),
      );
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? makeChaiReadable(result.value) : null).to.be.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
    });

    it("should return error result if the signer sendTransaction call throws", async () => {
      const testError = new Error("test error");
      signer.sendTransaction.rejects(testError);
      const result = await chainProvider.sendTransaction(TEST_FULL_TX);
      expect(result.isErr()).to.be.true;
      expect(result.isErr() ? result.error : null).to.be.eq(testError);
    });
  });

  describe("readTransaction", () => {
    it("happy: should read the transaction", async () => {
      const fakeData = getRandomBytes32();
      signer.call.resolves(fakeData);

      const result = await chainProvider.readTransaction(TEST_READ_TX);

      expect(signer.call.callCount).to.equal(1);
      expect(signer.call.getCall(0).args[0]).to.deep.equal(TEST_READ_TX);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value : null).to.be.eq(fakeData);
    });

    it("should return error result if the signer readTransaction call throws", async () => {
      const testError = new Error("test error");
      signer.call.rejects(testError);
      const result = await chainProvider.readTransaction(TEST_READ_TX);

      expect(result.isErr()).to.be.true;
      if (result.isErr()) {
        expect(result.error instanceof TransactionReadError).to.be.true;
        expect(result.error.context.error).to.be.eq(testError);
      }
    });
  });

  describe("confirmTransaction", () => {
    it("happy: should confirm the transaction using response argument's wait method", async () => {
      const stub = Sinon.stub();
      stub.resolves(TEST_TX_RECEIPT);
      const testTransaction = {
        ...TEST_TX_RESPONSE,
        wait: stub,
      };
      const result = await chainProvider.confirmTransaction(testTransaction);
      expect(stub.callCount).to.equal(1);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? makeChaiReadable(result.value) : null).to.be.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("should return error result if the transaction wait method throws", async () => {
      const testError = new Error("test error");
      const stub = Sinon.stub();
      stub.rejects(testError);
      const testTransaction = {
        ...TEST_TX_RESPONSE,
        wait: stub,
      };
      const result = await chainProvider.confirmTransaction(testTransaction);
      expect(result.isErr()).to.be.true;
      expect(result.isErr() ? result.error : null).to.be.eq(testError);
    });
  });

  describe("getGasPrice", () => {
    it("should return the gas price", async () => {
      const result = await chainProvider.getGasPrice();
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value : null).to.be.eq(TEST_TX_RESPONSE.gasPrice);
    });
  });

  describe("getBalance", () => {
    it("should return the balance", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      signer.getBalance.resolves(testBalance);

      const result = await chainProvider.getBalance(testAddress);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value.eq(testBalance)).to.be.true;
      expect(signer.getBalance.callCount).to.equal(1);
      expect(signer.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });
  });

  describe("estimateGas", () => {
    it.skip("should return the gas estimate", async () => {
      const testAddress = getRandomAddress();
      signer.estimateGas.resolves(testGas);

      const result = await chainProvider.estimateGas(TEST_TX);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value.eq(testGas)).to.be.true;
      expect(signer.estimateGas.callCount).to.equal(1);
      expect(signer.estimateGas.getCall(0).args[0]).to.deep.eq(testAddress);
    });
  });

  describe("isReady", () => {
    it.skip("should give RpcError if provider network not ready", async () => {});
  });
});
