import { createRequestContext, expect, mkAddress } from "@connext/nxtp-utils";
import { SinonStub, stub, createStubInstance } from "sinon";
import { NoProviderForDomain, NoSpokeConnector, NoHubConnector } from "../../../../src/tasks/propagate/errors";

import { getPropagateParams } from "../../../../src/tasks/propagate/helpers/scroll";
import * as Mockable from "../../../../src/mockable";
import { getBestProviderMock, propagateCtxMock } from "../../../globalTestHook";
import { mock } from "../../../mock";
import { utils } from "ethers";

const requestContext = createRequestContext("test");

describe("Helpers: Scroll", () => {
  describe("#getPropagateParams", () => {
    beforeEach(() => {
      stub(Mockable, "getContract").returns({
        AMB: stub().resolves(mkAddress("0x123")),
        messageQueue: stub().resolves(mkAddress("0x123")),
        estimateCrossDomainMessageFee: stub().resolves("1000"),
      } as any);
    });

    it("should throw an error if no provider for spoke domain", async () => {
      delete propagateCtxMock.config.chains[mock.domain.B];
      getBestProviderMock.resolves(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoProviderForDomain);
    });

    it("should throw an error if no provider for hub domain", async () => {
      delete propagateCtxMock.config.chains[mock.domain.A];
      getBestProviderMock.resolves(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoProviderForDomain);
    });

    it("should throw an error if no spoke connector", async () => {
      (propagateCtxMock.adapters.deployments.spokeConnector as SinonStub).returns(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoSpokeConnector);
    });

    it("should throw an error if no hub connector", async () => {
      (propagateCtxMock.adapters.deployments.hubConnector as SinonStub).returns(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoHubConnector);
    });

    it("should return necessary data successfully", async () => {
      (propagateCtxMock.adapters.deployments.spokeConnector as SinonStub).returns({ address: mkAddress("0xa") });
      const data = await getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext);
      expect(data).to.deep.eq({
        _connector: "",
        _fee: "1000",
        _encodedData: utils.defaultAbiCoder.encode(["address"], [mkAddress("0xa")]),
      });
    });
  });
});
