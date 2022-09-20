import { expect, mock } from "@connext/nxtp-utils";
import { keccak256, toUtf8Bytes } from "ethers/lib/utils";
import { MerleProofVerificationFailed } from "../../../../src/errors/merkle";
import { getMerkleProof } from "../../../../src/tasks/prover/operations";

describe("Operations: Helpers", () => {
  describe("#getMerkleProof", () => {
    let leaves;
    let leaf;
    beforeEach(() => {
      leaves = ["a", "b", "c"].map((x) => keccak256(toUtf8Bytes(x)));
      leaf = keccak256(toUtf8Bytes("a"));
    });

    it("should error if badLeaf", async () => {
      const _leaf = keccak256(toUtf8Bytes("d"));
      await expect(getMerkleProof({ leaf: _leaf, leaves })).to.be.rejectedWith(MerleProofVerificationFailed);
    });

    it("should return proof", async () => {
      expect(await getMerkleProof({ leaf, leaves })).to.be.an("array");
    });
  });
});
