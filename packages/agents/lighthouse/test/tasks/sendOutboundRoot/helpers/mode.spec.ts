import { expect, mock } from "@connext/nxtp-utils";

import { getSendOutboundRootParamsMode } from "../../../../src/tasks/sendOutboundRoot/helpers";

describe("Helpers: Mode", () => {
  describe("#getSendOutboundRootParams", () => {
    it("should get params", async () => {
      const res = await getSendOutboundRootParamsMode(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: "0",
        _encodedData: "0x00000000000000000000000000000000000000000000000000000000000f4240",
      });
    });
  });
});
