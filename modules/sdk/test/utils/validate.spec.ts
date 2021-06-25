import { validateAndParseAddress } from "../../src/utils";
import { expect } from "chai";

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
