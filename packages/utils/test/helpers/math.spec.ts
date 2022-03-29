import { expect } from "chai";

describe("Helpers:Math", () => {
  describe("#toWad", () => {
    it("converts the given amount to WAD units with the provided number of decimals", () => {});
    it("converts the given amount to WAD units with the default number of decimals(18)", () => {});
  });
  describe("#fromWad", () => {
    it("converts a wad amount to normal units using the provided number of decimals", () => {});
    it("converts a wad amount to normal units using the default number of decimals", () => {});
  });
  describe("#inverse", () => {
    it("inverts the given value with the provided precision", () => {});
    it("inverts the given value with the default precision", () => {});
  });
  describe("#sanitizeDecimals", () => {
    it("drops decimals past the provided precision", () => {});
    it("drops decimals past the default precision", () => {});
  });
  describe("#removeDecimals", () => {
    it("drops all decimals from a string number", () => {});
  });
  describe("#calculateExchangeAmount", () => {
    it("calculates an exchange with the given amount of precision using wad math", () => {});
    it("calculates an exchange with the default amount of precision using wad math", () => {});
  });
  describe("#calculateExchangeWad", () => {
    it("calculates the exchanged amount from the given inputs", () => {});
  });
  describe("#getRateFromPercentage", () => {
    it("gets the rate from percentage string", () => {});
  });
});
