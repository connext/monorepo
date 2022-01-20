import {
  expect,
  mkAddress,
  getChainData,
  ChainData,
  txReceiptMock,
  createRequestContext,
  mkBytes32,
} from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";
import { SinonStub, stub } from "sinon";
import * as metrics from "../../../src/lib/helpers/metrics";
import * as entities from "../../../src/lib/entities/metrics";
import { contractReaderMock, ctxMock, txServiceMock } from "../../globalTestHook";
import { chainDataMock, configMock } from "../../utils";
import { parseEther } from "@ethersproject/units";
import * as ConfigFns from "../../../src/config";
import * as SharedFns from "../../../src/lib/helpers/shared";

const requestContext = createRequestContext("TEST", mkBytes32());

describe("convertToUsd", () => {
  let priceOracleStub: SinonStub;
  beforeEach(() => {
    priceOracleStub = stub(ConfigFns, "getDeployedPriceOracleContract");
    priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
  });

  it("should return zero if no price oracle deployed", async () => {
    const amount = 100;
    expect(
      await metrics.convertToUsd(mkAddress("0xaaaaa"), 1337, BigNumber.from(amount).toString(), requestContext),
    ).to.be.eq(0);
  });

  it("should return zero if token isn't configured on price oracle", async () => {
    txServiceMock.getTokenPrice.resolves(BigNumber.from(0));
    const amount = parseEther("100");
    expect(await metrics.convertToUsd(mkAddress("0xaaaaa"), 1, amount.toString(), requestContext)).to.be.eq(0);
  });

  it("should return price", async () => {
    const amount = parseEther("100");
    const price = 1;
    txServiceMock.getTokenPrice.resolves(parseEther(price.toString()));
    expect(await metrics.convertToUsd(mkAddress("0xaaaaa"), 1, amount.toString(), requestContext)).to.be.eq(100);
  });
});

describe("getAssetName", () => {
  it("should work", () => {
    const { assetId, chainId } = configMock.swapPools[0].assets[0];
    const name = metrics.getAssetName(assetId, chainId);
    expect(name).to.be.eq("TEST");
  });

  it("should fallback to chaindata if theres no name in the pool", () => {
    const { assetId, chainId } = configMock.swapPools[0].assets[0];
    configMock.swapPools[0] = {
      ...configMock.swapPools[0],
      name: undefined,
    };
    const mainnetEquivalent = mkAddress("0xabc");

    chainDataMock.set(chainId.toString(), {
      assetId: {
        [assetId]: {
          mainnetEquivalent,
        },
      },
    } as ChainData);

    chainDataMock.set("1", {
      assetId: {
        [mainnetEquivalent]: {
          symbol: "TEST_CHAIN_DATA",
        },
      },
    } as ChainData);

    const name = metrics.getAssetName(assetId, chainId);
    expect(name).to.be.eq("TEST_CHAIN_DATA");
  });
});

describe("collectOnchainLiquidity", () => {
  let priceOracleStub: SinonStub;
  beforeEach(() => {
    priceOracleStub = stub(ConfigFns, "getDeployedPriceOracleContract");
    priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
    stub(SharedFns, "getMainnetEquivalent").resolves("0xccc");
  });
  it("should work with varying decimals", async () => {
    ctxMock.chainData = await getChainData();
    // constants
    const amt = "10";
    const price = "0.5";
    const chainIds = Object.keys(configMock.chainConfig).map((c) => parseInt(c));
    const assetIds = Array(chainIds.length)
      .fill(0)
      .map((_, idx) => {
        return configMock.swapPools[0].assets.find((a) => a.chainId === chainIds[idx]).assetId;
      });
    const decimals = Array(chainIds.length)
      .fill(0)
      .map((_, idx) => (idx % 2 === 0 ? 6 : 18));

    // create stub for asset balances
    chainIds.forEach((_, idx) => {
      (contractReaderMock.getAssetBalances as SinonStub)
        .onCall(idx)
        .resolves([{ assetId: assetIds[idx], amount: utils.parseUnits(amt, decimals[idx]) }]);
    });

    // create stub for token price
    // console.log("prices", tokenPrices);
    txServiceMock.getTokenPrice.resolves(parseEther(price));

    // create stub for decimals
    txServiceMock.getDecimalsForAsset.callsFake((chainId: number, _assetId: string) => {
      const idx = chainIds.findIndex((c) => c === chainId);
      const ret = decimals[idx];
      return Promise.resolve(ret ?? 18);
    });

    // run
    const ret = await metrics.collectOnchainLiquidity();
    expect(ret).to.be.deep.eq({
      1337: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1337).assetId,
          amount: +amt * +price,
        },
      ],
      1338: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1338).assetId,
          amount: +amt * +price,
        },
      ],
    });
  });
});

