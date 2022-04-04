import axios from "axios";
import { utils } from "ethers";
import { SinonStub, stub } from "sinon";
import { expect, formatUrl, mkAddress } from "@connext/nxtp-utils";

import * as ExecuteFns from "../../../src/lib/operations/execute";
import { SlippageInvalid, SequencerResponseInvalid, ParamsInvalid, SanityCheckFailed } from "../../../src/lib/errors";
import { mock, stubContext, stubHelpers } from "../../mock";

const { execute, sendBid } = ExecuteFns;

const mockTransactingAmount = utils.parseEther("1");
const mockXTransfer = mock.entity.xtransfer(mock.chain.A, mock.chain.B, mockTransactingAmount.toString());

describe("Operations:Execute", () => {
  let mockContext: any;

  before(() => {
    stubHelpers();
    mockContext = stubContext();
  });

  describe("#execute", () => {
    const mockFulfillLocalAsset = mock.asset.A.address;
    let sendBidStub: SinonStub;
    beforeEach(() => {
      mock.helpers.execute.sanityCheck.resolves();
      mock.helpers.shared.getDestinationLocalAsset.resolves(mockFulfillLocalAsset);
      mock.helpers.shared.signHandleRelayerFeePayload.resolves(mock.signature);
      sendBidStub = stub(ExecuteFns, "sendBid").resolves();
    });

    afterEach(() => {
      sendBidStub.restore();
    });

    it("happy", async () => {
      const expectedBid = {
        transferId: mockXTransfer.transferId,
        data: {
          params: {
            to: mockXTransfer.to,
            callData: mockXTransfer.callData,
            originDomain: mockXTransfer.originDomain,
            destinationDomain: mockXTransfer.destinationDomain,
          },
          local: mockFulfillLocalAsset,
          router: mockXTransfer.router,
          feePercentage: ExecuteFns.RELAYER_FEE_PERCENTAGE,
          amount: mockXTransfer.xcall.localAmount,
          nonce: 1234,
          originSender: mkAddress("0xfaded"),
          relayerSignature: mock.signature,
        },
      };

      await expect(execute(mockXTransfer)).to.be.fulfilled;

      expect(mock.helpers.shared.getDestinationLocalAsset.callCount).to.equal(1);
      expect(mock.helpers.shared.getDestinationLocalAsset.getCall(0).args).to.deep.eq([
        mockXTransfer.originDomain,
        mockXTransfer.xcall.localAsset,
        mockXTransfer.destinationDomain,
      ]);
      expect(mock.helpers.shared.signHandleRelayerFeePayload.callCount).to.equal(1);
      expect(mock.helpers.execute.sanityCheck.callCount).to.equal(1);
      expect(mock.helpers.execute.sanityCheck.getCall(0).args[0]).to.deep.equal(expectedBid);
      expect(sendBidStub.getCall(0).args[0]).to.deep.equal(expectedBid);
    });

    it("throws ParamsInvalid if the call params are invalid according to schema", async () => {
      const invalidParams = {
        ...mockXTransfer,
        to: "0x0",
        callData: "0x0",
        originDomain: "-1",
        destinationDomain: "-2",
      };
      expect(execute(invalidParams)).to.eventually.be.throw(new ParamsInvalid());
    });

    it.skip("should throw NotEnoughAmount if final receiving amount < 0", async () => {});

    it.skip("should error if slippage invalid", async () => {
      mockContext.config.maxSlippage = "0";
      await expect(execute(mockXTransfer)).to.be.rejectedWith(SlippageInvalid);
    });

    it("should not sendBid if sanityCheck throws error", async () => {
      const err = new Error("gas estimate error, oh no!");
      mock.helpers.execute.sanityCheck.rejects(err);
      await expect(execute(mockXTransfer)).to.be.rejectedWith(SanityCheckFailed);
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

    it("throws SequencerResponseInvalid if no response", async () => {
      axiosPostStub.resolves();
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });

    it("throws SequencerResponseInvalid if no response.data", async () => {
      axiosPostStub.resolves({ data: undefined });
      await expect(sendBid(mockBid)).to.be.rejectedWith(SequencerResponseInvalid);
    });
  });
});
