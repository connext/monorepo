import { expect, jsonifyError } from "@connext/nxtp-utils";
import { AmountInvalid } from "../../../src/lib/errors/prepare";
import {
  getReceiverAmount,
  getReceiverExpiryBuffer,
  validBidExpiry,
  validExpiryBuffer,
} from "../../../src/lib/helpers";

describe("#validExpiryBuffer", () => {
  it("should work", () => {
    const valid = 3600 * 24 + 300;
    expect(validExpiryBuffer(valid)).to.be.true;

    const long = 3600 * 7 * 24 + 300;
    expect(validExpiryBuffer(long)).to.be.false;

    const short = 3600 * 24 - 300;
    expect(validExpiryBuffer(short)).to.be.false;
  });
});

describe("#validBidExpiry", () => {
  it("should work", () => {
    expect(validBidExpiry(100, 200)).to.be.false;
    expect(validBidExpiry(200, 100)).to.be.true;
    expect(validBidExpiry(100, 100)).to.be.false;
  });
});

describe("#getReceiverAmount", () => {
  it("should work", async () => {
    const result = await getReceiverAmount("10000", 1, 1);
    expect(result).to.be.eq((10000 * 0.9995).toString());
  });

  it("should fail if its a decimal string", async () => {
    const err = jsonifyError(new AmountInvalid("1.0") as any);
    try {
      await getReceiverAmount("1.0", 1, 1);
      expect(false).to.be.true;
    } catch (e) {
      expect(e.message).to.be.eq(err.message);
    }
  });

  it("should handle correctly differing decimals values", async () => {
    const log = {
      level: 30,
      time: 1632267516696,
      pid: 1,
      hostname: "a3de1b285fe8",
      name: "0x29A519e21d6A97cdB82270b69c98bAc6426CDCf9",
      requestContext: {
        transactionId: "0x99bc34bb664f0e0f0717353e3b0f90772728027f2963c4b729e34e4f931e02a8",
        id: "YMnaC4VOQJGMisuKXozFPQ/465301",
        origin: "subscribeToAuctionRequest",
      },
      methodContext: { id: "YMnaC4VOQJGMisuKXozFPQ/465303", name: "newAuction" },
      data: {
        user: "0xE2B6F88dcC3c95f1b0C0682Eaa2EFa03E1F2D6f7",
        sendingChainId: 137,
        sendingAssetId: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        amount: "1000000000000000000",
        receivingChainId: 56,
        receivingAssetId: "0x55d398326f99059fF775485246999027B3197955",
        receivingAddress: "0xE2B6F88dcC3c95f1b0C0682Eaa2EFa03E1F2D6f7",
        callTo: "0x0000000000000000000000000000000000000000",
        callDataHash: "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
        encryptedCallData: "0x",
        expiry: 1632526714,
        transactionId: "0x99bc34bb664f0e0f0717353e3b0f90772728027f2963c4b729e34e4f931e02a8",
        dryRun: false,
      },
      msg: "Method context",
    };

    const amountReceived = await getReceiverAmount(log.data.amount, 6, 18);
    expect(amountReceived).to.be.eq("999500000000000000");
  });
});

describe("#getReceiverExpiryBuffer", () => {
  it("should work", () => {
    const buffer = Date.now();
    const decrement = 3600 * 24;
    expect(getReceiverExpiryBuffer(buffer)).to.be.eq(buffer - decrement);
  });
});
