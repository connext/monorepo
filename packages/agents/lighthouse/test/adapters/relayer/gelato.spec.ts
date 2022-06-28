import { stub, SinonStub } from "sinon";
import { mkAddress, expect } from "@connext/nxtp-utils";

import { mock, requestContext } from "../../mock";
import { send } from "../../../src/adapters/relayer/gelato";
import { RelayerSendFailed } from "../../../src/lib/errors";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };

describe("Adapters: Gelato", () => {
  let gelatoSendStub: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;
  let getGelatoRelayerStub: SinonStub;
  let encodeExecuteFromBidsStub: SinonStub;

  beforeEach(() => {
    gelatoSendStub = stub();
    isChainSupportedByGelatoStub = stub();
    encodeExecuteFromBidsStub = stub();
    getGelatoRelayerStub = stub();
    getHelpersStub.returns({
      relayer: {
        gelatoSend: gelatoSendStub.resolves(mockAxiosSuccessResponse),
        isChainSupportedByGelato: isChainSupportedByGelatoStub.resolves(true),
        getGelatoRelayerAddress: getGelatoRelayerStub.resolves(mkAddress("0x111")),
      },
    });
  });

  describe("#send", () => {
    it("should error if gelato returns error", async () => {
      gelatoSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(mock.chain.A, ctxMock.config.chains[mock.domain.A].deployments.connext, "0xbeed", requestContext),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        mock.chain.A,
        ctxMock.config.chains[mock.domain.A].deployments.connext,
        "0xbeed",
        requestContext,
      );
      expect(gelatoSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockAxiosSuccessResponse.taskId);
    });

    it("should throw if the chain isn't supported by gelato", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(mock.chain.A, ctxMock.config.chains[mock.domain.A].deployments.connext, "0xbeed", requestContext),
      ).to.eventually.be.rejectedWith(new Error("Chain not supported by gelato."));
    });
  });
});
