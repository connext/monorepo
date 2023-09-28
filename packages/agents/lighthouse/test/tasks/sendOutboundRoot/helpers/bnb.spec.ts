import { SinonStub, stub, createStubInstance } from "sinon";
import { expect, mkAddress, mock } from "@connext/nxtp-utils";
import { BigNumber, constants, utils } from "ethers";

import * as Mockable from "../../../../src/mockable";
import { getSendOutboundRootParams } from "../../../../src/tasks/sendOutboundRoot/helpers/bnb";

describe("Helpers: BNB", () => {
  describe("#getSendOutboundRootParams", () => {
    beforeEach(() => {
      stub(Mockable, "getContract").returns({
        AMB: stub().resolves(mkAddress("0x123")),
        quoteEVMDeliveryPrice: stub().resolves(constants.One),
      } as any);
    });

    it("should get params", async () => {
      const res = await getSendOutboundRootParams(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: constants.One.toString(),
        _encodedData: utils.defaultAbiCoder.encode(["uint256"], [200000]),
      });
    });
  });
});
