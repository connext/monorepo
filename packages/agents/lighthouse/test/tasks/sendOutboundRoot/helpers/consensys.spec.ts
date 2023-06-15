import { expect, mock } from "@connext/nxtp-utils";
import { utils } from "ethers";

import { getSendOutboundRootParams } from "../../../../src/tasks/sendOutboundRoot/helpers/consensys";

describe("Helpers: Consensys", () => {
  describe("#getSendOutboundRootParams", () => {
    it("should get params", async () => {
      const res = await getSendOutboundRootParams(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: utils.parseEther("0.001").toString(),
        _encodedData: "0x",
      });
    });
  });
});
