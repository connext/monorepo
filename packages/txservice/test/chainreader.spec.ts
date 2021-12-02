import { BigNumber, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance, SinonStub } from "sinon";

import { ChainReader } from "../src/chainreader";
import { ChainRpcProvider } from "../src/provider";
import {
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_READ_TX,
  TEST_TX_RECEIPT,
  makeChaiReadable,
  TEST_RECEIVER_CHAIN_ID,
} from "./constants";
import { ConfigurationError, ProviderNotConfigured, RpcError } from "../src/error";
import * as contractFns from "../src/contracts";
import {
  getRandomAddress,
  getRandomBytes32,
  mkAddress,
  RequestContext,
  expect,
  Logger,
  requestContextMock,
  GAS_ESTIMATES,
} from "@connext/nxtp-utils";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "ChainReaderTest",
});

let signer: SinonStubbedInstance<Wallet>;
let chainReader: ChainReader;
let provider: SinonStubbedInstance<ChainRpcProvider>;
let context: RequestContext = {
  id: "",
  origin: "",
};

/// In these tests, we are testing the outer shell of chainreader - the interface, not the core functionality.
/// For core functionality tests, see dispatch.spec.ts and provider.spec.ts.
describe("ChainReader", () => {
  beforeEach(() => {
    provider = createStubInstance(ChainRpcProvider);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);

    const chains = {
      [TEST_SENDER_CHAIN_ID.toString()]: {
        providers: [{ url: "https://-------------" }],
        confirmations: 1,
        gasStations: [],
      },
    };

    chainReader = new ChainReader(logger, { chains }, signer);
    Sinon.stub(chainReader as any, "getProvider").callsFake((chainId: number) => {
      // NOTE: We check to make sure we are only getting the one chainId we expect
      // to get in these unit tests.
      expect(chainId).to.be.eq(TEST_SENDER_CHAIN_ID);
      return provider;
    });
    context.id = getRandomBytes32();
    context.origin = "ChainReaderTest";
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#readTx", () => {
    it("happy: returns exactly what it reads", async () => {
      const fakeData = getRandomBytes32();
      provider.readTransaction.resolves(fakeData);

      const data = await chainReader.readTx(TEST_READ_TX);

      expect(data).to.deep.eq(fakeData);
      expect(provider.readTransaction.callCount).to.equal(1);
      expect(provider.readTransaction.args[0][0]).to.deep.eq(TEST_READ_TX);
    });

    it("should throw if provider fails", async () => {
      provider.readTransaction.rejects(new RpcError("fail"));

      await expect(chainReader.readTx(TEST_READ_TX)).to.be.rejectedWith("fail");
    });
  });

  describe("#getBalance", () => {
    it("happy", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      provider.getBalance.resolves(testBalance);

      const balance = await chainReader.getBalance(TEST_SENDER_CHAIN_ID, testAddress);

      expect(balance.eq(testBalance)).to.be.true;
      expect(provider.getBalance.callCount).to.equal(1);
      expect(provider.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });

    it("should throw if provider fails", async () => {
      provider.getBalance.rejects(new RpcError("fail"));

      await expect(chainReader.getBalance(TEST_SENDER_CHAIN_ID, mkAddress("0xaaa"))).to.be.rejectedWith("fail");
    });
  });

  describe("#getDecimalsForAsset", () => {
    it("happy", async () => {
      const decimals = 18;
      const assetId = mkAddress("0xaaa");
      provider.getDecimalsForAsset.resolves(decimals);

      const retrieved = await chainReader.getDecimalsForAsset(TEST_SENDER_CHAIN_ID, assetId);

      expect(retrieved).to.be.eq(decimals);
      expect(provider.getDecimalsForAsset.callCount).to.equal(1);
      expect(provider.getDecimalsForAsset.getCall(0).args[0]).to.deep.eq(assetId);
    });

    it("should throw if provider fails", async () => {
      provider.getDecimalsForAsset.rejects(new RpcError("fail"));

      await expect(chainReader.getDecimalsForAsset(TEST_SENDER_CHAIN_ID, mkAddress("0xaaa"))).to.be.rejectedWith(
        "fail",
      );
    });
  });

  describe("#getBlockTime", () => {
    it("happy", async () => {
      const time = Math.floor(Date.now() / 1000);
      provider.getBlockTime.resolves(time);

      const blockTime = await chainReader.getBlockTime(TEST_SENDER_CHAIN_ID);

      expect(blockTime).to.be.eq(time);
      expect(provider.getBlockTime.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getBlockTime.rejects(new RpcError("fail"));

      await expect(chainReader.getBlockTime(TEST_SENDER_CHAIN_ID)).to.be.rejectedWith("fail");
    });
  });

  describe("#getBlockNumber", () => {
    it("happy", async () => {
      const testBlockNumber = 42;
      provider.getBlockNumber.resolves(testBlockNumber);

      const blockNumber = await chainReader.getBlockNumber(TEST_SENDER_CHAIN_ID);

      expect(blockNumber).to.be.eq(testBlockNumber);
      expect(provider.getBlockNumber.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getBlockNumber.rejects(new RpcError("fail"));

      await expect(chainReader.getBlockNumber(TEST_SENDER_CHAIN_ID)).to.be.rejectedWith("fail");
    });
  });

  describe("#getTransactionReceipt", () => {
    it("happy", async () => {
      provider.getTransactionReceipt.resolves(TEST_TX_RECEIPT);

      const receipt = await chainReader.getTransactionReceipt(TEST_SENDER_CHAIN_ID, TEST_TX_RECEIPT.transactionHash);

      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
      expect(provider.getTransactionReceipt.callCount).to.be.eq(1);
    });

    it("should throw if provider fails", async () => {
      provider.getTransactionReceipt.rejects(new RpcError("fail"));

      await expect(
        chainReader.getTransactionReceipt(TEST_SENDER_CHAIN_ID, TEST_TX_RECEIPT.transactionHash),
      ).to.be.rejectedWith("fail");
    });
  });

  describe("#calculateGasFeeInReceivingToken", () => {
    let calculateGasFeeStub: SinonStub;
    beforeEach(() => {
      calculateGasFeeStub = Sinon.stub(chainReader as any, "calculateGasFee");
    });

    it("happy: should return sum of both chains calculations'", async () => {
      const gasFeeSenderFulfill = BigNumber.from(124098148);
      const gasFeeReceiverPrepare = BigNumber.from(1151259044);
      const expectedTotal = gasFeeReceiverPrepare.add(gasFeeSenderFulfill);
      const sendingAssetId = mkAddress("0xa1");
      const receivingAssetId = mkAddress("0xb2");
      calculateGasFeeStub.onFirstCall().resolves(gasFeeSenderFulfill);
      calculateGasFeeStub.onSecondCall().resolves(gasFeeReceiverPrepare);
      const result = await chainReader.calculateGasFeeInReceivingToken(
        TEST_SENDER_CHAIN_ID,
        sendingAssetId,
        TEST_RECEIVER_CHAIN_ID,
        receivingAssetId,
        18,
        requestContextMock,
      );
      expect(result.toNumber()).to.eq(expectedTotal.toNumber());
      expect(calculateGasFeeStub.getCall(0).args.slice(0, 4)).to.deep.eq([
        TEST_SENDER_CHAIN_ID,
        sendingAssetId,
        18,
        "fulfill",
      ]);
      expect(calculateGasFeeStub.getCall(1).args.slice(0, 4)).to.deep.eq([
        TEST_RECEIVER_CHAIN_ID,
        receivingAssetId,
        18,
        "prepare",
      ]);
    });
  });

  describe("#calculateGasFeeInReceivingToken", () => {
    let calculateGasFeeStub: SinonStub;
    beforeEach(() => {
      calculateGasFeeStub = Sinon.stub(chainReader as any, "calculateGasFee");
    });

    it("happy: should call calculateGasFee for fulfill", async () => {
      const gasFee = BigNumber.from(71221304);
      const assetId = mkAddress("0xb2");
      calculateGasFeeStub.onFirstCall().resolves(gasFee);
      const result = await chainReader.calculateGasFeeInReceivingTokenForFulfill(
        TEST_RECEIVER_CHAIN_ID,
        assetId,
        18,
        requestContextMock,
      );
      expect(result.toNumber()).to.eq(gasFee.toNumber());
      expect(calculateGasFeeStub.getCall(0).args.slice(0, 4)).to.deep.eq([
        TEST_RECEIVER_CHAIN_ID,
        assetId,
        18,
        "fulfill",
      ]);
    });
  });

  describe("#calculateGasFee", () => {
    const testEthPrice = 1;
    const testTokenPrice = 2;
    const testGasPrice = 5;
    let tokenPriceStub: SinonStub;
    let gasPriceStub: SinonStub;
    beforeEach(() => {
      (contractFns.CHAINS_WITH_PRICE_ORACLES as any) = [1];
      tokenPriceStub = Sinon.stub(chainReader, "getTokenPrice");
      gasPriceStub = Sinon.stub(chainReader, "getGasPrice");
      tokenPriceStub.onFirstCall().resolves(BigNumber.from(testEthPrice));
      tokenPriceStub.onSecondCall().resolves(BigNumber.from(testTokenPrice));
      gasPriceStub.onFirstCall().resolves(BigNumber.from(testGasPrice));
    });

    it("happy: should calculate for prepare if chain included and prepare specified", async () => {
      const result = await (chainReader as any).calculateGasFee(1, mkAddress("0x0"), 18, "prepare", requestContextMock);
      expect(result.toNumber()).to.be.eq(
        (testGasPrice * parseInt(GAS_ESTIMATES.prepare) * testEthPrice) / testTokenPrice,
      );
    });

    it("happy: should calculate for fulfill if chain included and fulfill specified", async () => {
      const result = await (chainReader as any).calculateGasFee(1, mkAddress("0x0"), 18, "fulfill", requestContextMock);
      expect(result.toNumber()).to.be.eq(
        (testGasPrice * parseInt(GAS_ESTIMATES.fulfill) * testEthPrice) / testTokenPrice,
      );
    });

    it("should return zero if price oracle isn't configured for that chain", async () => {
      const result = await (chainReader as any).calculateGasFee(
        TEST_SENDER_CHAIN_ID,
        mkAddress("0x0"),
        18,
        "prepare",
        requestContextMock,
      );
      expect(result.toNumber()).to.be.eq(0);
    });

    it("should return zero if price oracle isn't configured for that chain", async () => {
      const result = await chainReader.calculateGasFeeInReceivingToken(
        TEST_RECEIVER_CHAIN_ID,
        mkAddress("0x0"),
        1,
        mkAddress("0x2"),
        18,
        requestContextMock,
      );
      expect(result.toNumber()).to.be.eq(
        (testGasPrice * parseInt(GAS_ESTIMATES.prepare) * testEthPrice) / testTokenPrice,
      );
    });

    it("should return sum of both if both chains included", async () => {
      const testGasPriceReceivingChain = BigNumber.from(13);
      const testEthPriceReceivingChain = BigNumber.from(7);
      const testTokenPriceReceivingChain = BigNumber.from(3);
      gasPriceStub.onSecondCall().resolves(testGasPriceReceivingChain);
      tokenPriceStub.onCall(2).resolves(testEthPriceReceivingChain);
      tokenPriceStub.onCall(3).resolves(testTokenPriceReceivingChain);
      (contractFns.CHAINS_WITH_PRICE_ORACLES as any) = [TEST_SENDER_CHAIN_ID, TEST_RECEIVER_CHAIN_ID];
      const result = await chainReader.calculateGasFeeInReceivingToken(
        TEST_SENDER_CHAIN_ID,
        mkAddress("0x0"),
        TEST_RECEIVER_CHAIN_ID,
        mkAddress("0x2"),
        18,
        requestContextMock,
      );
      const expectedSumSendingChain = BigNumber.from(testGasPrice)
        .mul(GAS_ESTIMATES.fulfill)
        .mul(testEthPrice)
        .div(testTokenPrice);
      const expectedSumReceivingChain = testGasPriceReceivingChain
        .mul(GAS_ESTIMATES.prepare)
        .mul(testEthPriceReceivingChain)
        .div(testTokenPriceReceivingChain);
      expect(result.toNumber()).to.be.eq(expectedSumSendingChain.add(expectedSumReceivingChain).toNumber());
    });
  });

  describe("#getProvider", () => {
    it("errors if cannot get provider", async () => {
      // Replacing this method with the original fn not working.
      (chainReader as any).getProvider.restore();
      await expect(chainReader.readTx({ ...TEST_TX, chainId: 9999 })).to.be.rejectedWith(ProviderNotConfigured);
    });
  });

  describe("#setupProviders", () => {
    it("throws if not a single provider config is provided for a chainId", async () => {
      (chainReader as any).config.chains = {
        [TEST_SENDER_CHAIN_ID.toString()]: {
          // Providers list here should never be empty.
          providers: [],
          confirmations: 1,
          gasStations: [],
        },
      };
      expect(() => (chainReader as any).setupProviders(context, signer)).to.throw(ConfigurationError);
    });
  });
});
