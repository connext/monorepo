import { createStubInstance, reset, restore, SinonStubbedInstance, stub } from "sinon";
import { expect, mkAddress } from "@connext/nxtp-utils";
import { ChainReader, getErc20Interface, getConnextInterface } from "@connext/nxtp-txservice";
import { constants, providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { NxtpSdkBase } from "../src/sdkBase";
import { getEnvConfig } from "../src/config";
import { ChainDataUndefined, SignerAddressMissing } from "../src/lib/errors";

import * as ConfigFns from "../src/config";
import * as SharedFns from "../src/lib/helpers/shared";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockDeployments = mock.contracts.deployments();

const mockConnextAddresss = mockConfig.chains[mock.domain.A].deployments.connext;
const mockAssetId = mock.asset.A.address;

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

      expect(nxtpSdkBase.approveIfNeeded).to.be.a("function");
      expect(nxtpSdkBase.xcall).to.be.a("function");
      expect(nxtpSdkBase.bumpTransfer).to.be.a("function");
      expect(nxtpSdkBase.changeSignerAddress).to.be.a("function");
    });

    it("should error if chaindata is undefined", async () => {
      stub(SharedFns, "getChainData").resolves(undefined);
      await expect(NxtpSdkBase.create(config)).to.be.rejectedWith(ChainDataUndefined);
    });
  });

  describe("#approveIfNeeded", () => {
    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1")).to.be.rejectedWith(
        SignerAddressMissing,
      );
    });

    it("happy: should work for Native", async () => {
      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, constants.AddressZero, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance sufficient", async () => {
      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000001");

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mock.asset.A.address, "1");
      expect(res).to.be.undefined;
    });

    it("happy: should work for ERC20 when allowance in-sufficient", async () => {
      chainReader.readTx.resolves("0x0000000000000000000000000000000000000000000000000000000000000000");
      const data = getErc20Interface().encodeFunctionData("approve", [mockConnextAddresss, constants.MaxUint256]);

      const mockApproveTxRequest: providers.TransactionRequest = {
        to: mockAssetId,
        data,
        from: mock.config().signerAddress,
        value: 0,
        chainId,
      };

      const res = await nxtpSdkBase.approveIfNeeded(mock.domain.A, mockAssetId, "1");
      expect(res).to.be.deep.eq(mockApproveTxRequest);
    });
  });

  describe("#xCall", () => {
    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.xcall(mock.entity.xcallArgs())).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work if ERC20", async () => {
      const mockXcallArgs = mock.entity.xcallArgs();
      const data = getConnextInterface().encodeFunctionData("xcall", [mockXcallArgs]);

      const mockApproveTxRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockXcallArgs.params.relayerFee),
        chainId,
      };

      const res = await nxtpSdkBase.xcall(mockXcallArgs);
      expect(res).to.be.deep.eq(mockApproveTxRequest);
    });

    it("happy: should work if Native", async () => {
      const mockXcallArgs = mock.entity.xcallArgs({ transactingAssetId: constants.AddressZero });
      const data = getConnextInterface().encodeFunctionData("xcall", [mockXcallArgs]);

      const mockApproveTxRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockXcallArgs.amount).add(BigNumber.from(mockXcallArgs.params.relayerFee)),
        chainId,
      };

      const res = await nxtpSdkBase.xcall(mockXcallArgs);
      expect(res).to.be.deep.eq(mockApproveTxRequest);
    });
  });

  describe("#bumpTransfer", () => {
    const mockXTransfer = mock.entity.xtransfer();

    const mockBumpTransferParams = {
      domain: mockXTransfer.originDomain,
      transferId: mockXTransfer.transferId,
      relayerFee: "1",
    };

    it("should error if signerAddress is undefined", async () => {
      (nxtpSdkBase as any).config.signerAddress = undefined;

      await expect(nxtpSdkBase.bumpTransfer(mockBumpTransferParams)).to.be.rejectedWith(SignerAddressMissing);
    });

    it("happy: should work", async () => {
      const data = getConnextInterface().encodeFunctionData("bumpTransfer", [mockBumpTransferParams.transferId]);

      const mockBumpTransferTxRequest: providers.TransactionRequest = {
        to: mockConnextAddresss,
        data,
        from: mock.config().signerAddress,
        value: BigNumber.from(mockBumpTransferParams.relayerFee),
        chainId,
      };

      const res = await nxtpSdkBase.bumpTransfer(mockBumpTransferParams);
      expect(res).to.be.deep.eq(mockBumpTransferTxRequest);
    });
  });

  describe("estimateRelayerFee", () => {});

  describe("#changeSignerAddress", () => {
    it("happy: should work", async () => {
      const mockSignerAddress = mkAddress("0xabcdef456");
      await nxtpSdkBase.changeSignerAddress(mockSignerAddress);
      expect(nxtpSdkBase.config.signerAddress).to.be.eq(mockSignerAddress);
    });
  });
});
