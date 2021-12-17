import { Logger } from "ethers/lib/utils";
import { expect } from "@connext/nxtp-utils";

import {
  parseError,
  RpcError,
  ServerError,
  UnpredictableGasLimit,
  TransactionAlreadyKnown,
  MaxAttemptsReached,
  TransactionReverted,
} from "../../src/shared/errors";

describe("#parseError", () => {
  it("should return error if it is nxtp error", () => {
    const err = new RpcError("fail");
    const parsed = parseError(err);
    expect(err).to.be.deep.eq(parsed);
  });

  it("should handle server errors / bad response from providers", () => {
    const err = {
      code: Logger.errors.SERVER_ERROR,
      error: {
        message: "fail",
      },
    };
    const parsed = parseError(err);

    expect(parsed instanceof ServerError).to.be.true;
    expect(parsed.context.message).to.be.eq("fail");
    expect(parsed.message).to.be.eq(ServerError.reasons.BadResponse);
  });

  it("should handle unpredictable gas limit error", () => {
    const err = {
      code: Logger.errors.UNPREDICTABLE_GAS_LIMIT,
      error: {
        message: "fail",
      },
    };
    const parsed = parseError(err);
    expect(parsed instanceof UnpredictableGasLimit).to.be.true;
    expect(parsed.context.message).to.be.eq("fail");
    expect(parsed.message).to.be.eq("The gas estimate could not be determined.");
  });

  it("should handle transaction already known error", () => {
    const err = {
      error: {
        message: "already known",
      },
    };
    const parsed = parseError(err);
    expect(parsed instanceof TransactionAlreadyKnown).to.be.true;
    expect(parsed.context.message).to.be.eq("already known");
    expect(parsed.message).to.be.eq("Transaction is already indexed by provider.");
  });

  it("should handle MaxAttemptsReached error", () => {
    const err = new MaxAttemptsReached(10);
    const parsed = parseError(err);
    expect(parsed instanceof MaxAttemptsReached).to.be.true;
    expect(parsed.type).to.be.eq("MaxAttemptsReached");
    expect(parsed.msg).to.be.eq(MaxAttemptsReached.getMessage(10));
  });

  it("should handle all connection errors", () => {
    const errs = ["ECONNRESET", "EADDRINUSE", "ECONNREFUSED", "EPIPE", "ENOTFOUND", "ENETUNREACH", "EAI_AGAIN"];
    errs.forEach((err) => {
      const parsed = parseError({
        code: Logger.errors.SERVER_ERROR,
        otherdata: "nonsense",
        error: { message: `<d12kegvzpwe1f${err}@!#!$%!@%<<>` },
      });
      expect(parsed instanceof RpcError).to.be.true;
      expect(parsed.message).to.be.eq(RpcError.reasons.ConnectionReset);
    });
  });

  it("should handle errors where typeof body == string", () => {
    const err = {
      body: "fail",
    };

    const parsed = parseError(err);
    expect(parsed).to.be.deep.eq(err);
  });

  it("should return just err object when it is already nxtp error", () => {
    const err = {
      body: "fail",
    };

    const parsed = parseError(err);
    expect(parseError(parsed)).to.be.deep.eq(parsed);
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
