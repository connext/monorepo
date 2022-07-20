import { bindUnhandledErrors } from "../../../../src/subscriber/bindings/exceptions";

describe.skip("Bindings:Exceptions", () => {
  describe("#bindUnhandledErrors", () => {
    it("should catch an unhandledRejection error", async () => {
      await bindUnhandledErrors();
    });
    it("should catch an uncaughtException error", async () => {
      await bindUnhandledErrors();
    });
  });
});
