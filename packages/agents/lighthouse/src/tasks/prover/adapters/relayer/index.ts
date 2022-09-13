import { getRelayerAddress, send } from "./gelato";

export type Relayer = {
  getRelayerAddress: (chainId: number) => Promise<string>;
  send: (chainId: number, destinationAddress: string, encodedData: string) => Promise<string>;
};

export const setupRelayer = async (): Promise<Relayer> => {
  return {
    getRelayerAddress,
    send,
  };
};
