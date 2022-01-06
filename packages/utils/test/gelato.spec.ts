import { expect } from "../src/expect";
import { isChainSupportedByGelato } from "../src/gelato";

describe("isChainSupportedByGelato", () => {
  it("should work if a chain is supported by gelato", () => {
    expect(isChainSupportedByGelato(1)).to.be.true;
  });

  it("should work if a chain is not supported by gelato", () => {
    expect(isChainSupportedByGelato(12345)).to.be.false;
  });
});
