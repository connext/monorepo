import { AuctionPayload, createRequestContext, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub } from "sinon";
import { expect } from "chai";

import { newAuction } from "../../../src/lib/operations";
import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as AuctionHelperFns from "../../../src/lib/helpers/auction";
import { BID_EXPIRY, configMock, MUTATED_AMOUNT, MUTATED_EXPIRY, routerAddrMock, sigMock } from "../../utils";

const requestContext = createRequestContext("TEST");

const auctionPayload: AuctionPayload = {
  user: mkAddress("0xa"),
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

describe("#newAuction", () => {
  beforeEach(() => {
    stub(PrepareHelperFns, "getReceiverAmount").returns(MUTATED_AMOUNT);
    stub(PrepareHelperFns, "getReceiverExpiry").returns(MUTATED_EXPIRY);

    stub(AuctionHelperFns, "getBidExpiry").returns(BID_EXPIRY);
  });

  it("happy: should return auction bid for a valid swap", async () => {
    const bid = await newAuction(auctionPayload, requestContext);
    expect(bid.bid).to.deep.eq({
      user: auctionPayload.user,
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
      receivingChainTxManagerAddress: configMock.chainConfig[auctionPayload.receivingChainId].transactionManagerAddress,
    });

    expect(bid.bidSignature).to.eq(sigMock);
  });
});
