import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, ExecuteArgs, expect, getRandomBytes32 } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { sendToRelayer } from "../../../src/lib/operations/relayer";
import * as RelayerFns from "../../../src/lib/helpers/relayer";
import { GelatoSendFailed } from "../../../src/lib/errors";

const mockTransferId = getRandomBytes32();
const mockExecuteArgs: ExecuteArgs[] = [
  {
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xa"),
    feePercentage: "0.1",
    amount: "10",
    index: 0,
    transferId: mockTransferId,
    proof: ["0x"],
    relayerSignature: "0xsigsigsig",
  },
  {
    params: {
      to: mkAddress("0xbeefdead"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xb"),
    feePercentage: "0.1",
    amount: "10",
    index: 1,
    transferId: mockTransferId,
    proof: ["0x"],
    relayerSignature: "0xsigsigsig",
  },
];

const mockBids = [
  mock.entity.bid(mockTransferId, mockExecuteArgs[0]),
  mock.entity.bid(mockTransferId, mockExecuteArgs[1]),
];
const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("BID-TEST");
describe("#relayer", () => {
  describe("#sendToRelayer", () => {
    let gelatoSendStub: SinonStub;
    let isChainSupportedByGelatoStub: SinonStub;
    beforeEach(() => {
      gelatoSendStub = stub(RelayerFns, "gelatoSend");

      isChainSupportedByGelatoStub = stub(RelayerFns, "isChainSupportedByGelato");
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should error if gelato doesn't support", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(sendToRelayer(mockBids[0], loggingContext.requestContext)).to.eventually.be.throw(
        new Error("Chain not supported by gelato."),
      );
    });
    it("should error if gelato returns error", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosErrorResponse);
      expect(sendToRelayer(mockBids[0], loggingContext.requestContext)).to.eventually.be.throw(new GelatoSendFailed());
    });
    it("should send the bid to the sequencer", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosSuccessResponse);
      await sendToRelayer(mockBids[0], loggingContext.requestContext);
      expect(gelatoSendStub.callCount).to.be.eq(1);
    });
  });
});
