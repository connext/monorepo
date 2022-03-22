import { utils, BigNumber } from "ethers";
import { SinonStub, stub } from "sinon";
import * as UtilFns from "@connext/nxtp-utils";
import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";
import { stubContext, mock } from "../../mock";

const { fulfill } = getHelpers();

const mockTransactingAmount = utils.parseEther("1");
const mockRouterFee = BigNumber.from(mockTransactingAmount).mul(5).div(100);
const mockReceivingAmount = BigNumber.from(mockTransactingAmount).sub(mockRouterFee);

let mockContext: any;

describe("Helpers:Fulfill", () => {
  before(() => {
    console.log("beforeEach 1");
    mockContext = stubContext();
    console.log(mockContext.adapters.txservice);
    console.log("beforeEach 2");
  });

  describe("#sanityCheck", () => {
    beforeEach(() => {
      console.log("beforeEach 3", mockContext.adapters.txservice);
      mockContext.adapters.txservice.getGasEstimate.resetHistory();
      mockContext.adapters.txservice.getGasEstimate.resolves(BigNumber.from(200_000));
      console.log("beforeEach 4", mockContext.adapters.txservice);
    });

    it("happy", async () => {
      console.log("happy test 1", mockContext.adapters.txservice);
      const mockBid = mock.entity.bid();
      console.log("happy test 2", mockContext.adapters.txservice);
      await fulfill.sanityCheck(mockBid, mock.loggingContext().requestContext);
      console.log("happy test 3");
    });
  });

  // describe("#getReceiverAmount", () => {
  //   let getReceiverAmountUtilsStub: SinonStub;
  //   const stubResult = {
  //     receivingAmount: mockReceivingAmount.toString(),
  //     routerFee: mockRouterFee.toString(),
  //     amountAfterSwapRate: "1",
  //   };
  //   beforeEach(() => {
  //     getReceiverAmountUtilsStub = stub(UtilFns, "getReceiverAmount").resolves(stubResult);
  //   });

  //   it("happy: should call utility function", async () => {
  //     const amount = mockTransactingAmount.toString();
  //     const res = await fulfill.getReceiverAmount(amount, 18, 18);
  //     expect(res).to.deep.equal(stubResult);
  //     expect(getReceiverAmountUtilsStub).to.have.been.calledOnceWithExactly(amount, 18, 18);
  //   });

  //   it("should throw if amount includes a decimal", async () => {
  //     await expect(fulfill.getReceiverAmount("1.1", 18, 18)).to.be.rejectedWith(AmountInvalid);
  //   });
  // });
});
