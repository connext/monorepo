import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";

describe("Helpers:Index", () => {
  describe("#getHelpers", () => {
    it("happy: should return helpers", async () => {
      const helpers = getHelpers();
      expect(helpers).to.not.be.undefined;
      expect(helpers).to.not.be.null;
      expect(helpers.execute).to.be.a("object");
      expect(helpers.shared).to.be.a("object");
    });
  });
});
