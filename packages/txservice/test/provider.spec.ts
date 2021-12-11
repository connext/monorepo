import axios from "axios";
import { BigNumber, constants, Contract, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance, SinonStub } from "sinon";
import { getRandomAddress, getRandomBytes32, expect, Logger, NxtpError, RequestContext } from "@connext/nxtp-utils";

import { ChainRpcProvider } from "../src/provider";
import { ChainConfig, DEFAULT_CHAIN_CONFIG } from "../src/config";
import {
  OnchainTransaction,
  SyncProvider,
  GasEstimateInvalid,
  RpcError,
  TimeoutError,
  TransactionReadError,
  TransactionReverted,
} from "../src";
import {
  makeChaiReadable,
  TEST_FULL_TX,
  TEST_READ_TX,
  TEST_SENDER_CHAIN_ID,
  TEST_TX_RECEIPT,
  TEST_TX_RESPONSE,
  DEFAULT_GAS_LIMIT,
  TEST_TX,
} from "./utils";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "DispatchTest",
});

let signer: SinonStubbedInstance<Wallet>;
let chainProvider: ChainRpcProvider;
let coreFallbackProvider: SinonStubbedInstance<providers.FallbackProvider>;
let transaction: OnchainTransaction;
let context: RequestContext = {
  id: "",
  origin: "",
};
let coreSyncProvider: SinonStubbedInstance<SyncProvider>;

// We're going to stub the execute() method of ChainRpcProvider, then restore it just to test it alone.
const fakeExecuteMethod = async <T>(_: boolean, method: (provider: SyncProvider) => Promise<T>): Promise<T> => {
  return method(coreSyncProvider as any);
};

let syncProvidersStub: SinonStub;

