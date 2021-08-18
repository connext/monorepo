import { createRequestContext, invariantDataMock, txReceiptMock, expect } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";
import { fulfillInputMock } from "../../utils";
import { receiverFulfilling } from "../../../src/lib/operations/fulfill";

const requestContext = createRequestContext("TEST");

const { fulfill } = getOperations();

describe("Fulfill Receiver Operation", () => {
  describe("#fulfillReceiver", () => {
    it("should error if invariant data validation fails", async () => {
      const _invariantDataMock = { ...invariantDataMock, user: "abc" };
      await expect(fulfill(_invariantDataMock, fulfillInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if prepare input validation fails", async () => {
      const _fulfillInputMock = { ...fulfillInputMock, signature: "abc" };
      await expect(fulfill(invariantDataMock, _fulfillInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if prepare input validation fails for side", async () => {
      const _fulfillInputMock = { ...fulfillInputMock, side: "buggy" };
      await expect(fulfill(invariantDataMock, _fulfillInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if no config available for receiving chain", async () => {
      await expect(
        fulfill({ ...invariantDataMock, receivingChainId: 1234 }, fulfillInputMock, requestContext),
      ).to.eventually.be.rejectedWith("No chain config for chainId");
    });

    it("should not fulfill if already fulfilling", async () => {
      receiverFulfilling.set(invariantDataMock.transactionId, true);
      const receipt = await fulfill(invariantDataMock, fulfillInputMock, requestContext);
      expect(receipt).to.be.undefined;
      receiverFulfilling.set(invariantDataMock.transactionId, false);
    });

    it("happy: should fulfill on sender chain", async () => {
      const receipt = await fulfill(invariantDataMock, { ...fulfillInputMock, side: "sender" }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfill).to.be.calledOnceWith(
        invariantDataMock.sendingChainId,
        {
          relayerFee: fulfillInputMock.relayerFee,
          signature: fulfillInputMock.signature,
          callData: fulfillInputMock.callData,
          txData: {
            ...invariantDataMock,
            amount: fulfillInputMock.amount,
            expiry: fulfillInputMock.expiry,
            preparedBlockNumber: fulfillInputMock.preparedBlockNumber,
          },
        },
        requestContext,
      );
    });

    it("happy: should fulfill on receiver chain", async () => {
      const receipt = await fulfill(invariantDataMock, fulfillInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfill).to.be.calledOnceWith(
        invariantDataMock.receivingChainId,
        {
          relayerFee: fulfillInputMock.relayerFee,
          signature: fulfillInputMock.signature,
          callData: fulfillInputMock.callData,
          txData: {
            ...invariantDataMock,
            amount: fulfillInputMock.amount,
            expiry: fulfillInputMock.expiry,
            preparedBlockNumber: fulfillInputMock.preparedBlockNumber,
          },
        },
        requestContext,
      );
    });
  });
});
