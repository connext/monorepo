export const log = {
  prefix: {
    value: (args: {
      chain: number | string;
      address: string;
      call: { method: string; args: (number | string)[] };
      fullAddress?: boolean;
    }) => {
      const { chain, address: _address, call, fullAddress } = args;
      const address = fullAddress ? _address : `${_address.slice(0, 7)}..${_address.slice(37)}`;
      return `\t[${chain}] [${address}] ${call.method}(${call.args.join(",")}) : `;
    },
  },
  info: {
    // Log a value read from contracts.
    value: (args: {
      chain: number | string;
      address: string;
      call: { method: string; args: (number | string)[] };
      value: any;
      updated?: boolean;
    }) => {
      const { chain, address, call, value, updated } = args;
      console.log(log.prefix.value({ chain, address, call }) + `${value} ${updated ? "!!!" : ""}`);
    },
  },
  error: {
    // For when an asserted value is bad/incorrect.
    value: (args: {
      chain: number | string;

      address: string;
      call: { method: string; args: (number | string)[] };
      value: any;
      desired: any;
    }) => {
      const { chain, address, call, value, desired } = args;
      throw new Error(
        log.prefix.value({ chain, address, call, fullAddress: true }) +
          `Value is invalid or incorrect and could not be updated. Expected: ${desired}; Actual: ${value}`,
      );
    },
  },
};
