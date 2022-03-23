import { expect } from "@connext/nxtp-utils";

import { getOperations } from "../../../src/lib/operations";

describe("Operations:Index", () => {
  describe("#getOperations", () => {
    it("happy: should return operations", async () => {
      const operations = getOperations();
      expect(operations).to.not.be.undefined;
      expect(operations).to.not.be.null;
      expect(operations.execute).to.be.a("function");
    });
  });
});