describe("collectExpressiveLiquidity", () => {
  let priceOracleStub: SinonStub;
  beforeEach(() => {
    stub(metrics, "getLiquidityCacheExpiry").returns(0);
    priceOracleStub = stub(ConfigFns, "getDeployedPriceOracleContract");
    priceOracleStub.returns({ address: mkAddress("0xaaa"), abi: "xxx" });
    stub(SharedFns, "getMainnetEquivalent").resolves("0xccc");
  });

  it("should return undefined if all assets fail", async () => {
    (contractReaderMock.getExpressiveAssetBalances as SinonStub).rejects(new Error("Fail"));
    const ret = await metrics.collectExpressiveLiquidity();
    expect(ret).to.be.undefined;
    expect((contractReaderMock.getExpressiveAssetBalances as SinonStub).callCount).to.be.eq(
      Object.keys(configMock.chainConfig).length,
    );
  });

  it("should work for all other assets if theres one error", async () => {
    (contractReaderMock.getExpressiveAssetBalances as SinonStub).onCall(0).rejects(new Error("Fail"));
    (contractReaderMock.getExpressiveAssetBalances as SinonStub).onCall(1).resolves([]);
    const ret = await metrics.collectExpressiveLiquidity();
    expect(ret).to.be.deep.eq({ [Object.keys(configMock.chainConfig)[1]]: [] });
    expect((contractReaderMock.getExpressiveAssetBalances as SinonStub).callCount).to.be.eq(
      Object.keys(configMock.chainConfig).length,
    );
  });

  it("should work with varying decimals", async () => {
    // constants
    const amt = "10";
    const price = "0.5";
    const chainIds = Object.keys(configMock.chainConfig).map((c) => parseInt(c));
    const assetIds = Array(chainIds.length)
      .fill(0)
      .map((_, idx) => {
        return configMock.swapPools[0].assets.find((a) => a.chainId === chainIds[idx]).assetId;
      });

    // create stub for asset balances
    chainIds.forEach((_, idx) => {
      (contractReaderMock.getExpressiveAssetBalances as SinonStub).onCall(idx).resolves([
        {
          assetId: assetIds[idx],
          amount: utils.parseUnits(amt, 18),
          locked: BigNumber.from(0),
          supplied: utils.parseUnits(amt, 18),
          removed: BigNumber.from(0),
          // volume: utils.parseUnits(amt, 18),
          // volumeIn: utils.parseUnits(amt, 18),
        },
      ]);
    });

    // create stub for token price
    // console.log("prices", tokenPrices);
    txServiceMock.getTokenPrice.resolves(parseEther(price));

    // create stub for decimals
    txServiceMock.getDecimalsForAsset.resolves(18);

    // run
    const ret = await metrics.collectExpressiveLiquidity();
    expect(ret).to.be.deep.eq({
      1337: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1337).assetId,
          amount: +amt * +price,
          supplied: +amt * +price,
          locked: 0,
          removed: 0,
          // volume: +amt * +price,
          // volumeIn: +amt * +price,
        },
      ],
      1338: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1338).assetId,
          amount: +amt * +price,
          supplied: +amt * +price,
          locked: 0,
          removed: 0,
          // volume: +amt * +price,
          // volumeIn: +amt * +price,
        },
      ],
    });
  });
});

describe("collectGasBalance", () => {
  it("should work", async () => {
    const chainIds = Object.keys(configMock.chainConfig).map((c) => +c);
    const balance = 100;
    txServiceMock.getBalance.resolves(BigNumber.from(utils.parseEther(balance.toString())));
    const expected = {};
    chainIds.map((c) => {
      expected[c] = balance;
    });
    expect(await metrics.collectGasBalance()).to.be.deep.eq(expected);
  });

  it("should work if theres an error on one chain", async () => {
    const chainIds = Object.keys(configMock.chainConfig)
      .map((c) => +c)
      .slice(0, 2);
    console.log("chainIds");
    const balance = 100;
    txServiceMock.getBalance.onFirstCall().resolves(BigNumber.from(utils.parseEther(balance.toString())));
    txServiceMock.getBalance.onSecondCall().rejects(new Error("fail"));
    const expected = { [chainIds[0]]: balance };
    expect(await metrics.collectGasBalance()).to.be.deep.eq(expected);
  });
});

