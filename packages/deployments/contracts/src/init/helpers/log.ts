import { providers } from "ethers";

export const log = {
  // Log a value read from contracts.
  value: (args: {
    network: providers.Network;
    address: string;
    call: { method: string; args: (number | string)[] };
    value: any;
    updated: boolean;
  }) => {
    const { network, address, call, value, updated } = args;
    console.log(
      `\t[${network.chainId}] [${address.slice(0, 7)}..${address.slice(37)}] ${call.method}(${call.args.join(
        ",",
      )}) : ${value} ${updated ? "!!!" : ""}`,
    );
  },
};
