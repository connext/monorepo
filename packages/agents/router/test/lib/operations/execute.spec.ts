import { constants, utils, BigNumber } from "ethers";
import { Bid, DEFAULT_ROUTER_FEE, expect, XTransfer } from "@connext/nxtp-utils";

import * as ExecuteFns from "../../../src/lib/operations/execute";
import { SlippageInvalid, ParamsInvalid, NotEnoughAmount, MissingXCall } from "../../../src/lib/errors";
import { mock, stubContext, stubHelpers } from "../../mock";

const { execute } = ExecuteFns;

const mockTransactingAmount = utils.parseEther("1");
const mockXTransfer: XTransfer = mock.entity.xtransfer({
  amount: mockTransactingAmount.toString(),
});
const mockRouter: string = mock.address.router;

describe("Operations:Execute", () => {
  let mockContext: any;

  before(() => {
    stubHelpers();
    mockContext = stubContext();
  });

  describe("#execute", () => {
    const mockFulfillLocalAsset = mock.asset.A.address;
    beforeEach(() => {
      mock.helpers.execute.sanityCheck.resolves();
      mock.helpers.shared.getDestinationLocalAsset.resolves(mockFulfillLocalAsset);
      mock.helpers.shared.signRouterPathPayload.resolves(mock.signature);
      mockContext.adapters.subgraph.isRouterApproved.resolves(true);
      mockContext.adapters.subgraph.getAssetBalance.resolves(constants.MaxUint256);
    });

    it("happy", async () => {
      const expectedBid: Bid = {
        transferId: mockXTransfer.transferId,
        origin: mockXTransfer.origin.domain,
        fee: DEFAULT_ROUTER_FEE,
        router: mockRouter,
        signatures: {
          "1": mock.signature,
        },
      };

      await expect(execute(mockXTransfer)).to.be.fulfilled;

      expect(mockContext.adapters.subgraph.getAssetBalance).to.be.calledOnceWithExactly(
        mock.chain.B,
        mockContext.routerAddress,
        mockFulfillLocalAsset,
      );
      expect(mock.helpers.shared.getDestinationLocalAsset).to.be.calledOnceWithExactly(
        mockXTransfer.origin.domain,
        mockXTransfer.origin.assets?.bridgedAsset,
        mockXTransfer.destination.domain,
      );
      expect(mock.helpers.shared.signRouterPathPayload).to.be.calledOnce;
      expect(mock.helpers.auctions.sendBid.getCall(0).args.slice(0, 1)).to.deep.equal([expectedBid]);
    });

    it("throws ParamsInvalid if the call params are invalid according to schema", async () => {
      const invalidParams = {
        ...mockXTransfer,
        callData: 12345,
      };
      await expect(execute(invalidParams as any)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should throw NotEnoughAmount if router doesn't have enough tokens", async () => {
      mockContext.adapters.subgraph.getAssetBalance.resolves(BigNumber.from("0"));
      await expect(execute(mockXTransfer)).to.be.rejectedWith(NotEnoughAmount);
    });

    it("should throw MissingXCall if the transfer is missing xcall param", async () => {
      await expect(
        execute({
          ...mockXTransfer,
          origin: {
            ...mockXTransfer.origin,
            xcall: undefined,
          },
        }),
      ).to.be.rejectedWith(MissingXCall);
    });

    it.skip("should error if slippage invalid", async () => {
      mockContext.config.maxSlippage = "0";
      await expect(execute(mockXTransfer)).to.be.rejectedWith(SlippageInvalid);
    });

    // reenable when subgraph check works
    it.skip("should not sendBid if no liquidity", async () => {
      mockContext.adapters.subgraph.getAssetBalance.resolves(constants.Zero);

      await expect(execute(mockXTransfer)).to.be.rejectedWith(NotEnoughAmount);
    });
  });
});
