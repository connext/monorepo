import { SinonStub, stub } from "sinon";
import { expect } from "@connext/nxtp-utils/src/expect";
import { constants } from "ethers/lib/ethers";
import { AuctionBid, createRequestContext, mkAddress } from "@connext/nxtp-utils";
import { auctionBidMock, txReceiptMock } from "@connext/nxtp-utils/src/mock";

import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import { activeTransactionMock, MUTATED_AMOUNT, MUTATED_EXPIRY, routerAddrMock } from "../../utils";
import { prepareReceiver } from "../../../src/lib/operations";
import { contractReaderMock, contractWriterMock, txServiceMock } from "../../globalTestHook";
import { receiverPreparing } from "../../../src/lib/operations/prepareReceiver";

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
      receiverPreparing.set(activeTransactionMock.crosschainTx.invariant.transactionId, true);
      const receipt = await prepareReceiver(activeTransactionMock, requestContext);
      expect(receipt).to.be.undefined;
      receiverPreparing.set(activeTransactionMock.crosschainTx.invariant.transactionId, false);
    });

    it("should error if sig is not recovered", async () => {
      recoverAuctionBidStub.returns("foo");
      await expect(prepareReceiver(activeTransactionMock, requestContext)).to.eventually.be.rejectedWith(
        "Auction signer invalid",
      );
    });

    it("should error if router liquidity is too low", async () => {
      (contractReaderMock.getAssetBalance as SinonStub).resolves(constants.One);
      await expect(prepareReceiver(activeTransactionMock, requestContext)).to.eventually.be.rejectedWith(
        "Not enough liquidity",
      );
    });

    it("should error if router liquidity is too low", async () => {
      validExpiryStub.returns(false);
      await expect(prepareReceiver(activeTransactionMock, requestContext)).to.eventually.be.rejectedWith("Expiry");
    });

    it("should error if transactionId doesnt match bid", async () => {
      decodeAuctionBidStub.returns({ ...auctionBidMock, transactionId: "foo" });
      await expect(prepareReceiver(activeTransactionMock, requestContext)).to.eventually.be.rejectedWith(
        "Invalid data on sender chain",
      );
    });

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.fulfill as SinonStub).rejects("foo");
      try {
        await prepareReceiver(activeTransactionMock, requestContext);
      } catch (e) {}
      expect(receiverPreparing.get(activeTransactionMock.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("happy: should send prepare for receiving chain with ETH asset", async () => {
      const ethPrepareDataMock = activeTransactionMock;
      ethPrepareDataMock.crosschainTx.invariant.sendingAssetId = constants.AddressZero;
      ethPrepareDataMock.crosschainTx.invariant.receivingAssetId = constants.AddressZero;

      const receipt = await prepareReceiver(ethPrepareDataMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      const txData = { ...ethPrepareDataMock.crosschainTx.invariant, ...ethPrepareDataMock.crosschainTx.sending };
      expect(contractWriterMock.prepare).to.be.calledOnceWithExactly(
        txData.receivingChainId,
        {
          txData,
          amount: MUTATED_AMOUNT,
          expiry: MUTATED_EXPIRY,
          bidSignature: ethPrepareDataMock.bidSignature,
          encodedBid: ethPrepareDataMock.encodedBid,
          encryptedCallData: ethPrepareDataMock.encryptedCallData,
        },
        requestContext,
      );
    });

    it("happy: should send prepare for receiving chain with token asset", async () => {
      const tokenPrepareData = activeTransactionMock;
      tokenPrepareData.crosschainTx.invariant.sendingAssetId = mkAddress("0x1");
      tokenPrepareData.crosschainTx.invariant.receivingAssetId = mkAddress("0x2");

      const receipt = await prepareReceiver(tokenPrepareData, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      const txData = { ...tokenPrepareData.crosschainTx.invariant, ...tokenPrepareData.crosschainTx.sending };
      expect(contractWriterMock.prepare).to.be.calledOnceWithExactly(
        txData.receivingChainId,
        {
          txData,
          amount: MUTATED_AMOUNT,
          expiry: MUTATED_EXPIRY,
          bidSignature: tokenPrepareData.bidSignature,
          encodedBid: tokenPrepareData.encodedBid,
          encryptedCallData: tokenPrepareData.encryptedCallData,
        },
        requestContext,
      );
    });
  });
});
