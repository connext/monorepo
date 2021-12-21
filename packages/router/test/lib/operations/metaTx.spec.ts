import {
  expect,
  invariantDataMock,
  txReceiptMock,
  createLoggingContext,
  mkBytes32,
  getNtpTimeSeconds,
  MetaTxPayload,
  MetaTxType,
  mkAddress,
  MetaTxTypes,
  MetaTxFulfillPayload,
  txDataMock,
  sigMock,
  MetaTxRouterContractPreparePayload,
  MetaTxRouterContractFulfillPayload,
  MetaTxRouterContractCancelPayload,
  prepareParamsMock,
  fulfillParamsMock,
  cancelParamsMock,
  MetaTxPayloads,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { callDataMock, configMock, relayerFeeMock } from "../../utils";
import { sendMetaTx } from "../../../src/lib/operations/metaTx";
import { MetaTxInput } from "../../../src/lib/entities";
import { NotAllowedFulfillRelay, NotEnoughRelayerFee } from "../../../src/lib/errors";
import { SinonStub, stub } from "sinon";
import { contractWriterMock } from "../../globalTestHook";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

const metaTxInputMock = <T extends MetaTxType>(type: T): MetaTxInput => {
  let data: any;
  switch (type) {
    case "Fulfill": {
      data = {
        txData: txDataMock,
        signature: sigMock,
        relayerFee: relayerFeeMock,
        callData: callDataMock,
      } as MetaTxFulfillPayload;
      break;
    }
    case "RouterContractPrepare": {
      data = {
        params: prepareParamsMock,
        signature: sigMock,
        relayerFee: relayerFeeMock,
        relayerFeeAsset: constants.AddressZero,
      } as MetaTxRouterContractPreparePayload;
      break;
    }
    case "RouterContractFulfill": {
      data = {
        params: fulfillParamsMock,
        signature: sigMock,
        relayerFee: relayerFeeMock,
        relayerFeeAsset: constants.AddressZero,
      } as MetaTxRouterContractFulfillPayload;
      break;
    }
    case "RouterContractCancel": {
      data = {
        params: cancelParamsMock,
        signature: sigMock,
        relayerFee: relayerFeeMock,
        relayerFeeAsset: constants.AddressZero,
      } as MetaTxRouterContractCancelPayload;
      break;
    }
  }
  return {
    chainId: 1337,
    to: mkAddress("0x1234"),
    type,
    data,
  };
};

describe("Meta Tx Operation", () => {
  let calculateGasFeeInReceivingTokenForFulfillStub: SinonStub;
  let calculateGasFeeStub: SinonStub;

  it("should error if invalid data", async () => {
    const metaTxMock = metaTxInputMock("Fulfill");
    metaTxMock.chainId = undefined;

    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith("Params invalid");
  });

  it("should error if not allowed to relay globally", async () => {
    const metaTxMock = metaTxInputMock("Fulfill");
    const old = configMock.allowRelay;
    configMock.allowRelay = false;
    configMock.chainConfig[metaTxMock.chainId].allowRelay = false;
    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith(NotAllowedFulfillRelay);
    configMock.allowRelay = old;
  });

  it("should error on metatx fulfill type if fee is < expected", async () => {
    const metaTxMock = metaTxInputMock("Fulfill");
    calculateGasFeeInReceivingTokenForFulfillStub.resolves(BigNumber.from(12345)); // expected 1234
    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith(NotEnoughRelayerFee);
  });

  it("happy: should work with metatx fulfill type", async () => {
    const metaTxMock = metaTxInputMock("Fulfill");
    const receipt = await sendMetaTx(metaTxMock as any, requestContext);
    expect(receipt).to.deep.eq(txReceiptMock);
    expect(contractWriterMock.fulfillTransactionManager).to.be.calledOnceWithExactly(
      metaTxMock.data.txData.sendingChainId,
      {
        txData: metaTxMock.data.txData,
        signature: metaTxMock.data.signature,
        relayerFee: metaTxMock.data.relayerFee,
        callData: metaTxMock.data.callData,
      },
      requestContext,
    );
  });

  it("should error on metatx router contract prepare type if fee is < expected", async () => {
    const metaTxMock = metaTxInputMock("RouterContractPrepare");
    calculateGasFeeStub.resolves(BigNumber.from(12345)); // expected 1234
    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith(NotEnoughRelayerFee);
  });

  it("happy: should work with metatx router contract prepare type", async () => {
    const metaTxMock = metaTxInputMock("RouterContractPrepare");
    const receipt = await sendMetaTx(metaTxMock as any, requestContext);
    expect(receipt).to.deep.eq(txReceiptMock);
    expect(contractWriterMock.prepareRouterContract).to.be.calledOnceWithExactly(
      metaTxMock.chainId,
      {
        txData: metaTxMock.data.params.txData,
        amount: metaTxMock.data.params.amount,
        expiry: metaTxMock.data.params.expiry,
        bidSignature: metaTxMock.data.params.bidSignature,
        encodedBid: metaTxMock.data.params.encodedBid,
        encryptedCallData: metaTxMock.data.params.encryptedCallData,
      },
      metaTxMock.to,
      metaTxMock.data.signature,
      metaTxMock.data.relayerFeeAsset,
      metaTxMock.data.relayerFee,
      false,
      requestContext,
    );
  });

  it("should error on metatx router contract fulfill type if fee is < expected", async () => {
    const metaTxMock = metaTxInputMock("RouterContractFulfill");
    calculateGasFeeStub.resolves(BigNumber.from(12345)); // expected 1234
    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith(NotEnoughRelayerFee);
  });

  it("happy: should work with metatx router contract fulfill type", async () => {
    const metaTxMock = metaTxInputMock("RouterContractFulfill");
    const receipt = await sendMetaTx(metaTxMock as any, requestContext);
    expect(receipt).to.deep.eq(txReceiptMock);
    expect(contractWriterMock.fulfillRouterContract).to.be.calledOnceWithExactly(
      metaTxMock.chainId,
      {
        txData: metaTxMock.data.params.txData,
        signature: metaTxMock.data.params.signature,
        relayerFee: metaTxMock.data.params.relayerFee,
        callData: metaTxMock.data.params.callData,
      },
      metaTxMock.to,
      metaTxMock.data.signature,
      metaTxMock.data.relayerFeeAsset,
      metaTxMock.data.relayerFee,
      false,
      requestContext,
    );
  });

  it("should error on metatx router contract fulfill type if fee is < expected", async () => {
    const metaTxMock = metaTxInputMock("RouterContractCancel");
    calculateGasFeeStub.resolves(BigNumber.from(12345)); // expected 1234
    await expect(sendMetaTx(metaTxMock as any, requestContext)).to.eventually.be.rejectedWith(NotEnoughRelayerFee);
  });

  it("happy: should work with metatx router contract fulfill type", async () => {
    const metaTxMock = metaTxInputMock("RouterContractCancel");
    const receipt = await sendMetaTx(metaTxMock as any, requestContext);
    expect(receipt).to.deep.eq(txReceiptMock);
    expect(contractWriterMock.cancelRouterContract).to.be.calledOnceWithExactly(
      metaTxMock.chainId,
      {
        txData: metaTxMock.data.params.txData,
        signature: metaTxMock.data.params.signature,
      },
      metaTxMock.to,
      metaTxMock.data.signature,
      metaTxMock.data.relayerFeeAsset,
      metaTxMock.data.relayerFee,
      false,
      requestContext,
    );
  });
});
