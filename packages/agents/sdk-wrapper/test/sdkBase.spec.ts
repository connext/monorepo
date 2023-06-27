import { reset, restore, stub, SinonStub } from "sinon";
import { providers, BigNumber } from "ethers";
import { mock } from "./mock";
import { SdkBase } from "../src/sdkBase";
import * as MockableFns from "../src/mockable";
import { convertBigNumberObject } from "./utils";

import {
  SdkXCallParams,
  SdkBumpTransferParams,
  SdkUpdateSlippageParams,
  SdkEstimateRelayerFeeParams,
  SdkCalculateAmountReceivedParams,
  Options,
} from "../src/sdk-types";
import { expect, mkAddress } from "@connext/nxtp-utils";

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
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.xcall(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overidden options", async () => {
      const expectedEndpoint = "/xcall";
      const expectedArgs: SdkXCallParams = {
        ...mock.entity.xcallArgs(),
        origin: mock.entity.callParams().originDomain,
        relayerFee: relayerFee.toString(),
        receiveLocal: false,
        wrapNativeOnOrigin: false,
        unwrapNativeOnDestination: false,
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.xcall({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
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
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.bumpTransfer(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/bumpTransfer";
      const expectedArgs: SdkBumpTransferParams = {
        domainId: mockXTransfer.xparams.originDomain,
        transferId: mockXTransfer.transferId,
        asset: mockXTransfer.origin!.assets.transacting.asset,
        relayerFee: relayerFee.toString(),
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.bumpTransfer({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
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
        options: {
          chains: mockConfig.chains,
          signerAddress: mockConfig.signerAddress,
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.updateSlippage(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.be.deep.eq(mockGenericTxRequest);
    });

    it("happy: should send request with overridden options", async () => {
      const expectedEndpoint = "/updateSlippage";
      const expectedArgs: SdkUpdateSlippageParams = {
        domainId: mockXTransfer.xparams.originDomain,
        transferId: mockXTransfer.transferId,
        slippage: "100",
      };
      const options: Options = {
        signerAddress: mkAddress("0xabc"),
        chains: {
          "404": {
            providers: ["https://some-fake-provider.io"],
          },
        },
      };

      axiosPostStub.resolves({
        data: mockGenericTxRequest,
        status: 200,
      });

      const res = await sdkBase.updateSlippage({ ...expectedArgs, options: options });

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, {
        ...expectedArgs,
        options: options,
      });
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
      const mockServerRes = {
        type: "BigNumber",
        hex: "0x1",
      };
      const expectedRes = BigNumber.from(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkBase.estimateRelayerFee(expectedArgs);

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res.eq(expectedRes)).to.be.true;
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
      const mockServerRes = {
        amountReceived: {
          type: "BigNumber",
          hex: "0x1",
        },
        originSlippage: {
          type: "BigNumber",
          hex: "0x1",
        },
        routerFee: {
          type: "BigNumber",
          hex: "0x1",
        },
        destinationSlippage: {
          type: "BigNumber",
          hex: "0x1",
        },
        isFastPath: true,
      };
      const expectedRes = convertBigNumberObject(mockServerRes);

      axiosPostStub.resolves({
        data: mockServerRes,
        status: 200,
      });

      const res = await sdkBase.calculateAmountReceived(
        expectedArgs.originDomain,
        expectedArgs.destinationDomain,
        expectedArgs.originTokenAddress,
        expectedArgs.amount,
      );

      expect(axiosPostStub).to.have.been.calledWithExactly(expectedBaseUri + expectedEndpoint, expectedArgs);
      expect(res).to.deep.eq(expectedRes);
    });
  });
});
