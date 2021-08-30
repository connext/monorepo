import { ContractWriter } from "../../lib/entities";

import { prepare, fulfill, cancel, removeLiquidity } from "./contract";

export const getContractWriter = async (): Promise<ContractWriter> => {
  return {
    prepare,
    fulfill,
    cancel,
    removeLiquidity,
  };
};
