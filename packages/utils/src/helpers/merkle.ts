import { MerkleTree } from "merkletreejs";
import { utils } from "ethers";

import { NxtpError } from "../types";

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
