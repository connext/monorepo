import { expect } from "../../src/mocks";
import { isChainSupportedByGelato } from "../../src";

describe("isChainSupportedByGelato", () => {
  it("should work if a chain is supported by gelato", async () => {
    expect(await isChainSupportedByGelato(1)).to.be.true;
  });

  it("should work if a chain is not supported by gelato", async () => {
    expect(await isChainSupportedByGelato(12345)).to.be.false;
  });
});
