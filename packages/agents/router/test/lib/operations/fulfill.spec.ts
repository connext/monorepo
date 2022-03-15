import { BigNumber, utils } from "ethers";
import { expect } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";
import { mock, stubContext, stubHelpers } from "../../mock";
import { NotEnoughAmount, SlippageInvalid } from "../../../src/lib/errors";

const { fulfill } = getOperations();

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
});
