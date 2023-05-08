import { createMethodContext, createRequestContext, Logger, mkHash, mkRandomBytes32 } from "@connext/nxtp-utils";
import { ProposedData, Report, ReportEventType } from "../src/types";

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

export function generateRandomNumberString(min: number, max: number): string {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

export function generateRandomDomainArray(minDomains: number, maxDomains: number): string[] {
  const numDomains = Math.floor(Math.random() * (maxDomains - minDomains + 1) + minDomains);
  const domains = Array.from({ length: numDomains }, (_, i) => (i + 1).toString());
  return domains;
}

export function generateFakeProposedData(): ProposedData {
  const proposedData: ProposedData = {
    snapshotId: generateRandomNumberString(1, 1000),
    endOfDispute: generateRandomNumberString(1000, 10000),
    aggregateRoot: mkRandomBytes32(),
    baseRoot: mkRandomBytes32(),
    snapshotRoots: [mkRandomBytes32(), mkRandomBytes32()],
    domains: generateRandomDomainArray(2, 2),
  };
  return proposedData;
}
