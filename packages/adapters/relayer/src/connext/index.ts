import { Relayer } from "..";

import { connextRelayerSend, getRelayerAddress, getTaskStatus, waitForTaskCompletion } from "./connext";

export let url: string;

export const setupRelayer = async (_url: string): Promise<Relayer> => {
  url = _url;
  return {
    getRelayerAddress,
    send: connextRelayerSend,
    getTaskStatus,
    waitForTaskCompletion,
  };
};
