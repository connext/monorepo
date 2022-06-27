import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, expect, XTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { send } from "../../../src/adapters/relayer/gelato";
import { RelayerSendFailed } from "../../../src/lib/errors";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

const mockTransfers: XTransfer[] = [
  {
    ...mock.entity.xtransfer(),
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 0,
    originSender: mkAddress("0xsenderorigin"),
  },
  {
    ...mock.entity.xtransfer(),
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    relayerFee: "0.1",
    amount: "10",
    nonce: 7,
    originSender: mkAddress("0xoriginsender"),
  },
];

const mockBids = [mock.entity.bid(mockTransfers[0]), mock.entity.bid(mockTransfers[1])];

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("LIGHTHOUSE-TEST");
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
    console.log({ getHelpersStub });
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
        send(
          mock.chain.A,
          ctxMock.config.chains[mock.domain.A].deployments.connext,
          "0xbeed",
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        mock.chain.A,
        ctxMock.config.chains[mock.domain.A].deployments.connext,
        "0xbeed",
        loggingContext.requestContext,
      );
      console.log("taskId: ", taskId);
      expect(gelatoSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockAxiosSuccessResponse.taskId);
    });
  });
});
