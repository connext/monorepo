import { expect, should } from "chai";
import Sinon, { SinonStubbedInstance, SinonStub, createStubInstance, restore, reset } from "sinon";
import { Contract, BigNumber, providers, Wallet, ethers } from "ethers";
import { RpcProviderAggregator } from "../../../adapters/txservice/src/aggregator";
import { parseUnits } from "@ethersproject/units";
import { Zero, One, AddressZero } from "@ethersproject/constants";
import {
  ChainConfig,
  CoreChainConfig,
  SyncProvider,
  OnchainTransaction,
  WriteTransaction,
} from "../../../adapters/txservice/src";
import { getChainData, getRandomBytes32, Logger, mkHash, RequestContext } from "@connext/nxtp-utils";
const asset = require("../../src/helpers/asset");

const assetId = "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef";
const decimals = 18;
const balance = BigNumber.from("0xfffff");

let chainProvider: RpcProviderAggregator;
let coreFallbackProvider: SinonStubbedInstance<providers.FallbackProvider>;

const DEFAULT_CHAIN_CONFIG: CoreChainConfig = {
  syncProvidersInterval: 5 * 60_000,
  maxProviderCPS: 4,
  gasPriceInitialBoostPercent: 30,
  gasStations: [],
  // From ethers docs:
  // Generally, the new gas price should be about 50% + 1 wei more, so if a gas price
  // of 10 gwei was used, the replacement should be 15.000000001 gwei.
  gasPriceReplacementBumpPercent: 20,
  gasPriceMaximum: parseUnits("1500", "gwei").toString(),
  gasPriceMinimum: parseUnits("5", "gwei").toString(),
  gasPriceMaxIncreaseScalar: 200,
  confirmations: 10,
  // NOTE: This should be the amount of time we are willing to wait for a transaction
  // to get 1 confirmation.
  confirmationTimeout: 90_000,
  debug_logRpcCalls: false,
};
const TEST_SENDER_CHAIN_ID = 1337;
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

const logger = new Logger({
  level: process.env.LOG_LEVEL ?? "silent",
  name: "AssetTest",
});

let signer: SinonStubbedInstance<Wallet>;
export const DEFAULT_GAS_LIMIT = BigNumber.from("21004");

export const TEST_TX_RESPONSE: providers.TransactionResponse = {
  chainId: TEST_SENDER_CHAIN_ID,
  confirmations: 0,
  data: "0x",
  from: AddressZero,
  gasLimit: DEFAULT_GAS_LIMIT,
  gasPrice: One,
  hash: mkHash(),
  nonce: 1,
  value: Zero,
  wait: () => Promise.resolve({} as providers.TransactionReceipt),
};

const fakeExecuteMethod = async <T>(_: boolean, method: (provider: SyncProvider) => Promise<T>): Promise<T> => {
  return method(coreSyncProvider as any);
};
let context: RequestContext = {
  id: "",
  origin: "",
};
let coreSyncProvider: SinonStubbedInstance<SyncProvider>;
let syncProvidersStub: SinonStub;
let transaction: OnchainTransaction;
const TEST_TX: WriteTransaction = {
  chainId: TEST_SENDER_CHAIN_ID,
  to: AddressZero,
  from: AddressZero,
  data: "0x",
  value: Zero,
};

const TEST_FULL_TX: providers.TransactionRequest = {
  ...TEST_TX,
  nonce: 1,
  gasPrice: TEST_TX_RESPONSE.gasPrice,
  gasLimit: TEST_TX_RESPONSE.gasLimit,
};

describe("Helpers:Asset", () => {
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

    syncProvidersStub = Sinon.stub(RpcProviderAggregator.prototype as any, "syncProviders").resolves();
    chainProvider = new RpcProviderAggregator(logger, chainId, config, signer);
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
        price: parseUnits("5", "gwei"),
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

  describe(`#getDecimalForAsset`, async () => {
    it(`should get 18 decimals for ETH `, async () => {
      const res = await asset.getDecimalsForAsset(AddressZero, assetId, chainProvider);
      expect(res).to.deep.equal(decimals);
    });

    it(`should get 18 decimals for BAT on Mainnet`, async () => {
      const batAddress = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const res = await asset.getDecimalsForAsset(batAddress, 1, provider);
      expect(res).to.deep.equal(18);
    });
    it(`should get decimals from chaindata`, async () => {
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
      const data = await getChainData();
      const res = await asset.getDecimalsForAsset(USDC, 1, provider, data);
      expect(res).to.equal(6);
    });
  });

  describe(`#getBalance`, async () => {
    it(`Should get balance of self ETH`, async () => {
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const res = await asset.getOnchainBalance(AddressZero, AddressZero, provider);
      expect(res).to.not.equal(undefined);
    });
    it(`Should get balance of BAT for BAT token contract`, async () => {
      const provider = new ethers.providers.EtherscanProvider("mainnet");
      const batAddress = "0x0D8775F648430679A709E98d2b0Cb6250d2887EF";

      const res = await asset.getOnchainBalance(batAddress, batAddress, provider);
      expect(res).to.not.equal(undefined);
    });
  });

  describe(`#getMainnetEquivalent`, async () => {
    it(`Should get USDC address On mainnet given MATIC-USDC info`, async () => {
      const res = await asset.getMainnetEquivalent(137, "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174");
        console.log(res);
      expect(res).to.not.equal(undefined);
      expect(res).to.deep.equal("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
    });
    it(`Shouldn't get mainnet equiv for tokens that dont exist in downloaded mapping`, async () => {
      const res = await asset.getMainnetEquivalent(137, assetId);
      expect(res).to.equal(undefined);
    });
    it(`Shouldn't get mainnet equiv for tokens that dont exist own mapping`, async () => {
      const data = await getChainData();
      const res = await asset.getMainnetEquivalent(137, assetId, data);
      expect(res).to.equal(undefined);
    });
    it(`Should provide own chaindata`, async () => {
      const data = await getChainData();
      const res = await asset.getMainnetEquivalent(137, "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", data);
    //   expect(res).to.not.equal(undefined);
        console.log(res)
      expect(res).to.deep.equal("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
    });
  });

});
