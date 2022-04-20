import { restore, reset } from "sinon";
import { expect, getRandomBytes32, mkAddress, XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { constants, utils } from "ethers";

import { getTransferByTransferId, saveTransfers } from "../../../src/adapters/database/client";
import pg from "pg";

const xtransfer = (
  originDomain: string,
  destinationDomain: string,
  amount = utils.parseEther("10000000").toString(),
  status: XTransferStatus = XTransferStatus.xcalled,
  asset: string = mkAddress("0xaaa"),
  transferId: string = getRandomBytes32(),
  nonce = 1234,
  user: string = mkAddress("0xfaded"),
): XTransfer => {
  return Object.assign({
    // Meta
    originDomain: originDomain,
    destinationDomain: destinationDomain,
    status,

    // Transfer Data
    to: user,
    transferId,
    callTo: constants.AddressZero,
    callData: "0x0",
    idx: "0",
    nonce,
    router: mkAddress("0xb"),

    // XCalled
    xcall: {
      caller: user,
      transferringAmount: amount,
      localAmount: amount,
      transferringAsset: asset,
      localAsset: asset,
      transactionHash: getRandomBytes32(),
      timestamp: Math.floor(Date.now() / 1000 - 60),
      gasPrice: utils.parseUnits("5", "gwei").toString(),
      gasLimit: "80000",
      blockNumber: 7654321,
    },

    // If status is executed, we should have executed fields defined (but leave reconciled fields empty).
    execute:
      status === XTransferStatus.executed
        ? {
            caller: mkAddress("0xa"),
            transferringAmount: amount,
            localAmount: amount,
            transferringAsset: asset,
            localAsset: asset,
            transactionHash: getRandomBytes32(),
            timestamp: Math.floor(Date.now() / 1000 - 30),
            gasPrice: utils.parseUnits("5", "gwei").toString(),
            gasLimit: "80000",
            blockNumber: 5651345,
          }
        : undefined,
  });
};

describe("Database client", () => {
  const pool = new pg.Pool({ connectionString: "postgres://postgres:qwerty@127.0.0.1:5432/connext" });

  afterEach(() => {
    restore();
    reset();
  });

  it("should save transfers", async () => {
    const xTransfer = xtransfer("2000", "3000");
    const t = await saveTransfers([xTransfer], pool);
    console.log("t: ", t);
    const transfer = await getTransferByTransferId(xTransfer.transferId, pool);
    console.log("transfer: ", transfer);
    expect(transfer).to.deep.equal(xTransfer);
  });
});
