import { expect, delay, mkBytes32 } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { ctxMock, getOperationsStub } from "../../../globalTestHook";

import { bindTask } from "../../../../src/bindings/subscriber";

describe("Bindings:Tasks", () => {
  describe("#bindTasks", () => {
    let updateTaskStub: SinonStub;

    beforeEach(() => {
      updateTaskStub = stub();

      getOperationsStub.returns({
        tasks: {
          updateTask: updateTaskStub,
        },
      });
    });
    it("should catch the error if updateTasks throws", async () => {
      updateTaskStub.throws();
      ctxMock.config.mode.cleanup = false;
      const mockTransferId = mkBytes32();
      await bindTask(mockTransferId);
      await delay(1500);
      ctxMock.config.mode.cleanup = true;
      expect(updateTaskStub.callCount).to.be.gte(1);
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      updateTaskStub.resolves();
      ctxMock.config.mode.cleanup = false;
      const mockTransferId = mkBytes32();
      await bindTask(mockTransferId, 10);
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(updateTaskStub.callCount).to.be.gte(1);
    });
  });
});
