import axios from "axios";
import { BigNumber, utils } from "ethers";
import { SinonStub, stub } from "sinon";
import { expect, formatUrl } from "@connext/nxtp-utils";

import { fulfill, sendBid } from "../../../src/lib/operations/fulfill";
import { NotEnoughAmount, SlippageInvalid, SequencerResponseInvalid } from "../../../src/lib/errors";
import { mock, stubContext, stubHelpers } from "../../mock";

const mockTransactingAmount = utils.parseEther("1");
const mockRouterFee = BigNumber.from(mockTransactingAmount).mul(5).div(100);
const mockGasFee = BigNumber.from("10000");
const mockCrossChainTx = mock.entity.crossChainTx(mock.chain.A, mock.chain.B, mockTransactingAmount.toString());

describe("Operations:Fulfill", () => {
  const mockContext = stubContext();

  before(() => {
    stubHelpers();
  });

  describe("#fulfill", () => {
    beforeEach(() => {
      mock.helpers.fulfill.getReceiverAmount.resolves({
        receivingAmount: mockTransactingAmount.sub(mockRouterFee).toString(),
        routerFee: mockRouterFee.toString(),
        amountAfterSwapRate: "1",
      });

      mock.helpers.shared.getAmountOut.resolves(mockTransactingAmount.toString());
      mock.helpers.shared.getDecimalsForAsset.resolves(18);
      mock.helpers.shared.calculateGasFeeInReceivingToken.resolves(mockGasFee);
      mock.helpers.shared.getDestinationLocalAsset.resolves(mock.asset.A.address);
      mock.helpers.shared.getDestinationTransactingAsset.resolves(mock.asset.B.address);
    });

    it("happy", async () => {});

    it("should throw NotEnoughAmount if final receiving amount < 0", async () => {
      const tooMuchGasFee = BigNumber.from(mockTransactingAmount).add(1);
      mock.helpers.shared.calculateGasFeeInReceivingToken.resolves(tooMuchGasFee);
      await expect(fulfill(mockCrossChainTx)).to.be.rejectedWith(NotEnoughAmount);
    });

    it("should error if slippage invalid", async () => {
      mockContext.config.maxSlippage = "0";
      await expect(fulfill(mockCrossChainTx)).to.be.rejectedWith(SlippageInvalid);
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
