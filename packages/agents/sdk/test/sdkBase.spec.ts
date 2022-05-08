import { expect } from "@connext/nxtp-utils";
import { mock } from "./mock";
import { create, NxtpSdkBase } from "../src";
import { getConfig } from "../src/config";

describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  before(async () => {
    const config = await getConfig(mock.config, mock.chainData, mock.deployments);
    const { nxtpSdkBase: _nxtpSdkBase } = await create(config);

    nxtpSdkBase = _nxtpSdkBase;
  });
  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.config).to.not.be.null;
      expect(nxtpSdkBase.chainData).to.not.be.null;
    });
  });

  describe("#approveIfNeeded", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");
      expect(async () => await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).not.throw();

      // check the transactionRequest
    });
  });

  describe("#xCall", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.xcall).to.be.a("function");

      // check the transactionRequest
    });
  });

  describe("#bumpTransfer", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");

      // check the transactionRequest
    });
  });
});
