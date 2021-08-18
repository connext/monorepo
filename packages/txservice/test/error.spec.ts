import { expect } from "@connext/nxtp-utils";
import { Logger } from "ethers/lib/utils";
import { parseError, RpcError, ServerError, TransactionReverted } from "../src/error";

describe("parseError", () => {
  it("should return error if it is nxtp error", () => {
    const err = new RpcError("fail");
    const parsed = parseError(err);
    expect(err).to.be.deep.eq(parsed);
  });

  it("should handle server errors", () => {
    const err = {
      code: Logger.errors.SERVER_ERROR,
      error: {
        message: "fail",
      },
    };
    const parsed = parseError(err);

    expect(parsed instanceof ServerError).to.be.true;
    expect(parsed.context.message).to.be.eq("fail");
    expect(parsed.message).to.be.eq(new ServerError().message);
  });

  it("should handle errors where typeof body == string", () => {
    const err = {
      body: "fail",
    };

    const parsed = parseError(err);
    expect(parsed).to.be.deep.eq(err);
  });

  describe("should handle revert errors by regex", () => {
    const msgs = [
      {
        msg: "execution reverted",
        reason: TransactionReverted.reasons.ExecutionFailed,
      },
      {
        msg: "always failing transaction",
        reason: TransactionReverted.reasons.AlwaysFailingTransaction,
      },
      {
        msg: "gas required exceeds allowance",
        reason: TransactionReverted.reasons.GasExceedsAllowance,
      },
    ];

    for (const { msg, reason } of msgs) {
      it(`${msg}`, () => {
        const err = {
          code: Logger.errors.CALL_EXCEPTION,
          message: msg,
        };

        const parsed = parseError(err);
        expect(parsed.message).to.be.eq(reason);
        expect(parsed.context.message).to.be.eq(err.message);
        expect(parsed.context.chainError.code).to.be.eq(err.code);
      });
    }
  });
});
