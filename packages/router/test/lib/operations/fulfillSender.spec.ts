import { reset, restore, SinonStub, stub } from "sinon";
import { expect } from "chai";
import { constants } from "ethers/lib/ethers";
import { createRequestContext, FulfillParams, mkAddress, txReceiptMock } from "@connext/nxtp-utils";

import { activeTransactionMock } from "../../utils";
import { fulfillSender } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";
import { senderFulfilling } from "../../../src/lib/operations/fulfillSender";

const requestContext = createRequestContext("TEST");

describe("Fulfill Sender Operation", () => {
  describe("#fulfillSender", () => {
    it("should not fulfill if already fulfilling", async () => {
      senderFulfilling.set(activeTransactionMock.crosschainTx.invariant.transactionId, true);
      const receipt = await fulfillSender(activeTransactionMock, requestContext);
      expect(receipt).to.be.undefined;
      senderFulfilling.set(activeTransactionMock.crosschainTx.invariant.transactionId, false);
    });

    it("should release lock if contract fn errors", async () => {
      (contractWriterMock.fulfill as SinonStub).rejects("foo");
      try {
        await fulfillSender(activeTransactionMock, requestContext);
      } catch (e) {}
      expect(senderFulfilling.get(activeTransactionMock.crosschainTx.invariant.transactionId)).to.be.undefined;
    });

    it("happy: should fulfill eth asset for sender chain", async () => {
      const fulfillParams = activeTransactionMock;
      fulfillParams.crosschainTx.invariant.sendingAssetId = constants.AddressZero;
      fulfillParams.crosschainTx.invariant.receivingAssetId = constants.AddressZero;

      const receipt = await fulfillSender(fulfillParams, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      const txData = { ...fulfillParams.crosschainTx.invariant, ...fulfillParams.crosschainTx.sending };
      expect(contractWriterMock.fulfill).to.be.calledOnceWithExactly(
        txData.sendingChainId,
        {
          relayerFee: fulfillParams.relayerFee,
          signature: fulfillParams.signature,
          callData: fulfillParams.callData,
          txData,
        },
        requestContext,
      );
    });

    it("happy: should fulfill token asset for sender chain", async () => {
      const fulfillParams = activeTransactionMock;
      fulfillParams.crosschainTx.invariant.sendingAssetId = mkAddress("0x1");
      fulfillParams.crosschainTx.invariant.receivingAssetId = mkAddress("0x2");

      const receipt = await fulfillSender(fulfillParams, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      const txData = { ...fulfillParams.crosschainTx.invariant, ...fulfillParams.crosschainTx.sending };
      expect(contractWriterMock.fulfill).to.be.calledOnceWithExactly(
        txData.sendingChainId,
        {
          relayerFee: fulfillParams.relayerFee,
          signature: fulfillParams.signature,
          callData: fulfillParams.callData,
          txData,
        },
        requestContext,
      );
    });
  });
});
