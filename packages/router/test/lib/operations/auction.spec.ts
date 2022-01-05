import { AuctionPayload, createRequestContext, mkAddress, mkBytes32, expect, sigMock } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { getOperations } from "../../../src/lib/operations";
import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as AuctionHelperFns from "../../../src/lib/helpers/auction";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { BID_EXPIRY, configMock, MUTATED_AMOUNT, MUTATED_BUFFER, routerAddrMock } from "../../utils";
import { contractReaderMock, txServiceMock } from "../../globalTestHook";
import { BigNumber, constants } from "ethers";
import { AuctionExpired, SubgraphNotSynced, ZeroValueBid } from "../../../src/lib/errors";

const requestContext = createRequestContext("TEST", mkBytes32());

const auctionPayload: AuctionPayload = {
  user: mkAddress("0xa"),
  initiator: mkAddress("0xa"),
  sendingChainId: 1337,
  sendingAssetId: mkAddress("0xc"),
  amount: "10000000000000000000000",
  receivingChainId: 1338,
  receivingAssetId: mkAddress("0xf"),
  receivingAddress: mkAddress("0xd"),
  expiry: Math.floor(Date.now() / 1000) + 24 * 3600 * 3,
  transactionId: mkBytes32("0xa"),
  encryptedCallData: "0x",
  callDataHash: mkBytes32("0xb"),
  callTo: mkAddress("0xe"),
  dryRun: false,
};

let getReceiverAmountStub: SinonStub;

