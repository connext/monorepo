import { expect, jsonifyError } from "@connext/nxtp-utils";
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
    );
    expect(result).to.be.eq((9000 * 0.9995).toString().split(".")[0]);
  });

  it("should fail if its a decimal string", async () => {
    const err = jsonifyError(new AmountInvalid("1.0") as any);
    try {
      await getReceiverAmount("1.0", 1, 1, 1337, "0x0", BigNumber.from("100000"), BigNumber.from("100000"));
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
