import { expect } from "@connext/nxtp-utils";

import {
  validateAndParseAddress,
  getHexStringError,
  getAddressError,
  isValidHexString,
  isValidAddress,
  getBytes32Error,
  getRandomBytes32,
  isValidBytes32,
  getRandomAddress,
} from "../../src";

describe("Helpers:Hex", () => {
  describe("#validateAndParseAddress", () => {
    it("returns same address if already checksummed", () => {
      expect(validateAndParseAddress("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")).to.be.deep.eq(
        "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      );
    });

    it("returns checksummed address if not checksummed", () => {
      expect(validateAndParseAddress("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f".toLowerCase())).to.be.deep.eq(
        "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
      );
    });

    it("throws if not valid", () => {
      try {
        validateAndParseAddress("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6");
      } catch (e) {
        expect(e.message).to.be.deep.eq("0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6 is not a valid address.");
      }
    });
  });
  describe("#getHexStringError", () => {
    it("validate that data type is string", () => {
      expect(getHexStringError(1, 4)).to.be.deep.eq(`Invalid hex string: 1 is a number, expected a string`);
    });
    it("validate that the value starts with 0x", () => {
      expect(getHexStringError("aaaa", 2)).to.be.deep.eq(`Invalid hex string: aaaa doesn't start with 0x`);
    });
    it("validate the hex string using ethers", () => {
      expect(getHexStringError("0xhhhh", 2)).to.be.deep.eq(`Invalid hex string: 0xhhhh`);
    });
    it("validate the length of hex string is 4", () => {
      expect(getHexStringError("0xeeee", 4)).to.be.deep.eq(`Invalid hex string of length 4: 0xeeee is 2 bytes long`);
    });
    it("happy: ensure that hex string is 4 bytes long", () => {
      expect(getHexStringError("0xdeadbeef", 4)).to.be.deep.eq(undefined);
    });
  });

  describe("#isValidHexString", () => {
    it("should be the invalid hex string", () => {
      expect(isValidHexString("1")).to.be.eq(false);
      expect(isValidHexString("aaaa")).to.be.eq(false);
      expect(isValidHexString("0xhhhh")).to.be.eq(false);
      expect(isValidHexString("1")).to.be.eq(false);
    });
    it("happy case: should be the valid hex string", () => {
      expect(isValidHexString("0xdeadbeef")).to.be.eq(true);
    });
  });

  describe("#getAddressError", () => {
    it("should return error msg if this is an invalid address", () => {
      expect(getAddressError("0xabcabc")).to.be.not.undefined;
    });

    it("validates this is an address", () => {
      expect(getAddressError("0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef")).to.be.deep.eq(undefined);
    });
  });

  describe("#isValidAddress", () => {
    it("validates this is an address", () => {
      expect(isValidAddress("0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef")).to.be.eq(true);
    });
  });

  describe("#getBytes32Error", () => {
    it("should return error msg if it is not bytes32", () => {
      expect(getBytes32Error(1)).to.be.not.undefined;
      expect(getBytes32Error("aaaa")).to.be.not.undefined;
      expect(getBytes32Error("0xhhhh")).to.be.not.undefined;
    });
    it("happy: should return undefined if it is valid bytes32 ", () => {
      expect(getBytes32Error(getRandomBytes32())).to.be.undefined;
    });
  });

  describe("#isValidBytes32", () => {
    it("should return false if it is not bytes32", () => {
      expect(isValidBytes32(1)).to.be.eq(false);
      expect(isValidBytes32("aaaa")).to.be.eq(false);
      expect(isValidBytes32("0xhhhh")).to.be.eq(false);
    });
    it("happy: should return true if it is valid bytes32 ", () => {
      expect(isValidBytes32(getRandomBytes32())).to.be.eq(true);
    });
  });

  describe("#getRandomAddress", () => {
    it("happy case: should generate random address", () => {
      expect(isValidAddress(getRandomAddress())).to.be.eq(true);
    });
  });
  describe("#getRandomBytes32", () => {
    it("happy case: should generate random bytes32 string", () => {
      expect(isValidBytes32(getRandomBytes32())).to.be.eq(true);
    });
  });
});
