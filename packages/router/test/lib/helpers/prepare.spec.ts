import { expect, jsonifyError } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { AmountInvalid } from "../../../src/lib/errors/prepare";
import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { SinonStub, stub } from "sinon";
import {
  getReceiverAmount,
  getReceiverExpiryBuffer,
  validBidExpiry,
  validExpiryBuffer,
} from "../../../src/lib/helpers";
import { PriceImpactTooHigh } from "../../../src/lib/errors/auction";

const amplification = 85;
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

let getSwapAmountStub: SinonStub;
describe("getReceiverAmount", () => {
  beforeEach(() => {
    getSwapAmountStub = stub(PrepareHelperFns, "getSwapAmount").resolves(BigNumber.from("90000"));
  });

  it("should work", async () => {
    getSwapAmountStub.resolves(parseEther("9000"));
    const result = await getReceiverAmount(
      parseEther("10000").toString(),
      18,
      18,
      [BigNumber.from("100000"), BigNumber.from("100000")],
      0,
      1,
      20,
      amplification,
      true,
    );
    expect(result).to.be.eq("8995500000000000000000");
  });

  it("should fail if price impact is too high", async () => {
    getSwapAmountStub.resolves(parseEther("9000"));
    const err = jsonifyError(
      new PriceImpactTooHigh(parseEther("10000").toString(), parseEther("9000").toString(), 5) as any,
    );
    try {
      await getReceiverAmount(
        parseEther("10000").toString(),
        18,
        18,
        [BigNumber.from("100000"), BigNumber.from("100000")],
        0,
        1,
        5,
        amplification,
        true,
      );
    } catch (e) {
      expect(e.message).to.be.eq(err.message);
    }
  });

  it("should work for 6 to 18", async () => {
    getSwapAmountStub.resolves(parseEther("90000"));
    const result = await getReceiverAmount(
      parseUnits("100000", 6).toString(),
      6,
      18,
      [BigNumber.from("100000"), BigNumber.from("100000")],
      0,
      1,
      20,
      amplification,
      true,
    );
    expect(result).to.be.eq(parseEther("89955").toString());
  });

  it("should work for 18 to 6", async () => {
    getSwapAmountStub.resolves(parseEther("90000"));
    const result = await getReceiverAmount(
      parseUnits("100000", 18).toString(),
      18,
      6,
      [BigNumber.from("100000"), BigNumber.from("100000")],
      0,
      1,
      20,
      amplification,
      true,
    );
    expect(result).to.be.eq(parseUnits("89955", 6).toString());
  });

  it("should work for decimals", async () => {
    getSwapAmountStub.resolves(parseEther("90000"));
    const result = await getReceiverAmount(
      parseUnits("100000", 6).toString(),
      6,
      6,
      [BigNumber.from("100000"), BigNumber.from("100000")],
      0,
      1,
      20,
      amplification,
      true,
    );
    expect(() => BigNumber.from(result)).to.not.throw();
  });

  it("should fail if its a decimal string", async () => {
    const err = jsonifyError(new AmountInvalid("1.0") as any);
    try {
      await getReceiverAmount(
        "1.0",
        1,
        1,
        [BigNumber.from("100000"), BigNumber.from("100000")],
        0,
        1,
        20,
        amplification,
        true,
      );
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
