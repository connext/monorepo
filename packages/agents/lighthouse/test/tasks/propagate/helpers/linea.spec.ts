import { createRequestContext, expect, mkAddress } from "@connext/nxtp-utils";
import { SinonStub, stub, createStubInstance, SinonStubbedInstance } from "sinon";
import { NoProviderForDomain } from "../../../../src/tasks/propagate/errors";

import { getPropagateParams } from "../../../../src/tasks/propagate/helpers/linea";
import * as Mockable from "../../../../src/mockable";
import { getBestProviderMock, propagateCtxMock } from "../../../globalTestHook";
import { mock } from "../../../mock";
import { BigNumber } from "ethers";

const requestContext = createRequestContext("test");

let getL2Contract: SinonStub;

class MockLineaSDK {
  public getL2Contract = getL2Contract;
}

describe("Helpers: Linea", () => {
  describe("#getPropagateParams", () => {
    beforeEach(() => {
      stub(Mockable, "LineaSDK").value(MockLineaSDK);
      getL2Contract = stub().returns({
        get1559Fees: stub().resolves({
          maxFeePerGas: BigNumber.from(10),
          maxPriorityFeePerGas: BigNumber.from(1),
        }),
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

    it("should return necessary data successfully", async () => {
      const data = await getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext);
      expect(data).to.deep.eq({
        _connector: "",
        _fee: BigNumber.from(10).mul(BigNumber.from(120000)).toString(),
        _encodedData: "0x",
      });
    });
  });
});
