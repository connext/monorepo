import { ContractWriter } from "../../lib/entities";

import { prepare, fulfill, cancel, removeLiquidity } from "./contract";

export const contractWriter = (): ContractWriter => {
  return {
    prepare,
    fulfill,
    cancel,
    removeLiquidity,
  };
};
