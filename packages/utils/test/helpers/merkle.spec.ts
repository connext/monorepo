import { utils } from "ethers";
import { expect, getRandomBytes32 } from "@connext/nxtp-utils";
import { constants } from "ethers";

import { DBImpl, SparseMerkleTree, ZERO_HASHES } from "../../src/helpers/merkle";

const { keccak256, toUtf8Bytes } = utils;

const TREE_HEIGHT = 32;
const SAMPLE_HASH_COUNT = 123;

describe("Helpers: Merkle", () => {
  let db: DBImpl;
  let merkle: SparseMerkleTree;

    beforeEach(() => {
      db = new DBImpl();
      mockle = new MockMerkleLib(TREE_HEIGHT);

      for (let i = 0; i < SAMPLE_HASH_COUNT; i++) {
        // Insert ALL sample hashes into the DB.
        db.push(SAMPLE_HASHES[i]);
        // Insert ALL sample hashes into the mock MerkleLib.
        mockle.insert(SAMPLE_HASHES[i]);
      }

      merkle = new SparseMerkleTree(db, TREE_HEIGHT);
    });

    merkle = new SparseMerkleTree(db, TREE_HEIGHT);
  });

    describe("#getMerkleProof", () => {
      it("should get merkle proof", async () => {
        const expectedRoot = mockle.root();

        // Pick a random leaf for whom we want to get the proof.
        const index = 573; // This index is definitely random, I generated it myself.
        const leaf: string = (await db.getNode(index))!;

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

/// MARK - types/class to mock behavior of on-chain MerkleLib.
type MockTree = {
  branch: string[];
  count: number;
};

class MockMerkleLib {
  public static readonly ZERO_HASHES = ZERO_HASHES().reverse();

  public readonly MAX_LEAVES: number;
  private tree: MockTree;

  constructor(public readonly height: number) {
    this.tree = {
      branch: new Array<string>(this.height).fill(constants.HashZero as string),
      count: 0,
    };
    this.MAX_LEAVES = 2 ** this.height - 1;
  }

  public printBranch() {
    console.log(this.getBranch());
  }

  public printBranchWithCtx() {
    console.log(this.getBranchWithCtx());
  }

  public getBranch(): string[] {
    const furthestDepth = this.tree.branch.indexOf(constants.HashZero as string);
    return this.tree.branch.slice(0, furthestDepth);
  }

  public getBranchWithCtx(): string[] {
    const furthestDepth = this.tree.branch.indexOf(constants.HashZero as string);
    return this.tree.branch.slice(0, furthestDepth).concat(MockMerkleLib.ZERO_HASHES.slice(furthestDepth));
  }

  /// MARK - Mocking of onchain functions:

  // See `MerkleLib.insert`
  public insert(node: string): number {
    let size: number = this.tree.count + 1;
    if (size >= this.MAX_LEAVES) {
      throw new Error("MerkleLibMock: tree is full!");
    }

    this.tree.count = size;
    for (let i = 0; i < this.height; i++) {
      if ((size & 1) == 1) {
        this.tree.branch[i] = node;
        return size;
      }
      node = SparseMerkleTree.hash(this.tree.branch[i], node);
      size /= 2;
    }

    throw new Error("MerkleLibMock: reached end of execution in `insert`, fn is broken.");
  }

  // See: `MerkleLib.rootWithCtx`
  public root(): string {
    let current: string = constants.HashZero;
    let index: number = this.tree.count;

    for (let i = 0; i < this.height; i++) {
      const ithBit = (index >> i) & 1;
      if (ithBit == 1) {
        current = SparseMerkleTree.hash(this.tree.branch[i], current);
      } else {
        current = SparseMerkleTree.hash(current, MockMerkleLib.ZERO_HASHES[i]);
      }
    }

    return current;
  }

  // See `MerkleLib.branchRoot`
  public static branchRoot(leaf: string, branch: string[], index: number): string {
    const height = branch.length;

    let current = leaf;
    for (let i = 0; i < height; i++) {
      const ithBit = (index >> i) & 1;
      const sibling = branch[i];
      if (ithBit == 1) {
        // If ith bit is 1, then the leaf is somewhere to the right.
        current = SparseMerkleTree.hash(sibling, current);
      } else {
        // If the ith bit is 0, then the leaf is somewhere to the left.
        current = SparseMerkleTree.hash(current, sibling);
      }
    }

    return current;
  }
}
