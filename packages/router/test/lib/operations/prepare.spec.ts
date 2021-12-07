import { SinonStub, stub } from "sinon";
import { BigNumber, constants } from "ethers/lib/ethers";
import {
  AuctionBid,
  expect,
  auctionBidMock,
  invariantDataMock,
  txReceiptMock,
  createLoggingContext,
  mkBytes32,
} from "@connext/nxtp-utils";

import * as PrepareHelperFns from "../../../src/lib/helpers/prepare";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { MUTATED_AMOUNT, MUTATED_BUFFER, prepareInputMock, routerAddrMock } from "../../utils";
import { getOperations } from "../../../src/lib/operations";
import { contractReaderMock, contractWriterMock, isRouterContractMock, txServiceMock } from "../../globalTestHook";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32());

let recoverAuctionBidStub: SinonStub<[bid: AuctionBid, signature: string], string>;
let validExpiryStub: SinonStub<[expiry: number], boolean>;
let decodeAuctionBidStub: SinonStub<[data: string], AuctionBid>;
let validBidExpiryStub: SinonStub<[bidExpiry: number, currentTime: number], boolean>;

const { prepare } = getOperations();

describe("Prepare Receiver Operation", () => {
  describe("#prepareReceiver", () => {
    beforeEach(() => {
      stub(PrepareHelperFns, "getReceiverAmount").resolves({
        receivingAmount: MUTATED_AMOUNT,
        routerFee: "10",
        amountAfterSwapRate: MUTATED_AMOUNT,
      });
      stub(PrepareHelperFns, "getReceiverExpiryBuffer").returns(MUTATED_BUFFER);
      recoverAuctionBidStub = stub(PrepareHelperFns, "recoverAuctionBid").returns(routerAddrMock);
      validExpiryStub = stub(PrepareHelperFns, "validExpiryBuffer").returns(true);
      decodeAuctionBidStub = stub(PrepareHelperFns, "decodeAuctionBid").returns(auctionBidMock);
      validBidExpiryStub = stub(PrepareHelperFns, "validBidExpiry").returns(true);
      stub(SharedHelperFns, "getNtpTimeSeconds").resolves(Math.floor(Date.now() / 1000));
      stub(SharedHelperFns, "sanitationCheck").resolves();
      stub(SharedHelperFns, "calculateGasFee").resolves(BigNumber.from(123));
      stub(PrepareHelperFns, "signRouterPrepareTransactionPayload").resolves("0xfee");
    });

    it("should error if invariant data validation fails", async () => {
      const _invariantDataMock = { ...invariantDataMock, user: "abc" };
      await expect(prepare(_invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if prepare input validation fails", async () => {
      const _prepareInputMock = { ...prepareInputMock, encodedBid: "abc" };
      await expect(prepare(invariantDataMock, _prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if sig is not recovered", async () => {
      recoverAuctionBidStub.returns("foo");
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Auction signer invalid",
      );
    });

    it("should not error if router liquidity is too low but onchain is okay", async () => {
      (contractReaderMock.getAssetBalance as SinonStub).resolves(constants.One);
      await expect(prepare(invariantDataMock, prepareInputMock, requestContext)).to.eventually.be.ok;
    });

    it("should error if router liquidity is too low", async () => {
      (contractReaderMock.getAssetBalance as SinonStub).resolves(constants.One);
      (contractWriterMock.getRouterBalance as SinonStub).resolves(constants.One);
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

    it("should error if amount is lower than lower bound", async () => {
      const senderAmount = BigNumber.from(prepareInputMock.senderAmount).mul(85).div(100).toString(); // lower than 90% tolerance
      await expect(
        prepare(invariantDataMock, { ...prepareInputMock, senderAmount }, requestContext),
      ).to.eventually.be.rejectedWith("Invalid data on sender chain");
    });

    it("should error if amount is higher than upper bound", async () => {
      const senderAmount = BigNumber.from(prepareInputMock.senderAmount).mul(115).div(100).toString(); // higher than 110% tolerance
      await expect(
        prepare(invariantDataMock, { ...prepareInputMock, senderAmount }, requestContext),
      ).to.eventually.be.rejectedWith("Invalid data on sender chain");
    });

    it("happy: should send prepare for receiving chain with router contract", async () => {
      const baseTime = Math.floor(Date.now() / 1000);
      (txServiceMock.getBlockTime as SinonStub).resolves(baseTime);
      isRouterContractMock.value(true);
      const receipt = await prepare(invariantDataMock, prepareInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.prepareRouterContract).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: invariantDataMock,
          amount: BigNumber.from(MUTATED_AMOUNT).sub(100).toString(),
          expiry: baseTime + MUTATED_BUFFER,
          bidSignature: prepareInputMock.bidSignature,
          encodedBid: prepareInputMock.encodedBid,
          encryptedCallData: prepareInputMock.encryptedCallData,
        },
        routerAddrMock,
        "0xfee",
        constants.AddressZero,
        "123",
        true,
        requestContext,
      );
    });

    it("happy: should send prepare for receiving chain", async () => {
      const baseTime = Math.floor(Date.now() / 1000);
      (txServiceMock.getBlockTime as SinonStub).resolves(baseTime);
      const receipt = await prepare(invariantDataMock, prepareInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.prepareTransactionManager).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: invariantDataMock,
          amount: BigNumber.from(MUTATED_AMOUNT).sub(100).toString(),
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
