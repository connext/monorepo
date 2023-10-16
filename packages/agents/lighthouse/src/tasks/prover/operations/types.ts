import { XMessage } from "@connext/nxtp-utils";

export const PROVER_QUEUE = "proverX";
export type ProofStruct = {
  message: string;
  path: string[];
  index: number;
};
export type BrokerMessage = {
  messages: XMessage[];
  originDomain: string;
  destinationDomain: string;
  messageRoot: string;
  messageRootIndex: number;
  messageRootCount: number;
  aggregateRoot: string;
  aggregateRootCount: number;
  snapshotRoots: string[];
};
