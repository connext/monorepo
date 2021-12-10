import {
  createRequestContext,
  expect,
  MetaTxPayload,
  MetaTxTypes,
  txDataMock,
  txReceiptMock,
  mkSig,
  mkAddress,
} from "@connext/nxtp-utils";
import { restore, reset, SinonStub, stub } from "sinon";
import * as operations from "../../../src/lib/operations";
import { AuctionExpired, NoTransactionId } from "../../../src/lib/errors";
import { handlingTracker, metaTxRequestBinding } from "../../../src/bindings/messaging/metaTxRequest";
import { configMock } from "../../utils";
import { messagingMock } from "../../globalTestHook";

const err = new AuctionExpired(800).toJson();

const inbox = "inbox";

const from = mkAddress("0xfff");

const requestContext = createRequestContext("metaTxRequestBinding");

let sendMetaTxStub: SinonStub;

const data: MetaTxPayload<typeof MetaTxTypes.Fulfill> = {
  type: MetaTxTypes.Fulfill,
  to: configMock.chainConfig[txDataMock.receivingChainId].transactionManagerAddress,
  chainId: txDataMock.receivingChainId,
  data: {
    relayerFee: "1",
    signature: mkSig("0xee"),
    callData: "0x",
    txData: txDataMock,
  },
};

describe("metaTxRequestBinding", () => {
  beforeEach(async () => {
    sendMetaTxStub = stub().resolves(txReceiptMock);

    stub(operations, "getOperations").returns({
      sendMetaTx: sendMetaTxStub,
    } as any);
  });

  it("should error if there's no tx id", async () => {
    const oldTxId = data.data.txData.transactionId;
    data.data.txData.transactionId = undefined;
    await expect(metaTxRequestBinding(from, inbox, data, undefined, requestContext)).to.be.rejectedWith(
      NoTransactionId,
    );
    data.data.txData.transactionId = oldTxId;
  });

  it("should do nothing if already handling", async () => {
    handlingTracker.set(data.data.txData.transactionId, "Fulfill");
    await metaTxRequestBinding(from, inbox, data, undefined, requestContext);
    expect(sendMetaTxStub.called).to.be.false;
    handlingTracker.clear();
  });

  it("should work", async () => {
    await metaTxRequestBinding(from, inbox, data, undefined, requestContext);

    expect(sendMetaTxStub.callCount).to.be.eq(1);
    expect(sendMetaTxStub).to.be.calledOnceWith(data, {
      ...requestContext,
      transactionId: data.data.txData.transactionId,
    });

    expect(messagingMock.publishMetaTxResponse).calledOnceWith(from, inbox, {
      chainId: data.chainId,
      transactionHash: txReceiptMock.transactionHash,
    });
  });

  it("shouldnt publish if there is no tx response", async () => {
    sendMetaTxStub.resolves(undefined);

    await metaTxRequestBinding(from, inbox, data, undefined, requestContext);

    const { amount, expiry, preparedBlockNumber, ...invariant } = txDataMock;

    expect(sendMetaTxStub.callCount).to.be.eq(1);
    expect(sendMetaTxStub).to.be.calledOnceWith(data, {
      ...requestContext,
      transactionId: data.data.txData.transactionId,
    });
    expect(messagingMock.publishMetaTxResponse.callCount).to.be.eq(0);
  });

  it("should do nothing if there is an error", async () => {
    await metaTxRequestBinding(from, inbox, data, err, requestContext);

    expect(sendMetaTxStub.callCount).to.be.eq(0);
  });

  it("should do nothing if there is no data", async () => {
    await metaTxRequestBinding(from, inbox, undefined, err, requestContext);

    expect(sendMetaTxStub.callCount).to.be.eq(0);
  });

  it.skip("should do nothing if there is no chain config", async () => {});

  it("should do nothing if it is not fulfilling on the receiving chain", async () => {
    await metaTxRequestBinding(from, inbox, { ...data, chainId: 123457 });
    expect(sendMetaTxStub.callCount).to.be.eq(0);
  });

  it("should fail if fulfill fails", async () => {
    sendMetaTxStub.rejects(new Error("fail"));
    await expect(metaTxRequestBinding(from, inbox, data)).to.be.rejectedWith("fail");
  });
});
