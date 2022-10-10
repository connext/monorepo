import { expect, mkAddress, mkHash } from "@connext/nxtp-utils";

import { send, getRelayerAddress, getTransactionHash } from "../../../src/adapters/relayer/gelato";
import {
  gelatoSDKSendStub,
  isChainSupportedByGelatoStub,
  mockGelatoSDKSuccessResponse,
  mockAxiosErrorResponse,
  proverCtxMock,
} from "../../globalTestHook";
import { mock } from "../../mock";
import { RelayerSendFailed } from "../../../src/errors";

describe("Adapters: Gelato", () => {
  describe("#send", () => {
    it("should error if gelato returns error", async () => {
      gelatoSDKSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(
          +mock.chain.A,
          proverCtxMock.config.chains[mock.domain.A].deployments.spokeConnector,
          "0xbeed",
          proverCtxMock.config.gelatoApiKey,
          proverCtxMock.logger,
        ),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        +mock.chain.A,
        proverCtxMock.config.chains[mock.domain.A].deployments.spokeConnector,
        "0xbeed",
        proverCtxMock.config.gelatoApiKey,
        proverCtxMock.logger,
      );
      expect(gelatoSDKSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockGelatoSDKSuccessResponse.taskId);
    });

    it("should throw if the chain isn't supported by gelato", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(
          +mock.chain.A,
          proverCtxMock.config.chains[mock.domain.A].deployments.spokeConnector,
          "0xbeed",
          proverCtxMock.config.gelatoApiKey,
          proverCtxMock.logger,
        ),
      ).to.eventually.be.rejectedWith(new Error("Chain not supported by gelato."));
    });
  });

  describe("#getRelayerAddress", () => {
    it("should return the relayer address", async () => {
      expect(await getRelayerAddress(+mock.chain.A, proverCtxMock.logger)).to.eq(mkAddress("0xaaa"));
    });
  });

  describe("#getTransactionHash", () => {
    it("should get transaction hash from relayer", async () => {
      expect(await getTransactionHash(mkHash("0xabc"), proverCtxMock.logger)).to.eq(mkHash("0xaaa"));
    });
  });
});
