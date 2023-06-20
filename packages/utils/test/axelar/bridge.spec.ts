import { expect } from "@connext/nxtp-utils";
import { restore, reset, stub, SinonStub } from "sinon";
import { calculateAxelarBridgeFee } from "../../src";
import * as BridgeFuncs from "../../src/axelar/bridge";
import { AxelarQueryAPI, Environment } from "@axelar-network/axelarjs-sdk";

describe("axelar:bridge", () => {
  describe("#calculateAxelarBridgeFee", () => {
    let api: AxelarQueryAPI;
    let queryAPIStub: SinonStub;

    const sourceDomain = "1667785072";
    const destinationDomain = "1735353714";

    beforeEach(async () => {});

    afterEach(() => {
      restore();
      reset();
    });

    it("should fail if source domain is invalid", async () => {
      await expect(calculateAxelarBridgeFee("1887071092", destinationDomain)).to.be.rejectedWith("Invalid networks");
    });

    it("should fail if destination domain is invalid", async () => {
      await expect(calculateAxelarBridgeFee(sourceDomain, "1887071092")).to.be.rejectedWith("Invalid networks");
    });

    it("happy", async () => {
      api = new AxelarQueryAPI({ environment: Environment.TESTNET });
      queryAPIStub = stub(BridgeFuncs, "createAxelarQueryAPI").returns({
        estimateGasFee: stub().resolves("100"),
      } as any);

      expect(await calculateAxelarBridgeFee(sourceDomain, destinationDomain)).to.be.equal("100");
    });
  });
});
