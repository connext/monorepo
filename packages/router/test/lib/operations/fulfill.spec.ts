import {
  invariantDataMock,
  txReceiptMock,
  expect,
  createLoggingContext,
  mkBytes32,
  sigMock,
} from "@connext/nxtp-utils";
import { constants, BigNumber } from "ethers";
import { SinonStub, stub } from "sinon";

import { getOperations } from "../../../src/lib/operations";
import { contractWriterMock, isRouterContractMock, txServiceMock } from "../../globalTestHook";
import * as SharedFns from "../../../src/lib/helpers/shared";
import { fulfillInputMock, routerAddrMock } from "../../utils";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32());

const { fulfill } = getOperations();

describe("Fulfill Receiver Operation", () => {
  beforeEach(() => {
    stub(SharedFns, "getMainnetEquivalent").resolves(constants.AddressZero);
    Object.values(contractWriterMock).forEach((method: any) => (method as SinonStub).resetHistory());
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
      const routerRelayerFee = BigNumber.from("1");
      txServiceMock.calculateGasFee.resolves(routerRelayerFee);
      const receipt = await fulfill(invariantDataMock, { ...fulfillInputMock }, requestContext);
      expect(receipt).to.deep.eq(txReceiptMock);
      expect(contractWriterMock.fulfillRouterContract).to.be.calledOnceWithExactly(
        invariantDataMock.sendingChainId,
        {
          relayerFee: "0",
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
        sigMock,
        constants.AddressZero,
        routerRelayerFee.toString(),
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
