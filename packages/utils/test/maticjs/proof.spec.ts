import { expect, mkHash } from "@connext/nxtp-utils";
import { restore, reset, stub, SinonStub } from "sinon";
import * as SharedFns from "../../src/ethers/shared";
import { generateExitPayload } from "../../src";

const mockChainData = [
  {
    name: "Unit Test Chain 1",
    chainId: "1337",
    domainId: "1337",
    confirmations: 1,
    assetId: {},
    rpc: ["localhost:8545"],
  },
  {
    name: "Unit Test Chain 2",
    chainId: "1338",
    domainId: "1338",
    confirmations: 1,
    assetId: {},
    rpc: ["localhost:8546"],
  },
];

describe("maticjs:proof", () => {
  describe("#generateExitPayload", () => {
    let fetchJsonStub: SinonStub;

    const domain = "1337";
    const mirrorDomain = "1338";
    const burnTxHash = mkHash("0xburn");
    const eventSignature = "EventSignature(bytes32)";

    beforeEach(() => {
      fetchJsonStub = stub(SharedFns, "fetchJson");
      fetchJsonStub.resolves(mockChainData);
    });

    afterEach(() => {
      restore();
      reset();
    });

    it("should fail if theres no record of domain", async () => {
      await expect(generateExitPayload("111111", mirrorDomain, burnTxHash, eventSignature)).to.be.rejectedWith(
        "ChainData doesn't have a record for domain: 111111",
      );
    });

    it("should fail if theres no record of mirror domain", async () => {
      await expect(generateExitPayload(domain, "111111", burnTxHash, eventSignature)).to.be.rejectedWith(
        "ChainData doesn't have a record for mirrorDomain: 111111",
      );
    });

    it("should return null if there are no rpcs && no providers mapping included", async () => {
      fetchJsonStub.resolves(
        mockChainData.map((m) => {
          return { ...m, rpc: [] };
        }),
      );
      const result = await generateExitPayload(domain, mirrorDomain, burnTxHash, eventSignature);
      expect(result).to.be.undefined;
    });
  });
});
