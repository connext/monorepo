import { SinonStub, stub } from "sinon";
import { expect } from "@connext/nxtp-utils/src/expect";
import { constants } from "ethers/lib/ethers";
import { AuctionBid, createRequestContext, mkAddress } from "@connext/nxtp-utils";
import { auctionBidMock, invariantDataMock, txReceiptMock } from "@connext/nxtp-utils/src/mock";

import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import { MUTATED_AMOUNT, MUTATED_EXPIRY, prepareInputMock, routerAddrMock } from "../../utils";
import { prepare } from "../../../src/lib/operations";
import { contractReaderMock, contractWriterMock } from "../../globalTestHook";
import { receiverPreparing } from "../../../src/lib/operations/prepare";

const requestContext = createRequestContext("TEST");

let recoverAuctionBidStub: SinonStub<[bid: AuctionBid, signature: string], string>;
let validExpiryStub: SinonStub<[expiry: number], boolean>;
let decodeAuctionBidStub: SinonStub<[data: string], AuctionBid>;

describe("Prepare Receiver Operation", () => {
  describe("#prepareReceiver", () => {
    beforeEach(() => {
      stub(PrepareHelperFns, "getReceiverAmount").returns(MUTATED_AMOUNT);
      stub(PrepareHelperFns, "getReceiverExpiry").returns(MUTATED_EXPIRY);
      recoverAuctionBidStub = stub(PrepareHelperFns, "recoverAuctionBid").returns(routerAddrMock);
      validExpiryStub = stub(PrepareHelperFns, "validExpiry").returns(true);
      decodeAuctionBidStub = stub(PrepareHelperFns, "decodeAuctionBid").returns(auctionBidMock);
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

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.fulfill as SinonStub).rejects("foo");
      try {
        await prepare(invariantDataMock, prepareInputMock, requestContext);
      } catch (e) {}
      expect(receiverPreparing.get(invariantDataMock.transactionId)).to.be.undefined;
    });

    it("happy: should send prepare for receiving chain", async () => {
      const receipt = await prepare(invariantDataMock, prepareInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.prepare).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: invariantDataMock,
          amount: MUTATED_AMOUNT,
          expiry: MUTATED_EXPIRY,
          bidSignature: prepareInputMock.bidSignature,
          encodedBid: prepareInputMock.encodedBid,
          encryptedCallData: prepareInputMock.encryptedCallData,
        },
        requestContext,
      );
    });
  });
});
