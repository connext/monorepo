import { SinonStub } from "sinon";
import { expect, invariantDataMock, txReceiptMock, createRequestContext } from "@connext/nxtp-utils";

import { cancelInputMock } from "../../utils";
import { contractWriterMock } from "../../globalTestHook";
import { cancel, senderCancelling } from "../../../src/lib/operations/cancel";

const requestContext = createRequestContext("TEST");

describe("Cancel Sender Operation", () => {
  describe("#cancelSender", () => {
    it("should not cancel if already cancelling", async () => {
      senderCancelling.set(invariantDataMock.transactionId, true);
      const receipt = await cancel(invariantDataMock, cancelInputMock, requestContext);
      expect(receipt).to.be.undefined;
      senderCancelling.set(invariantDataMock.transactionId, false);
    });

    it("should error if invariant data validation fails", async () => {
      const _invariantDataMock = { ...invariantDataMock, user: "abc" };
      await expect(cancel(_invariantDataMock, cancelInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if prepare input validation fails", async () => {
      const _cancelInputMock = { ...cancelInputMock, side: "buggy" };
      await expect(cancel(invariantDataMock, _cancelInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.cancel as SinonStub).rejects("foo");
      try {
        await cancel(invariantDataMock, cancelInputMock, requestContext);
      } catch (e) {}
      expect(senderCancelling.get(invariantDataMock.transactionId)).to.be.undefined;
    });

    it("happy: should cancel for receiver chain", async () => {
      const receipt = await cancel(invariantDataMock, { ...cancelInputMock, side: "receiver" }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.cancel).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        requestContext,
      );
    });

    it("happy: should cancel for sender chain", async () => {
      const receipt = await cancel(invariantDataMock, cancelInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.cancel).to.be.calledOnceWithExactly(
        invariantDataMock.sendingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        requestContext,
      );
    });
  });
});
