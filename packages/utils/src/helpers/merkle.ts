import { MerkleTree } from "merkletreejs";
import { utils } from "ethers";

import { NxtpError } from "../types";
import { mkBytes32 } from "../mocks";

export class MerkleRootInvalid extends NxtpError {
  constructor(context: any = {}) {
    super("Bad root or branch.", context, MerkleRootInvalid.name);
  }
}

export class MerkleProofVerificationFailed extends NxtpError {
  constructor(context: any = {}) {
    super("Merkle proof verification failed.", context, MerkleProofVerificationFailed.name);
  }
}

export const getMerkleProof = async (params: {
  leaf: string;
  branch: string[]; // bytes32[32]
}): Promise<string[]> => {
  const { leaf, branch } = params;

  const tree = new MerkleTree(branch, utils.keccak256);
  const root = tree.getRoot().toString("hex");
  const proof = tree.getProof(leaf);

  const verify = tree.verify(proof, leaf, root);
  if (!verify) {
    throw new MerkleProofVerificationFailed({ proof, leaf, root });
  }

  const hexProof = tree.getHexProof(leaf);

  return hexProof;
};

export type DBHelper = {
  getCount: () => Promise<number>;
  getNode: (index: number) => Promise<string | undefined>;
  getNodes: (start: number, end: number) => Promise<string[]>;
  putRoot: (path: string, hash: string) => Promise<void>;
  getRoot: (path: string) => Promise<string | undefined>;
};

const ZERO_BYTES = mkBytes32("0x");

export class SparseMerkleTree {
  public get maxCount() {
    // For a height of 32, this will be 4,294,967,296 nodes.
    return 2 ** this.height;
  }

  // Hash function used.
  public static hash = (a: string, b: string) => {
    return utils.solidityKeccak256(["bytes32", "bytes32"], [a, b]);
  };

  constructor(private db: DBHelper, private height: number = 32, private _debugLog = false) {}

  // Get the tree's current root.
  public async getRoot(): Promise<string> {
    // TODO: Naive and brute-force implementation: just grabs all nodes to calculate root
    // without using any caching... implement caching of subtrees and recursively try
    // to grab subtrees here to leverage that caching capability!
    const count = await this.db.getCount();
    const depth = await this.getStartingDepth(count);
    const nodes = await this.db.getNodes(0, count);

    // Hash our way back up to the surface using zero hashes, starting with the current active branch root.
    const zeroHashes = ZERO_HASHES();
    let current = this.getSubtreeRoot(depth, nodes);
    for (let i = depth - 1; i >= 0; i--) {
      current = SparseMerkleTree.hash(current, zeroHashes[i]);
    }
    return current;
  }

  // Calculate root from leaf and proof to verify.
  public verify(
    index: number,
    leaf: string,
    proof: string[],
    expected: string,
  ): { calculated: string; verified: boolean } {
    // Reverse the path, as we'll be climbing *up* the proof to get the root.
    const path = this.indexToPath(index).split("").reverse().join("");
    let current = leaf;
    for (let i = 0; i < proof.length; i++) {
      // Must be hashed in order (left node, right node).
      const isLeft = path[i] === "0";
      const args = isLeft ? [current, proof[i]] : [proof[i], current];
      current = SparseMerkleTree.hash(args[0], args[1]);
      if (this._debugLog) {
        console.log(path[i], ": Hashed", args[0], "with", args[1], "to get", current);
      }
    }
    return {
      calculated: current,
      verified: current === expected,
    };
  }

  public async getProof(index: number): Promise<string[]> {
    const pathToTarget = this.indexToPath(index);

    // Iterating down tree for sibling nodes:
    // e.g. Let's say this node's index is 568, and the count is 932.
    // 368*2: 00000000000000000000001011100000
    // 932*2: 00000000000000000000011101001000
    //                             ^ We start getting siblings here.
    //                               All other siblings up the tree will already be zero hashes.

    // Pre-fill siblings with zero hashes from each layer.
    const siblings: string[] = ZERO_HASHES();
    // We can skip the first N layers (i.e. let them be zero hashes) depending on the current count.
    let depth = await this.getStartingDepth();
    let prefix = "".padStart(depth, "0"); // Path prefix, useful for getting specific subtrees.
    for (depth; depth < this.height - 1; depth++) {
      const p = pathToTarget[depth];

      // Extend the path to get the sibling path at this layer.
      const siblingPath = prefix + (p === "1" ? "0" : "1");

      if (this._debugLog) {
        console.log("DESCENDED TO:    ", depth);
        console.log("FULL TARGET PATH:", pathToTarget);
        console.log("TARGET PATH:     ", prefix + p);
        console.log("SIBLING PATH:    ", siblingPath);
      }

      // Extend the current prefix down the target branch.
      prefix += p;

      // Get the subtree down the opposite path of the one to the target.
      const nodes = await this.getSubtreeNodes(depth + 1, siblingPath);

      // TODO: @jakek verify that removing this check doesn't break anything.
      // Sanity check: nodes were returned (if not, then our starting depth was likely incorrect).
      // if (!nodes.length) {
      //   throw new Error("No nodes...?");
      // }

      // The sibling at this depth will be the root of that subtree.
      siblings[depth] = this.getSubtreeRoot(depth + 1, nodes);
    }

    // Get the last sibling node.
    const p = pathToTarget[depth];
    const siblingPath = pathToTarget.substring(0, this.height - 1) + (p === "1" ? "0" : "1");
    const node = await this.db.getNode(parseInt(siblingPath, 2));
    if (node) {
      siblings[this.height - 1] = node;
    }

    // Reverse the siblings, since hashing to get the root will go the other way.
    return siblings.reverse();
  }

