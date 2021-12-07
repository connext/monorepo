import { expect, mkAddress } from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";
import { SinonStub, stub } from "sinon";
import * as metrics from "../../../src/lib/helpers/metrics";
import * as entities from "../../../src/lib/entities/metrics";
import { contractReaderMock, txServiceMock } from "../../globalTestHook";
import { configMock } from "../../utils";
import { parseEther } from "@ethersproject/units";

describe("getAssetName", () => {
  it("should work", () => {
    const { assetId, chainId } = configMock.swapPools[0].assets[0];
    const name = metrics.getAssetName(assetId, chainId);
    expect(name).to.be.eq("TEST");
  });
});

describe("collectOnchainLiquidity", () => {
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
    decimals.map((dec, idx) => txServiceMock.getDecimalsForAsset.onCall(idx).resolves(dec));

    // run
    const ret = await metrics.collectOnchainLiquidity();
    expect(ret).to.be.deep.eq({
      1337: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1337).assetId,
          balance: +amt * +price,
        },
      ],
      1338: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1338).assetId,
          balance: +amt * +price,
        },
      ],
    });
  });
});

describe("collectExpressiveLiquidity", () => {
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
          volume: utils.parseUnits(amt, 18),
          volumeIn: utils.parseUnits(amt, 18),
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
          volume: +amt * +price,
          volumeIn: +amt * +price,
        },
      ],
      1338: [
        {
          assetId: configMock.swapPools[0].assets.find((a) => a.chainId === 1338).assetId,
          amount: +amt * +price,
          supplied: +amt * +price,
          locked: 0,
          removed: 0,
          volume: +amt * +price,
          volumeIn: +amt * +price,
        },
      ],
    });
  });
});

describe("incrementFees / incrementGasConsumed / incrementTotalTransferredVolume", () => {
  const assetName = "TEST";
  const chainId = 1337;
  const tests = [
    {
      method: "incrementFees",
      args: [mkAddress(), chainId, parseEther("1").toString()],
      labels: { assetId: mkAddress(), chainId, assetName },
      value: 10,
      entity: "feesCollected",
    },
    {
      method: "incrementGasConsumed",
      args: [chainId, parseEther("0.0001"), entities.TransactionReasons.Relay],
      labels: { reason: entities.TransactionReasons.Relay, chainId },
      value: 10,
      entity: "gasConsumed",
    },
    {
      method: "incrementTotalTransferredVolume",
      args: [mkAddress(), chainId, parseEther("0.0001")],
      labels: { assetId: mkAddress(), amount: parseEther("0.0001"), chainId },
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
