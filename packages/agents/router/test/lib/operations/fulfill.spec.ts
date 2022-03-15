import { expect } from "@connext/nxtp-utils";
import { BigNumber, utils } from "ethers";

import { getOperations } from "../../../src/lib/operations";
import { mock, stubContext, stubHelpers } from "../../mock";
import { NotEnoughAmount } from "../../../src/lib/errors";

const { fulfill } = getOperations();

const mockTransactingAmount = utils.parseEther("1");
const mockRouterFee = BigNumber.from(mockTransactingAmount).mul(5).div(100);
const mockGasFee = BigNumber.from("10000");
const mockCrossChainTx = mock.entity.crossChainTx(mock.chain.A, mock.chain.B, mockTransactingAmount.toString());

describe("Operations", () => {
  before(() => {
    stubContext();
    stubHelpers();
  });

  beforeEach(() => {});

  describe("#fulfill", () => {
    beforeEach(() => {
      // stub(SharedHelperFns, "sanitationCheck").resolves();
      mock.helpers.shared.getDecimalsForAsset.resolves(18);
      mock.helpers.fulfill.getReceiverAmount.resolves({
        receivingAmount: mockTransactingAmount.sub(mockRouterFee).toString(),
        routerFee: mockRouterFee.toString(),
        amountAfterSwapRate: "1",
      });
      mock.helpers.shared.calculateGasFeeInReceivingToken.resolves(mockGasFee);
    });

    it("happy", async () => {});

    it("should throw NotEnoughAmount if final receiving amount < 0", async () => {
      const tooMuchGasFee = BigNumber.from(mockTransactingAmount).add(1);
      mock.helpers.shared.calculateGasFeeInReceivingToken.resolves(tooMuchGasFee);
      await expect(fulfill(mockCrossChainTx)).to.eventually.be.rejectedWith(NotEnoughAmount);
    });

    it("should error if slippage invalid ", async () => {
      await expect(fulfill(mockCrossChainTx)).to.eventually.be.rejectedWith("Slippage invalid");
    });
  });
});