  private async getSubtreeNodes(depth: number, pathPrefix: string): Promise<string[]> {
    const layer = this.height - depth;

    // Starting with the prefix path that gets us TO the subtree, build out the path for the lower and upper bound
    // nodes, then convert that to an index.
    // Lower bound will be the left-most node in the subtree, upper bound will be the right-most node in the subtree.
    const lowerBoundPath = pathPrefix + "".padEnd(layer, "0");
    const upperBoundPath = pathPrefix + "".padEnd(layer, "1");
    const lowerBound = parseInt(lowerBoundPath, 2);
    const upperBound = parseInt(upperBoundPath, 2);

    if (this._debugLog) {
      // Diff; add 1 because boundaries are upper and lower inclusive.
      const t = 1 + upperBound - lowerBound;
      console.log(
        "Getting subtree nodes for",
        pathPrefix[pathPrefix.length - 1] === "0" ? "left" : "right",
        "path at depth",
        depth,
        ": (",
        lowerBound,
        "->",
        upperBound,
        ") :",
        t,
      );
      console.log("Sibling prefix:", pathPrefix);
      console.log("Lower bound:   ", lowerBoundPath, ";", lowerBound);
      console.log("Upper bound:   ", upperBoundPath, ";", upperBound);
    }

    // Sanity check: the boundary path should be the same length as the tree height.
    if (lowerBoundPath.length !== this.height) {
      throw new Error(
        "Lower bound path is incorrect length: " + lowerBoundPath.length.toString() + " != " + this.height.toString(),
      );
    }

    return await this.db.getNodes(lowerBound, upperBound);
  }

  // Get root from (sub)array of base layer nodes
  private getSubtreeRoot(depth: number, nodes: string[]): string {
    // TODO: Check to see if we have the given subtree cached!
    // const cached = await this.db.getSubtreeRoot()

    // TODO: There's probably a faster way to fill out empty subtrees... i.e. using KNOWN zero hashes.
    // Determine the expected number of nodes in this subtree given the current depth.
    // At a depth of 0, this should be the whole tree (e.g. for a tree of 16-depth: 65,536 nodes).
    const expectedNodeCount = 2 ** (this.height - depth);
    let roots: string[] = nodes.concat(new Array(expectedNodeCount - nodes.length).fill(ZERO_BYTES)); //hashedBaseLayer));

    if (this._debugLog) {
      console.log("GETTING ROOT FOR SUBTREE AT DEPTH", depth, expectedNodeCount);
      console.log("STARTING LEAVES ( x", roots.length, "):", roots);
    }

    let currentDepth = this.height; //- 1;
    while (roots.length > 1) {
      // Sanity check: no leftover nodes.
      if (roots.length % 2) {
        // If there's an odd number of nodes, something's wrong - we should have started with
        // a square of 2 (e.g. set of numbers that are 2^n).
        throw new Error("Leftover node was found when calculating subtree root!");
      }

      // Increment depth.
      currentDepth--;

      // Get the middle index.
      const m = Math.floor(roots.length / 2);
      let i: number;
      for (i = 0; i < m; i++) {
        // Hash the two nodes next to each other in the array.
        // A will be the left node index, B will be the right node index.
        const a = i * 2;
        const b = a + 1;

        // TODO: Check if the two roots are both the same zero hash, could skip hashing since
        // result would be known...
        roots[i] = SparseMerkleTree.hash(roots[a], roots[b]);
      }

      roots = roots.slice(0, i);
      if (this._debugLog) {
        console.log("ROOTS AT DEPTH", currentDepth, "( x", roots.length, "):", roots);
      }
    }

    return roots[0];
    // TODO: Cache the subtree in the DB once we have solved for root.
  }

