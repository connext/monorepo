import { SinonStub, stub } from "sinon";
import { constants } from "ethers/lib/ethers";
import {
  AuctionBid,
  createRequestContext,
  expect,
  auctionBidMock,
  invariantDataMock,
  txReceiptMock,
} from "@connext/nxtp-utils";

import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import { MUTATED_AMOUNT, MUTATED_BUFFER, prepareInputMock, routerAddrMock } from "../../utils";
import { getOperations } from "../../../src/lib/operations";
import { contractReaderMock, contractWriterMock, txServiceMock } from "../../globalTestHook";
import { receiverPreparing } from "../../../src/lib/operations/prepare";

const requestContext = createRequestContext("TEST");

let recoverAuctionBidStub: SinonStub<[bid: AuctionBid, signature: string], string>;
let validExpiryStub: SinonStub<[expiry: number], boolean>;
let decodeAuctionBidStub: SinonStub<[data: string], AuctionBid>;
let validBidExpiryStub: SinonStub<[bidExpiry: number, currentTime: number], boolean>;

const { prepare } = getOperations();

describe("Prepare Receiver Operation", () => {
  describe("#prepareReceiver", () => {
    beforeEach(() => {
      stub(PrepareHelperFns, "getReceiverAmount").returns(MUTATED_AMOUNT);
      stub(PrepareHelperFns, "getReceiverExpiryBuffer").returns(MUTATED_BUFFER);
      recoverAuctionBidStub = stub(PrepareHelperFns, "recoverAuctionBid").returns(routerAddrMock);
      validExpiryStub = stub(PrepareHelperFns, "validExpiryBuffer").returns(true);
      decodeAuctionBidStub = stub(PrepareHelperFns, "decodeAuctionBid").returns(auctionBidMock);
      validBidExpiryStub = stub(PrepareHelperFns, "validBidExpiry").returns(true);
    });

    it("should not prepare if already preparing", async () => {
      receiverPreparing.set(invariantDataMock.transactionId, true);
      const receipt = await prepare(invariantDataMock, prepareInputMock, requestContext);
      expect(receipt).to.be.undefined;
      receiverPreparing.set(invariantDataMock.transactionId, false);
    });

    it("should error if sig is not recovered", async () => {
      recoverAuctionBidStub.returns("foo");
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Auction signer invalid",
      );
    });

    it("should error if router liquidity is too low", async () => {
      (contractReaderMock.getAssetBalance as SinonStub).resolves(constants.One);
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Not enough liquidity",
      );
    });

    it("should error if router liquidity is too low", async () => {
      validExpiryStub.returns(false);
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Expiry",
      );
    });

    it("should error if transactionId doesnt match bid", async () => {
      decodeAuctionBidStub.returns({ ...auctionBidMock, transactionId: "foo" });
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Invalid data on sender chain",
      );
    });

    it("should error if bid expiry is invalid", async () => {
      validBidExpiryStub.returns(false);
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Bid expiry",
      );
    });

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.fulfill as SinonStub).rejects("foo");
      try {
        await prepare(invariantDataMock, prepareInputMock, requestContext);
      } catch (e) {}
      expect(receiverPreparing.get(invariantDataMock.transactionId)).to.be.undefined;
    });

    it("happy: should send prepare for receiving chain", async () => {
      const baseTime = Math.floor(Date.now() / 1000);
      (txServiceMock.getBlockTime as SinonStub).resolves(baseTime);
      const receipt = await prepare(invariantDataMock, prepareInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.prepare).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: invariantDataMock,
          amount: MUTATED_AMOUNT,
          expiry: baseTime + MUTATED_BUFFER,
          bidSignature: prepareInputMock.bidSignature,
          encodedBid: prepareInputMock.encodedBid,
          encryptedCallData: prepareInputMock.encryptedCallData,
        },
        requestContext,
      );
    });
  });
});
