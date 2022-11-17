import { createRequestContext, expect } from "@connext/nxtp-utils";
import { createStubInstance, SinonStub, stub } from "sinon";
import { constants, providers } from "ethers";

import { NoHubConnector, NoProviderForDomain, NoSpokeConnector } from "../../../../src/tasks/propagate/errors";
import * as Mockable from "../../../../src/mockable";
import { getPropagateParams } from "../../../../src/tasks/propagate/helpers/arbitrum";
import { propagateCtxMock } from "../../../globalTestHook";
import { mock } from "../../../mock";
import { L1ToL2MessageGasEstimator } from "@arbitrum/sdk";

const requestContext = createRequestContext("test");

const estimateSubmissionFee = Promise.resolve(constants.One);
const estimateRetryableTicketGasLimit = Promise.resolve(constants.Two);

describe("Helpers: Arbitrum ", () => {
  beforeEach(() => {
    stub(Mockable, "getJsonRpcProvider").returns(createStubInstance(providers.JsonRpcProvider));
    stub(Mockable, "getL1ToL2MessageGasEstimator").returns(
      createStubInstance(L1ToL2MessageGasEstimator, { estimateSubmissionFee, estimateRetryableTicketGasLimit }),
    );
  });

  describe("#getPropagateParams", () => {
    it("should throw an error if no provider for spoke domain", async () => {
      delete propagateCtxMock.config.chains[mock.domain.B];
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoProviderForDomain);
    });

    it("should throw an error if no provider for hub domain", async () => {
      delete propagateCtxMock.config.chains[mock.domain.A];
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoProviderForDomain);
    });

    it("should throw an error if no spoke connector", async () => {
      (propagateCtxMock.adapters.contracts.spokeConnector as SinonStub).returns(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoSpokeConnector);
    });

    it("should throw an error if no hub connector", async () => {
      (propagateCtxMock.adapters.contracts.hubConnector as SinonStub).returns(undefined);
      await expect(
        getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext),
      ).to.eventually.be.rejectedWith(NoHubConnector);
    });

    it("should return necessary data successfully", async () => {
      const data = await getPropagateParams(mock.domain.B, +mock.chain.B, +mock.chain.A, requestContext);
      expect(data).to.deep.eq({
        _connector: "",
        _fee: "89",
        _encodedData:
          "0x00000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000002a",
      });
    });
  });
});
