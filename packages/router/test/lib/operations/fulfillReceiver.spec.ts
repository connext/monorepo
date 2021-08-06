import { SinonStub } from "sinon";
import { expect } from "chai";
import { constants } from "ethers/lib/ethers";
import { createRequestContext, FulfillParams, mkAddress, PrepareParams } from "@connext/nxtp-utils";

import { fulfillParamsMock, txReceiptMock } from "../../utils";
import { fulfillReceiver } from "../../../src/lib/operations";
import { contractWriterMock } from "../../globalTestHook";

const requestContext = createRequestContext("TEST");

describe("#fulfillReceiver", () => {
  it("happy: should fulfill eth asset for receiver chain", async () => {
    const fulfillParams = fulfillParamsMock;
    fulfillParams.txData.sendingAssetId = constants.AddressZero;
    fulfillParams.txData.receivingAssetId = constants.AddressZero;

    const receipt = await fulfillReceiver(fulfillParams, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const fulfillStub = contractWriterMock.fulfill as SinonStub;
    expect(fulfillStub.callCount).to.eq(1);
    const call = fulfillStub.getCall(0);
    const [chainId, data] = call.args;
    expect(chainId).to.eq(fulfillParams.txData.receivingChainId);
    expect(data).to.deep.eq({
      relayerFee: fulfillParams.relayerFee,
      signature: fulfillParams.signature,
      callData: fulfillParams.callData,
      txData: fulfillParams.txData,
    } as FulfillParams);
  });

  it("happy: should fulfill token asset for receiver chain", async () => {
    const fulfillParams = fulfillParamsMock;
    fulfillParams.txData.sendingAssetId = mkAddress("0x1");
    fulfillParams.txData.receivingAssetId = mkAddress("0x2");

    const receipt = await fulfillReceiver(fulfillParams, requestContext);

    expect(receipt).to.deep.eq(txReceiptMock);

    const fulfillStub = contractWriterMock.fulfill as SinonStub;
    expect(fulfillStub.callCount).to.eq(1);
    const call = fulfillStub.getCall(0);
    const [chainId, data] = call.args;
    expect(chainId).to.eq(fulfillParams.txData.receivingChainId);
    expect(data).to.deep.eq({
      relayerFee: fulfillParams.relayerFee,
      signature: fulfillParams.signature,
      callData: fulfillParams.callData,
      txData: fulfillParams.txData,
    } as FulfillParams);
  });
});
