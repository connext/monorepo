import { expect } from "@connext/nxtp-utils";

import {
  parseBodyFromMessage,
  parseSenderFromMessage,
  parseNonceFromMessage,
  parseDestinationFromMessage,
  parseRecipientFromMessage,
  parseOriginFromMessage,
} from "../../src";
import { BigNumber } from "ethers";

const SAMPLE_MESSAGE =
  "0x6172626f000000000000000000000000ee9dec2712cce65174b561151701bf54b99c24c800000d1f00626e62000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce00657468000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480300000000000000000000000000000000000000000000000000000000f7e9029879b9a8d764c36c3cae232f27e7e30d5f0b08e90425bc403ecacacb484c3d1251";
const SAMPLE_ORIGIN = 1634886255;
const SAMPLE_NONCE = 3359;
const SAMPLE_DESTINATION = 6450786;
const SAMPLE_RECIPIENT = "0x000000000000000000000000cd401c10afa37d641d2f594852da94c700e4f2ce";
const SAMPLE_SENDER = "0x000000000000000000000000ee9dec2712cce65174b561151701bf54b99c24c8";
const SAMPLE_BODY =
  "0x00657468000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480300000000000000000000000000000000000000000000000000000000f7e9029879b9a8d764c36c3cae232f27e7e30d5f0b08e90425bc403ecacacb484c3d1251";

describe("Helpers:Messages", () => {
  describe("#parseBodyFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(parseBodyFromMessage(SAMPLE_MESSAGE)).to.be.deep.eq(SAMPLE_BODY);
    });

    it("handles unprefixed messages", () => {
      expect(parseBodyFromMessage(SAMPLE_MESSAGE.slice(2))).to.be.deep.eq(SAMPLE_BODY);
    });
  });

  describe("#parseOriginFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(BigNumber.from(parseOriginFromMessage(SAMPLE_MESSAGE)).toNumber()).to.be.deep.eq(SAMPLE_ORIGIN);
    });

    it("handles unprefixed messages", () => {
      expect(BigNumber.from(parseOriginFromMessage(SAMPLE_MESSAGE.slice(2))).toNumber()).to.be.deep.eq(SAMPLE_ORIGIN);
    });
  });

  describe("#parseSenderFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(parseSenderFromMessage(SAMPLE_MESSAGE)).to.be.deep.eq(SAMPLE_SENDER);
    });

    it("handles unprefixed messages", () => {
      expect(parseSenderFromMessage(SAMPLE_MESSAGE.slice(2))).to.be.deep.eq(SAMPLE_SENDER);
    });
  });

  describe("#parseNonceFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(BigNumber.from(parseNonceFromMessage(SAMPLE_MESSAGE)).toNumber()).to.be.deep.eq(SAMPLE_NONCE);
    });

    it("handles unprefixed messages", () => {
      expect(BigNumber.from(parseNonceFromMessage(SAMPLE_MESSAGE.slice(2))).toNumber()).to.be.deep.eq(SAMPLE_NONCE);
    });
  });

  describe("#parseDestinationFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(BigNumber.from(parseDestinationFromMessage(SAMPLE_MESSAGE)).toNumber()).to.be.deep.eq(SAMPLE_DESTINATION);
    });

    it("handles unprefixed messages", () => {
      expect(BigNumber.from(parseDestinationFromMessage(SAMPLE_MESSAGE.slice(2))).toNumber()).to.be.deep.eq(
        SAMPLE_DESTINATION,
      );
    });
  });

  describe("#parseRecipientFromMessage", () => {
    it("handles 0x-prefixed messages", () => {
      expect(parseRecipientFromMessage(SAMPLE_MESSAGE)).to.be.deep.eq(SAMPLE_RECIPIENT);
    });

    it("handles unprefixed messages", () => {
      expect(parseRecipientFromMessage(SAMPLE_MESSAGE.slice(2))).to.be.deep.eq(SAMPLE_RECIPIENT);
    });
  });
});
