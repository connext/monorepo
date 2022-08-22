import { execute } from "./execute";
import { sendExecuteSlowToSequencer } from "./sequencer";
import { pollCartographer } from "./cartographer";

export const getOperations = () => {
  return {
    execute,
    sendExecuteSlowToSequencer,
    pollCartographer,
  };
};
