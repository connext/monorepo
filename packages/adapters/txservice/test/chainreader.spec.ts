import { BigNumber, providers, utils, Wallet } from "ethers";
import Sinon, { restore, reset, createStubInstance, SinonStubbedInstance, SinonStub } from "sinon";
import {
  getRandomAddress,
  getRandomBytes32,
  mkAddress,
  RequestContext,
  expect,
  Logger,
  mock,
  chainDataToMap,
  mkBytes32,
  encodeMultisendCall,
  MultisendTransactionOperation,
} from "@connext/nxtp-utils";

import { cachedPriceMap, ChainReader } from "../src/chainreader";
import { RpcProviderAggregator } from "../src/aggregator";
import {
  ChainNotSupported,
  ConfigurationError,
  MultireadTransaction,
  ProviderNotConfigured,
  ReadTransaction,
  RpcError,
} from "../src/shared";
import * as ContractFns from "../src/shared/contracts";
import {
  TEST_SENDER_CHAIN_ID,
  TEST_TX,
  TEST_READ_TX,
  TEST_TX_RECEIPT,
  makeChaiReadable,
  TEST_SENDER_DOMAIN,
} from "./utils";
import { parseUnits } from "ethers/lib/utils";

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "ChainReaderTest",
});

let signer: SinonStubbedInstance<Wallet>;
let chainReader: ChainReader;
let provider: SinonStubbedInstance<RpcProviderAggregator>;
let context: RequestContext = {
  id: "",
  origin: "",
};
const { requestContext: requestContextMock } = mock.loggingContext();

const mockChainData = chainDataToMap([
  {
    name: "Ethereum Testnet Rinkeby",
    chainId: 4,
    domainId: "2000",
    type: "testnet",
    confirmations: 1,
    shortName: "rin",
    network: "rinkeby",
    assetId: {},
  },
  {
    name: "Ethereum Testnet Kovan",
    chainId: 42,
    domainId: "3000",
    type: "testnet",
    confirmations: 1,
    shortName: "kov",
    chain: "ETH",
    network: "kovan",
    networkId: 42,
    assetId: {},
  },
  {
    name: "Local Testnet 1337",
    chainId: 1337,
    domainId: "1337",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1337",
    network: "lt-1337",
    assetId: {},
  },
  {
    name: "Local Testnet 1338",
    chainId: 1338,
    domainId: "1338",
    type: "testnet",
    confirmations: 1,
    shortName: "lt-1338",
    network: "lt-1338",
    assetId: {},
  },
  {
    name: "Optimistic Ethereum",
    chainId: 10,
    domainId: "10",
    type: "mainnet",
    confirmations: 1,
    shortName: "optimism",
    network: "optimism",
    assetId: {},
  },
]);

