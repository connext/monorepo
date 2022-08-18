import { stub, restore, reset, SinonStub } from "sinon";
import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { mock } from "../../mock";
const { requestContext } = mock.loggingContext("EXECUTOR-TEST");

describe("Operations:Executor", () => {
  describe("#storeExecutorData", () => {});
  describe("#executeSlowPathData", () => {});
});