describe("collectRpcHeads", () => {
  it("should work", async () => {
    const chainIds = Object.keys(configMock.chainConfig).map((c) => +c);
    const block = 100000;
    txServiceMock.getBlockNumber.resolves(block);
    const expected = {};
    chainIds.map((c) => {
      expected[c] = block;
    });
    expect(await metrics.collectRpcHeads()).to.be.deep.eq(expected);
  });

  it("should work if theres an error on one chain", async () => {
    const chainIds = Object.keys(configMock.chainConfig)
      .map((c) => +c)
      .slice(0, 2);
    const block = 100;
    txServiceMock.getBlockNumber.onFirstCall().resolves(block);
    txServiceMock.getBlockNumber.onSecondCall().rejects(new Error("fail"));
    const expected = { [chainIds[0]]: block };
    expect(await metrics.collectRpcHeads()).to.be.deep.eq(expected);
  });
});

describe("collectSubgraphHeads", () => {
  it("should work", async () => {
    const chainIds = Object.keys(configMock.chainConfig).map((c) => +c);
    const block = 100000;
    (contractReaderMock.getSyncRecords as any).resolves([{ synced: true, syncedBlock: block }]);
    const expected = {};
    chainIds.map((c) => {
      expected[c] = block;
    });
    expect(await metrics.collectSubgraphHeads()).to.be.deep.eq(expected);
  });

  it("should work if theres an error on one chain", async () => {
    const chainIds = Object.keys(configMock.chainConfig)
      .map((c) => +c)
      .slice(0, 2);
    const block = 100;
    (contractReaderMock.getSyncRecords as any).onFirstCall().resolves([{ synced: true, syncedBlock: block }]);
    (contractReaderMock.getSyncRecords as any).onSecondCall().rejects(new Error("fail"));
    const expected = { [chainIds[0]]: block };
    expect(await metrics.collectSubgraphHeads()).to.be.deep.eq(expected);
  });
});

describe("incrementFees / incrementGasConsumed / incrementTotalTransferredVolume / incrementRelayerFeesPaid", () => {
  const assetName = "TEST";
  const chainId = 1337;
  const transactionId = "TESTTX";
  const sendingChainId = 1337;
  const sendingAssetId = mkAddress();
  const receivingChainId = 1338;
  const receivingAssetId = mkAddress();
  const tests = [
    {
      method: "incrementFees",
      args: [
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        mkAddress(),
        chainId,
        parseEther("1"),
      ],
      labels: {
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        assetId: mkAddress(),
        chainId,
        assetName,
      },
      value: 10,
      entity: "feesCollected",
    },
    {
      method: "incrementGasConsumed",
      args: [
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        chainId,
        txReceiptMock,
        entities.TransactionReasons.Relay,
      ],
      labels: {
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        reason: entities.TransactionReasons.Relay,
        chainId,
      },
      value: 10,
      entity: "gasConsumed",
    },
    {
      method: "incrementRelayerFeesPaid",
      args: [transactionId, chainId, parseEther("0.0001"), mkAddress(), entities.TransactionReasons.CancelReceiver],
      labels: {
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        assetId: mkAddress(),
        reason: entities.TransactionReasons.CancelReceiver,
        chainId,
      },
      value: 10,
      entity: "relayerFeesPaid",
    },
    {
      method: "incrementTotalTransferredVolume",
      args: [mkAddress(), chainId, parseEther("0.0001")],
      labels: {
        transactionId,
        sendingAssetId,
        sendingChainId,
        receivingAssetId,
        receivingChainId,
        assetId: mkAddress(),
        chainId,
      },
      value: 10,
      entity: "totalTransferredVolume",
    },
  ];
  for (const test of tests) {
    it(`${test.method} should work`, async () => {
      const { method, args, labels, value, entity } = test;
      stub(metrics, "convertToUsd").resolves(value);
      stub(metrics, "getAssetName").returns(assetName);
      const incrementStub = stub();
      stub(entities, entity as any).value({ inc: incrementStub });
      await metrics[method](...args);
      expect(incrementStub.calledOnceWithExactly([{ ...labels }, value]));
    });

    it(`${test.method} should fail if it cannot convert to usdc`, async () => {
      const { method, args, entity } = test;
      stub(metrics, "convertToUsd").rejects(new Error("fail"));
      stub(metrics, "getAssetName").returns(assetName);
      const incrementStub = stub();
      stub(entities, entity as any).value({ inc: incrementStub });
      await expect(metrics[method](...args)).to.be.rejectedWith("fail");
    });
  }
});