  private async getStartingDepth(_count?: number): Promise<number> {
    const count = _count ?? (await this.db.getCount()); // Number of nodes (AKA max index).
    return this.height - count.toString(2).length;
  }

  // NOTE: Returns the DESCENDING path. Will need to be reversed to path climbing up the tree.
  private indexToPath(index: number): string {
    // The index is the path to the target leaf from the root in binary (where 0 = left,
    // 1 = right).
    return index.toString(2).padStart(this.height, "0"); // Path in binary string.
  }
}

// Zero hashes indexed by layer.
const _ZERO_HASHES = [
  "0x8448818bb4ae4562849e949e17ac16e0be16688e156b5cf15e098c627c0056a9",
  "0x93237c50ba75ee485f4c22adf2f741400bdf8d6a9cc7df7ecae576221665d735",
  "0x388ab20e2573d171a88108e79d820e98f26c0b84aa8b2f4aa4968dbb818ea322",
  "0x662ee4dd2dd7b2bc707961b1e646c4047669dcb6584f0d8d770daf5d7e7deb2e",
  "0x838c5655cb21c6cb83313b5a631175dff4963772cce9108188b34ac87c81c41e",
  "0xb8cd74046ff337f0a7bf2c8e03e10f642c1886798d71806ab1e888d9e5ee87d0",
  "0x0abf5ac974a1ed57f4050aa510dd9c74f508277b39d7973bb2dfccc5eeb0618d",
  "0xcdc72595f74c7b1043d0e1ffbab734648c838dfb0527d971b602bc216c9619ef",
  "0x4df84f40ae0c8229d0d6069e5c8f39a7c299677a09d367fc7b05e3bc380ee652",
  "0x5a9c16dc00d6ef18b7933a6f8dc65ccb55667138776f7dea101070dc8796e377",
  "0xf4418588ed35a2458cffeb39b93d26f18d2ab13bdce6aee58e7b99359ec2dfd9",
  "0xc65e9645644786b620e2dd2ad648ddfcbf4a7e5b1a3a4ecfe7f64667a3f0b7e2",
  "0xb46a28b6f55540f89444f63de0378e3d121be09e06cc9ded1c20e65876d36aa0",
  "0x5a2dce0a8a7f68bb74560f8f71837c2c2ebbcbf7fffb42ae1896f13f7c7479a0",
  "0xe1d3b5c807b281e4683cc6d6315cf95b9ade8641defcb32372f1c126e398ef7a",
  "0x2733e50f526ec2fa19a22b31e8ed50f23cd1fdf94c9154ed3a7609a2f1ff981f",
  "0xda7bce9f4e8618b6bd2f4132ce798cdc7a60e7e1460a7299e3c6342a579626d2",
  "0x5c67add7c6caf302256adedf7ab114da0acfe870d449a3a489f781d659e8becc",
  "0xc1df82d9c4b87413eae2ef048f94b4d3554cea73d92b0f7af96e0271c691e2bb",
  "0x3490c6ceeb450aecdc82e28293031d10c7d73bf85e57bf041a97360aa2c5d99c",
  "0xf8b13a49e282f609c317a833fb8d976d11517c571d1221a265d25af778ecf892",
  "0xf9dc3e7fe016e050eff260334f18a5d4fe391d82092319f5964f2e2eb7c1c3a5",
  "0xcefad4e508c098b9a7e1d8feb19955fb02ba9675585078710969d3440f5054e0",
  "0x9867cc5f7f196b93bae1e27e6320742445d290f2263827498b54fec539f756af",
  "0xffd70157e48063fc33c97a050f7f640233bf646cc98d9524c6b92bcf3ab56f83",
  "0x887c22bd8750d34016ac3c66b5ff102dacdd73f6b014e710b51e8022af9a1968",
  "0x0eb01ebfc9ed27500cd4dfc979272d1f0913cc9f66540d7e8005811109e1cf2d",
  "0xe58769b32a1beaf1ea27375a44095a0d1fb664ce2dd358e7fcbfb78c26a19344",
  "0x21ddb9a356815c3fac1026b6dec5df3124afbadb485c9ba5a3e3398a04b7ba85",
  "0xb4c11951957c6f8f642c4af61cd6b24640fec6dc7fc607ee8206a99e92410d30",
  "0xad3228b676f7d3cd4284a5443f17f1962b36e491b30a40b2405849e597ba5fb5",
  "0x0000000000000000000000000000000000000000000000000000000000000000", // Base layer.
];
// The exported/public function we use to ensure only a copy is returned.
export const ZERO_HASHES = () => _ZERO_HASHES.slice(0);
export const ZERO_HASH_AT_DEPTH = (depth: number) => _ZERO_HASHES[depth];
