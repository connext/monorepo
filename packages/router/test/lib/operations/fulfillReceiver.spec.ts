import { expect } from "@connext/nxtp-utils/src/expect";
import { constants } from "ethers/lib/ethers";
import { createRequestContext, mkAddress } from "@connext/nxtp-utils";
import { fulfillParamsMock, txReceiptMock } from "@connext/nxtp-utils/src/mock";

import { fulfillReceiver } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";

const requestContext = createRequestContext("TEST");

describe("Fulfill Receiver Operation", () => {
  describe("#fulfillReceiver", () => {
    it("should error if no config available for receiving chain", async () => {
      await expect(
        fulfillReceiver(
          { ...fulfillParamsMock, txData: { ...fulfillParamsMock.txData, receivingChainId: 1234 } },
          requestContext,
        ),
      ).to.eventually.be.rejectedWith("No chain config for chainId");
    });

    it("happy: should fulfill eth asset for receiver chain", async () => {
      const fulfillParams = fulfillParamsMock;
      fulfillParams.txData.sendingAssetId = constants.AddressZero;
      fulfillParams.txData.receivingAssetId = constants.AddressZero;

      const receipt = await fulfillReceiver(fulfillParams, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.fulfill).to.be.calledOnceWithExactly(
        fulfillParams.txData.receivingChainId,
        {
          relayerFee: fulfillParams.relayerFee,
          signature: fulfillParams.signature,
          callData: fulfillParams.callData,
          txData: fulfillParams.txData,
        },
        requestContext,
      );
    });

    it("happy: should fulfill token asset for receiver chain", async () => {
      const fulfillParams = fulfillParamsMock;
      fulfillParams.txData.sendingAssetId = mkAddress("0x1");
      fulfillParams.txData.receivingAssetId = mkAddress("0x2");

      const receipt = await fulfillReceiver(fulfillParams, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfill).to.be.calledOnceWith(
        fulfillParams.txData.receivingChainId,
        {
          relayerFee: fulfillParams.relayerFee,
          signature: fulfillParams.signature,
          callData: fulfillParams.callData,
          txData: fulfillParams.txData,
        },
        requestContext,
      );
    });
  });
});
