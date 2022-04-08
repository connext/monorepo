import { expect } from "@connext/nxtp-utils";

import { getAddressFromPublicKey, compressPublicKey, validateAndParseAddress, mkAddress } from "../../src";

const mocPublicKey =
  "0x045a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e16257463175c0774b8041f03b66c824a664fa22d719dca18c6cf116f82d278a4";
const testAddress = "0x24EEe0a64ecB052BF4686B35c776d5a97E0934Ac";
const compressedPublicKey = "0x025a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e";

describe("Helpers:Address", () => {
  describe("#getAddressFromPublicKey", () => {
    it(`Should return address ${testAddress} from pub key`, () => {
      expect(getAddressFromPublicKey(mocPublicKey)).to.be.deep.eq(testAddress);
    });

    it(`Should throw if pubKey is invalid`, () => {
      const mocPublicKey2 =
        "0x045a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e16257463175c0774b8041f03b66c824a664fa22d719dca18c6cf116f82d278tt";
      expect(() => getAddressFromPublicKey(mocPublicKey2)).throw();
    });
  });

  describe("#compressPublicKey", () => {
    it(`Should get compressed version of public key`, () => {
      const compressedForm = Uint8Array.from([
        2, 90, 157, 126, 24, 217, 17, 2, 32, 237, 147, 157, 204, 253, 251, 137, 154, 233, 44, 87, 209, 163, 33, 82, 12,
        81, 213, 110, 39, 80, 202, 4, 142,
      ]);

      expect(compressPublicKey(mocPublicKey)).to.be.deep.equal(compressedForm);
    });
    it("should add `04` if publicKey % 32 == 0", () => {
      const mockPubKey2 =
        "0x5a9d7e18d9110220ed939dccfdfb899ae92c57d1a321520c51d56e2750ca048e16257463175c0774b8041f03b66c824a664fa22d719dca18c6cf116f82d278a4";
      const compressedForm = Uint8Array.from([
        2, 90, 157, 126, 24, 217, 17, 2, 32, 237, 147, 157, 204, 253, 251, 137, 154, 233, 44, 87, 209, 163, 33, 82, 12,
        81, 213, 110, 39, 80, 202, 4, 142,
      ]);
      expect(compressPublicKey(mockPubKey2)).to.be.deep.equal(compressedForm);
    });
  });

  describe("#validateAndParseAddress", () => {
    it(`Should throw if the address is invalid`, () => {
      const address = "0x123asd";
      expect(() => validateAndParseAddress(address)).throw();
    });
    it(`Should return address if it is valid`, () => {
      const address = mkAddress("0x123abc");
      expect(validateAndParseAddress(address).toLowerCase()).to.be.eq(address.toLowerCase());
    });
  });
});
