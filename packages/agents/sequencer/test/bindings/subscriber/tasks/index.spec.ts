import { expect, delay } from "@connext/nxtp-utils";
import { stub, SinonStub } from "sinon";
import { ctxMock, getOperationsStub } from "../../../globalTestHook";

import { bindTasks } from "../../../../src/bindings/subscriber";

describe("Bindings:Tasks", () => {
  describe("#bindTasks", () => {
    let updateTasksStub: SinonStub;

    beforeEach(() => {
      updateTasksStub = stub();

      getOperationsStub.returns({
        tasks: {
          updateTasks: updateTasksStub,
        },
      });
    });
    it("should catch the error if updateTasks throws", async () => {
      updateTasksStub.throws();
      ctxMock.config.mode.cleanup = false;
      await bindTasks();
      await delay(1500);
      ctxMock.config.mode.cleanup = true;
      expect(updateTasksStub.callCount).to.be.gte(1);
    });

    it("happy: should start an interval loop that calls polling fn", async () => {
      updateTasksStub.resolves();
      ctxMock.config.mode.cleanup = false;
      await bindTasks(10);
      await delay(20);
      ctxMock.config.mode.cleanup = true;
      expect(updateTasksStub.callCount).to.be.gte(1);
    });
  });
});
