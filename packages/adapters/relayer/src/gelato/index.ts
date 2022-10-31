import { Relayer } from "..";

import { getRelayerAddress, getTaskStatus, send, waitForTaskCompletion } from "./gelato";

export const setupRelayer = async (): Promise<Relayer> => {
  return {
    getRelayerAddress,
    send,
    getTaskStatus,
    waitForTaskCompletion,
  };
};
