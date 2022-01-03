import {
  expect,
  invariantDataMock,
  txReceiptMock,
  createLoggingContext,
  mkBytes32,
  getNtpTimeSeconds,
} from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers";

import * as CancelHelperFns from "../../../src/lib/helpers/cancel";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import { cancelInputMock, routerAddrMock } from "../../utils";
import { contractReaderMock, contractWriterMock, isRouterContractMock, txServiceMock } from "../../globalTestHook";
import { cancel, SENDER_PREPARE_BUFFER_TIME } from "../../../src/lib/operations/cancel";
import { SinonStub, stub } from "sinon";
import { SenderTxTooNew } from "../../../src/lib/errors/cancel";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32("0xabc"));

describe("Cancel Sender Operation", () => {
  beforeEach(async () => {
    txServiceMock.calculateGasFee.resolves(BigNumber.from("123"));
    stub(SharedHelperFns, "sanitationCheck").resolves();
    stub(CancelHelperFns, "signRouterCancelTransactionPayload").resolves("0xfee");
  });

  it("should error if invariant data validation fails", async () => {
    const _invariantDataMock = { ...invariantDataMock, user: "abc" };
    await expect(cancel(_invariantDataMock, cancelInputMock, requestContext)).to.eventually.be.rejectedWith(
      "Params invalid",
    );
  });

  it("should error if prepare input validation fails", async () => {
    const _cancelInputMock = { ...cancelInputMock, side: "buggy" };
    await expect(cancel(invariantDataMock, _cancelInputMock, requestContext)).to.eventually.be.rejectedWith(
      "Params invalid",
    );
  });

  describe("#cancelSender", () => {
    it("should error if sender prepare tx is too recent", async () => {
      const _cancelInputMock = { ...cancelInputMock };
      const preparedTime = Math.floor(Date.now() / 1000);
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
      txServiceMock.getBlock.resolves({
        timestamp: preparedTime,
      } as any);
      await expect(cancel(invariantDataMock, _cancelInputMock, requestContext)).to.eventually.be.rejectedWith(
        SenderTxTooNew.getMessage(
          invariantDataMock.transactionId,
          invariantDataMock.sendingChainId,
          preparedTime,
          await getNtpTimeSeconds(),
        ),
      );
    });

    it("happy: should cancel for receiver chain", async () => {
      const receipt = await cancel(invariantDataMock, { ...cancelInputMock, side: "receiver" }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.cancelTransactionManager).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        requestContext,
      );
    });

    it("happy: should cancel for sender chain with router contract", async () => {
      const time = Math.floor(Date.now() / 1000) - SENDER_PREPARE_BUFFER_TIME - 500;
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
      txServiceMock.getBlock.resolves({
        timestamp: time,
      } as any);
      isRouterContractMock.value(true);
      const receipt = await cancel(invariantDataMock, cancelInputMock, requestContext);
      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.cancelRouterContract).to.be.callCount(1);
      expect(contractWriterMock.cancelRouterContract).to.be.calledOnceWith(
        invariantDataMock.sendingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        routerAddrMock,
        "0xfee",
        constants.AddressZero,
        "123",
        true,
      );
    });

    it("happy: should cancel for sender chain", async () => {
      const time = Math.floor(Date.now() / 1000) - SENDER_PREPARE_BUFFER_TIME - 500;
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
      txServiceMock.getBlock.resolves({
        timestamp: time,
      } as any);
      const receipt = await cancel(invariantDataMock, cancelInputMock, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.cancelTransactionManager).to.be.calledOnceWithExactly(
        invariantDataMock.sendingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        requestContext,
      );
    });
  });

  describe("#cancelReceiver", () => {
    it("should work", async () => {
      const time = Math.floor(Date.now() / 1000) - SENDER_PREPARE_BUFFER_TIME - 500;
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
      txServiceMock.getBlock.resolves({
        timestamp: time,
      } as any);
      const receipt = await cancel(invariantDataMock, { ...cancelInputMock, side: "receiver" }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);

      expect(contractWriterMock.cancelTransactionManager).to.be.calledOnceWithExactly(
        invariantDataMock.receivingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        requestContext,
      );
    });

    it("happy: should cancel for receiver chain with router contract", async () => {
      isRouterContractMock.value(true);
      const time = Math.floor(Date.now() / 1000) - SENDER_PREPARE_BUFFER_TIME - 500;
      (contractReaderMock.getTransactionForChain as SinonStub).resolves(undefined);
      txServiceMock.getBlock.resolves({
        timestamp: time,
      } as any);
      const receipt = await cancel(invariantDataMock, { ...cancelInputMock, side: "receiver" }, requestContext);
      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.cancelRouterContract).to.be.callCount(1);
      expect(contractWriterMock.cancelRouterContract).to.be.calledOnceWith(
        invariantDataMock.receivingChainId,
        {
          txData: {
            ...invariantDataMock,
            amount: cancelInputMock.amount,
            expiry: cancelInputMock.expiry,
            preparedBlockNumber: cancelInputMock.preparedBlockNumber,
          },
          signature: "0x",
        },
        routerAddrMock,
        "0xfee",
        constants.AddressZero,
        "123",
        true,
      );
    });
  });
});
