import { AuctionPayload, createRequestContext, mkAddress, mkBytes32, expect, sigMock } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import { getOperations } from "../../../src/lib/operations";
import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as AuctionHelperFns from "../../../src/lib/helpers/auction";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { BID_EXPIRY, configMock, MUTATED_AMOUNT, MUTATED_BUFFER, routerAddrMock } from "../../utils";
import { contractReaderMock, txServiceMock } from "../../globalTestHook";
import { constants } from "ethers/lib/ethers";
import { SubgraphNotSynced } from "../../../src/lib/errors/auction";

const requestContext = createRequestContext("TEST");

const auctionPayload: AuctionPayload = {
  user: mkAddress("0xa"),
  initiator: mkAddress("0xa"),
  sendingChainId: 1337,
  sendingAssetId: mkAddress("0xc"),
  amount: "10000",
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

describe("Auction Operation", () => {
  const { newAuction } = getOperations();
  describe("#newAuction", () => {
    beforeEach(() => {
      getReceiverAmountStub = stub(PrepareHelperFns, "getReceiverAmount").resolves(MUTATED_AMOUNT);
      stub(PrepareHelperFns, "getReceiverExpiryBuffer").returns(MUTATED_BUFFER);

      stub(AuctionHelperFns, "getBidExpiry").returns(BID_EXPIRY);

      stub(SharedHelperFns, "getNtpTimeSeconds").resolves(Math.floor(Date.now() / 1000));
    });

    it("should error if auction payload data validation fails", async () => {
      const _auctionPayload = { ...auctionPayload, user: "abc" };
      await expect(newAuction(_auctionPayload, requestContext)).to.eventually.be.rejectedWith("Params invalid");
    });

    it("should error if not enough available liquidity for auction", async () => {
      getReceiverAmountStub.returns("10002");
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith("Not enough liquidity");
    });

    it("should error if no providers for sending chain", async () => {
      await expect(newAuction({ ...auctionPayload, sendingChainId: 1234 }, requestContext)).to.be.rejectedWith(
        "Providers not available",
      );
    });

    it("should error if no providers for receiving chain", async () => {
      await expect(newAuction({ ...auctionPayload, receivingChainId: 1234 }, requestContext)).to.be.rejectedWith(
        "Providers not available",
      );
    });

    it("should error if sending subgraph is out of sync", async () => {
      const record = { synced: false, latestBlock: 0, syncedBlock: 0 };
      (contractReaderMock.getSyncRecord as SinonStub).onCall(0).returns(record);
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith(
        SubgraphNotSynced.getMessage(auctionPayload.receivingChainId, record),
      );
    });

    it("should error if receiving subgraph is out of sync", async () => {
      const record = { synced: false, latestBlock: 0, syncedBlock: 0 };
      (contractReaderMock.getSyncRecord as SinonStub).onCall(1).returns(record);
      await expect(newAuction(auctionPayload, requestContext)).to.be.rejectedWith(
        SubgraphNotSynced.getMessage(auctionPayload.sendingChainId, record),
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

    it("happy: should return auction bid for first valid swap and should return rate exceeded error for second valid swap", async () => {
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
        amountReceived: MUTATED_AMOUNT,
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
