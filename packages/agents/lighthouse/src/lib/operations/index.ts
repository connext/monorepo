import { execute } from "./execute";
import { sendExecuteFastToRelayer } from "./relayer";
import { pollCartographer } from "./cartographer";

export const getOperations = () => {
  return {
    execute,
    sendExecuteFastToRelayer,
    pollCartographer,
  };
};
