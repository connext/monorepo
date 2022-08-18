import { stub, SinonStub } from "sinon";
import { ctxMock, getHelpersStub } from "../../../globalTestHook";

describe("Operations:ExecuteSlow", () => {
  describe("#sendExecuteSlowToRelayer", () => {
    it("should throw if transfer is missing", async () => {});
    it("should send the data to the backup relayer if configured", async () => {});
    it("should send the data to the gelato if it fails to send to the backup relayer", async () => {});
  });
});
