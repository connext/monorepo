import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";
import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();
const mockInterfaces = mock.contracts.interfaces();

describe("SdkBase", () => {
  let nxtpSdkBase: NxtpSdkBase;
  let config;

  let chainReader: SinonStubbedInstance<ChainReader>;

  beforeEach(async () => {
    chainReader = createStubInstance(ChainReader);
    config = getEnvConfig(mockConfig, mockChainData, mockDeployments);
    stub(ConfigFns, "getConfig").resolves(config);

    nxtpSdkBase = await NxtpSdkBase.create(mockConfig, undefined, mockChainData);

    (nxtpSdkBase as any).chainReader = chainReader;
    (nxtpSdkBase as any).contracts = mockInterfaces;
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
      await expect(NxtpSdkBase.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#approveIfNeeded", () => {
    it("should error if signerAddress is undefined", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });

    it("happy: should work for ERC20", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      stub(SharedFns, "getChainIdFromDomain").resolves(1337);
      chainReader.readTx.resolves("0x123");
      // mockDeployments.erc20.decodeFunctionResult.resolves("0");
      console.log(mockInterfaces.erc20);

      expect(await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).not.throw();

      // check the transactionRequest
    });

    it.skip("happy: should work for Native", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      await expect(await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).not.throw();

      // check the transactionRequest
    });
  });

  describe("#xCall", () => {
    it.skip("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.xcall).to.be.a("function");

      // check the transactionRequest
    });
  });

  describe("#bumpTransfer", () => {
    it.skip("happy: should work", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;

      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");

      // check the transactionRequest
    });
  });
});
