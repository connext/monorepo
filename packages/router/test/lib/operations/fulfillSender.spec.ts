import { reset, restore, SinonStub, stub } from "sinon";
import { expect } from "chai";
import { constants } from "ethers/lib/ethers";
import { createRequestContext, FulfillParams, mkAddress, PrepareParams } from "@connext/nxtp-utils";

import { activeTransactionMock, txReceiptMock } from "../../utils";
import { fulfillSender } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";

const requestContext = createRequestContext("TEST");

describe("#fulfillSender", () => {
  it("happy: should fulfill eth asset for sender chain", async () => {
    const fulfillParams = activeTransactionMock;
    fulfillParams.crosschainTx.invariant.sendingAssetId = constants.AddressZero;
    fulfillParams.crosschainTx.invariant.receivingAssetId = constants.AddressZero;

    const receipt = await fulfillSender(fulfillParams, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const fulfillStub = contractWriterMock.fulfill as SinonStub;
    expect(fulfillStub.callCount).to.eq(1);
    const txData = { ...fulfillParams.crosschainTx.invariant, ...fulfillParams.crosschainTx.sending };
    const call = fulfillStub.getCall(0);
    const [chainId, data] = call.args;
    expect(chainId).to.eq(txData.sendingChainId);
    expect(data).to.deep.eq({
      relayerFee: fulfillParams.relayerFee,
      signature: fulfillParams.signature,
      callData: fulfillParams.callData,
      txData,
    } as FulfillParams);
  });

  it("happy: should fulfill token asset for sender chain", async () => {
    const fulfillParams = activeTransactionMock;
    fulfillParams.crosschainTx.invariant.sendingAssetId = mkAddress("0x1");
    fulfillParams.crosschainTx.invariant.receivingAssetId = mkAddress("0x2");

    const receipt = await fulfillSender(fulfillParams, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const fulfillStub = contractWriterMock.fulfill as SinonStub;
    expect(fulfillStub.callCount).to.eq(1);
    const txData = { ...fulfillParams.crosschainTx.invariant, ...fulfillParams.crosschainTx.sending };
    const call = fulfillStub.getCall(0);
    const [chainId, data] = call.args;
    expect(chainId).to.eq(txData.sendingChainId);
    expect(data).to.deep.eq({
      relayerFee: fulfillParams.relayerFee,
      signature: fulfillParams.signature,
      callData: fulfillParams.callData,
      txData: txData,
    } as FulfillParams);
  });
});
