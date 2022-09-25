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

// TODO: Replace with real DB implementation: this is just a placeholder of stubs.
export class DBImpl {
  private storage: string[] = [];

  // Get the current number of nodes in the DB.
  public async getCount(): Promise<number> {
    return this.storage.length;
  }

  public async getNode(index: number): Promise<string> {
    return this.storage[index];
  }

  // NOTE: is INCLUSIVE!
  // NOTE: will NOT fill in missing values!
  public async getNodes(start: number, end: number): Promise<string[]> {
    return this.storage.slice(start, end + 1);
  }

  public async push(hash: string) {
    this.storage.push(hash);
  }
}

const ZERO_BYTES = mkBytes32("0x");

export class SparseMerkleTree {
  public get maxCount() {
    // For a height of 32, this will be 2,147,483,648 nodes.
    return 2 ** this.height / 2;
  }

  // Hash function used.
  private hash = (a: string, b?: string) => {
    if (b) {
      return utils.solidityKeccak256(["bytes32", "bytes32"], [a, b]);
    } else {
      return utils.solidityKeccak256(["bytes32"], [a]);
    }
  };

  constructor(private db: DBImpl, private height: number = 32) {}

  // Calculate root from leaf and proof.
  public calculateRoot(leaf: string, proof: string[]): string {
    let current = leaf;
    for (let i = 0; i < proof.length; i++) {
      current = this.hash(current, proof[i]);
    }
    return current;
  }

  public async getMerkleProof(index: number) {
    // The index * 2 is the path to the target leaf from the root in binary (where 0 = left,
    // 1 = right). We multiply by two because the last bit will always be a 0 (since every other
    // node at the base is 0x0).
    const pathToTarget = (index * 2).toString(2).padStart(this.height, "0"); // Path in binary string.
    const count = await this.db.getCount(); // Number of nodes (AKA max index).

    // Iterating down tree for sibling nodes:
    // e.g. Let's say this node's index is 568, and the count is 932.
    // 368*2: 00000000000000000000001011100000
    // 932*2: 00000000000000000000011101001000
    //                             ^ We start getting siblings here.
    //                               All other siblings up the tree will already be zero hashes.

    // Pre-fill siblings with zero hashes from each layer.
    const siblings: string[] = ZERO_HASHES();
    // We can skip the first N layers (i.e. let them be zero hashes) depending on the current count.
    let depth = (count * 2).toString(2).length;
    let prefix = ""; // Path prefix, useful for getting specific subtrees.
    for (depth; depth < this.height; depth++) {
      const p = pathToTarget[depth];
      prefix += p;
      const isLeft = p === "0";

      // Calculating the sibling root:
      // e.g. Let's say the depth is 22 and we're branching off into the right-hand subtree.
      // |    path prefix     |
      // 00000000000000000000001000000000 : 512
      // 00000000000000000000001111111110 : 1022
      //                       ^ split index
      // Worst case:
      // Assuming the subtree isn't already cached, we need every node from 512/2 - 1022/2 [256 - 511] in
      // order to get this subtree's root.
      // e.g. for the first (base) layer:
      // hash(nodes[256], 0x0), hash(nodes[257], 0x0) ... hash(nodes[511], 0x0)
      // for the second layer:
      // hash(hash(nodes[256], 0x0) + hash(nodes[257], 0x0)) ... hash(hash(nodes[511], 0x0) + hash(nodes[511], 0x0))

      // Get the subtree down the opposite path of the one to the target.
      const nodes = await this.getSubtreeNodes(depth, !isLeft, prefix);
      // The sibling at this depth will be the root of that subtree.
      siblings[depth] = this.getSubtreeRoot(nodes);
    }

    // Reverse the siblings, since hashing to get the root will go the other way.
    return siblings.reverse();
  }

  private async getSubtreeNodes(depth: number, isLeft: boolean, pathPrefix: string): Promise<string[]> {
    const layer = this.height - depth;

    // Starting with the prefix path that gets us TO the subtree, build out the path for the lower and upper bound
    // nodes, then convert that to an index.
    // Lower bound will be the left-most node in the subtree, upper bound will be the right-most node in the subtree.
    const lowerBound = parseInt(pathPrefix + (isLeft ? "0" : "1").padEnd(layer - 1, "0"), 2) / 2;
    const upperBound = parseInt(pathPrefix + (isLeft ? "0" : "1").padEnd(layer - 1, "1"), 2) / 2;
    const t = upperBound - lowerBound;

    const nodes = await this.db.getNodes(lowerBound, upperBound);
    if (nodes.length < t) {
      // If we're bumping up against the total node count (i.e. the upperBound > count), fill in the zero hash.
      const zeroHash = ZERO_HASH_AT_LAYER(layer);
      nodes.concat(new Array(nodes.length - t).fill(zeroHash));
    }
    return nodes;
  }

  // recursively get root from (sub)array of nodes
  private getSubtreeRoot(nodes: string[]): string {
    if (nodes.length === 1) {
      // If we're at the base layer, just return the node hashed with 0x0.
      return this.hash(nodes[0], ZERO_BYTES);
    }

    // TODO: Check to see if we have the given subtree cached!
    // const cached = await this.db.getSubtreeRoot()

    // Get the middle value.
    const m = Math.floor(nodes.length / 2);
    return this.hash(this.getSubtreeRoot(nodes.slice(0, m)), this.getSubtreeRoot(nodes.slice(m, nodes.length)));

    // TODO: Cache the subtree in the DB once we have solved for root.
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
export const ZERO_HASH_AT_LAYER = (index: number) => _ZERO_HASHES[index];
