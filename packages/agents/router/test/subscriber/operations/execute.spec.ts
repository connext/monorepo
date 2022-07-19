import { constants, utils, BigNumber, Signer, Wallet } from "ethers";
import { reset, restore, SinonStub, stub } from "sinon";
import { BaseRequestContext, Bid, expect, formatUrl, OriginTransfer } from "@connext/nxtp-utils";
import axios from "axios";

import * as ExecuteFns from "../../../src/subscriber/operations/execute";
import * as Mockable from "../../../src/mockable";
import {
  ParamsInvalid,
  NotEnoughAmount,
  MissingXCall,
  CallDataForNonContract,
  SequencerResponseInvalid,
  AuctionExpired,
  InvalidAuctionRound,
  UnableToGetAsset,
} from "../../../src/errors";
import { mock } from "../../mock";
import { version } from "../../../package.json";
import { mockSubContext } from "../../globalTestHook";

const { requestContext } = mock.loggingContext("Operations:Execute");

const { execute, getBlacklist, getDestinationLocalAsset, sendBid, getMinimumBidsCountForRound } = ExecuteFns;

describe("Operations:Execute", () => {
  describe("#getBlacklist", () => {
    it("should return no blacklist", async () => {
      const { destinationBlacklisted, originBlacklisted } = await getBlacklist("1337", "1338");
      expect(destinationBlacklisted).to.be.false;
      expect(originBlacklisted).to.be.false;
    });

    it("should return blacklist", async () => {
      (mockSubContext.bridgeContext!.blacklist as SinonStub).returns(new Set([1337, 1338]));
      const { destinationBlacklisted, originBlacklisted } = await getBlacklist("1337", "1338");
      expect(destinationBlacklisted).to.be.true;
      expect(originBlacklisted).to.be.true;
    });
  });

  describe("#getDestinationLocalAsset", () => {
    it("should return the local asset for the destination chain", async () => {
      const mockLocalAsset = "0x456";
      (mockSubContext.adapters.subgraph.getAssetByLocal as SinonStub).resolves({ canonicalId: "0x123" });
      (mockSubContext.adapters.subgraph.getAssetByCanonicalId as SinonStub).resolves({ local: mockLocalAsset });

      const localAsset = await getDestinationLocalAsset(mock.chain.A, mock.asset.A.address, mock.chain.B);
      expect(localAsset).to.be.eq(mockLocalAsset);
    });
  });

  describe("#sendBid", () => {
    const mockSequencerUrl = "http://mockUrl:1234";
    let axiosPostStub: SinonStub;
    const mockBid = mock.entity.bid();
    beforeEach(() => {
      mockSubContext.config.sequencerUrl = mockSequencerUrl;
      axiosPostStub = stub(axios, "post").resolves({ data: "ok" });
    });

    afterEach(() => {
      axiosPostStub.restore();
    });

    it("happy", async () => {
      const result = await sendBid(mockBid, requestContext);
      expect(axiosPostStub).to.have.been.calledOnceWithExactly(formatUrl(mockSequencerUrl, "auctions"), mockBid);
      expect(result).to.equal("ok");
    });

    it("throws AuctionExpired", async () => {
      axiosPostStub.rejects({ response: { data: { message: "AuctionExpired" } } });
      await expect(sendBid(mockBid, requestContext)).to.be.rejectedWith(AuctionExpired);
    });

    it("throws SequencerResponseInvalid if no response", async () => {
      axiosPostStub.resolves();
      await expect(sendBid(mockBid, requestContext)).to.be.rejectedWith(SequencerResponseInvalid);
    });

    it("throws SequencerResponseInvalid if no response.data", async () => {
      axiosPostStub.resolves({ data: undefined });
      await expect(sendBid(mockBid, requestContext)).to.be.rejectedWith(SequencerResponseInvalid);
    });
  });

  describe("#getMinimumBidsCountForRound", () => {
    it("should return the minimum bids count for the round", async () => {
      expect(getMinimumBidsCountForRound(3)).to.eq(4);
    });

    it("should throw if greater than config", async () => {
      expect(() => getMinimumBidsCountForRound(10)).to.throw(InvalidAuctionRound);
    });
  });

  describe("#execute", () => {
    const mockFulfillLocalAsset = mock.asset.A.address;
    let mockTransactingAmount: BigNumber;
    let mockXTransfer: OriginTransfer;
    let mockRouter: string;
    let mockGetDestinationLocalAsset: SinonStub<
      [_originDomain: string, _originLocalAsset: string, _destinationDomain: string],
      Promise<string>
    >;
    let mockSignRouterPathPayload: SinonStub<
      [transferId: string, pathLength: string, signer: Wallet | Signer],
      Promise<string>
    >;
    let mockSendBid: SinonStub<
      [
        bid: {
          transferId: string;
          origin: string;
          routerVersion: string;
          router: string;
          signatures: Record<string, string>;
        },
        _requestContext: BaseRequestContext,
      ],
      Promise<void>
    >;

    beforeEach(() => {
      mockTransactingAmount = utils.parseEther("1");
      mockXTransfer = mock.entity.xtransfer({
        amount: mockTransactingAmount.toString(),
      }) as OriginTransfer;
      mockRouter = mock.address.router;

      mockSignRouterPathPayload = stub(Mockable, "signRouterPathPayload").resolves(mock.signature);

      mockGetDestinationLocalAsset = stub(ExecuteFns, "getDestinationLocalAsset").resolves(mockFulfillLocalAsset);
      mockSendBid = stub(ExecuteFns, "sendBid").resolves();

      (mockSubContext.adapters.subgraph.isRouterApproved as SinonStub).resolves(true);
      (mockSubContext.adapters.subgraph.getAssetBalance as SinonStub).resolves(constants.MaxUint256);
    });

    afterEach(async () => {
      reset();
      restore();
    });

    it("happy", async () => {
      const expectedBid: Bid = {
        routerVersion: version,
        transferId: mockXTransfer.transferId,
        origin: mockXTransfer.xparams.originDomain,
        router: mockRouter,
        signatures: {
          "1": mock.signature,
          "2": mock.signature,
          "3": mock.signature,
          "4": mock.signature,
        },
      };

      await execute(mockXTransfer, requestContext);

      expect(mockSubContext.adapters.subgraph.getAssetBalance).to.be.calledOnceWithExactly(
        mock.domain.B,
        mockSubContext.routerAddress,
        mockFulfillLocalAsset,
      );
      expect(mockGetDestinationLocalAsset).to.be.calledOnceWithExactly(
        mockXTransfer.xparams.originDomain,
        mockXTransfer.origin.assets.bridged.asset,
        mockXTransfer.xparams.destinationDomain,
      );
      expect(mockSignRouterPathPayload).to.be.callCount(4);
      expect(mockSendBid).to.have.been.calledOnceWithExactly(expectedBid, requestContext);
    });

    it("should choose rounds properly", async () => {
      const _mockXTransfer = mock.entity.xtransfer({
        amount: "200",
      });
      const _expectedBid: Bid = {
        transferId: _mockXTransfer.transferId,
        origin: _mockXTransfer.xparams.originDomain,
        router: mockRouter,
        routerVersion: version,
        signatures: {
          "2": mock.signature,
          "3": mock.signature,
          "4": mock.signature,
        },
      };

      (mockSubContext.adapters.subgraph.getAssetBalance as SinonStub).resolves("100");

      await execute(_mockXTransfer as OriginTransfer, requestContext);
      expect(mockSendBid).to.be.calledOnceWithExactly(_expectedBid, requestContext);
    });

    it("happy with calldata", async () => {
      mockXTransfer.xparams.callData = "0xbeef";
      (mockSubContext.adapters.txservice.getCode as SinonStub).resolves("0xbeef");

      await expect(execute(mockXTransfer, requestContext)).to.be.fulfilled;
    });

    it("throws ParamsInvalid if the call params are invalid according to schema", async () => {
      const invalidParams = {
        ...mockXTransfer,
        xparams: {
          to: 1234,
          callData: 5678,
          forceSlow: false,
          receiveLocal: false,
        },
      };
      await expect(execute(invalidParams as any, requestContext)).to.be.rejectedWith(ParamsInvalid);
    });

    it("should throw UnableToGetAsset if getAsset errors", async () => {
      mockGetDestinationLocalAsset.rejects("foo");
      await expect(execute(mockXTransfer, requestContext)).to.be.rejectedWith(UnableToGetAsset);
    });

    it("should throw UnableToGetAsset if getAsset returns undefined", async () => {
      mockGetDestinationLocalAsset.resolves(undefined);
      await expect(execute(mockXTransfer, requestContext)).to.be.rejectedWith(UnableToGetAsset);
    });

    it("should throw NotEnoughAmount if router doesn't have enough tokens", async () => {
      (mockSubContext.adapters.subgraph.getAssetBalance as SinonStub).resolves(BigNumber.from("0"));
      await expect(execute(mockXTransfer, requestContext)).to.be.rejectedWith(NotEnoughAmount);
    });

    it("should throw CallDataForNonContract if calldata is passed but no code exists", async () => {
      mockXTransfer.xparams.callData = "0xbeef";
      await expect(execute(mockXTransfer, requestContext)).to.be.rejectedWith(CallDataForNonContract);
    });

    it("should throw MissingXCall if the transfer is missing origin params", async () => {
      await expect(
        execute(
          {
            ...mockXTransfer,
            origin: undefined as any,
          },
          requestContext,
        ),
      ).to.be.rejectedWith(MissingXCall);
    });

    // TODO: reenable when blacklist working again
    // it("should throw on blacklisted origin", async () => {
    //   getBlacklistStub.resolves({ originBlacklisted: true, destinationBlacklisted: false });

    //   await expect(execute(mockXTransfer)).to.be.rejectedWith(NomadHomeBlacklisted);
    // });

    // it("should throw on blacklisted destination", async () => {
    //   getBlacklistStub.resolves({ originBlacklisted: false, destinationBlacklisted: true });

    //   await expect(execute(mockXTransfer)).to.be.rejectedWith(NomadHomeBlacklisted);
    // });

    // it("should throw on both destination and origin blacklisted", async () => {
    //   getBlacklistStub.resolves({ originBlacklisted: true, destinationBlacklisted: true });

    //   await expect(execute(mockXTransfer)).to.be.rejectedWith(NomadHomeBlacklisted);
    // });

    it("should return early if transfer exists", async () => {
      (mockSubContext.adapters.subgraph.getDestinationTransferById as SinonStub).resolves({ hello: "world" });
      await execute(mockXTransfer, requestContext);
      expect(mockSubContext.adapters.subgraph.getAssetBalance).to.not.be.called;
      expect(mockSendBid).to.not.be.called;
    });

    it("should return early if slow path", async () => {
      await execute({ ...mockXTransfer, xparams: { ...mockXTransfer.xparams, forceSlow: true } }, requestContext);
      expect(mockSubContext.adapters.subgraph.getAssetBalance).to.not.be.called;
      expect(mockSendBid).to.not.be.called;
    });

    it("should not sendBid if no liquidity", async () => {
      (mockSubContext.adapters.subgraph.getAssetBalance as SinonStub).resolves(constants.Zero);

      await expect(execute(mockXTransfer, requestContext)).to.be.rejectedWith(NotEnoughAmount);
    });
  });
});
