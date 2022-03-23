import { utils, BigNumber } from "ethers";
import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";
import { stubContext, mock } from "../../mock";

const { execute } = getHelpers();

const mockTransactingAmount = utils.parseEther("1");
const mockRouterFee = BigNumber.from(mockTransactingAmount).mul(5).div(100);
const mockReceivingAmount = BigNumber.from(mockTransactingAmount).sub(mockRouterFee);

let mockContext: any;

describe("Helpers:Fulfill", () => {
  before(() => {
    mockContext = stubContext();
  });

  describe("#sanityCheck", () => {
    const mockEncodedData = mock.encodedData();
    beforeEach(() => {
      mockContext.adapters.txservice.getGasEstimate.resetHistory();
      mockContext.adapters.txservice.getGasEstimate.resolves(BigNumber.from(200_000));
      mockContext.adapters.contracts.transactionManager.encodeFunctionData.resetHistory();
      mockContext.adapters.contracts.transactionManager.encodeFunctionData.returns(mockEncodedData);
    });

    it("happy", async () => {
      const mockBid = mock.entity.bid();
      const result = await execute.sanityCheck(mockBid, mock.loggingContext().requestContext);
      expect(result).to.be.true;
      expect(mockContext.adapters.txservice.getGasEstimate).to.have.been.calledOnceWithExactly(
        Number(mockBid.data.params.destinationDomain),
        {
          chainId: Number(mock.chain.B),
          to: mockContext.config.chains[mockBid.data.params.destinationDomain].deployments.transactionManager,
          data: mockEncodedData,
        },
      );
    });

    it("returns false if gas estimate throws", async () => {
      const mockBid = mock.entity.bid();
      mockContext.adapters.txservice.getGasEstimate.rejects(new Error("gas estimate error, oh no!"));
      const result = await execute.sanityCheck(mockBid, mock.loggingContext().requestContext);
      expect(result).to.be.false;
    });
  });
});
