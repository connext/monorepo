import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";
import { mock, stubContext } from "../../mock";

const { shared } = getHelpers();

describe("Helpers:Shared", () => {
  const mockContext = stubContext();

  describe("#getDestinationLocalAsset", () => {
    it("should return the local asset for the destination chain", async () => {
      const localAsset = await shared.getDestinationLocalAsset(mock.chain.A, mock.asset.A.address, mock.chain.B);
      // TODO: Write actual test when this is no longer a stub fn.
      expect(localAsset).to.be.eq(mock.asset.A.address);
    });
  });

  describe("#getTransactionId", () => {
    it("happy: should return the transfer ID hash based on nonce, domain", async () => {
      const nonce = "1234";
      const domain = "5678";
      // Based on the current hashing algorithm, the expected hash is:
      const expectedResult = "0xa9224faa7bc236091f6153e7ce013a1b0a2c802c18a7cedfeb708f2117359032";
      expect(shared.getTransactionId(nonce, domain)).to.be.eq(expectedResult);
    });
  });
});
