import { createLoggingContext, CrossChainTxStatus, mkAddress, mkBytes32, expect } from "@connext/nxtp-utils";
import { constants, BigNumber } from "ethers";
import { SinonStub, stub } from "sinon";

import { getOperations } from "../../../src/lib/operations";
import * as SharedHelperFns from "../../../src/lib/helpers/shared";
import * as FullfillFns from "../../../src/lib/helpers/fulfill";
import { mock } from "../../mock";
import { parseEther } from "ethers/lib/utils";

const { requestContext } = createLoggingContext("TEST", undefined, mkBytes32());

const { fulfill } = getOperations();
const mockCrossChainTx = mock.entity.crossChainTx(mock.chain.A, mock.chain.B, {
  status: CrossChainTxStatus.Prepared,
  asset: mkAddress("0xaaa"),
  transactionId: mkBytes32(),
  nonce: 0,
  user: mkAddress("0xa"),
});

const mockAppContext = mock.context();

describe("Fulfill Receiver Operation", () => {
  beforeEach(() => {});

  describe("#fulfill", () => {
    beforeEach(() => {
      stub(SharedHelperFns, "sanitationCheck").resolves();
      stub(SharedHelperFns, "getDecimalsForAsset").resolves(18);
      stub(FullfillFns, "getReceiverAmount").resolves({
        receivingAmount: parseEther("100").toString(),
        routerFee: parseEther("1").toString(),
        amountAfterSwapRate: "1",
      });
    });
    it("should error if slippage invalid ", async () => {
      await expect(fulfill(mockAppContext, mockCrossChainTx)).to.eventually.be.rejectedWith("Slippage invalid");
    });
  });
});
