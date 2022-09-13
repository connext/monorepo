import { Deployment } from "./types";

export const log = {
  prefix: {
    base: (args: { chain: number | string; deployment: Deployment; fullAddress?: boolean }) => {
      const { chain, deployment, fullAddress } = args;
      const _address = deployment.contract.address;
      const address = fullAddress ? _address : `${_address.slice(0, 7)}..${_address.slice(37)}`;
      return `[${chain.toString().padEnd(12)}] [${address}] {${deployment.name}} `;
    },
    value: (args: {
      chain: number | string;
      deployment: Deployment;
      call: { method: string; args: (number | string)[] };
      fullAddress?: boolean;
    }) => {
      const { chain, deployment, call, fullAddress } = args;
      return log.prefix.base({ chain, deployment, fullAddress }) + `.${call.method}(${call.args.join(",")}) : `;
    },
  },
  info: {
    // Log a value read from contracts.
    value: (args: {
      chain: number | string;
      deployment: Deployment;
      call: { method: string; args: (number | string)[] };
      value: any;
      updated?: boolean;
      valid?: boolean;
    }) => {
      const { chain, deployment, call, value, updated, valid } = args;
      console.log(log.prefix.value({ chain, deployment, call }) + `${value}${updated ? " !!!" : valid ? " ✔" : ""}`);
    },
  },
  error: {
    // For when an asserted value is bad/incorrect.
    value: (args: {
      chain: number | string;
      deployment: Deployment;
      call: { method: string; args: (number | string)[] };
      value: any;
      desired: any;
    }) => {
      const { chain, deployment, call, value, desired } = args;
      throw new Error(
        log.prefix.value({ chain, deployment, call, fullAddress: true }) +
          `Value is invalid or incorrect and could not be updated. Expected: ${desired}; Actual: ${value}`,
      );
    },
    // For when a method is not found.
    method: (args: { deployment: Deployment; method: string; callable: any[] }) => {
      const { deployment, method, callable } = args;
      throw new Error(
        `Method ${method} not found in contract ${deployment.name} functions! Is the ABI from the implementation ` +
          `contract? \nCallable methods: ${callable ? callable.join(",") : "None found!"}`,
      );
    },
  },
};
