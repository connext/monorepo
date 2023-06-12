import { reset, restore, stub, SinonStub } from "sinon";
import { providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { SdkBase } from "../src/sdkBase";
import * as MockableFns from "../src/mockable";

import {
  SdkXCallParams,
  SdkBumpTransferParams,
  SdkUpdateSlippageParams,
  SdkEstimateRelayerFeeParams,
  SdkCalculateAmountReceivedParams,
} from "@connext/sdk-core";
import { expect } from "@connext/nxtp-utils";

const mockConfig = mock.config();
const mockChainData = mock.chainData();
const mockConnextAddress = mockConfig.chains[mock.domain.A].deployments!.connext;

const chainId = +mock.chain.A;
const relayerFee = BigNumber.from("1");
const mockXTransfer = mock.entity.xtransfer();
const mockGenericTxRequest: providers.TransactionRequest = {
  to: mockConnextAddress,
  data: "0x",
  from: mock.config().signerAddress,
  value: relayerFee,
  chainId,
};

describe("SdkBase", () => {
  let sdkBase: SdkBase;
  let axiosPostStub: SinonStub;
  let expectedBaseUri: string;

  beforeEach(async () => {
    axiosPostStub = stub(MockableFns, "axiosPost");
    sdkBase = await SdkBase.create(mockConfig, undefined, mockChainData);
    expectedBaseUri = sdkBase.baseUri;
  });

  afterEach(() => {
    restore();
    reset();
  });

  describe("#create", () => {
    it("happy: should work", async () => {
      expect(sdkBase).to.not.be.undefined;
      expect(sdkBase.config).to.not.be.null;
      expect(sdkBase.chainData).to.not.be.null;

      expect(sdkBase.xcall).to.be.a("function");
      expect(sdkBase.bumpTransfer).to.be.a("function");
      expect(sdkBase.updateSlippage).to.be.a("function");
      expect(sdkBase.estimateRelayerFee).to.be.a("function");
      expect(sdkBase.calculateAmountReceived).to.be.a("function");
    });
  });

  describe("#xcall", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/xcall";
      const expectedArgs: SdkXCallParams = {
        ...mock.entity.xcallArgs(),
        origin: mock.entity.callParams().originDomain,
        relayerFee: relayerFee.toString(),
        receiveLocal: false,
        wrapNativeOnOrigin: false,
        unwrapNativeOnDestination: false,
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.xcall(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#bumpTransfer", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/bumpTransfer";
      const expectedArgs: SdkBumpTransferParams = {
        domainId: mockXTransfer.xparams.originDomain,
        transferId: mockXTransfer.transferId,
        asset: mockXTransfer.origin!.assets.transacting.asset,
        relayerFee: relayerFee.toString(),
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.bumpTransfer(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#updateSlippage", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/updateSlippage";
      const expectedArgs: SdkUpdateSlippageParams = {
        domainId: mockXTransfer.xparams.originDomain,
        transferId: mockXTransfer.transferId,
        slippage: "100",
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.updateSlippage(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });
  });

  describe("#estimateRelayerFee", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/estimateRelayerFee";
      const expectedArgs: SdkEstimateRelayerFeeParams = {
        originDomain: mockXTransfer.xparams.originDomain,
        destinationDomain: mockXTransfer.xparams.destinationDomain,
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkBase.estimateRelayerFee(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });

  describe("#calculateAmountReceived", () => {
    it("happy: should send request with correct params", async () => {
      const expectedEndpoint = "/calculateAmountReceived";
      const expectedArgs: SdkCalculateAmountReceivedParams = {
        originDomain: mockXTransfer.xparams.originDomain,
        destinationDomain: mockXTransfer.xparams.destinationDomain,
        originTokenAddress: mockXTransfer.origin!.assets.transacting.asset,
        amount: "100",
        receiveLocal: false,
        checkFastLiquidity: false,
      };
      const expectedRes = BigNumber.from(1);

      axiosPostStub.resolves({
        data: expectedRes,
        status: 200,
      });

      const res = await sdkBase.calculateAmountReceived(
        expectedArgs.originDomain,
        expectedArgs.destinationDomain,
        expectedArgs.originTokenAddress,
        expectedArgs.amount,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(expectedRes);
    });
  });
});
