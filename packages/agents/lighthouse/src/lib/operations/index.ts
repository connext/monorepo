import { execute } from "./execute";
import { sendExecuteFastToSequencer } from "./relayer";
import { pollCartographer } from "./cartographer";

export const getOperations = () => {
  return {
    execute,
    sendExecuteFastToSequencer,
    pollCartographer,
  };
};
