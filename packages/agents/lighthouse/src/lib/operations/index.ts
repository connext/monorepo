import { execute } from "./execute";
import { sendToRelayer } from "./relayer";

export const getOperations = () => {
  return {
    execute,
    sendToRelayer,
  };
};
