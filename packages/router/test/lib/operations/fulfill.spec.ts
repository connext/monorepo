import { invariantDataMock, txReceiptMock, expect, createLoggingContext, mkBytes32 } from "@connext/nxtp-utils";
import { BigNumber, constants } from "ethers/lib/ethers";
import { stub } from "sinon";
import * as FulfillHelperFns from "../../../src/lib/helpers/fulfill";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";

import { getOperations } from "../../../src/lib/operations";
import { contractWriterMock, isRouterContractMock } from "../../globalTestHook";
import { fulfillInputMock, routerAddrMock } from "../../utils";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32());

const { fulfill } = getOperations();

describe("Fulfill Receiver Operation", () => {
  beforeEach(async () => {
    stub(SharedHelperFns, "calculateGasFee").resolves(BigNumber.from(123));
    stub(FulfillHelperFns, "signRouterFulfillTransactionPayload").resolves("0xfee");
  });

  describe("#fulfillReceiver", () => {
    it("should error if invariant data validation fails", async () => {
      const _invariantDataMock = { ...invariantDataMock, user: "abc" };
      await expect(fulfill(_invariantDataMock, fulfillInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if prepare input validation fails", async () => {
      const _fulfillInputMock = { ...fulfillInputMock, signature: "abc" };
      await expect(fulfill(invariantDataMock, _fulfillInputMock, requestContext)).to.eventually.be.rejectedWith(
        "Params invalid",
      );
    });

    it("should error if no config available for sending chain", async () => {
      await expect(
        fulfill({ ...invariantDataMock, sendingChainId: 1234 }, fulfillInputMock, requestContext),
      ).to.eventually.be.rejectedWith("No chain config for chainId");
    });

    it("happy: should fulfill on sender chain with router contract", async () => {
      isRouterContractMock.value(true);
      const receipt = await fulfill(invariantDataMock, { ...fulfillInputMock }, requestContext);
      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfillRouterContract).to.be.calledOnceWithExactly(
        invariantDataMock.sendingChainId,
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
        routerAddrMock,
        "0xfee",
        constants.AddressZero,
        "123",
        true,
        requestContext,
      );
    });

    it("happy: should fulfill on sender chain", async () => {
      const receipt = await fulfill(invariantDataMock, { ...fulfillInputMock }, requestContext);

      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfillTransactionManager).to.be.calledOnceWith(
        invariantDataMock.sendingChainId,
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
