import { expect, getRandomBytes32 } from "@connext/nxtp-utils";

import { DBImpl, SparseMerkleTree } from "../../src/helpers/merkle";

const TREE_HEIGHT = 32;
const SAMPLE_HASH_COUNT = 123;

describe("Helpers: Merkle", () => {
  let db: DBImpl;
  let merkle: SparseMerkleTree;

  before(() => {
    db = new DBImpl();
    console.log("Generating sample leaf hashes...");
    for (let i = 0; i < SAMPLE_HASH_COUNT; i++) {
      db.push(getRandomBytes32());
    }
    console.log("Generating sample leaf hashes... done.");

    merkle = new SparseMerkleTree(db, TREE_HEIGHT);
  });

  describe("#getMerkleProof", () => {
    it("should get merkle proof", async () => {
      console.log("Calculating expected root...");
      const expectedRoot = await merkle.getRoot();
      console.log("EXPECTED ROOT:", expectedRoot, "\n\n");

      // Pick a random leaf for whom we want to get the proof.
      const index = 57; // This index is definitely random, I generated it myself.
      const leaf: string = (await db.getNode(index))!;
      console.log("Getting proof for leaf:", leaf, "at index:", index);

      const proof = await merkle.getProof(index);
      expect(proof.length).to.be.eq(TREE_HEIGHT);
      const result = merkle.verify(index, leaf, proof, expectedRoot);
      // console.log({
      //   ...result,
      //   expected: expectedRoot,
      //   proof,
      // });
      expect(result.verified).to.be.true;
      expect(result.calculated).to.be.eq(expectedRoot);
    });
  });
});
