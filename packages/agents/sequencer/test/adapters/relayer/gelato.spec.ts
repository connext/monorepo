import { stub, SinonStub } from "sinon";
import { mkAddress, expect, XTransfer } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { send, getRelayerAddress } from "../../../src/adapters/relayer/gelato";
import { RelayerSendFailed } from "../../../src/lib/errors";
import { ctxMock, getHelpersStub } from "../../globalTestHook";

const mockTransfers: XTransfer[] = [
  {
    ...mock.entity.xtransfer(),
    xparams: {
      originDomain: "1337",
      destinationDomain: "1338",
      canonicalDomain: "1337",
      to: mkAddress("0xbeefdead"),
      delegate: mkAddress("0xdelegate"),
      receiveLocal: false,
      callData: "0x0",
      slippage: "0",
      originSender: mkAddress("0xoriginsender"),
      bridgedAmt: "100",
      normalizedIn: "100",
      nonce: 1,
      canonicalId: "0xcanonical",
    },
  },
  {
    ...mock.entity.xtransfer(),
    xparams: {
      originDomain: "1337",
      destinationDomain: "1338",
      canonicalDomain: "1337",
      to: mkAddress("0xbeefdead"),
      delegate: mkAddress("0xdelegate"),
      receiveLocal: false,
      callData: "0x0",
      slippage: "0",
      originSender: mkAddress("0xoriginsender"),
      bridgedAmt: "100",
      normalizedIn: "100",
      nonce: 2,
      canonicalId: "0xcanonical",
    },
  },
];

const mockBids = [mock.entity.bid(mockTransfers[0]), mock.entity.bid(mockTransfers[1])];

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("RELAYER-TEST");
describe("Adapters: Gelato", () => {
  let gelatoSDKSendStub: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;
  let encodeExecuteFromBidsStub: SinonStub;
  let getGelatoRelayerAddressStub: SinonStub;
  beforeEach(() => {
    gelatoSDKSendStub = stub();
    isChainSupportedByGelatoStub = stub();
    encodeExecuteFromBidsStub = stub();
    getGelatoRelayerAddressStub = stub();

    getHelpersStub.returns({
      relayer: {
        gelatoSDKSend: gelatoSDKSendStub.resolves(mockAxiosSuccessResponse),
        isChainSupportedByGelato: isChainSupportedByGelatoStub.resolves(true),
        getGelatoRelayerAddress: getGelatoRelayerAddressStub.resolves(mkAddress("0xrelayer")),
      },
      auctions: {
        encodeExecuteFromBids: encodeExecuteFromBidsStub,
      },
    });
  });

  describe("#getRelayerAddress", () => {
    it("should work", async () => {
      const relayerAddress = await getRelayerAddress(1234);
      expect(relayerAddress).to.eq(mkAddress("0xrelayer"));
    });
  });

  describe("#send", () => {
    it("should error if gelato returns error", async () => {
      gelatoSDKSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(
          Number(mock.chain.A),
          ctxMock.config.chains[mock.domain.A].deployments.connext,
          "0xbeed",
          ctxMock.config.gelatoApiKey,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should throw if the chain isn't supported by gelato", () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(
          Number(mock.chain.A),
          ctxMock.config.chains[mock.domain.A].deployments.connext,
          "0xbeed",
          ctxMock.config.gelatoApiKey,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        Number(mock.chain.A),
        ctxMock.config.chains[mock.domain.A].deployments.connext,
        "0xbeed",
        ctxMock.config.gelatoApiKey,
        loggingContext.requestContext,
      );
      expect(gelatoSDKSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockAxiosSuccessResponse.taskId);
    });
  });
});
