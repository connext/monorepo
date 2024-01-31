import { createRequestContext, expect, mkAddress } from "@connext/nxtp-utils";
import { SinonStub, stub, createStubInstance } from "sinon";
import { NoProviderForDomain, NoSpokeConnector, NoHubConnector } from "../../../../src/tasks/propagate/errors";

import { getPropagateParams } from "../../../../src/tasks/propagate/helpers/zksync";
import * as Mockable from "../../../../src/mockable";
import { getBestProviderMock, propagateCtxMock } from "../../../globalTestHook";
import { mock } from "../../../mock";
import { BigNumber, utils } from "ethers";

const requestContext = createRequestContext("test");

describe("Helpers: ZkSync", () => {
  describe("#getPropagateParams", () => {
    beforeEach(() => {
      stub(Mockable, "getContract").returns({
        l2TransactionBaseCost: stub().resolves(BigNumber.from("0")),
      } as any);
      stub(Mockable, "getJsonRpcProvider").returns({
        getGasPrice: stub().resolves(BigNumber.from("1000")),
      } as any);
      stub(Mockable, "getZkSyncWeb3Provider").returns({
        getMainContractAddress: stub().resolves(mkAddress("0xcc")),
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
      const l2Connector = mkAddress("0x12312312");
      (propagateCtxMock.adapters.deployments.spokeConnector as SinonStub).returns({ address: l2Connector });
      const data = await getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext);
      expect(data).to.deep.eq({
        _connector: "",
        _fee: "0",
        _encodedData: utils.defaultAbiCoder.encode(["uint256", "uint256", "address"], ["5000000", "800", l2Connector]),
      });
    });
  });
});
