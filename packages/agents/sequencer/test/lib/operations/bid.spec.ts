import { mkAddress, FulfillArgs, Bid, expect } from "@connext/nxtp-utils";
import { stub, restore, reset, SinonStub } from "sinon";
import { handleBid } from "../../../src/lib/operations";
import { mock } from "../../mock";

const mockFulfillArgs: FulfillArgs[] = [
  {
    params: {
      recipient: "0xbeefdead",
      callTo: "0x",
      callData: "0x0",
      originDomain: "2000",
      destinationDomain: "3000",
    },
    local: "0xdedddddddddddddd",
    router: mkAddress("0xa"),
    feePercentage: "0.1",
    nonce: "1",
    amount: "10",
    relayerSignature: "0xsigsigsig",
  },
  {
    params: {
      recipient: "0xbeefdead",
      callTo: "0x",
      callData: "0x0",
      originDomain: "2000",
      destinationDomain: "3000",
    },
    local: "0xdedddddddddddddd",
    router: mkAddress("0xb"),
    feePercentage: "0.1",
    nonce: "1",
    amount: "10",
    relayerSignature: "0xsigsigsig",
  },
];

const mockBids = [
  mock.entity.bid("0xtx111", mockFulfillArgs[0]),
  mock.entity.bid("0xtx111", mockFulfillArgs[1]),
  mock.entity.bid(),
];

const loggingContext = mock.loggingContext("BID-TEST");
describe("Bid", () => {
  describe("#handleBid", () => {
    beforeEach(async () => {});
    afterEach(() => {
      restore();
      reset();
    });
    it("should error if input validation fails", async () => {
      const _bid: Bid = {
        ...mockBids[0],
        transactionId: 1,
      };
      expect(handleBid(_bid, loggingContext.requestContext)).to.eventually.be.rejectedWith("Params invalid");
    });
    it("happy case: should store bid to auction cache", async () => {
      await handleBid(mockBids[0], loggingContext.requestContext);
    });
  });
  describe("#bidSelection", () => {
    beforeEach(async () => {});
    afterEach(() => {
      restore();
      reset();
    });
    it("happy case: should send best bid to the relayer", async () => {});
  });
});
