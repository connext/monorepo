import { RelayerTaskStatus, mkBytes32, mkAddress } from "@connext/nxtp-utils";
import { stub } from "sinon";

import { Relayer } from "../src";

export const mockTaskId = mkBytes32("0xabcdef123");
export const mockRelayerAddress = mkAddress("0xabcdef123");

export const mockRelayer = (): Relayer => {
  return {
    getRelayerAddress: stub().resolves(mockRelayerAddress),
    send: stub().resolves(mockTaskId),
    getTaskStatus: stub().resolves(RelayerTaskStatus.ExecSuccess),
    waitForTaskCompletion: stub().resolves({ taskId: mockTaskId, status: RelayerTaskStatus.ExecSuccess }),
  } as Relayer;
};
