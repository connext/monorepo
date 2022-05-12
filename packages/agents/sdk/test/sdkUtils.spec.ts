import { expect } from "@connext/nxtp-utils";
import { mock } from "./mock";
import { create, NxtpSdkUtils } from "../src";
import { getConfig } from "../src/config";

describe("SdkUtils", () => {
  let nxtpSdkUtils: NxtpSdkUtils;
  before(async () => {
    const config = await getConfig(mock.config, mock.chainData, mock.deployments);
    const { nxtpSdkUtils: _nxtpSdkUtils } = await create(config);

    nxtpSdkUtils = _nxtpSdkUtils;
  });
  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkUtils).to.not.be.undefined;

      expect(nxtpSdkUtils.config).to.not.be.null;
      expect(nxtpSdkUtils.chainData).to.not.be.null;
    });
  });

  describe("#getRoutersBalances", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkUtils).to.not.be.undefined;

      expect(nxtpSdkUtils.getRoutersBalances).to.be.a("function");
      // const res = await nxtpSdkUtils.getRoutersBalances();
      // console.log(res);
      expect(() => nxtpSdkUtils.getRoutersBalances()).not.throw();

      // check the transactionRequest
    });
  });
});
