import { expect, mkAddress } from "@connext/nxtp-utils";

import { send, getRelayerAddress } from "../../../../../src/tasks/prover/adapters/relayer/gelato";
import {
  gelatoSendStub,
  isChainSupportedByGelatoStub,
  mockGelatoSuccessResponse,
  mockAxiosErrorResponse,
  proverCtxMock,
} from "../../../../globalTestHook";
import { mock } from "../../../../mock";
import { RelayerSendFailed } from "../../../../../src/errors";

describe("Adapters: Gelato", () => {
  describe("#send", () => {
    it("should error if gelato returns error", async () => {
      gelatoSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(+mock.chain.A, proverCtxMock.config.chains[mock.domain.A].deployments.connext, "0xbeed"),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        +mock.chain.A,
        proverCtxMock.config.chains[mock.domain.A].deployments.connext,
        "0xbeed",
      );
      expect(gelatoSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockGelatoSuccessResponse.taskId);
    });

    it("should throw if the chain isn't supported by gelato", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(+mock.chain.A, proverCtxMock.config.chains[mock.domain.A].deployments.connext, "0xbeed"),
      ).to.eventually.be.rejectedWith(new Error("Chain not supported by gelato."));
    });
  });

  describe("#getRelayerAddress", () => {
    it("should return the relayer address", async () => {
      expect(await getRelayerAddress(+mock.chain.A)).to.eq(mkAddress("0xaaa"));
    });
  });
});
