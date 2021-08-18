import { createRequestContext, invariantDataMock, txReceiptMock, expect } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";
import { fulfillInputMock } from "../../utils";

const requestContext = createRequestContext("TEST");

const { fulfill } = getOperations();

describe("Fulfill Receiver Operation", () => {
  describe("#fulfillReceiver", () => {
    it("should error if no config available for receiving chain", async () => {
      await expect(
        fulfill({ ...invariantDataMock, receivingChainId: 1234 }, fulfillInputMock, requestContext),
      ).to.eventually.be.rejectedWith("No chain config for chainId");
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
