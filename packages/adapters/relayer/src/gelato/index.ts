import { GELATO_SERVER } from "@connext/nxtp-utils";

import { Relayer } from "..";

import { getRelayerAddress, getTaskStatus, send, waitForTaskCompletion } from "./gelato";
export let url: string;

export const setupRelayer = async (_url?: string): Promise<Relayer> => {
  url = _url ?? GELATO_SERVER;
  return {
    getRelayerAddress,
    send,
    getTaskStatus,
    waitForTaskCompletion,
  };
};
