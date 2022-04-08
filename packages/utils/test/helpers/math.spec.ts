import { expect } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import {
  calculateExchangeAmount,
  calculateExchangeWad,
  fromWad,
  getRateFromPercentage,
  inverse,
  removeDecimals,
  sanitizeDecimals,
  toWad,
} from "../../src";

describe("Helpers:Math", () => {
  describe("#toWad", () => {
    it("converts the given amount to WAD units with the provided number of decimals", () => {
      const amount = "100";
      expect(toWad(amount, 9).toString()).to.be.eq("100000000000");
    });
    it("converts the given amount to WAD units with the default number of decimals(18)", () => {
      const amount = "100";
      expect(toWad(amount).toString()).to.be.eq("100000000000000000000");
    });
  });
  describe("#fromWad", () => {
    it("converts a wad amount to normal units using the provided number of decimals", () => {
      const amount = "100000000000";
      expect(fromWad(amount, 9)).to.be.eq("100");
    });
    it("converts a wad amount to normal units using the default number of decimals", () => {
      const amount = "100000000000000000000";
      expect(fromWad(amount)).to.be.eq("100");
    });
  });
  describe("#inverse", () => {
    it("inverts the given value with the provided precision", () => {
      const amount = "100";
      expect(inverse(amount, 9)).to.be.eq("0.01");
    });
    it("inverts the given value with the default precision", () => {
      const amount = "100";
      expect(inverse(amount)).to.be.eq("0.01");
    });
  });
  describe("#sanitizeDecimals", () => {
    it("drops decimals past the provided precision", () => {
      const amount = "100.0100";
      expect(sanitizeDecimals(amount, 9)).to.be.eq("100.01");
    });
    it("drops decimals past the default precision", () => {
      const amount = "100.0100";
      expect(sanitizeDecimals(amount)).to.be.eq("100.01");
    });
  });
  describe("#removeDecimals", () => {
    it("drops all decimals from a string number", () => {
      const amount = "100.0100";
      expect(removeDecimals(amount)).to.be.eq("100");
    });
  });
  describe("#calculateExchangeAmount", () => {
    it("calculates an exchange with the given amount of precision using wad math", () => {
      const inputAmount = "100";
      const swapRate = "0.95";
      expect(calculateExchangeAmount(inputAmount, swapRate, 9)).to.be.eq("95");
    });
    it("calculates an exchange with the default amount of precision using wad math", () => {
      const inputAmount = "100";
      const swapRate = "0.95";
      expect(calculateExchangeAmount(inputAmount, swapRate)).to.be.eq("95");
    });
  });
  describe("#calculateExchangeWad", () => {
    it("calculates the exchanged amount from the given inputs", () => {
      const inputWad = BigNumber.from("100");
      const inputDecimals = 9;
      const swapRate = "0.95";
      const outputDecimals = 18;

      expect(calculateExchangeWad(inputWad, inputDecimals, swapRate, outputDecimals).toString()).to.be.eq(
        "95000000000",
      );
    });
  });
  describe("#getRateFromPercentage", () => {
    it("gets the rate from percentage string", () => {
      expect(getRateFromPercentage("95")).to.be.eq("0.05");
    });
  });
});
