import { createMethodContext, createRequestContext, expect, jsonifyError, mkAddress } from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import { stub } from "sinon";
import { getChainData } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import * as shared from "../../../src/lib/helpers/shared";
import { ctxMock, txServiceMock } from "../../globalTestHook";

import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { SwapInvalid } from "../../../src/lib/errors";
import { configMock } from "../../utils";

const requestContext = createRequestContext("TEST");
const methodContext = createMethodContext("TEST");

describe("getNtpTimeSeconds", () => {
  it("should work", async () => {
    const result = await getNtpTimeSeconds();
    expect(result).to.be.eq(Math.floor(Date.now() / 1000));
  });
});

describe("getMainnetEquivalent", () => {
  it("should work", async () => {
    const result = await shared.getMainnetEquivalent(mkAddress("0xc"), 1337);
    expect(result).to.be.eq(mkAddress("0xd"));
  });
});

describe("getMainnetEquivalentFromChainData", () => {
  it("should work", async () => {
    ctxMock.chainData = await getChainData();
    const result = await shared.getMainnetEquivalentFromChainData(constants.AddressZero, 100);
    expect(result).to.be.eq("0x6B175474E89094C44Da98b954EedeAC495271d0F");
  });
});

describe("getSwapIdxList", () => {
  it("should work", async () => {
    const result = await shared.getSwapIdxList(
      1337,
      mkAddress("0xc"),
      1338,
      mkAddress("0xd"),
      requestContext,
      methodContext,
    );
    expect(result.sendingChainIdx).to.be.eq(0);
    expect(result.receivingChainIdx).to.be.eq(1);
    expect(result.swapPoolIdx).to.be.eq(0);
  });

  it("should error if allowed swap not found", async () => {
    const sendingChainId = 1;
    const sendingAssetId = mkAddress("0xc");
    const receivingChainId = 2;
    const receivingAssetId = mkAddress("0xd");

    const err = jsonifyError(
      new SwapInvalid(sendingChainId, sendingAssetId, receivingChainId, receivingAssetId, {
        methodContext,
        requestContext,
        sendingChainIdx: 0,
        receivingChainIdx: 1,
        swapPoolIdx: 0,
      }) as any,
    );
    try {
      await shared.getSwapIdxList(
        sendingChainId,
        sendingAssetId,
        receivingChainId,
        receivingAssetId,
        requestContext,
        methodContext,
      );
    } catch (e) {
      expect(e.message).to.be.eq(err.message);
    }
  });
});

describe("getRouterBalancesFromSwapPool", () => {
  beforeEach(() => {
    stub(SharedHelperFns, "getDecimalsForAsset").resolves(18);
  });
  it("should work", async () => {
    const pendingLiquidityMap: Map<string, BigNumber> = new Map();
    const chainId = 1337;
    const assetId = mkAddress("0xc");
    pendingLiquidityMap.set(chainId.toString().concat("-").concat(assetId), BigNumber.from("1000000000000000"));
    const result = await shared.getRouterBalancesFromSwapPool(configMock.swapPools[0], pendingLiquidityMap);
    expect(result[0].toString()).to.be.eq("10001001000000000000000");
    expect(result[1].toString()).to.be.eq("10001000000000000000000");
  });
});

describe("getTokenPriceFromOnChain", () => {
  beforeEach(() => {
    txServiceMock.getTokenPriceFromOnChain.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const tokenPrice = await shared.getTokenPriceFromOnChain(1337, mkAddress("0xa"));
  });
});
