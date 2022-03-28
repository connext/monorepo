import { expect } from "chai";

import { validateAndParseAddress, getHexStringError, getAddressError } from "../../src";

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
    it("validate that hex string is 4 bytes long", () => {
      expect(getHexStringError("0xdeadbeef", 4)).to.be.deep.eq(undefined);
    })
  })

  describe("#getAddressError", () => {
    it("validates this is an address", () => {
      expect(getAddressError("0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef")).to.be.deep.eq(undefined);
    })
  })
});
