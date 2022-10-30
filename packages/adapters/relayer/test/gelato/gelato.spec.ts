import { stub, SinonStub, SinonStubbedInstance, createStubInstance } from "sinon";
import { mkAddress, expect, mock, Logger, GELATO_RELAYER_ADDRESS } from "@connext/nxtp-utils";
import { ChainReader } from "@connext/nxtp-txservice";

import { send, getRelayerAddress } from "../../src/gelato/gelato";
import * as GelatoFns from "../../src/gelato/gelato";
import { RelayerSendFailed } from "../../src/errors";
import { mockChainReader } from "@connext/nxtp-txservice/test/mock";
import { mockTaskId } from "../mock";

const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("RELAYER-TEST");

const logger = new Logger({ name: "test", level: process.env.LOG_LEVEL || "silent" });
describe("Adapters: Gelato", () => {
  let gelatoSDKSendStub: SinonStub;
  let isChainSupportedByGelatoStub: SinonStub;
  let chainReaderMock: SinonStubbedInstance<ChainReader>;
  beforeEach(() => {
    gelatoSDKSendStub = stub(GelatoFns, "gelatoSDKSend").resolves({ taskId: mockTaskId });
    isChainSupportedByGelatoStub = stub(GelatoFns, "isChainSupportedByGelato").resolves(true);
    chainReaderMock = mockChainReader() as any;
  });

  describe("#getRelayerAddress", () => {
    it("should work", async () => {
      const relayerAddress = await getRelayerAddress(1234, logger);
      expect(relayerAddress).to.eq(GELATO_RELAYER_ADDRESS);
    });
  });

  describe("#send", () => {
    it("should error if gelato returns error", async () => {
      gelatoSDKSendStub.resolves(mockAxiosErrorResponse);
      expect(
        send(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(RelayerSendFailed);
    });

    it("should throw if the chain isn't supported by gelato", () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(
        send(
          Number(mock.chain.A),
          mock.domain.A,
          mkAddress(),
          "0xbeed",
          "foo",
          chainReaderMock,
          logger,
          loggingContext.requestContext,
        ),
      ).to.eventually.be.rejectedWith(Error);
    });

    it("should send the bid to the relayer", async () => {
      const taskId = await send(
        Number(mock.chain.A),
        mock.domain.A,
        mkAddress(),
        "0xbeed",
        "foo",
        chainReaderMock,
        logger,
        loggingContext.requestContext,
      );
      expect(gelatoSDKSendStub).to.be.calledOnce;
      expect(taskId).to.eq(mockTaskId);
    });
  });
});
