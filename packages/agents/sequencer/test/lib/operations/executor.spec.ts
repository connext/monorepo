import { stub, restore, reset, SinonStub } from "sinon";
import { ctxMock, getOperationsStub, getHelpersStub } from "../../globalTestHook";
import { mock } from "../../mock";
const { requestContext } = mock.loggingContext("EXECUTOR-TEST");

describe("Operations:Executor", () => {
  describe("#storeExecutorData", () => {
    it("should throw if params invalid", async () => {});
    it("should throw if executor version isn't supported by the sequencer", async () => {});
    it("should throw if transfer doesn't exist in the cache", async () => {});
    it("should throw if gas estimation fails", async () => {});
    it("should throw if the slow data got already executed", async () => {});
    it("should store executor data in the backup cache if its already being processed", async () => {});
    it("should publish data to the message queue successfully", async () => {});
  });
  describe("#executeSlowPathData", () => {
    it("should throw if transfer doesn't exist", async () => {});
    it("should throw if the executor data isn't the slow-liq transfer", async () => {});
    it("should throw if the status of executor data isn't pending", async () => {});
    it("should run a fallback mechanism by pulling the executor data from the backup cache", async () => {});
    it("should prune all the executor data if fails", async () => {});
    it("happy: should send the task to the gelato successfully", async () => {});
  });
});
