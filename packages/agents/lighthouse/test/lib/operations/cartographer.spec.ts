import axios from "axios";
import { expect, mkAddress, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { ctxMock, getOperationsStub } from "../../globalTestHook";

import { requestContext, stubContext, mock } from "../../mock";
import { getReconciledTransactions, pollCartographer } from "../../../src/lib/operations/cartographer";
import { ApiRequestFailed } from "../../../src/lib/errors";

const transferId1 = mkBytes32("0x100");
const transferId2 = mkBytes32("0x200");
const dbTransfer1 = mock.entity.dbTransfer({ transfer_id: transferId1 });
const dbTransfer2 = mock.entity.dbTransfer({ transfer_id: transferId2 });

describe("Operations:Cartographer", () => {
  let mockContext: any;
  let axiosGetStub: SinonStub;
  let executeStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(axios, "get");
    executeStub = stub().resolves();

    getOperationsStub.returns({
      execute: executeStub,
    });
    mockContext = stubContext();
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#pollCartographer", () => {
    it("happy: should convert db transfers into xtransfers", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: [dbTransfer1, dbTransfer2],
      });

      executeStub.onFirstCall().resolves();
      executeStub.onSecondCall().throws();

      await pollCartographer();
      expect(axiosGetStub.callCount).to.be.eq(1);
      expect(executeStub.callCount).to.be.eq(2);
      expect(executeStub.getCall(0).args[1]).to.be.eq(transferId1);
      expect(executeStub.getCall(1).args[1]).to.be.eq(transferId2);
    });
  });
  describe("#getReconciledTransactions", () => {
    it("should throw if axios request fails", async () => {
      axiosGetStub.throws(new Error("Axios request failed!"));
      await expect(getReconciledTransactions()).to.be.rejectedWith(ApiRequestFailed);
    });
    it("happy: should return reconciled transfers", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: [dbTransfer1, dbTransfer2],
      });
      const result = await getReconciledTransactions();
      expect(result).to.be.deep.eq([dbTransfer1, dbTransfer2]);
    });
  });
});
