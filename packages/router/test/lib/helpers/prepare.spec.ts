import { expect, jsonifyError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { AmountInvalid } from "../../../src/lib/errors/prepare";
import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { stub } from "sinon";
import {
  getReceiverAmount,
  getReceiverExpiryBuffer,
  validBidExpiry,
  validExpiryBuffer,
} from "../../../src/lib/helpers";
import { BigNumber } from "@ethersproject/bignumber";
import { CHAIN_IDS_FOR_AMM } from "../../utils";
import { PriceImpactTooHigh } from "../../../src/lib/errors/auction";

describe("validExpiryBuffer", () => {
  it("should work", () => {
    const valid = 3600 * 24 + 300;
    expect(validExpiryBuffer(valid)).to.be.true;

    const long = 3600 * 7 * 24 + 300;
    expect(validExpiryBuffer(long)).to.be.false;

    const short = 3600 * 24 - 300;
    expect(validExpiryBuffer(short)).to.be.false;
  });
});

describe("validBidExpiry", () => {
  it("should work", () => {
    expect(validBidExpiry(100, 200)).to.be.false;
    expect(validBidExpiry(200, 100)).to.be.true;
    expect(validBidExpiry(100, 100)).to.be.false;
  });
});

describe("getReceiverAmount", () => {
  beforeEach(() => {
    stub(PrepareHelperFns, "getSwapRate").resolves(BigNumber.from("9000"));

    stub(SharedHelperFns, "getChainIdsForAMM").returns(CHAIN_IDS_FOR_AMM);
  });

  it("should work", async () => {
    const result = await getReceiverAmount(
      "10000",
      1,
      1,
      1337,
      "0x0",
      BigNumber.from("100000"),
      BigNumber.from("100000"),
      20,
    );
    expect(result).to.be.eq((9000 * 0.9995).toString().split(".")[0]);
  });

  it("should fail if price impact is too high", async () => {
    const err = jsonifyError(new PriceImpactTooHigh("10000", "8995", 5) as any);
    try {
      await getReceiverAmount("10000", 1, 1, 1337, "0x0", BigNumber.from("100000"), BigNumber.from("100000"), 5);
    } catch (e) {
      expect(e.message).to.be.eq(err.message);
    }
  });

  it("should work for 6 to 18", async () => {
    const result = await getReceiverAmount(parseUnits("1", 6).toString(), 6, 18);
    expect(result).to.be.eq(parseEther("0.9995").toString());
  });

  it("should work for 18 to 6", async () => {
    const result = await getReceiverAmount(parseUnits("1", 18).toString(), 18, 6);
    expect(result).to.be.eq(parseUnits("0.9995", 6).toString());
  });

  it("should work for decimals", async () => {
    const result = await getReceiverAmount("104731245", 6, 6);
    expect(() => BigNumber.from(result)).to.not.throw();
  });

  it("should fail if its a decimal string", async () => {
    const err = jsonifyError(new AmountInvalid("1.0") as any);
    try {
      await getReceiverAmount("1.0", 1, 1, 1337, "0x0", BigNumber.from("100000"), BigNumber.from("100000"), 20);
      expect(false).to.be.true;
    } catch (e) {
      expect(e.message).to.be.eq(err.message);
    }
  });
});

describe("getReceiverExpiryBuffer", () => {
  it("should work", () => {
    const buffer = Date.now();
    const decrement = 3600 * 24;
    expect(getReceiverExpiryBuffer(buffer)).to.be.eq(buffer - decrement);
  });
});
