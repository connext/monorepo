import { expect, mock } from "@connext/nxtp-utils";
import { BigNumber } from "ethers";

import { getSendOutboundRootParams } from "../../../../src/tasks/sendOutboundRoot/helpers/bnb";

describe("Helpers: BNB", () => {
  describe("#getSendOutboundRootParams", () => {
    it("should get params", async () => {
      const res = await getSendOutboundRootParams(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: "42",
        _encodedData: "0x",
      });
    });
  });
});
