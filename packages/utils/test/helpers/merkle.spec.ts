import { utils } from "ethers";
import { expect, getRandomBytes32 } from "@connext/nxtp-utils";

import { DBImpl, SparseMerkleTree } from "../../src/helpers/merkle";

const { keccak256, toUtf8Bytes } = utils;

const TREE_HEIGHT = 16;
const SAMPLE_HASH_COUNT = 10;

const SAMPLE_HASHES = [
  "0x809294caa2c5805f20faa809aa8cd4c29c016a82082ab88c8bec0daffae759cc",
  "0x4089464dba844828354e5e1645c72554de7dc1b8628eaf6579291883d6f22cff",
  "0x72f2c70999c652c791df40929c0312cad863c49f8d04ce1726aa611a46ffecf4",
  "0x49d23e0ed58501a630d5c1f6bfe3721d0f92c2f3d509933eb44c122bae9a8c48",
  "0x23ba17fbda245718812a1e8f2a2ca4c8afaf56ac18bec2850882052cbb0954e8",
  "0xc7155814f124f1bd1b6cfbcb67801cbe50a976131f22b3ce7812f6d3cc3446dc",
  "0x4b3ab0dd84e9a4329656adf7ca6d357c2cb480a02517ff4674cad1c336d44c1a",
  "0x01fee0a63e6db5232c668a76b546d4b8b6d08c4c85bc3345ec46cc1db8965ed0",
  "0x18bb4d9636df7f877deb23e3924e6f1f89a5ab193b34e17520f87bf4d1cb03aa",
  "0x2ba4b8dbd90e98ec9f2b27437c0cef7552498d8822099b799ac67a4d07bc34de",
];

describe.only("Helpers: Merkle", () => {
  let db: DBImpl;
  let merkle: SparseMerkleTree;

  before(() => {
    db = new DBImpl();
    console.log("Generating sample leaf hashes...");
    for (let i = 0; i < SAMPLE_HASHES.length; i++) {
      db.push(SAMPLE_HASHES[i]); //getRandomBytes32());
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
      // const index = Math.floor(Math.random() * SAMPLE_HASH_COUNT);
      const index = 4;
      const leaf: string = (await db.getNode(index))!;
      console.log("Getting proof for leaf:", leaf, "at index:", index);

      const proof = await merkle.getProof(index, expectedRoot);
      expect(proof.length).eq(TREE_HEIGHT);
      const result = merkle.verify(index, leaf, proof, expectedRoot);
      console.log({
        ...result,
        expected: expectedRoot,
        proof,
      });
    });
  });
});
