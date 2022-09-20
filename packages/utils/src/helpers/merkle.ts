import { MerkleTree } from "merkletreejs";
import { NxtpError } from "../types";
import { solidityKeccak256 } from "ethers/lib/utils";

export const getMerkleProof = async (params: {
  leaf: string;
  root: string;
  leaves: string[]; // bytes32[32]
}): Promise<any[]> => {
  const { leaf, root: _root, leaves } = params;
  //   const leaves = ["a", "b", "c"].map((x) => SHA256(x));

  // create tree
  const tree = new MerkleTree(leaves, solidityKeccak256);

  const root = tree.getRoot().toString("hex");

  if (root === _root) {
    throw new NxtpError(`Bad root or leaves`, { inputRoot: _root, calculatedRoot: root });
  }

  const proof = tree.getProof(leaf);

  const verify = tree.verify(proof, leaf, root);
  if (!verify) {
    throw new NxtpError(`proof verification failed`, { proof, leaf, root });
  }

  return proof;
};
