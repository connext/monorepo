import axios from "axios";
import { utils } from "ethers";
import { SinonStub, stub } from "sinon";
import { expect, formatUrl } from "@connext/nxtp-utils";

import * as FulfillFns from "../../../src/lib/operations/fulfill";
import { SlippageInvalid, SequencerResponseInvalid } from "../../../src/lib/errors";
import { mock, stubContext, stubHelpers } from "../../mock";

const { fulfill, sendBid } = FulfillFns;

const mockTransactingAmount = utils.parseEther("1");
const mockCrossChainTx = mock.entity.crossChainTx(mock.chain.A, mock.chain.B, mockTransactingAmount.toString());

describe("Operations:Fulfill", () => {
  let mockContext: any;

  before(() => {
    stubHelpers();
    mockContext = stubContext();
  });

  describe("#fulfill", () => {
    const mockFulfillLocalAsset = mock.asset.A.address;
    let sendBidStub: SinonStub;
    beforeEach(() => {
      mock.helpers.fulfill.sanityCheck.resolves(true);
      mock.helpers.shared.getDestinationLocalAsset.resolves(mockFulfillLocalAsset);
      mock.helpers.shared.signHandleRelayerFeePayload.resolves(mock.signature);
      sendBidStub = stub(FulfillFns, "sendBid").resolves();
    });

    afterEach(() => {
      sendBidStub.restore();
    });

    it("happy", async () => {
      const expectedBid = {
        transactionId: mockCrossChainTx.transactionId,
        data: {
          params: {
            recipient: mockCrossChainTx.recipient,
            callTo: mockCrossChainTx.callTo,
            callData: mockCrossChainTx.callData,
            originDomain: mockCrossChainTx.originDomain,
            destinationDomain: mockCrossChainTx.destinationDomain,
          },
          local: mockFulfillLocalAsset,
          router: mockCrossChainTx.router,
          feePercentage: FulfillFns.RELAYER_FEE_PERCENTAGE,
          amount: mockCrossChainTx.prepareLocalAmount,
          index: 0,
          transactionId: mockCrossChainTx.transactionId,
          proof: [],
          relayerSignature: mock.signature,
        },
      };

      await expect(fulfill(mockCrossChainTx)).to.be.fulfilled;

      expect(mock.helpers.shared.getDestinationLocalAsset.callCount).to.equal(1);
      expect(mock.helpers.shared.getDestinationLocalAsset.getCall(0).args).to.deep.eq([
        mockCrossChainTx.originDomain,
        mockCrossChainTx.prepareLocalAsset,
        mockCrossChainTx.destinationDomain,
      ]);
      expect(mock.helpers.shared.signHandleRelayerFeePayload.callCount).to.equal(1);
      expect(mock.helpers.fulfill.sanityCheck.callCount).to.equal(1);
      expect(mock.helpers.fulfill.sanityCheck.getCall(0).args[0]).to.deep.equal(expectedBid);
      expect(sendBidStub.getCall(0).args[0]).to.deep.equal(expectedBid);
    });

    it.skip("should throw NotEnoughAmount if final receiving amount < 0", async () => {});

    it.skip("should error if slippage invalid", async () => {
      mockContext.config.maxSlippage = "0";
      await expect(fulfill(mockCrossChainTx)).to.be.rejectedWith(SlippageInvalid);
    });

    it("should not sendBid if sanityCheck returns false", async () => {
      mock.helpers.fulfill.sanityCheck.resolves(false);
      await expect(fulfill(mockCrossChainTx)).to.be.fulfilled;
      expect(sendBidStub.callCount).to.equal(0);
    });
  });

  describe("#sendBid", () => {
    const mockSequencerUrl = "http://mockUrl:1234";
    let axiosPostStub: SinonStub;
    const mockBid = mock.entity.bid();
    beforeEach(() => {
      mockContext.config.sequencerUrl = mockSequencerUrl;
      axiosPostStub = stub(axios, "post").resolves({ data: "ok" });
    });

    afterEach(() => {
      axiosPostStub.restore();
    });

    it("happy", async () => {
      const result = await sendBid(mockBid);
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(formatUrl(mockSequencerUrl, "bid"), {
        bid: mockBid,
      });
      expect(result).to.equal("ok");
    });

    it("throws if no response", async () => {
      axiosPostStub.resolves();
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });

    it("throws SequencerResponseInvalid if no response.data", async () => {
      axiosPostStub.resolves({ data: undefined });
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });
  });
});
