import { createMethodContext, createRequestContext, Logger } from "@connext/nxtp-utils";
import { Report, ReportEventType } from "../src/types";

export const TEST_DOMAINS = ["1337", "1338"];
export const TEST_RPCS = ["https://test.rpc/1337", "https://test.rpc/1338"];

export const TEST_REPORT: Report = {
  timestamp: Date.now(),
  event: ReportEventType.Pause,
  reason: "test",
  errors: [],
  logger: new Logger({ name: "mock", level: process.env.LOG_LEVEL || "silent" }),
  requestContext: createRequestContext("foo"),
  methodContext: createMethodContext("foo"),
  domains: TEST_DOMAINS,
  relevantTransactions: [],
  rpcs: TEST_RPCS,
};
