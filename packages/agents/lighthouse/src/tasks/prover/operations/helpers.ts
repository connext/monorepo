import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

import { MerleProofVerificationFailed } from "../../../errors/merkle";

export const getMerkleProof = async (params: {
  leaf: string;
  leaves: string[]; // bytes32[32]
}): Promise<string[]> => {
  const { leaf, leaves } = params;
  // create tree
  const tree = new MerkleTree(leaves, keccak256);
  const root = tree.getRoot().toString("hex");
  const proof = tree.getProof(leaf);

  const verify = tree.verify(proof, leaf, root);
  if (!verify) {
    throw new MerleProofVerificationFailed({ proof, leaf, root });
  }

  const hexProof = tree.getHexProof(leaf);

  return hexProof;
};
