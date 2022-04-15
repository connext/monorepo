import { BigNumber } from "ethers";
import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";
import { stubContext, mock } from "../../mock";

const { execute } = getHelpers();

describe("Helpers:Execute", () => {
  let mockContext: any;
  before(() => {
    mockContext = stubContext();
  });

  describe("#sanityCheck", () => {
    const mockEncodedData = mock.encodedData();
    beforeEach(() => {
      mockContext.adapters.txservice.getGasEstimateWithRevertCode.resetHistory();
      mockContext.adapters.txservice.getGasEstimateWithRevertCode.resolves(BigNumber.from(200_000));
      mockContext.adapters.contracts.connext.encodeFunctionData.resetHistory();
      mockContext.adapters.contracts.connext.encodeFunctionData.returns(mockEncodedData);
    });

    it("happy", async () => {
      const mockBidData = mock.entity.bidData();
      await execute.sanityCheck(mockBidData, mock.loggingContext().requestContext);
      expect(mockContext.adapters.wallet.getAddress.callCount).to.eq(1);
      expect(mockContext.adapters.txservice.getGasEstimateWithRevertCode).to.have.been.calledOnceWithExactly(
        Number(mockBidData.params.destinationDomain),
        {
          chainId: Number(mock.chain.B),
          to: mockContext.config.chains[mockBidData.params.destinationDomain].deployments.connext,
          from: await mockContext.adapters.wallet.getAddress(),
          data: mockEncodedData,
        },
      );
    });

    it("returns false if gas estimate throws", async () => {
      const mockBidData = mock.entity.bidData();
      const err = new Error("gas estimate error, oh no!");
      mockContext.adapters.txservice.getGasEstimateWithRevertCode.rejects(err);
      await expect(
        execute.sanityCheck(mockBidData, mock.loggingContext().requestContext),
      ).to.eventually.be.rejectedWith(err);
    });
  });
});