/// In these tests, we are testing the outer shell of chainreader - the interface, not the core functionality.
/// For core functionality tests, see dispatch.spec.ts and provider.spec.ts.
describe("ChainReader", () => {
  beforeEach(() => {
    provider = createStubInstance(RpcProviderAggregator);
    signer = createStubInstance(Wallet);
    signer.connect.resolves(true);

    const chains = {
      [TEST_SENDER_DOMAIN.toString()]: {
        providers: [{ url: "https://-------------" }],
        confirmations: 1,
        gasStations: [],
      },
    };

    chainReader = new ChainReader(logger, { chains }, signer);
    Sinon.stub(chainReader as any, "getProvider").callsFake((domain: number) => {
      // NOTE: We check to make sure we are only getting the one domain we expect
      // to get in these unit tests.
      expect(domain).to.be.eq(TEST_SENDER_DOMAIN);
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
      provider.readContract.resolves(fakeData);

      const data = await chainReader.readTx(TEST_READ_TX);

      expect(data).to.deep.eq(fakeData);
      expect(provider.readContract.callCount).to.equal(1);
      expect(provider.readContract.args[0][0]).to.deep.eq(TEST_READ_TX);
    });

    it("should throw if provider fails", async () => {
      provider.readContract.rejects(new RpcError("fail"));

      await expect(chainReader.readTx(TEST_READ_TX)).to.be.rejectedWith("fail");
    });
  });

  describe("#multiread", () => {
    // An interface for a fake contract with a bunch of diverse read methods available.
    const abiMock = [
      "constructor()",
      "function getValueA() view returns (uint256)",
      "function getValueB(bytes32 key) view returns (uint256)",
      "function getValueC(uint256 count) view returns (bool)",
      "function getValueD(address who, address whom, address whomstve) view returns (address)",
      "function getValueE(tuple(string name, address addr) user) view returns (uint256)",
      "function getValueF(uint256 id) view returns (tuple(string name, address addr) user)",
    ];
    const ifaceMock = new utils.Interface(abiMock);
    const makeMockCall = (
      name: string,
      args: any[],
      resultTypes: (string | utils.ParamType)[],
      resultValues: any[],
    ) => {
      return {
        name,
        data: ifaceMock.encodeFunctionData(name, args),
        ret: utils.defaultAbiCoder.encode(resultTypes, resultValues),
        resultValues,
        resultTypes,
      };
    };
    const getValueMockCalls = [
      makeMockCall("getValueA", [], ["uint256"], ["123456789"]),
      makeMockCall("getValueB", [mkBytes32("0xabcdef")], ["uint256"], ["987654321"]),
      makeMockCall("getValueC", [123456789], ["bool"], [true]),
      makeMockCall(
        "getValueD",
        [mkAddress("0x123"), mkAddress("0x456"), mkAddress("0x789")],
        ["address"],
        [mkAddress("0xc0ffee")],
      ),
      makeMockCall("getValueE", [["hello test", mkAddress("0xc0ffee")]], ["uint256"], ["918273645"]),
      makeMockCall("getValueF", [987654321], ["tuple(string, address)"], [["hello test", mkAddress("0xc0ffee")]]),
    ];
    let expectedResultValues: any[] = [];
    let orderedResultTypes: (string | utils.ParamType)[] = [];
    const txs: MultireadTransaction[] = getValueMockCalls.map((call, i) => {
      // Concatenate expected result types and values in tx order.
      expectedResultValues = expectedResultValues.concat(call.resultValues);
      orderedResultTypes = orderedResultTypes.concat(call.resultTypes);
      // Return formatted read transaction.
      return {
        to: mkAddress(`0x${i}`), // NOTE: Varying `to` address, as if we're targeting multiple contracts.
        data: call.data,
        resultTypes: call.resultTypes,
      };
    });

    it("happy: formats a multisend static call and sends it", async () => {
      // Encode the final resulting return value.
      // This is basically the blob of data that corresponds to many read calls in the exact way that MultiSend would
      // return it.
      const multireadResult = utils.defaultAbiCoder.encode(orderedResultTypes, expectedResultValues);
      provider.readContract.resolves(multireadResult);
      // NOTE: Technically we should just expect the result values to be == return data below, but doing this decoding
      // step here ensures that this supplied input data is valid.
      const expectedDecodedResult = utils.defaultAbiCoder.decode(orderedResultTypes, multireadResult);

      const multisendContract = mkAddress("0x2c001");
      const result = await chainReader.multiread({
        domain: TEST_SENDER_DOMAIN,
        txs,
        multisendContract,
      });

      expect(result).to.deep.eq(expectedDecodedResult);
      expect(provider.readContract.callCount).to.equal(1); // Just 1 RPC call! Wow!
      // Assert ReadTransaction we formatted for Multisend used the encoding utility.
      expect(provider.readContract.args[0][0]).to.deep.eq({
        domain: TEST_SENDER_DOMAIN,
        to: multisendContract,
        data: encodeMultisendCall(
          txs.map((tx) => ({
            operation: MultisendTransactionOperation.CALL,
            to: tx.to,
            data: tx.data,
          })),
        ),
      });
    });

    it("falls back to using Promise.all if multisend contract not available", async () => {
      let expectedDecodedResult: any[] = [];
      for (let i = 0; i < getValueMockCalls.length; i++) {
        provider.readContract.onCall(i).resolves(getValueMockCalls[i].ret);
        expectedDecodedResult = expectedDecodedResult.concat(
          utils.defaultAbiCoder.decode(getValueMockCalls[i].resultTypes, getValueMockCalls[i].ret),
        );
      }

      const result = await chainReader.multiread({
        domain: TEST_SENDER_DOMAIN,
        txs,
      });

      expect(result).to.deep.eq(expectedDecodedResult);
      expect(provider.readContract.callCount).to.equal(getValueMockCalls.length); // Many RPC calls, sad :(
    });
  });

  describe("#getBalance", () => {
    it("happy", async () => {
      const testBalance = utils.parseUnits("42", "ether");
      const testAddress = getRandomAddress();
      provider.getBalance.resolves(testBalance);

      const balance = await chainReader.getBalance(TEST_SENDER_DOMAIN, testAddress);

      expect(balance.eq(testBalance)).to.be.true;
      expect(provider.getBalance.callCount).to.equal(1);
      expect(provider.getBalance.getCall(0).args[0]).to.deep.eq(testAddress);
    });

    it("should throw if provider fails", async () => {
      provider.getBalance.rejects(new RpcError("fail"));

      await expect(chainReader.getBalance(TEST_SENDER_DOMAIN, mkAddress("0xaaa"))).to.be.rejectedWith("fail");
    });
  });

  describe("#getGasPrice", () => {
    it("happy", async () => {
      const testGasPrice = utils.parseUnits("5", "gwei");
      provider.getGasPrice.resolves(testGasPrice);

      const gasPrice = await chainReader.getGasPrice(TEST_SENDER_DOMAIN, requestContextMock);

      expect(gasPrice.eq(testGasPrice)).to.be.true;
      expect(provider.getGasPrice.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getGasPrice.rejects(new RpcError("fail"));

      await expect(chainReader.getGasPrice(TEST_SENDER_DOMAIN, requestContextMock)).to.be.rejectedWith("fail");
    });
  });

  describe("#getDecimalsForAsset", () => {
    it("happy", async () => {
      const decimals = 18;
      const assetId = mkAddress("0xaaa");
      provider.getDecimalsForAsset.resolves(decimals);

      const retrieved = await chainReader.getDecimalsForAsset(TEST_SENDER_DOMAIN, assetId);

      expect(retrieved).to.be.eq(decimals);
      expect(provider.getDecimalsForAsset.callCount).to.equal(1);
      expect(provider.getDecimalsForAsset.getCall(0).args[0]).to.deep.eq(assetId);
    });

    it("should throw if provider fails", async () => {
      provider.getDecimalsForAsset.rejects(new RpcError("fail"));

      await expect(chainReader.getDecimalsForAsset(TEST_SENDER_DOMAIN, mkAddress("0xaaa"))).to.be.rejectedWith("fail");
    });
  });

  describe("#getBlock", () => {
    it("happy", async () => {
      const mockBlock = { transactions: [getRandomBytes32()] } as providers.Block;
      provider.getBlock.resolves(mockBlock);

      const block = await chainReader.getBlock(TEST_SENDER_DOMAIN, "block");

      expect(block).to.be.eq(mockBlock);
      expect(provider.getBlock.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getBlock.rejects(new RpcError("fail"));

      await expect(chainReader.getBlock(TEST_SENDER_DOMAIN, "block")).to.be.rejectedWith("fail");
    });
  });

  describe("#getBlockTime", () => {
    it("happy", async () => {
      const time = Math.floor(Date.now() / 1000);
      provider.getBlockTime.resolves(time);

      const blockTime = await chainReader.getBlockTime(TEST_SENDER_DOMAIN);

      expect(blockTime).to.be.eq(time);
      expect(provider.getBlockTime.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getBlockTime.rejects(new RpcError("fail"));

      await expect(chainReader.getBlockTime(TEST_SENDER_DOMAIN)).to.be.rejectedWith("fail");
    });
  });

  describe("#getBlockNumber", () => {
    it("happy", async () => {
      const testBlockNumber = 42;
      provider.getBlockNumber.resolves(testBlockNumber);

      const blockNumber = await chainReader.getBlockNumber(TEST_SENDER_DOMAIN);

      expect(blockNumber).to.be.eq(testBlockNumber);
      expect(provider.getBlockNumber.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getBlockNumber.rejects(new RpcError("fail"));

      await expect(chainReader.getBlockNumber(TEST_SENDER_DOMAIN)).to.be.rejectedWith("fail");
    });
  });

  describe("#getTransactionReceipt", () => {
    it("happy", async () => {
      provider.getTransactionReceipt.resolves(TEST_TX_RECEIPT);

      const receipt = await chainReader.getTransactionReceipt(TEST_SENDER_DOMAIN, TEST_TX_RECEIPT.transactionHash);

      expect(makeChaiReadable(receipt)).to.deep.eq(makeChaiReadable(TEST_TX_RECEIPT));
      expect(provider.getTransactionReceipt.callCount).to.be.eq(1);
    });

    it("should throw if provider fails", async () => {
      provider.getTransactionReceipt.rejects(new RpcError("fail"));

      await expect(
        chainReader.getTransactionReceipt(TEST_SENDER_DOMAIN, TEST_TX_RECEIPT.transactionHash),
      ).to.be.rejectedWith("fail");
    });
  });

  describe("#getCode", () => {
    it("happy", async () => {
      const code = "0x12345789";
      provider.getCode.resolves(code);

      const result = await chainReader.getCode(TEST_SENDER_DOMAIN, mkAddress("0xa1"));

      expect(result).to.be.eq(code);
      expect(provider.getCode.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getCode.rejects(new RpcError("fail"));

      await expect(chainReader.getCode(TEST_SENDER_DOMAIN, mkAddress("0xa1"))).to.be.rejectedWith("fail");
    });
  });

  describe("#getGasEstimate", () => {
    it("happy", async () => {
      const mockGasEstimation = parseUnits("1", 9);
      provider.getGasEstimate.resolves(mockGasEstimation);

      const gasEstimation = await chainReader.getGasEstimate(TEST_SENDER_DOMAIN, null);

      expect(gasEstimation).to.be.eq(mockGasEstimation);
      expect(provider.getGasEstimate.callCount).to.equal(1);
    });

    it("should throw if provider fails", async () => {
      provider.getGasEstimate.rejects(new RpcError("fail"));

      await expect(chainReader.getGasEstimate(TEST_SENDER_DOMAIN, null)).to.be.rejectedWith("fail");
    });
  });

  describe("#getTokenPrice", () => {
    const priceOracleContractFakeAddr = mkAddress("0x7f");
    let getDeployedPriceOracleContractStub: SinonStub;
    let getPriceOracleInterfaceStub: SinonStub;
    let getTokenPriceFromOnChainStub: SinonStub;
    let readTxStub: SinonStub;
    let interfaceStub: SinonStubbedInstance<utils.Interface>;
    beforeEach(() => {
      interfaceStub = createStubInstance(utils.Interface);
      getPriceOracleInterfaceStub = Sinon.stub(ContractFns, "getPriceOracleInterface");
      getPriceOracleInterfaceStub.returns(interfaceStub);
      getDeployedPriceOracleContractStub = Sinon.stub(ContractFns, "getDeployedPriceOracleContract");
      getDeployedPriceOracleContractStub.returns({
        address: priceOracleContractFakeAddr,
        abi: ["fakeAbi()"],
      });
      readTxStub = Sinon.stub(chainReader, "readTx");
    });

    it("happy", async () => {
      const assetId = mkAddress("0xc3");
      const data = "0x123456789";
      const tokenPrice = "5812471953821";
      interfaceStub.encodeFunctionData.returns(data);
      readTxStub.resolves(tokenPrice);

      const result = await chainReader.getTokenPrice(TEST_SENDER_DOMAIN, assetId);

      expect(result.toString()).to.be.eq(tokenPrice);
      expect(getDeployedPriceOracleContractStub.getCall(0).args).to.deep.eq([TEST_SENDER_CHAIN_ID]);
      expect(interfaceStub.encodeFunctionData.getCall(0).args).to.deep.eq(["getTokenPrice", [assetId]]);
      expect(readTxStub.getCall(0).args[0]).to.deep.eq({
        domain: TEST_SENDER_DOMAIN,
        to: priceOracleContractFakeAddr,
        data,
      });
    });

    it("should throw ChainNotSupported if chain not supported for token pricing", async () => {
      getDeployedPriceOracleContractStub.returns(undefined);
      await expect(chainReader.getTokenPrice(TEST_SENDER_DOMAIN, mkAddress("0xa1"))).to.be.rejectedWith(
        ChainNotSupported,
      );
    });

    it("should return cached price if updated timestamp less than 1 min", async () => {
      getTokenPriceFromOnChainStub = Sinon.stub(chainReader, "getTokenPriceFromOnChain");
      const assetId = mkAddress("0xc3");
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const tokenPrice = BigNumber.from("5812471953821");
      const cachedPriceKey = TEST_SENDER_DOMAIN.toString().concat("-").concat(assetId);
      cachedPriceMap.set(cachedPriceKey, {
        timestamp: currentTimestamp - 30,
        price: tokenPrice,
      });

      getTokenPriceFromOnChainStub.returns(BigNumber.from("581247195382112121212"));
      expect((await chainReader.getTokenPrice(TEST_SENDER_DOMAIN, assetId)).toString()).to.be.eq(tokenPrice.toString());
    });

    it("should return real price if updated timestamp more than 1 min", async () => {
      getTokenPriceFromOnChainStub = Sinon.stub(chainReader, "getTokenPriceFromOnChain");
      const assetId = mkAddress("0xc3");
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const tokenPrice = BigNumber.from("5812471953821");
      const cachedPriceKey = TEST_SENDER_DOMAIN.toString().concat("-").concat(assetId).concat("latest");

      cachedPriceMap.set(cachedPriceKey, {
        timestamp: currentTimestamp - 61,
        price: tokenPrice,
      });
      getTokenPriceFromOnChainStub.returns(BigNumber.from("581247195382112121212"));
      expect((await chainReader.getTokenPrice(TEST_SENDER_DOMAIN, assetId)).toString()).to.be.eq(
        "581247195382112121212",
      );
    });
  });

  describe("#getTokenPriceFromOnChain", () => {
    const priceOracleContractFakeAddr = mkAddress("0x7f");
    let getDeployedPriceOracleContractStub: SinonStub;
    let getPriceOracleInterfaceStub: SinonStub;
    let readTxStub: SinonStub;
    let interfaceStub: SinonStubbedInstance<utils.Interface>;
    beforeEach(() => {
      interfaceStub = createStubInstance(utils.Interface);
      getPriceOracleInterfaceStub = Sinon.stub(ContractFns, "getPriceOracleInterface");
      getPriceOracleInterfaceStub.returns(interfaceStub);
      getDeployedPriceOracleContractStub = Sinon.stub(ContractFns, "getDeployedPriceOracleContract");
      getDeployedPriceOracleContractStub.returns({
        address: priceOracleContractFakeAddr,
        abi: ["fakeAbi()"],
      });
      readTxStub = Sinon.stub(chainReader, "readTx");
    });

    it("happy", async () => {
      const assetId = mkAddress("0xc3");
      const data = "0x123456789";
      const tokenPrice = "5812471953821";
      interfaceStub.encodeFunctionData.returns(data);
      readTxStub.resolves(tokenPrice);

      const result = await chainReader.getTokenPriceFromOnChain(TEST_SENDER_DOMAIN, assetId);

      expect(result.toString()).to.be.eq(tokenPrice);
      expect(getDeployedPriceOracleContractStub.getCall(0).args).to.deep.eq([TEST_SENDER_CHAIN_ID]);
      expect(interfaceStub.encodeFunctionData.getCall(0).args).to.deep.eq(["getTokenPrice", [assetId]]);
      expect(readTxStub.getCall(0).args[0]).to.deep.eq({
        domain: TEST_SENDER_DOMAIN,
        to: priceOracleContractFakeAddr,
        data,
      });
    });

    it("should throw ChainNotSupported if chain not supported for token pricing", async () => {
      getDeployedPriceOracleContractStub.returns(undefined);
      await expect(chainReader.getTokenPriceFromOnChain(TEST_SENDER_DOMAIN, mkAddress("0xa1"))).to.be.rejectedWith(
        ChainNotSupported,
      );
    });
  });

  describe("#isSupportedChain", () => {
    it("should return false for unsupported chain", async () => {
      expect(chainReader.isSupportedChain(111111)).to.be.false;
    });
  });

  describe("#getProvider", () => {
    it("errors if cannot get provider", async () => {
      // Replacing this method with the original fn not working.
      (chainReader as any).getProvider.restore();
      await expect(chainReader.readTx({ ...TEST_TX, domain: 9999 })).to.be.rejectedWith(ProviderNotConfigured);
    });
  });

  describe("#setupProviders", () => {
    it("throws if not a single provider config is provided for a chainId", async () => {
      (chainReader as any).config = {
        [TEST_SENDER_DOMAIN.toString()]: {
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
