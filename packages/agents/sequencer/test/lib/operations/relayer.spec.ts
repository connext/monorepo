import { stub, restore, reset, SinonStub } from "sinon";
import { mkAddress, FulfillArgs, expect, getRandomBytes32 } from "@connext/nxtp-utils";

import { mock } from "../../mock";
import { sendToRelayer } from "../../../src/lib/operations/relayer";
import * as RelaerFns from "../../../src/lib/helpers/relayer";

const txId_A = getRandomBytes32();
const txId_B = getRandomBytes32();
const mockFulfillArgs: FulfillArgs[] = [
  {
    params: {
      recipient: mkAddress("0xbeefdead"),
      callTo: mkAddress("0x"),
      callData: "0x0",
      originDomain: "1337",
      destinationDomain: "1338",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xa"),
    feePercentage: "0.1",
    index: 0,
    transactionId: txId_A,
    proof: ["0x"],
    amount: "10.1",
    relayerSignature: "0xsigsigsig",
  },
  {
    params: {
      recipient: mkAddress("0xbeefdead"),
      callTo: mkAddress("0x"),
      callData: "0x0",
      originDomain: "2000",
      destinationDomain: "3000",
    },
    local: mkAddress("0xdedddddddddddddd"),
    router: mkAddress("0xb"),
    feePercentage: "0.1",
    index: 1,
    transactionId: txId_B,
    proof: ["0x"],
    amount: "10.1",
    relayerSignature: "0xsigsigsig",
  },
];

const mockBids = [mock.entity.bid(txId_A, mockFulfillArgs[0]), mock.entity.bid(txId_B, mockFulfillArgs[1])];
const mockAxiosErrorResponse = { isAxiosError: true, code: 500, response: "Invalid fee" };
const mockAxiosSuccessResponse = { taskId: 1, msg: "success" };
const loggingContext = mock.loggingContext("BID-TEST");
describe("#relayer", () => {
  describe("#sendToRelayer", () => {
    let gelatoSendStub: SinonStub;
    let isChainSupportedByGelatoStub: SinonStub;
    beforeEach(() => {
      gelatoSendStub = stub(RelaerFns, "gelatoSend");

      isChainSupportedByGelatoStub = stub(RelaerFns, "isChainSupportedByGelato");
    });
    afterEach(() => {
      restore();
      reset();
    });

    it("should error if gelato doesn't support", async () => {
      isChainSupportedByGelatoStub.resolves(false);
      expect(sendToRelayer(mockBids[1], loggingContext.requestContext)).to.eventually.be.rejectedWith(
        "Chain not supported by gelato",
      );
    });
    it("should error if gelato returns error", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosErrorResponse);
      expect(sendToRelayer(mockBids[0], loggingContext.requestContext)).to.eventually.be.rejectedWith(
        "Gelato Send Failed",
      );
    });
    it("should send the bid to the sequencer", async () => {
      isChainSupportedByGelatoStub.resolves(true);
      gelatoSendStub.resolves(mockAxiosSuccessResponse);
      await sendToRelayer(mockBids[0], loggingContext.requestContext);
      expect(gelatoSendStub.callCount).to.be.eq(1);
    });
  });
});
