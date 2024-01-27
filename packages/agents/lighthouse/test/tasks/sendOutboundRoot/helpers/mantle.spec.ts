import { expect, mock } from "@connext/nxtp-utils";

import { getSendOutboundRootParams } from "../../../../src/tasks/sendOutboundRoot/helpers/mantle";

describe("Helpers: Mantle", () => {
  describe("#getSendOutboundRootParams", () => {
    it("should get params", async () => {
      const res = await getSendOutboundRootParams(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: "0",
        _encodedData: "0x00000000000000000000000000000000000000000000000000000000000f4240",
      });
    });
  });
});
