import { invariantDataMock, txReceiptMock, expect, createLoggingContext, mkBytes32 } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";
import { fulfillInputMock } from "../../utils";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32());

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

    it("should error if no config available for sending chain", async () => {
      await expect(
        fulfill({ ...invariantDataMock, sendingChainId: 1234 }, fulfillInputMock, requestContext),
      ).to.eventually.be.rejectedWith("No chain config for chainId");
    });

    it("happy: should fulfill on sender chain", async () => {
      const receipt = await fulfill(invariantDataMock, { ...fulfillInputMock }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfillTransactionManager).to.be.calledOnceWith(
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
  });
});
