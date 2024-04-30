import { SinonStub, stub, createStubInstance } from "sinon";
import { expect, mkAddress, mock } from "@connext/nxtp-utils";
import { BigNumber, constants, utils } from "ethers";

import * as Mockable from "../../../../src/mockable";
import { getSendOutboundRootParams } from "../../../../src/tasks/sendOutboundRoot/helpers/bnb";
import { getBestProviderMock, sendOutboundRootCtxMock } from "../../../globalTestHook";
import { NoProviderForDomain, NoSpokeConnector } from "../../../../src/tasks/propagate/errors";

describe("Helpers: BNB", () => {
  describe("#getSendOutboundRootParams", () => {
    beforeEach(() => {
      stub(Mockable, "getContract").returns({
        AMB: stub().resolves(mkAddress("0x123")),
        quoteEVMDeliveryPrice: stub().resolves(constants.One),
      } as any);
    });

    it("should throw an error if no provider for spoke domain", async () => {
      delete sendOutboundRootCtxMock.config.chains[mock.domain.B];
      getBestProviderMock.resolves(undefined);
      await expect(getSendOutboundRootParams(mock.domain.B)).to.eventually.be.rejectedWith(NoProviderForDomain);
    });

    it("should throw an error if no spoke connector", async () => {
      (sendOutboundRootCtxMock.adapters.deployments.spokeConnector as SinonStub).returns(undefined);
      await expect(getSendOutboundRootParams(mock.domain.B)).to.eventually.be.rejectedWith(NoSpokeConnector);
    });

    it("should get params", async () => {
      const res = await getSendOutboundRootParams(mock.domain.A);
      expect(res).to.deep.eq({
        _fee: constants.One.toString(),
        _encodedData: utils.defaultAbiCoder.encode(["uint256"], [110000]),
      });
    });
  });
});
