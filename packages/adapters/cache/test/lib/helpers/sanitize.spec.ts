import { expect } from "@connext/nxtp-utils";

import { getHelpers } from "../../../src/lib/helpers";

const { sanitizeNull } = getHelpers();

describe("Helpers:Sanitize", () => {
  describe("#sanitizeNull", () => {
    it("should remove null values from object", () => {
      const nestedObjectD = {
        // Should *not* be removed, as this fn is shallow, not recursive.
        e: null,
        f: "f",
        g: undefined,
      };
      // Should not remove null value from array here either.
      const nestedObjectJ = [null, "j"];
      const objectWithNullValues = {
        a: null,
        b: "b",
        c: undefined,
        d: nestedObjectD,
        h: "h",
        i: 10,
        j: nestedObjectJ,
      };
      const result = sanitizeNull(objectWithNullValues);
      expect(result).to.deep.eq({
        b: "b",
        d: nestedObjectD,
        h: "h",
        i: 10,
        j: nestedObjectJ,
      });
    });
  });
});
