import { createStubInstance, reset, restore, SinonStub, SinonStubbedInstance, stub } from "sinon";
import { expect } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface } from "@connext/nxtp-txservice";
import { constants, providers } from "ethers";
import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const chainId = 1337;
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

    stub(SharedFns, "getChainIdFromDomain").resolves(chainId);
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

    it("happy: should work for ERC20 when allowance sufficient", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000001");

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance in-sufficient", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000000");

      const mockAssetId = mock.asset.A.address;
      const data = getErc20Interface().encodeFunctionData("approve", [mockAssetId, constants.MaxUint256]);

      const mockApproveTxRequest: providers.TransactionRequest = {
        to: mockAssetId,
        data,
        from: mock.config().signerAddress,
        value: 0,
        chainId,
      };

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mockAssetId, "1");
      console.log(res);
      expect(res).to.be.eq(mockApproveTxRequest);
    });

    it("happy: should work for Native", async () => {
      expect(nxtpSdkBase).to.not.be.undefined;
      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, constants.AddressZero, "1");
      expect(res).to.be.undefined;
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
