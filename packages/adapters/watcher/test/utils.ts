import { createMethodContext, createRequestContext, Logger, mkHash } from "@connext/nxtp-utils";
import { Report, ReportEventType } from "../src/types";

export const TEST_DOMAINS = ["1337", "1338"];
export const TEST_RPCS = ["https://test.rpc/1337", "https://test.rpc/1338"];

export const TEST_REPORT: Report = {
  timestamp: Date.now(),
  event: ReportEventType.Pause,
  reason: "test",
  errors: [
    { message: "test1", stack: "test1" },
    { message: "test2", stack: "test2" },
  ],
  logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
  requestContext: createRequestContext("foo"),
  methodContext: createMethodContext("foo"),
  domains: TEST_DOMAINS,
  relevantTransactions: [mkHash("0x1"), mkHash("0x2")],
  rpcs: TEST_RPCS,
};
