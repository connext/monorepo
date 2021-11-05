import { expect, invariantDataMock, txReceiptMock, createLoggingContext, mkBytes32 } from "@connext/nxtp-utils";

import { cancelInputMock } from "../../utils";
import { contractReaderMock, contractWriterMock } from "../../globalTestHook";
import { cancel } from "../../../src/lib/operations/cancel";
import { SinonStub } from "sinon";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

describe("Cancel Sender Operation", () => {
  describe("#cancelSender", () => {
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
          unlockData: "0x",
        },
        requestContext,
      );
    });

    it("happy: should cancel for sender chain", async () => {
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
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
          unlockData: "0x",
        },
        requestContext,
      );
    });
  });
});
