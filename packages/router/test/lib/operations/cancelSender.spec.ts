import { SinonStub } from "sinon";
import { expect } from "chai";
import { createRequestContext, txReceiptMock } from "@connext/nxtp-utils";

import { activeTransactionMock } from "../../utils";
import { contractWriterMock } from "../../globalTestHook";
import { cancelSender, senderCancelling } from "../../../src/lib/operations/cancelSender";

const requestContext = createRequestContext("TEST");

describe("Cancel Sender Operation", () => {
  describe("#cancelSender", () => {
    it("should not cancel if already cancelling", async () => {
      senderCancelling.set(activeTransactionMock.crosschainTx.invariant.transactionId, true);
      const receipt = await cancelSender(activeTransactionMock, requestContext);
      expect(receipt).to.be.undefined;
      senderCancelling.set(activeTransactionMock.crosschainTx.invariant.transactionId, false);
    });

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.cancel as SinonStub).rejects("foo");
      try {
        await cancelSender(activeTransactionMock, requestContext);
      } catch (e) {}
      expect(senderCancelling.get(activeTransactionMock.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("happy: should cancel for sender chain", async () => {
      const receipt = await cancelSender(activeTransactionMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      const txData = { ...activeTransactionMock.crosschainTx.invariant, ...activeTransactionMock.crosschainTx.sending };
      expect(contractWriterMock.cancel).to.be.calledOnceWithExactly(
        txData.sendingChainId,
        {
          relayerFee: "0",
          txData,
          signature: "0x",
        },
        requestContext,
      );
    });
  });
});
