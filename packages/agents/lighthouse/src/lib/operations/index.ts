import { execute } from "./execute";
import { sendBidsToRelayer } from "./relayer";
import { pollCartographer } from "./cartographer";

export const getOperations = () => {
  return {
    execute,
    sendBidsToRelayer,
    pollCartographer,
  };
};
