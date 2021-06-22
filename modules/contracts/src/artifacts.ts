import { FunctionFragment, EventFragment, ParamType } from "@ethersproject/abi";

import * as TransactionManager from "../artifacts/contracts/TransactionManager.sol/TransactionManager.json";

type Abi = Array<string | FunctionFragment | EventFragment | ParamType>;

type Artifact = {
  contractName: string;
  abi: Abi;
  bytecode: string;
  deployedBytecode: string;
};

type Artifacts = { [contractName: string]: Artifact };

export const artifacts: Artifacts = {
  TransactionManager,
} as any;

export { TransactionManager };
