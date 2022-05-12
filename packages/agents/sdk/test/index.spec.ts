import { expect } from "@connext/nxtp-utils";
import { create } from "../src";
import { mock } from "./mock";

describe("Index", () => {
  describe("#create", () => {
    it("happy: should return class instances", async () => {
      const { nxtpSdkBase, nxtpSdkRouter, nxtpSdkStableSwap, nxtpSdkUtils } = await create(mock.config);
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkRouter).to.not.be.undefined;
      expect(nxtpSdkStableSwap).to.not.be.undefined;
      expect(nxtpSdkUtils).to.not.be.undefined;

      expect(nxtpSdkBase).to.not.be.null;

      expect(nxtpSdkBase.xcall).to.be.a("function");
    });
  });
});
