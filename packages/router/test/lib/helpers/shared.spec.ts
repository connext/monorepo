import { createMethodContext, createRequestContext, expect, jsonifyError, mkAddress } from "@connext/nxtp-utils";
import { BigNumber } from "@ethersproject/bignumber";
import Sinon, { stub } from "sinon";
import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import {
  getChainIdForGasFee,
  getGasPrice,
  getRouterBalancesFromSwapPool,
  getSwapIdxList,
  getTokenPrice,
} from "../../../src/lib/helpers/shared";
import { txServiceMock } from "../../globalTestHook";

import * as ContractHelperFns from "../../../src/adapters/contract/contract";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { constants } from "ethers";
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

describe("getTokenPrice", () => {
  beforeEach(() => {
    stub(ContractHelperFns, "getOracleContractAddress").returns("0xaaa");
  });

  it("should work", async () => {
    txServiceMock.readTx.resolves("1");
    const result = await getTokenPrice(4, constants.AddressZero, null);
    expect(result.toString()).to.be.eq("1");
  });
});

describe("getGasPrice", () => {
  it("should work", async () => {
    txServiceMock.getGasPrice.resolves(BigNumber.from("1"));
    const result = await getGasPrice(4, null);
    expect(result.toString()).to.be.eq("1");
  });
});

describe("getChainIdsForGasFee", () => {
  it("should work", async () => {
    const result = await getChainIdForGasFee();
    expect(result).to.be.includes(4);
    expect(result).to.be.includes(56);
    expect(result).to.be.includes(42161);
  });
});

describe("getSwapIdxList", () => {
  it("should work", async () => {
    const result = await getSwapIdxList(1337, mkAddress("0xc"), 1338, mkAddress("0xd"), requestContext, methodContext);
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
      await getSwapIdxList(
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
    const pendingLiquidityMap: Map<number, BigNumber> = new Map();
    pendingLiquidityMap.set(1337, BigNumber.from("1000000000000000"));

    const result = await getRouterBalancesFromSwapPool(configMock.swapPools[0], pendingLiquidityMap);
    expect(result[0].toString()).to.be.eq("10001001000000000000000");
    expect(result[1].toString()).to.be.eq("10001000000000000000000");
  });
});
