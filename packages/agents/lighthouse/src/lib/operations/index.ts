import { execute } from "./execute";
import { sendToRelayer } from "./relayer";
import { pollCartographer } from "./cartographer";

export const getOperations = () => {
  return {
    execute,
    sendToRelayer,
    pollCartographer,
  };
};