describe.only("Auction Operation", () => {
  const { newAuction } = getOperations();
  describe("#newAuction", () => {
    beforeEach(() => {
      getReceiverAmountStub = stub(PrepareHelperFns, "getReceiverAmount").resolves({
        receivingAmount: MUTATED_AMOUNT,
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });

      stub(PrepareHelperFns, "getReceiverExpiryBuffer").returns(MUTATED_BUFFER);

      stub(AuctionHelperFns, "getBidExpiry").returns(BID_EXPIRY);

      stub(SharedHelperFns, "getNtpTimeSeconds").resolves(Math.floor(Date.now() / 1000));
    });

    it("should error if auction payload data validation fails", async () => {
      const _auctionPayload = { ...auctionPayload, user: "abc" };
      await expect(newAuction(_auctionPayload, requestContext)).to.eventually.be.rejectedWith("Params invalid");
    });

    it("should error if zero value bid", async () => {
      const _auctionPayload = { ...auctionPayload, amount: "0" };
      await expect(newAuction(_auctionPayload, requestContext)).to.eventually.be.rejectedWith(ZeroValueBid);
    });

    it("should error if expiry too close", async () => {
      const _auctionPayload = { ...auctionPayload, expiry: Math.floor(Date.now() / 1000) };
      await expect(newAuction(_auctionPayload, requestContext)).to.eventually.be.rejectedWith(AuctionExpired);
    });

    it("should error if not enough available liquidity for auction", async () => {
      getReceiverAmountStub.returns({
        receivingAmount: "10002000000000000000000",
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith("Not enough liquidity");
    });

    it("should error if sending subgraph is out of sync", async () => {
      const records = [{ synced: false, latestBlock: 0, syncedBlock: 0, uri: "", lag: 0 }];
      (contractReaderMock.getSyncRecords as SinonStub).onCall(0).returns(records);
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith(
        SubgraphNotSynced.getMessage(auctionPayload.receivingChainId, records),
      );
    });

    it("should error if receiving subgraph is out of sync", async () => {
      const records = [{ synced: false, latestBlock: 0, syncedBlock: 0, uri: "", lag: 0 }];
      (contractReaderMock.getSyncRecords as SinonStub).onCall(1).returns(records);
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith(
        SubgraphNotSynced.getMessage(auctionPayload.sendingChainId, records),
      );
    });

    it("should error if allowed swap not found", async () => {
      await expect(
        newAuction({ ...auctionPayload, receivingAssetId: mkAddress("0xabccc") }, requestContext),
      ).to.be.rejectedWith("swap not allowed");
    });

    it("should error if sender balance < minGas", async () => {
      txServiceMock.getBalance.resolves(constants.One);
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith(
        "Not enough gas on sending or receiving chains",
      );
    });

    it("happy-1: should take a gas fee for fulfill transactions if sendingChain is fee chain", async () => {
      getReceiverAmountStub.returns({
        receivingAmount: "100000000000000000000",
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });

      // it should take a gas fee for fulfill transactions if sendingChain is fee chain.
      const expectedReceiverAmount = "99999999999999999900";
      const bid = await newAuction(auctionPayload, requestContext);
      expect(bid.bid).to.deep.eq({
        user: auctionPayload.user,
        router: routerAddrMock,
        initiator: auctionPayload.initiator,
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: expectedReceiverAmount,
        bidExpiry: BID_EXPIRY,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: configMock.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });

      expect(bid.bidSignature).to.eq(sigMock);
    });

    it("happy-2: should take a gas fee for prepare transactions if receivingChain is fee chain", async () => {
      AuctionHelperFns.AUCTION_REQUEST_MAP.clear();
      getReceiverAmountStub.returns({
        receivingAmount: "100000000000000000000",
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });

      // it should take a gas fee for prepare transactions if receivingChain is fee chain.
      // amountReceived = amount.sub(prepareGasFee)
      const expectedReceiverAmount = "99999999999999999900";
      const bid = await newAuction(auctionPayload, requestContext);
      expect(bid.bid).to.deep.eq({
        user: auctionPayload.user,
        router: routerAddrMock,
        initiator: auctionPayload.initiator,
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: expectedReceiverAmount,
        bidExpiry: BID_EXPIRY,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: configMock.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });

      expect(bid.bidSignature).to.eq(sigMock);
    });

    it("happy-3: should take a gas fee for prepare and fulfill transactions if both sendingChain and receivingChain are fee chains", async () => {
      AuctionHelperFns.AUCTION_REQUEST_MAP.clear();
      getReceiverAmountStub.returns({
        receivingAmount: "100000000000000000000",
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });

      // it should take a gas fee for prepare and fulfill transactions if both sendingChain and receivingChain are fee chains.
      // amountReceived = amount.sub(prepareGasFee).sub(fulfillGasFee)
      const expectedReceiverAmount = "99999999999999999900";
      const bid = await newAuction(auctionPayload, requestContext);
      expect(bid.bid).to.deep.eq({
        user: auctionPayload.user,
        router: routerAddrMock,
        initiator: auctionPayload.initiator,
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: expectedReceiverAmount,
        bidExpiry: BID_EXPIRY,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: configMock.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });

      expect(bid.bidSignature).to.eq(sigMock);
    });

    it("happy-4: shouldn't take a gas fee if both sendingChain and receivingChain aren't fee chains", async () => {
      AuctionHelperFns.AUCTION_REQUEST_MAP.clear();

      getReceiverAmountStub.returns({
        receivingAmount: "100000000000000000000",
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });

      // it shouldn't take a gas fee if both sendingChain and receivingChain aren't fee chains
      const expectedReceiverAmount = "99999999999999999900";
      const bid = await newAuction(auctionPayload, requestContext);
      expect(bid.bid).to.deep.eq({
        user: auctionPayload.user,
        router: routerAddrMock,
        initiator: auctionPayload.initiator,
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: expectedReceiverAmount,
        bidExpiry: BID_EXPIRY,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: configMock.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });

      expect(bid.bidSignature).to.eq(sigMock);
    });

    it("happy: should return auction bid for first valid swap and should return rate exceeded error for second valid swap", async () => {
      AuctionHelperFns.AUCTION_REQUEST_MAP.clear();
      const bid = await newAuction(auctionPayload, requestContext);
      expect(bid.bid).to.deep.eq({
        user: auctionPayload.user,
        initiator: auctionPayload.initiator,
        router: routerAddrMock,
        sendingChainId: auctionPayload.sendingChainId,
        sendingAssetId: auctionPayload.sendingAssetId,
        amount: auctionPayload.amount,
        receivingChainId: auctionPayload.receivingChainId,
        receivingAssetId: auctionPayload.receivingAssetId,
        amountReceived: BigNumber.from(MUTATED_AMOUNT).sub(100).toString(),
        bidExpiry: BID_EXPIRY,
        receivingAddress: auctionPayload.receivingAddress,
        transactionId: auctionPayload.transactionId,
        expiry: auctionPayload.expiry,
        callDataHash: auctionPayload.callDataHash,
        callTo: auctionPayload.callTo,
        encryptedCallData: auctionPayload.encryptedCallData,
        sendingChainTxManagerAddress: configMock.chainConfig[auctionPayload.sendingChainId].transactionManagerAddress,
        receivingChainTxManagerAddress:
          configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
      });

      expect(bid.bidSignature).to.eq(sigMock);

      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith("Auction rate exceeded");
    });
  });
});
