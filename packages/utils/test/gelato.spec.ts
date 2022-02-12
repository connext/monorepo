import axios from "axios";
import { SinonStub, stub } from "sinon";
import { expect } from "../src/expect";
import { isChainSupportedByGelato } from "../src/gelato";
let axiosGetStub: SinonStub;
const mockGelatoGetSupportedRelays = {
    relays: ["1"],
};
describe("isChainSupportedByGelato", () => {
  beforeEach(async () => {
    axiosGetStub = stub(axios, "get");
    axiosGetStub.resetHistory();
    axiosGetStub.resolves({ data: mockGelatoGetSupportedRelays });
  });

  it("should work if a chain is supported by gelato", async () => {
    expect(await isChainSupportedByGelato(1)).to.be.true;
  });

  it("should work if a chain is not supported by gelato", async () => {
    expect(await isChainSupportedByGelato(12345)).to.be.false;
  });

  afterEach(async () => {
    axiosGetStub.restore();
  })
});
