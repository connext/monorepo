import { expect, mkBytes32 } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";

import { CartoApiRequestFailed } from "../../../src/errors";
import { getReconciledTransactions, pollCartographer } from "../../../src/tasks/executor/operations/cartographer";
import { mock } from "../../mock";
import * as ExecuteFns from "../../../src/tasks/executor/operations/execute";
import * as Mockable from "../../../src/mockable";

const transferId1 = mkBytes32("0x100");
const transferId2 = mkBytes32("0x200");
const transferId3 = mkBytes32("0x200");
const dbTransfer1 = mock.entity.dbTransfer({ transfer_id: transferId1 });
const dbTransfer2 = mock.entity.dbTransfer({ transfer_id: transferId2 });
const dbTransfer3 = mock.entity.dbTransfer({
  transfer_id: transferId3,
  origin_domain: undefined,
  destination_domain: undefined,
});

describe("Operations:Cartographer", () => {
  let axiosGetStub: SinonStub;
  let executeStub: SinonStub;
  beforeEach(() => {
    axiosGetStub = stub(Mockable, "axiosGet");
    executeStub = stub(ExecuteFns, "execute");
  });
  afterEach(() => {
    restore();
    reset();
  });
  describe("#pollCartographer", () => {
    it("happy: should convert db transfers into xtransfers", async () => {
      axiosGetStub.resolves({
        status: 200,
        data: [dbTransfer1, dbTransfer2, dbTransfer3],
      });
      axiosGetStub.onSecondCall().resolves({
        status: 200,
        data: [],
      });

      executeStub.onFirstCall().resolves();
      executeStub.onSecondCall().throws();

      await pollCartographer();
      expect(axiosGetStub.callCount).to.be.eq(2);
      expect(executeStub.callCount).to.be.eq(3);
      expect(executeStub.getCall(0).args[1]).to.be.eq(transferId1);
      expect(executeStub.getCall(1).args[1]).to.be.eq(transferId2);
      expect(executeStub.getCall(2).args[1]).to.be.eq(transferId3);
    });
  });
  describe("#getReconciledTransactions", () => {
    it("should throw if axios request fails", async () => {
      axiosGetStub.throws(new Error("Axios request failed!"));
      await expect(getReconciledTransactions({ offset: 0, pageSize: 100 })).to.be.rejectedWith(CartoApiRequestFailed);
    });
    it("happy: should return reconciled transfers", async () => {
      axiosGetStub.onFirstCall().resolves({
        status: 200,
        data: [dbTransfer1, dbTransfer2],
      });

      const result = await getReconciledTransactions({ offset: 0, pageSize: 100 });
      expect(result).to.be.deep.eq({ data: [dbTransfer1, dbTransfer2], nextPage: true });
      expect(axiosGetStub.callCount).to.be.eq(1);
    });
  });
});
