import { createLoggingContext, expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { getNtpTimeSeconds } from "../../../src/lib/helpers";
import * as shared from "../../../src/lib/helpers/shared";
import { txServiceMock } from "../../globalTestHook";

const { requestContext, methodContext } = createLoggingContext("auctionRequestBinding", undefined, mkBytes32());

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
    const result = await shared.getMainnetEquivalentFromChainData(constants.AddressZero, 100);
    expect(result).to.be.eq("0x6B175474E89094C44Da98b954EedeAC495271d0F");
  });
});

describe("getTokenPriceFromOnChain", () => {
  beforeEach(() => {
    txServiceMock.getTokenPriceFromOnChain.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const tokenPrice = await shared.getTokenPriceFromOnChain(1337, mkAddress("0xa"));
    expect(tokenPrice.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFeeInReceivingToken", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFeeInReceivingToken.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFeeInReceivingToken = await shared.calculateGasFeeInReceivingToken(
      mkAddress("0xa"),
      1337,
      mkAddress("0xb"),
      1338,
      18,
      requestContext,
    );

    expect(gasFeeInReceivingToken.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFeeInReceivingTokenForFulfill", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFeeInReceivingTokenForFulfill.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFeeInReceivingToken = await shared.calculateGasFeeInReceivingTokenForFulfill(
      mkAddress("0xa"),
      1337,
      18,
      requestContext,
    );

    expect(gasFeeInReceivingToken.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});

describe("calculateGasFee", () => {
  beforeEach(() => {
    txServiceMock.calculateGasFee.resolves(utils.parseEther("1"));
  });
  it("should work", async () => {
    const gasFee = await shared.calculateGasFee(1337, mkAddress("0xa"), 18, "prepare", requestContext, methodContext);

    expect(gasFee.toString()).to.be.eq(utils.parseEther("1").toString());
  });
});
