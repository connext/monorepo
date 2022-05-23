import { stub, restore, reset } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { mock } from "./mock";
import { create, NxtpSdkBase } from "../src";
import { getConfig, getEnvConfig } from "../src/config";
import { ChainDataUndefined } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  let config;

  before(async () => {
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    const { nxtpSdkBase: _nxtpSdkBase } = await create(config);

    nxtpSdkBase = _nxtpSdkBase;
  });
  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.config).to.not.be.null;
      expect(nxtpSdkBase.chainData).to.not.be.null;
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#approveIfNeeded", () => {
    it("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      await expect(nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).not.throw();

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
