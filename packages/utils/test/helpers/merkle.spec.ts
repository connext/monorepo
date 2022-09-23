import { utils } from "ethers";
import { expect } from "@connext/nxtp-utils";

import { MerkleProofVerificationFailed, getMerkleProof } from "../../src/helpers/merkle";

const { keccak256, toUtf8Bytes } = utils;

describe("Helpers: Merkle", () => {
  describe("#getMerkleProof", () => {
    let leaves;
    let leaf;
    beforeEach(() => {
      leaves = ["a", "b", "c"].map((x) => keccak256(toUtf8Bytes(x)));
      leaf = keccak256(toUtf8Bytes("a"));
    });

    it("should error if badLeaf", async () => {
      const _leaf = keccak256(toUtf8Bytes("d"));
      await expect(getMerkleProof({ leaf: _leaf, leaves })).to.be.rejectedWith(MerkleProofVerificationFailed);
    });

    it("should return proof", async () => {
      expect(await getMerkleProof({ leaf, leaves })).to.be.an("array");
    });
  });
});
