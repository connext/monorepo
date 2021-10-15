import { BigNumber, constants, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance } from "sinon";

import { Cached, Gas, SyncProvider, Transaction } from "../src/types";
import { ChainRpcProvider } from "../src/provider";
import { ChainConfig, DEFAULT_CONFIG } from "../src/config";
import {
  makeChaiReadable,
  TEST_FULL_TX,
  TEST_READ_TX,
  TEST_SENDER_CHAIN_ID,
  TEST_TX_RECEIPT,
  TEST_TX_RESPONSE,
  DEFAULT_GAS_LIMIT,
  TEST_TX,
} from "./constants";
import { getRandomAddress, getRandomBytes32, expect, Logger, NxtpError, RequestContext } from "@connext/nxtp-utils";
import {
  DispatchAborted,
  RpcError,
  TransactionReadError,
  TransactionReverted,
  TransactionServiceFailure,
} from "../src/error";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "DispatchTest",
});

let signer: SinonStubbedInstance<Wallet>;
let chainProvider: ChainRpcProvider;
let coreProvider: SinonStubbedInstance<providers.FallbackProvider>;
let transaction: Transaction;
let context: RequestContext = {
  id: "",
  origin: "",
};

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
      gasStations: [],
    };
    chainProvider = new ChainRpcProvider(
      logger,
      chainId,
      chainConfig,
      {
        ...DEFAULT_CONFIG,
        gasInitialBumpPercent: 20,
        gasPriceMaxIncreaseScalar: 200,
      },
      signer,
    );

    coreProvider = createStubInstance(providers.FallbackProvider);
    (chainProvider as any).provider = coreProvider;
    Sinon.stub(coreProvider, "ready").get(() => true);

    context.id = getRandomBytes32();
    context.origin = "TransactionDispatchTest";

    transaction = new Transaction(
      context,
      TEST_TX,
      TEST_TX_RESPONSE.nonce,
      new Gas(BigNumber.from(1), BigNumber.from(1)),
      {
        confirmationTimeout: 1,
        confirmationsRequired: 1,
      },
      "test_tx_uuid",
    );
    Sinon.stub(transaction, "params").get(() => TEST_FULL_TX);
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#sendTransaction", () => {
    it("happy: should send the transaction", async () => {
      const result = await (chainProvider as any).sendTransaction(transaction);

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

    it.skip("should return error if sending has been aborted", async () => {
      (chainProvider as any).aborted = true;
      const result = await (chainProvider as any).sendTransaction(transaction);
      expect(result.isErr()).to.be.true;
      expect(result.isErr() ? result.error.type : null).to.be.eq(DispatchAborted.type);
    });

    it("should return error result if the signer sendTransaction call throws", async () => {
      const testError = new Error("test error");
      signer.sendTransaction.rejects(testError);

      const result = await (chainProvider as any).sendTransaction(transaction);

      expect(result.isErr()).to.be.true;
      expect(result.isErr() ? result.error : null).to.be.eq(testError);
    });

    it("should fail if there is no signer", async () => {
      (chainProvider as any).signer = undefined;
      const result = await (chainProvider as any).sendTransaction(transaction);

      expect(result.isErr()).to.be.true;
      // expect(result.isErr() ? result.error : null).to.be.eq(NxtpError);
    });
  });

  describe("#confirmTransaction", () => {
    it("happy: should confirm the transaction using response argument's wait method", async () => {
      const stub = Sinon.stub();
      stub.resolves(TEST_TX_RECEIPT);
      transaction.responses = [
        {
          ...TEST_TX_RESPONSE,
          wait: stub,
        },
      ];

      const result = await chainProvider.confirmTransaction(transaction);

      expect(stub.callCount).to.equal(1);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? makeChaiReadable(result.value) : null).to.be.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("should return error result if the transaction wait method throws", async () => {
      const testError = new Error("test error");
      const stub = Sinon.stub();
      stub.rejects(testError);
      transaction.responses = [
        {
          ...TEST_TX_RESPONSE,
          wait: stub,
        },
      ];

      const result = await chainProvider.confirmTransaction(transaction);

      expect(result.isErr()).to.be.true;
      expect(result.isErr() ? result.error : null).to.be.eq(testError);
    });

    it.skip("should do a Promise.race on all responses", async () => {});
  });

  describe("#readTransaction", () => {
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

  describe("#estimateGas", () => {
    const rawCommand = "estimateGas";
    const rpcCommand = `eth_${rawCommand}`;
    const testGasLimit = DEFAULT_GAS_LIMIT.toString();
    const testTx = {
      chainId: TEST_SENDER_CHAIN_ID,
      to: getRandomAddress(),
      from: getRandomAddress(),
      data: getRandomBytes32(),
      value: utils.parseUnits("1", "ether"),
    };
    const hexlifiedTx = {
      chainId: utils.hexlify(TEST_SENDER_CHAIN_ID),
      to: utils.hexlify(testTx.to),
      from: utils.hexlify(testTx.from),
      data: utils.hexlify(testTx.data),
      value: utils.hexlify(testTx.value),
    };
    let goodRpcProvider: SinonStubbedInstance<providers.StaticJsonRpcProvider>;
    let badRpcProvider: SinonStubbedInstance<providers.StaticJsonRpcProvider>;

    beforeEach(() => {
      Sinon.stub(chainProvider as any, "syncedProviders").get(() => (chainProvider as any)._providers);

      const prepareResult: [string, any[]] = [rpcCommand, [hexlifiedTx]];
      // Overwrite the _providers core providers. We're going to have one "bad" provider
      // that rejects/fails, and one good one that will resolve.
      badRpcProvider = createStubInstance(providers.StaticJsonRpcProvider);
      goodRpcProvider = createStubInstance(providers.StaticJsonRpcProvider);
      badRpcProvider.prepareRequest.returns(prepareResult);
      goodRpcProvider.prepareRequest.returns(prepareResult);
      badRpcProvider.send.rejects(new Error("test error"));
      goodRpcProvider.send.resolves(testGasLimit);
    });

    it("happy: should return the gas estimate", async () => {
      // Testing with bad and good rpc providers.
      (chainProvider as any)._providers = [badRpcProvider, goodRpcProvider];

      const prepareResult: [string, any[]] = [rpcCommand, [hexlifiedTx]];
      const result = await chainProvider.estimateGas(testTx);

      // First, make sure we get the correct value back.
      expect(result.isOk(), result.isErr() ? result.error.toString() : "unknown").to.be.true;
      expect(result.isOk() && result.value.eq(BigNumber.from(testGasLimit))).to.be.true;

      // Now we make sure that all of the calls were made as expected.
      // prepareRequest:
      const prepareTransactionArg = {
        transaction: makeChaiReadable(testTx),
      };

      expect(badRpcProvider.prepareRequest.callCount).to.equal(1);
      let arg = {
        transaction: makeChaiReadable(badRpcProvider.prepareRequest.getCall(0).args[1].transaction),
      };
      expect(arg).to.deep.eq(prepareTransactionArg);

      expect(goodRpcProvider.prepareRequest.callCount).to.equal(1);
      arg = {
        transaction: makeChaiReadable(goodRpcProvider.prepareRequest.getCall(0).args[1].transaction),
      };
      expect(arg).to.deep.eq(prepareTransactionArg);

      // send:
      const prepareResultReadable = [prepareResult[0], makeChaiReadable(prepareResult[1])];
      expect(badRpcProvider.send.callCount).to.equal(1);
      let args = badRpcProvider.send.getCall(0).args;
      expect([args[0], makeChaiReadable(args[1])]).to.deep.eq(prepareResultReadable);
      expect(goodRpcProvider.send.callCount).to.equal(1);
      args = goodRpcProvider.send.getCall(0).args;
      expect([args[0], makeChaiReadable(args[1])]).to.deep.eq(prepareResultReadable);
    });

    it("should handle invalid value for gas estimate", async () => {
      // Good rpc provider - but will return an invalid value.
      (chainProvider as any)._providers = [goodRpcProvider];

      goodRpcProvider.send.resolves("thisisnotanumber");

      const result = await chainProvider.estimateGas(testTx);
      expect(
        result.isErr() &&
          result.error.isNxtpError &&
          result.error.message === TransactionServiceFailure.reasons.GasEstimateInvalid,
      ).to.be.true;
    });

    it("should error with RpcError if all providers have RpcError", async () => {
      (chainProvider as any)._providers = [badRpcProvider, badRpcProvider, badRpcProvider, badRpcProvider];
      badRpcProvider.send.rejects(new RpcError("test error"));

      const result = await chainProvider.estimateGas(testTx);
      expect(result.isErr() && result.error.isNxtpError && result.error.type === RpcError.type).to.be.true;
    });

    it("should short circuit and throw transaction reverted right away", async () => {
      // Should never reach the "good rpc providers" - we ALWAYS short circuit and throw TransactionReverted error immediately.
      (chainProvider as any)._providers = [badRpcProvider, goodRpcProvider, goodRpcProvider, goodRpcProvider];
      badRpcProvider.send.rejects(new TransactionReverted("test error"));

      const result = await chainProvider.estimateGas(testTx);
      expect(result.isErr() && result.error.isNxtpError && result.error.type === TransactionReverted.type).to.be.true;
      expect(goodRpcProvider.send.callCount).to.equal(0);
    });
  });

  describe("#getGasPrice", () => {
    it("happy: should return the gas price", async () => {
      const testGasPrice = utils.parseUnits("100", "gwei") as BigNumber;
      // Gas price gets bumped by X% in this method.
      const expectedGas = testGasPrice
        .add(testGasPrice.mul((chainProvider as any).config.gasInitialBumpPercent).div(100))
        .toString();
      coreProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(coreProvider.getGasPrice.callCount).to.equal(1);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGas);
    });

    it("should accept hardcoded values from config", async () => {
      const expectedGas = "197";
      (chainProvider as any).chainConfig.defaultInitialGas = expectedGas;
      const result = await (chainProvider as any).getGasPrice();
      expect(coreProvider.getGasPrice.callCount).to.equal(0);
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGas);
    });

    // TODO: Should eventually cache per block.
    it("should use cached gas price if calls < 3 seconds apart", async () => {
      const testGasPrice = utils.parseUnits("80", "gwei") as BigNumber;
      const expectedGas = testGasPrice
        .add(testGasPrice.mul((chainProvider as any).config.gasInitialBumpPercent).div(100))
        .toString();
      coreProvider.getGasPrice.resolves(testGasPrice);

      // First call should use provider.
      let result = await (chainProvider as any).getGasPrice();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGas);

      // Throwing in a bunk value to make sure this isn't called.
      coreProvider.getGasPrice.resolves(utils.parseUnits("1300", "gwei") as BigNumber);

      // Second call should use cached value.
      result = await (chainProvider as any).getGasPrice();

      // Values should be the same.
      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGas);
      // Provider should have only been called once.
      expect(coreProvider.getGasPrice.callCount).to.equal(1);
    });

    it("should bump gas price up to minimum if it is below that", async () => {
      // For test reliability, start from the config value and work backwards.
      const expectedGasPrice = (chainProvider as any).config.gasMinimum;
      const testGasPrice = BigNumber.from(expectedGasPrice)
        .sub(
          BigNumber.from(expectedGasPrice)
            .mul((chainProvider as any).config.gasInitialBumpPercent)
            .div(100),
        )
        .sub(utils.parseUnits("1", "gwei"));
      coreProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGasPrice);
    });

    it("should employ the gas price max increase scalar if configured and applicable", async () => {
      // For test reliability, start from the config value and work backwards.
      const testScalar = (chainProvider as any).config.gasPriceMaxIncreaseScalar;
      const testLastUsedGasPrice = utils.parseUnits("5", "gwei");
      (chainProvider as any).lastUsedGasPrice = testLastUsedGasPrice;
      // We're going to set the gas price our provider returns to the max value + 1 gwei.
      // We expect the getGasPrice method to cap the price it returns at the max value.
      const expectedGasPrice = testLastUsedGasPrice.mul(testScalar).div(100);
      const testGasPrice = expectedGasPrice.add(utils.parseUnits("1", "gwei"));
      coreProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() ? result.value.toString() : null).to.be.eq(expectedGasPrice.toString());
    });
  });

  describe("#getBalance", () => {
    it("happy: should return the balance", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      coreProvider.getBalance.resolves(testBalance);

      const result = await chainProvider.getBalance(testAddress);

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value.eq(testBalance)).to.be.true;
      expect(coreProvider.getBalance.callCount).to.equal(1);
      expect(coreProvider.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });
  });

  describe("#getDecimalsForAsset", () => {
    it("happy: should return 18 for the native asset", async () => {
      const result = await chainProvider.getDecimalsForAsset(constants.AddressZero);

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === 18).to.be.true;
    });
  });

  describe("#getBlockTime", () => {
    it("happy: should return the block time", async () => {
      const blockTime = Math.floor(Date.now() / 1000);
      coreProvider.getBlock.resolves({ timestamp: blockTime } as unknown as providers.Block);

      const result = await chainProvider.getBlockTime();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === blockTime).to.be.true;
      expect(coreProvider.getBlock.callCount).to.equal(1);
      expect(coreProvider.getBlock.getCall(0).args[0]).to.deep.eq("latest");
    });
  });

  describe("#getBlockNumber", () => {
    it("happy: should return the block number", async () => {
      const blockNumber = 13;
      coreProvider.getBlockNumber.resolves(blockNumber);

      const result = await chainProvider.getBlockNumber();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === blockNumber).to.be.true;
      expect(coreProvider.getBlockNumber.callCount).to.equal(1);
    });
  });

  describe("#getAddress", () => {
    it("happy: should return the address", async () => {
      const testAddress = getRandomAddress();
      signer.getAddress.resolves(testAddress);

      const result = await chainProvider.getAddress();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === testAddress).to.be.true;
      expect(signer.getAddress.callCount).to.equal(1);
    });
  });

  describe("#getTransactionReceipt", () => {
    it("happy: should return the transaction receipt", async () => {
      const testTransactionReceipt = {
        ...TEST_TX_RECEIPT,
      };
      coreProvider.getTransactionReceipt.resolves(testTransactionReceipt);

      const result = await chainProvider.getTransactionReceipt(TEST_TX_RECEIPT.transactionHash);

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === testTransactionReceipt).to.be.true;
      expect(coreProvider.getTransactionReceipt.callCount).to.equal(1);
      expect(coreProvider.getTransactionReceipt.getCall(0).args[0]).to.deep.eq(TEST_TX_RECEIPT.transactionHash);
    });
  });

  describe("#getTransactionCount", () => {
    it("happy: should return the transaction count", async () => {
      const testTransactionCount = Math.floor(Math.random() * 1000);
      signer.getTransactionCount.resolves(testTransactionCount);

      const result = await chainProvider.getTransactionCount();

      expect(result.isOk()).to.be.true;
      expect(result.isOk() && result.value === testTransactionCount).to.be.true;
      expect(signer.getTransactionCount.callCount).to.equal(1);
      expect(signer.getTransactionCount.getCall(0).args[0]).to.deep.eq("pending");
      // Make sure we didn't make any calls to provider for tx count.
      expect(coreProvider.getTransactionCount.callCount).to.equal(0);
    });
  });

  describe("#isReady", () => {
    it("should give RpcError if provider network not ready", async () => {
      Sinon.stub(coreProvider, "ready").get(() => false);

      const result = await chainProvider.getBlockTime();
      expect(result.isErr()).to.be.true;
      expect(result.isErr() && result.error.message === RpcError.reasons.OutOfSync).to.be.true;
    });
  });

  describe("#syncProviders", () => {
    let testSyncedBlockNumber = 1234567;
    let testOutOfSyncBlockNumber = 1234000;
    let syncedProvider: SinonStubbedInstance<SyncProvider>;
    let outOfSyncProvider: SinonStubbedInstance<SyncProvider>;
    let mockProviderUrl = "fakeprovider";
    beforeEach(() => {
      syncedProvider = Sinon.createStubInstance(SyncProvider);
      outOfSyncProvider = Sinon.createStubInstance(SyncProvider);
      syncedProvider.lag = -1;
      outOfSyncProvider.lag = -1;
      (syncedProvider as any)._syncedBlockNumber = testSyncedBlockNumber;
      (outOfSyncProvider as any)._syncedBlockNumber = testOutOfSyncBlockNumber;
      (syncedProvider as any).synced = true;
      (outOfSyncProvider as any).synced = true;
      Sinon.stub((syncedProvider as any), "url").get(() => mockProviderUrl);
      Sinon.stub((outOfSyncProvider as any), "url").get(() => mockProviderUrl);
    });

    it("happy", async () => {
      (chainProvider as any)._providers = [syncedProvider, outOfSyncProvider];
      await (chainProvider as any).syncProviders();

      expect(syncedProvider.lag).to.be.eq(0);
      const expectedOutOfSyncLag = testSyncedBlockNumber - testOutOfSyncBlockNumber;
      expect(outOfSyncProvider.lag).to.be.eq(expectedOutOfSyncLag);

      expect(syncedProvider.sync.callCount).to.equal(1);
      expect(outOfSyncProvider.sync.callCount).to.equal(1);

      expect(outOfSyncProvider.synced).to.be.false;
      expect(syncedProvider.synced).to.be.true;
    });
  });
});
