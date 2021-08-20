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
import { AuctionExpired } from "../../../src/lib/errors";
import { metaTxRequestBinding } from "../../../src/bindings/messaging/metaTxRequest";
import { configMock } from "../../utils";
import { messagingMock } from "../../globalTestHook";

const err = new AuctionExpired(800).toJson();

const inbox = "inbox";

const from = mkAddress("0xfff");

const requestContext = createRequestContext("metaTxRequestBinding");

let fulfillStub: SinonStub;

const data: MetaTxPayload<typeof MetaTxTypes.Fulfill> = {
  type: MetaTxTypes.Fulfill,
  relayerFee: "1",
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
    fulfillStub = stub().resolves(txReceiptMock);

    stub(operations, "getOperations").returns({
      fulfill: fulfillStub,
    } as any);
  });

  afterEach(() => {
    restore();
    reset();
  });

  it("should work", async () => {
    await metaTxRequestBinding(from, inbox, data, undefined, requestContext);

    const { amount, expiry, preparedBlockNumber, ...invariant } = txDataMock;

    expect(fulfillStub.callCount).to.be.eq(1);
    expect(
      fulfillStub.calledOnceWithExactly(
        invariant,
        {
          amount,
          expiry,
          preparedBlockNumber,
          signature: data.data.signature,
          relayerFee: data.data.relayerFee,
          callData: data.data.callData,
          side: "receiver",
        },
        requestContext,
      ),
    ).to.be.true;
    expect(
      messagingMock.publishMetaTxResponse.calledOnceWithExactly(from, inbox, {
        chainId: data.chainId,
        transactionHash: txReceiptMock.transactionHash,
      }),
    ).to.be.true;
  });

  it("shouldnt publish if there is no tx response", async () => {
    fulfillStub.resolves(undefined);

    await metaTxRequestBinding(from, inbox, data, undefined, requestContext);

    const { amount, expiry, preparedBlockNumber, ...invariant } = txDataMock;

    expect(fulfillStub.callCount).to.be.eq(1);
    expect(
      fulfillStub.calledOnceWithExactly(
        invariant,
        {
          amount,
          expiry,
          preparedBlockNumber,
          signature: data.data.signature,
          relayerFee: data.data.relayerFee,
          callData: data.data.callData,
          side: "receiver",
        },
        requestContext,
      ),
    ).to.be.true;
    expect(messagingMock.publishMetaTxResponse.callCount).to.be.eq(0);
  });

  it("should do nothing if there is an error", async () => {
    await metaTxRequestBinding(from, inbox, data, err, requestContext);

    expect(fulfillStub.callCount).to.be.eq(0);
  });

  it("should do nothing if there is no data", async () => {
    await metaTxRequestBinding(from, inbox, undefined, err, requestContext);

    expect(fulfillStub.callCount).to.be.eq(0);
  });

  it.skip("should do nothing if there is no chain config", async () => {});

  it("should do nothing if it is not a fulfill request", async () => {
    await metaTxRequestBinding(from, inbox, { ...data, type: "fail" });
    expect(fulfillStub.callCount).to.be.eq(0);
  });

  it("should do nothing if it is not fulfilling on the receiving chain", async () => {
    await metaTxRequestBinding(from, inbox, { ...data, chainId: 123457 });
    expect(fulfillStub.callCount).to.be.eq(0);
  });

  it("should fail if fulfill fails", async () => {
    fulfillStub.rejects(new Error("fail"));
    await expect(metaTxRequestBinding(from, inbox, data)).to.be.rejectedWith("fail");
  });
});
