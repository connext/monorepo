import { constants, utils, BigNumber } from "ethers";
import { reset, restore } from "sinon";
import { Bid, DEFAULT_ROUTER_FEE, expect, OriginTransfer } from "@connext/nxtp-utils";

import * as ExecuteFns from "../../../src/lib/operations/execute";
import {
  SlippageInvalid,
  ParamsInvalid,
  NotEnoughAmount,
  MissingXCall,
  CallDataForNonContract,
} from "../../../src/lib/errors";
import { mock, stubContext, stubHelpers } from "../../mock";

const { execute } = ExecuteFns;

describe("Operations:Execute", () => {
  let mockContext: any;

  describe("#execute", () => {
    const mockFulfillLocalAsset = mock.asset.A.address;
    let mockTransactingAmount: BigNumber;
    let mockXTransfer: OriginTransfer;
    let mockRouter: string;

    beforeEach(() => {
      stubHelpers();
      mockContext = stubContext();

      mockTransactingAmount = utils.parseEther("1");
      mockXTransfer = mock.entity.xtransfer({
        amount: mockTransactingAmount.toString(),
      });
      mockRouter = mock.address.router;
      mock.helpers.execute.sanityCheck.resolves();
      mock.helpers.shared.getDestinationLocalAsset.resolves(mockFulfillLocalAsset);
      mock.helpers.shared.signRouterPathPayload.resolves(mock.signature);
      mockContext.adapters.subgraph.isRouterApproved.resolves(true);
      mockContext.adapters.subgraph.getAssetBalance.resolves(constants.MaxUint256);
    });

    afterEach(async () => {
      reset();
      restore();
    });

    it("happy", async () => {
      const expectedBid: Bid = {
        transferId: mockXTransfer.transferId,
        origin: mockXTransfer.originDomain,
        fee: DEFAULT_ROUTER_FEE,
        router: mockRouter,
        signatures: {
          "1": mock.signature,
        },
      };

      await execute(mockXTransfer);

      expect(mockContext.adapters.subgraph.getAssetBalance).to.be.calledOnceWithExactly(
        mock.chain.B,
        mockContext.routerAddress,
        mockFulfillLocalAsset,
      );
      expect(mock.helpers.shared.getDestinationLocalAsset).to.be.calledOnceWithExactly(
        mockXTransfer.originDomain,
        mockXTransfer.origin.assets.bridged.asset,
        mockXTransfer.destinationDomain,
      );
      expect(mock.helpers.shared.signRouterPathPayload).to.be.calledOnce;
      expect(mock.helpers.auctions.sendBid.getCall(0).args.slice(0, 1)).to.deep.equal([expectedBid]);
    });

    it("happy with calldata", async () => {
      mockXTransfer.xparams.callData = "0xbeef";
      mockContext.adapters.txservice.getCode.resolves("0xbeef");

      await expect(execute(mockXTransfer)).to.be.fulfilled;
    });

    it("throws ParamsInvalid if the call params are invalid according to schema", async () => {
      const invalidParams = {
        ...mockXTransfer,
        xparams: {
          to: 1234,
          callData: 5678,
        },
      };
      await expect(execute(invalidParams as any)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should throw NotEnoughAmount if router doesn't have enough tokens", async () => {
      mockContext.adapters.subgraph.getAssetBalance.resolves(BigNumber.from("0"));
      await expect(execute(mockXTransfer)).to.be.rejectedWith(NotEnoughAmount);
    });

    it("should throw CallDataForNonContract if calldata is passed but no code exists", async () => {
      mockXTransfer.xparams.callData = "0xbeef";
      await expect(execute(mockXTransfer)).to.be.rejectedWith(CallDataForNonContract);
    });

    it("should throw MissingXCall if the transfer is missing origin params", async () => {
      await expect(
        execute({
          ...mockXTransfer,
          origin: undefined,
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
