import { expect, mock } from "@connext/nxtp-utils";

import { getSendOutboundRootParamsMetis } from "../../../../src/tasks/sendOutboundRoot/helpers";

describe("Helpers: Metis", () => {
  describe("#getSendOutboundRootParams", () => {
    it("should get params", async () => {
      const res = await getSendOutboundRootParamsMetis(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: "0",
        _encodedData: "0x00000000000000000000000000000000000000000000000000000000000f4240",
      });
    });
  });
});