describe("ChainRpcProvider", () => {
  beforeEach(async () => {
    signer = createStubInstance(Wallet);
    signer.sendTransaction.resolves(TEST_TX_RESPONSE);
    signer.getTransactionCount.resolves(TEST_TX_RESPONSE.nonce);
    signer.connect.returns(signer);

    const chainId = TEST_SENDER_CHAIN_ID;
    const config: ChainConfig = {
      ...DEFAULT_CHAIN_CONFIG,
      providers: [
        {
          url: "https://-------------",
        },
      ],
      confirmations: 1,
      confirmationTimeout: 10_000,
    };

    syncProvidersStub = Sinon.stub(ChainRpcProvider.prototype as any, "syncProviders").resolves();
    chainProvider = new ChainRpcProvider(logger, chainId, config, signer);
    // One block = 10ms for the purposes of testing.
    (chainProvider as any).blockPeriod = 10;
    Sinon.stub(chainProvider as any, "execute").callsFake(fakeExecuteMethod);

    coreFallbackProvider = createStubInstance(providers.FallbackProvider);
    (chainProvider as any).fallbackProvider = coreFallbackProvider;
    Sinon.stub(coreFallbackProvider, "ready").get(() => true);
    (coreFallbackProvider as any)._isProvider = true;

    coreSyncProvider = Sinon.createStubInstance(SyncProvider);
    (coreSyncProvider as any)._syncedBlockNumber = 123;
    (coreSyncProvider as any).synced = true;
    (coreSyncProvider as any).url = "https://-------fakeProvider------";
    Sinon.stub(coreSyncProvider, "syncedBlockNumber").get(() => (coreSyncProvider as any)._syncedBlockNumber);
    (chainProvider as any).providers = [coreSyncProvider];
    Sinon.stub(coreSyncProvider, "ready").get(() => true);
    coreSyncProvider.sync.resolves();
    (coreSyncProvider as any)._isProvider = true;

    context.id = getRandomBytes32();
    context.origin = "TransactionDispatchTest";

    transaction = new OnchainTransaction(
      context,
      TEST_TX,
      TEST_TX_RESPONSE.nonce,
      {
        limit: BigNumber.from(24007),
        price: utils.parseUnits("5", "gwei"),
      },
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
      expect(makeChaiReadable(result)).to.be.deep.eq(makeChaiReadable(TEST_TX_RESPONSE));
    });

    it("should return error result if the signer sendTransaction call throws", async () => {
      const testError = new Error("test error");
      signer.sendTransaction.rejects(testError);

      await expect((chainProvider as any).sendTransaction(transaction)).to.be.rejectedWith(testError);
    });

    it("should fail if there is no signer", async () => {
      const testError = new Error("test error");
      (chainProvider as any).signer = undefined;
      Sinon.stub(chainProvider as any, "checkSigner").throws(testError);
      await expect((chainProvider as any).sendTransaction(transaction)).to.be.rejectedWith(testError);
    });
  });

  describe("#confirmTransaction", () => {
    let getTransactionReceiptStub: SinonStub;
    let waitStub: SinonStub;
    beforeEach(() => {
      getTransactionReceiptStub = Sinon.stub(chainProvider as any, "getTransactionReceipt").resolves(TEST_TX_RECEIPT);
      waitStub = Sinon.stub(chainProvider as any, "wait").resolves();
      transaction.responses = [TEST_TX_RESPONSE];
    });

    it("happy", async () => {
      const result = await chainProvider.confirmTransaction(transaction);

      expect(getTransactionReceiptStub.callCount).to.equal(1);
      expect(makeChaiReadable(result)).to.be.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
    });

    it("should throw if no successful and error(s) were thrown", async () => {
      const testError = new Error("fail");
      getTransactionReceiptStub.rejects(testError);

      await expect(chainProvider.confirmTransaction(transaction)).to.be.rejectedWith(testError);
    });

    it("should wait until receipt returns and confirmations are insufficient", async () => {
      const testDesiredConfirmations = 42;
      const insufficientConfirmations = 29;
      const currentBlockNumber = 1234567;
      const insufficientReceipt = {
        ...TEST_TX_RECEIPT,
        confirmations: insufficientConfirmations,
      };
      const sufficientReceipt = {
        ...TEST_TX_RECEIPT,
        confirmations: testDesiredConfirmations,
      };
      getTransactionReceiptStub.onCall(0).resolves(null);
      getTransactionReceiptStub.onCall(1).resolves(insufficientReceipt);
      getTransactionReceiptStub.onCall(2).resolves(sufficientReceipt);

      // So we can check the block args in the wait call below.
      (chainProvider as any).cache.update(currentBlockNumber);
      // To ensure we don't bother with the initial wait mechanism.
      transaction.minedBlockNumber = -1;

      const result = await chainProvider.confirmTransaction(transaction, testDesiredConfirmations);

      expect(waitStub.callCount).to.equal(2);
      // Should wait # of blocks equal to # of desired confirmations.
      expect(waitStub.getCall(0).args[0]).to.be.deep.eq(testDesiredConfirmations);
      expect(waitStub.getCall(1).args[0]).to.be.deep.eq(testDesiredConfirmations - insufficientConfirmations);
      expect(makeChaiReadable(result)).to.be.deep.eq(makeChaiReadable(sufficientReceipt));
    });

    it("should throw timeout error if pushed over the timeout threshold", async () => {
      // This shouldn't be valid input normally, but since the method uses a variable (timedOut) to ensure
      // at least one iteration gets executed, this will work.
      const testTimeout = -1;
      getTransactionReceiptStub.resolves(null);

      await expect(chainProvider.confirmTransaction(transaction, 10, testTimeout)).to.be.rejectedWith(TimeoutError);
    });

    it("should throw reverting transactions if no receipts are successful", async () => {
      const testDesiredConfirmations = 13;
      const numTransactions = 10;
      const testHashes = new Array(numTransactions).fill("").map(() => getRandomBytes32());
      const revertedHash = testHashes[7];
      transaction.responses = new Array(numTransactions).fill(0).map((_, i) => ({
        ...TEST_TX_RESPONSE,
        hash: testHashes[i],
      }));
      getTransactionReceiptStub.callsFake((hash) => {
        const index = testHashes.indexOf(hash);
        if (index === -1) {
          // It should definitely have been one of the hashes supplied above.
          throw new Error("invalid hash");
        }
        return hash === revertedHash
          ? {
              ...TEST_TX_RECEIPT,
              confirmations: testDesiredConfirmations,
              status: 0,
            }
          : null;
      });

      await expect(chainProvider.confirmTransaction(transaction, testDesiredConfirmations)).to.be.rejectedWith(
        TransactionReverted,
      );
      expect(waitStub.callCount).to.equal(0);
    });

    it("should not throw reverted transactions if one receipt is successful", async () => {
      // NOTE: Theoretically, this should be possible - we shouldn't have reverted txs, but rather
      // a successful tx should 'replace' the others. However, if a provider is out of sync with others,
      // a misread could occur: we want to be absolutely certain that this scenario is guarded against.
      const testDesiredConfirmations = 13;
      const numTransactions = 10;
      const testHashes = new Array(numTransactions).fill("").map(() => getRandomBytes32());
      const revertedHash = testHashes[7];
      const successfulHash = testHashes[8];
      transaction.responses = new Array(numTransactions).fill(0).map((_, i) => ({
        ...TEST_TX_RESPONSE,
        hash: testHashes[i],
      }));
      const expectedReceipt = {
        ...TEST_TX_RECEIPT,
        confirmations: testDesiredConfirmations,
        status: 1,
      };
      getTransactionReceiptStub.callsFake((hash) => {
        const index = testHashes.indexOf(hash);
        if (index === -1) {
          // It should definitely have been one of the hashes supplied above.
          throw new Error("invalid hash");
        }
        return hash === revertedHash
          ? {
              ...TEST_TX_RECEIPT,
              confirmations: testDesiredConfirmations,
              status: 0,
            }
          : hash === successfulHash
          ? expectedReceipt
          : null;
      });
      const result = await chainProvider.confirmTransaction(transaction, testDesiredConfirmations);
      expect(makeChaiReadable(result)).to.be.deep.eq(makeChaiReadable(expectedReceipt));
    });
  });

  describe("#readTransaction", () => {
    it("happy: should read the transaction", async () => {
      const fakeData = getRandomBytes32();
      signer.call.resolves(fakeData);

      const result = await chainProvider.readTransaction(TEST_READ_TX);

      expect(signer.call.callCount).to.equal(1);
      expect(signer.call.getCall(0).args[0]).to.deep.equal(TEST_READ_TX);
      expect(result).to.be.eq(fakeData);
    });

    it("should return error result if the signer readTransaction call throws", async () => {
      const testError = new Error("test error");
      signer.call.rejects(testError);

      // The error.context.error is the "test error" thrown by the signer.call.
      await expect(chainProvider.readTransaction(TEST_READ_TX)).to.be.rejectedWith(TransactionReadError);
    });

    it("should execute with provider if no signer available", async () => {
      const fakeData = getRandomBytes32();
      (chainProvider as any).signer = undefined;
      coreSyncProvider.call.resolves(fakeData);

      const result = await chainProvider.readTransaction(TEST_READ_TX);

      expect(signer.call.callCount).to.equal(0);
      expect(coreSyncProvider.call.callCount).to.equal(1);
      expect(coreSyncProvider.call.getCall(0).args[0]).to.deep.equal(TEST_READ_TX);
      expect(result).to.be.eq(fakeData);
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
    let prepareResult: [string, any[]];

    beforeEach(() => {
      prepareResult = [rpcCommand, [hexlifiedTx]];
      coreSyncProvider.prepareRequest.returns(prepareResult);
      coreSyncProvider.send.resolves(testGasLimit);
    });

    it("happy: should return the gas estimate", async () => {
      const result = await chainProvider.estimateGas(testTx);

      // First, make sure we get the correct value back.
      expect(result.eq(BigNumber.from(testGasLimit))).to.be.true;

      // Now we make sure that all of the calls were made as expected.
      // prepareRequest:
      const prepareTransactionArg = {
        transaction: makeChaiReadable(testTx),
      };

      expect(coreSyncProvider.prepareRequest.callCount).to.equal(1);
      const arg = {
        transaction: makeChaiReadable(coreSyncProvider.prepareRequest.getCall(0).args[1].transaction),
      };
      expect(arg).to.deep.eq(prepareTransactionArg);

      // send:
      const prepareResultReadable = [prepareResult[0], makeChaiReadable(prepareResult[1])];
      expect(coreSyncProvider.send.callCount).to.equal(1);
      const args = coreSyncProvider.send.getCall(0).args;
      expect([args[0], makeChaiReadable(args[1])]).to.deep.eq(prepareResultReadable);
    });

    it("should handle invalid value for gas estimate", async () => {
      const badValue = "thisisnotanumber";
      coreSyncProvider.send.resolves(badValue);
      await expect(chainProvider.estimateGas(testTx)).to.be.rejectedWith(GasEstimateInvalid.getMessage(badValue));
    });

    it("should throw errors that occur during send", async () => {
      const testError = new Error("test error");
      coreSyncProvider.send.rejects(testError);
      await expect(chainProvider.estimateGas(testTx)).to.be.rejectedWith(testError);
    });

    it("should inflate gas limit by configured inflation value", async () => {
      const testInflation = BigNumber.from(10_000);
      (chainProvider as any).config.gasLimitInflation = testInflation;
      const result = await chainProvider.estimateGas(testTx);
      expect(result.eq(BigNumber.from(testGasLimit).add(testInflation))).to.be.true;
    });
  });

  describe("#getGasPrice", () => {
    it("happy: should return the gas price", async () => {
      const testGasPrice = utils.parseUnits("100", "gwei") as BigNumber;
      // Gas price gets bumped by X% in this method.
      const expectedGas = testGasPrice
        .add(testGasPrice.mul((chainProvider as any).config.gasPriceInitialBoostPercent).div(100))
        .toString();
      coreSyncProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(coreSyncProvider.getGasPrice.callCount).to.equal(1);
      expect(result.toString()).to.be.eq(expectedGas);
    });

    it("should accept hardcoded values from config", async () => {
      const expectedGas = "197";
      (chainProvider as any).config.hardcodedGasPrice = expectedGas;
      const result = await (chainProvider as any).getGasPrice();
      expect(coreSyncProvider.getGasPrice.callCount).to.equal(0);
      expect(result.toString()).to.be.eq(expectedGas);
    });

    // TODO: Should eventually cache per block.
    it("should use cached gas price if calls < 3 seconds apart", async () => {
      const testGasPrice = utils.parseUnits("80", "gwei") as BigNumber;
      const expectedGas = testGasPrice
        .add(testGasPrice.mul((chainProvider as any).config.gasPriceInitialBoostPercent).div(100))
        .toString();
      coreSyncProvider.getGasPrice.resolves(testGasPrice);

      // First call should use provider.
      let result = await (chainProvider as any).getGasPrice();
      expect(result.toString()).to.be.eq(expectedGas);

      // Throwing in a bunk value to make sure this isn't called.
      coreSyncProvider.getGasPrice.resolves(utils.parseUnits("1300", "gwei") as BigNumber);

      // Second call should use cached value.
      result = await (chainProvider as any).getGasPrice();

      // Values should be the same.
      expect(result.toString()).to.be.eq(expectedGas);
      // Provider should have only been called once.
      expect(coreSyncProvider.getGasPrice.callCount).to.equal(1);
    });

    it("should bump gas price up to minimum if it is below that", async () => {
      // For test reliability, start from the config value and work backwards.
      const expectedGasPrice = (chainProvider as any).config.gasPriceMinimum;
      const testGasPrice = BigNumber.from(expectedGasPrice)
        .sub(
          BigNumber.from(expectedGasPrice)
            .mul((chainProvider as any).config.gasPriceInitialBoostPercent)
            .div(100),
        )
        .sub(utils.parseUnits("1", "gwei"));
      coreSyncProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(result.toString()).to.be.eq(expectedGasPrice);
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
      coreSyncProvider.getGasPrice.resolves(testGasPrice);

      const result = await (chainProvider as any).getGasPrice();

      expect(result.toString()).to.be.eq(expectedGasPrice.toString());
    });

    it("should use gas station if available", async () => {
      const testGasPriceGwei = 42;
      const testGasPrice = utils.parseUnits(testGasPriceGwei.toString(), "gwei") as BigNumber;
      (chainProvider as any).config.gasStations = ["...fakeaddy..."];
      const axiosStub = Sinon.stub(axios, "get").resolves({ data: { fast: testGasPriceGwei.toString() } });

      const result = await (chainProvider as any).getGasPrice();

      expect(result.toString()).to.be.eq(testGasPrice.toString());
      expect(axiosStub.callCount).to.equal(1);
      expect(coreSyncProvider.getGasPrice.callCount).to.equal(0);
    });

    it("should resort to provider gas price if gas station fails", async () => {
      const testGasPrice = utils.parseUnits("42", "gwei") as BigNumber;
      (chainProvider as any).config.gasStations = ["...fakeaddy..."];
      coreSyncProvider.getGasPrice.resolves(testGasPrice);
      const axiosStub = Sinon.stub(axios, "get").rejects(new Error("test"));
      const expectedGas = testGasPrice
        .add(testGasPrice.mul((chainProvider as any).config.gasPriceInitialBoostPercent).div(100))
        .toString();

      const result = await (chainProvider as any).getGasPrice();

      expect(result.toString()).to.be.eq(expectedGas);
      expect(axiosStub.callCount).to.equal(1);
      expect(coreSyncProvider.getGasPrice.callCount).to.equal(1);
    });

    it("should handle unexpected params as a gas station failure", async () => {
      const testGasPrice = utils.parseUnits("42", "gwei") as BigNumber;
      (chainProvider as any).config.gasStations = ["...fakeaddy..."];
      coreSyncProvider.getGasPrice.resolves(testGasPrice);
      const axiosStub = Sinon.stub(axios, "get").resolves({ data: "bad data, so sad! :(" });

      const result = await (chainProvider as any).getGasPrice();

      expect(axiosStub.callCount).to.equal(1);
      expect(coreSyncProvider.getGasPrice.callCount).to.equal(1);
    });

    it("should cap gas price if it hits configured absolute maximum", async () => {
      const testGasPrice = utils.parseUnits("100", "gwei") as BigNumber;
      (chainProvider as any).config.gasPriceMaximum = testGasPrice;
      coreSyncProvider.getGasPrice.resolves(testGasPrice.add(utils.parseUnits("1", "gwei")));

      const result = await (chainProvider as any).getGasPrice();

      expect(result.toString()).to.be.eq(testGasPrice.toString());
    });
  });

  describe("#getBalance", () => {
    it("happy: should return the balance", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      coreSyncProvider.getBalance.resolves(testBalance);

      const result = await chainProvider.getBalance(testAddress, constants.AddressZero);

      expect(result.eq(testBalance)).to.be.true;
      expect(coreSyncProvider.getBalance.callCount).to.equal(1);
      expect(coreSyncProvider.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });
  });

  describe("#getDecimalsForAsset", () => {
    let testAssetId = getRandomAddress();
    let contractDecimalsStub: SinonStub;
    const testDecimals = 42;

    beforeEach(() => {
      contractDecimalsStub = Sinon.stub().resolves(testDecimals);
      (Contract.prototype as any).decimals = contractDecimalsStub;
    });

    it("happy", async () => {
      const result = await chainProvider.getDecimalsForAsset(testAssetId);
      expect(result).to.eq(testDecimals);
      // Check to make sure the result was cached.
      expect((chainProvider as any).cachedDecimals[testAssetId]).to.eq(testDecimals);
    });

    it("happy: should return 18 for the native asset", async () => {
      const result = await chainProvider.getDecimalsForAsset(constants.AddressZero);
      expect(result).to.be.eq(18);
    });

    it("should use cached decimals", async () => {
      (chainProvider as any).cachedDecimals[testAssetId] = testDecimals;
      const result = await chainProvider.getDecimalsForAsset(testAssetId);
      expect(result).to.eq(testDecimals);
      expect(contractDecimalsStub.callCount).to.eq(0);
    });
  });

  describe("#getBlockTime", () => {
    it("happy: should return the block time", async () => {
      const blockTime = Math.floor(Date.now() / 1000);
      coreSyncProvider.getBlock.resolves({ timestamp: blockTime } as unknown as providers.Block);

      const result = await chainProvider.getBlockTime();

      expect(result).to.be.eq(blockTime);
      expect(coreSyncProvider.getBlock.callCount).to.equal(1);
      expect(coreSyncProvider.getBlock.getCall(0).args[0]).to.deep.eq("latest");
    });
  });

  describe("#getBlockNumber", () => {
    it("happy: should return the block number", async () => {
      const blockNumber = 13;
      coreSyncProvider.getBlockNumber.resolves(blockNumber);

      const result = await chainProvider.getBlockNumber();

      expect(result).to.be.eq(blockNumber);
      expect(coreSyncProvider.getBlockNumber.callCount).to.equal(1);
    });
  });

  describe("#getAddress", () => {
    it("happy: should return the address", async () => {
      const testAddress = getRandomAddress();
      signer.getAddress.resolves(testAddress);

      const result = await chainProvider.getAddress();

      expect(result).to.be.eq(testAddress);
      expect(signer.getAddress.callCount).to.equal(1);
    });

    it("should fail if there is no signer available", async () => {
      const testError = new Error("test: no signer available");
      Sinon.stub(chainProvider as any, "checkSigner").throws(testError);

      await expect(chainProvider.getAddress()).to.be.rejectedWith(testError);
    });
  });

  describe("#getTransactionReceipt", () => {
    it("happy: should return the transaction receipt", async () => {
      const testTransactionReceipt = {
        ...TEST_TX_RECEIPT,
      };
      coreSyncProvider.getTransactionReceipt.resolves(testTransactionReceipt);

      const result = await chainProvider.getTransactionReceipt(TEST_TX_RECEIPT.transactionHash);

      expect(result).to.be.eq(testTransactionReceipt);
      expect(coreSyncProvider.getTransactionReceipt.callCount).to.equal(1);
      expect(coreSyncProvider.getTransactionReceipt.getCall(0).args[0]).to.deep.eq(TEST_TX_RECEIPT.transactionHash);
    });
  });

  describe("#getTransactionCount", () => {
    it("happy: should return the transaction count", async () => {
      const testTransactionCount = Math.floor(Math.random() * 1000);
      coreSyncProvider.getTransactionCount.resolves(testTransactionCount);
      const testAddress = getRandomAddress();
      signer.getAddress.resolves(testAddress);

      const result = await chainProvider.getTransactionCount();

      expect(result).to.be.eq(testTransactionCount);
      expect(coreSyncProvider.getTransactionCount.callCount).to.equal(1);
      expect(coreSyncProvider.getTransactionCount.getCall(0).args).to.deep.eq([testAddress, "latest"]);
      // Make sure we didn't make any calls directly to signer for tx count.
      expect(signer.getTransactionCount.callCount).to.equal(0);
    });

    it("uses cached transaction count if available", async () => {
      const testTransactionCount = Math.floor(Math.random() * 1000);
      (chainProvider as any).cache.set({ transactionCount: testTransactionCount });

      const result = await chainProvider.getTransactionCount();

      expect(result).to.be.eq(testTransactionCount);
      expect(coreSyncProvider.getTransactionCount.callCount).to.equal(0);
    });
  });

  describe("#checkSigner", () => {
    it("throws if no signer available", async () => {
      (chainProvider as any).signer = undefined;
      expect(() => (chainProvider as any).checkSigner()).to.throw(NxtpError);
    });
  });

  describe("#execute", () => {
    let goodRpcProvider: any = {};
    let badRpcProvider: any = {};
    const testRpcError = new RpcError("test: bad rpc provider");
    let testSyncProviders: any[] = [];
    let shuffleSyncedProvidersStub: Sinon.SinonStub;
    const mockMethodParam = (provider: any) => provider.method();

    beforeEach(() => {
      shuffleSyncedProvidersStub = Sinon.stub(chainProvider as any, "shuffleSyncedProviders").callsFake(
        () => testSyncProviders,
      );
      goodRpcProvider.method = Sinon.stub().resolves(true);
      badRpcProvider.method = Sinon.stub().rejects(testRpcError);
      (chainProvider as any).execute.restore();
    });

    it("happy", async () => {
      // Testing with bad and good rpc providers.
      testSyncProviders = [badRpcProvider, goodRpcProvider];

      // First, make sure we get the correct value back.
      expect(await (chainProvider as any).execute(false, mockMethodParam)).to.be.true;
      expect(badRpcProvider.method.callCount).to.equal(1);
      expect(goodRpcProvider.method.callCount).to.equal(1);
      expect(shuffleSyncedProvidersStub.callCount).to.equal(1);
    });

    it("should fail if the call needs a signer and needsSigner throws", async () => {
      const testError = new Error("test: needs signer");
      Sinon.stub(chainProvider as any, "checkSigner").throws(testError);
      await expect((chainProvider as any).execute(true, () => {})).to.be.rejectedWith(testError);
    });

    it("should error with RpcError if all providers throw an RpcError", async () => {
      testSyncProviders = [badRpcProvider, badRpcProvider, badRpcProvider, badRpcProvider];
      const testError = new RpcError("test error");
      badRpcProvider.method.rejects(testError);

      expect(badRpcProvider.method.callCount).to.equal(0);
      await expect((chainProvider as any).execute(false, mockMethodParam)).to.be.rejectedWith(RpcError);
      expect(badRpcProvider.method.callCount).to.equal(testSyncProviders.length);
    });

    it("should short circuit and throw transaction reverted (i.e. non-RpcError) right away", async () => {
      // Should never reach the "good rpc providers" - we ALWAYS short circuit and throw TransactionReverted error immediately.
      testSyncProviders = [badRpcProvider, goodRpcProvider, goodRpcProvider, goodRpcProvider];
      const revertedError = new TransactionReverted("test error");
      badRpcProvider.method.rejects(revertedError);

      await expect((chainProvider as any).execute(false, mockMethodParam)).to.be.rejectedWith(revertedError);
      expect(goodRpcProvider.method.callCount).to.equal(0);
    });
  });

  describe("#syncProviders", () => {
    const testSyncedBlockNumber = 1234567;
    const testOutOfSyncBlockNumber = 1234000;
    let outOfSyncProvider: SinonStubbedInstance<SyncProvider>;

    beforeEach(() => {
      outOfSyncProvider = Sinon.createStubInstance(SyncProvider);
      coreSyncProvider.sync.callsFake(async () => {
        (coreSyncProvider as any)._syncedBlockNumber = testSyncedBlockNumber;
      });

      outOfSyncProvider.sync.callsFake(async () => {
        (outOfSyncProvider as any)._syncedBlockNumber = testOutOfSyncBlockNumber;
      });

      (coreSyncProvider as any).synced = true;
      (outOfSyncProvider as any).synced = true;
      (outOfSyncProvider as any).url = "https://------badProvider----";
      Sinon.stub(outOfSyncProvider, "syncedBlockNumber").get(() => (outOfSyncProvider as any)._syncedBlockNumber);

      // These metrics are used in the calculation algorithm for provider priority: no need to test them for now.
      for (const provider of [coreSyncProvider, outOfSyncProvider]) {
        provider.priority = 0;
        provider.lag = 0;
        provider.reliability = 0.5;
        Sinon.stub(provider, "cps").get(() => 1);
        Sinon.stub(provider, "avgExecTime").get(() => 0.5);
      }

      syncProvidersStub.restore();
    });

    it("happy", async () => {
      (chainProvider as any).providers = [coreSyncProvider, outOfSyncProvider];
      await (chainProvider as any).syncProviders();

      expect(coreSyncProvider.lag).to.be.eq(0);
      const expectedOutOfSyncLag = testSyncedBlockNumber - testOutOfSyncBlockNumber;
      expect(outOfSyncProvider.lag).to.be.eq(expectedOutOfSyncLag);

      expect(coreSyncProvider.sync.callCount).to.equal(1);
      expect(outOfSyncProvider.sync.callCount).to.equal(1);

      expect(outOfSyncProvider.synced).to.be.false;
      expect(coreSyncProvider.synced).to.be.true;
    });
  });

  describe("#shuffleSyncedProviders", () => {
    it("happy", async () => {
      const testProviders: SinonStubbedInstance<SyncProvider>[] = [];
      const testMaxLag = 10;
      const lagValues = [0, 0, 0, 1, 2, 2, 4, 5, 7, 10, 12, 17, 19, 42, 123, 456, 789, 999];
      const inSyncProvidersCount = lagValues.filter((lag) => lag <= testMaxLag).length;
      for (const lag of lagValues) {
        const provider = Sinon.createStubInstance(SyncProvider);
        provider.sync.resolves();
        provider.lag = lag;
        provider.synced = lag <= testMaxLag;
        provider.priority = -9999;
        (provider as any).url = "non-lead provider";
        // All of these values need to be the same for all of them
        // in order to isolate the logic for prioritizing based on lag.
        provider.reliability = 0.5;
        Sinon.stub(provider, "cps").get(() => 1);
        Sinon.stub(provider, "avgExecTime").get(() => 0.5);
        testProviders.push(provider);
      }
      const leadProviderUrl = "mr. lead provider";
      (testProviders[0] as any).url = leadProviderUrl;
      (chainProvider as any).providers = testProviders;
      (chainProvider as any).leadProvider = { url: leadProviderUrl };

      const shuffledProviders = await (chainProvider as any).shuffleSyncedProviders();

      expect(shuffledProviders).to.be.an("array");

      // All providers should be in sync.
      expect(shuffledProviders.length).to.be.eq(inSyncProvidersCount);
      expect(shuffledProviders.every((p: SyncProvider) => p.synced)).to.be.true;
      expect(shuffledProviders).to.not.deep.equal(testProviders);

      // First provider should be the lead provider.
      expect(shuffledProviders[0].url).to.be.eq(leadProviderUrl);

      // Priority should be in ascending order.
      expect(
        shuffledProviders.every((p: SyncProvider, i: number) =>
          i > 0 ? p.priority >= shuffledProviders[i - 1].priority : true,
        ),
      ).to.be.true;
    });
  });
});
