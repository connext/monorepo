import { Contract } from "ethers";

export type Deployment = {
  proxy?: string;
  name: string;
  address: string;
  abi: any[];
  contract: Contract;
};

export type ReadSchema<T> = {
  deployment: Deployment;
  desired?: T; // Desired value.
  // Read method to call on contract.
  read:
    | {
        method: string;
        args?: (number | string)[];
      }
    | string;
  caseSensitive?: boolean;
};

export type CallSchema<T> = ReadSchema<T> & {
  apply: boolean;
  // Write method to call to update value on contract.
  write: {
    method: string;
    args?: any[];
  };
  // Optional auth (enforces sender by call)
  auth?:
    | {
        method: string;
        args?: any[];
        eval: (ret: any) => boolean; // address or role id for permission check
      }
    | {
        method: string;
        args?: any[];
        eval: (ret: any) => boolean; // address or role id for permission check
      }[];

  chainData?: any;
};
