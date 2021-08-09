import { mkBytes32, RequestContext } from "@connext/nxtp-utils";
import { txReceiptMock } from "@connext/nxtp-utils/src/mock";
import { SinonStub, stub } from "sinon";
import { expect } from "@connext/nxtp-utils/src/expect";
import { providers } from "ethers/lib/ethers";

import { activeTransactionMock } from "../../utils";
import { ActiveTransaction, TransactionStatus } from "../../../src/lib/entities";
import { handleActiveTransactions } from "../../../src/bindings/contractReader/index";
import * as PrepareFns from "../../../src/lib/operations/prepareReceiver";
import * as FulfillFns from "../../../src/lib/operations/fulfillSender";
import * as CancelFns from "../../../src/lib/operations/cancelSender";
import { ExpiryInvalid } from "../../../src/lib/errors";

let prepareMock: SinonStub<
  [tx: ActiveTransaction, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;
let fulfillMock: SinonStub<
  [tx: ActiveTransaction, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;

let cancelMock: SinonStub<
  [tx: ActiveTransaction, requestContext: RequestContext],
  Promise<providers.TransactionReceipt>
>;

describe("Contract Reader Binding", () => {
  describe("#handleActiveTransactions", () => {
    beforeEach(() => {
      prepareMock = stub(PrepareFns, "prepareReceiver").resolves(txReceiptMock);
      fulfillMock = stub(FulfillFns, "fulfillSender").resolves(txReceiptMock);
      cancelMock = stub(CancelFns, "cancelSender").resolves(txReceiptMock);
    });

    it("should prepare, fulfill, and cancel active transactions", async () => {
      prepareMock.onSecondCall().rejects(new ExpiryInvalid(1234));
      const prepare: ActiveTransaction = { ...activeTransactionMock };
      const fulfill: ActiveTransaction = {
        ...activeTransactionMock,
        status: TransactionStatus.ReceiverFulfilled,
        crosschainTx: {
          ...activeTransactionMock.crosschainTx,
          invariant: { ...activeTransactionMock.crosschainTx.invariant, transactionId: mkBytes32("0x1234") },
        },
      };
      const cancel = {
        ...activeTransactionMock,
        crosschainTx: {
          ...activeTransactionMock.crosschainTx,
          invariant: { ...activeTransactionMock.crosschainTx.invariant, transactionId: mkBytes32("0x2345") },
        },
      };
      await handleActiveTransactions([prepare, fulfill, cancel]);
      expect(prepareMock).to.be.calledWith(prepare);
      expect(prepareMock).to.be.calledWith(cancel);
      expect(fulfillMock).to.be.calledOnceWith(fulfill);
      expect(cancelMock).to.be.calledOnceWith(cancel);
    });
  });
});
