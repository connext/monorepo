import { fulfill } from "./fulfill";
import { sendBid } from "./sequencer";

export const getOperations = () => {
  return {
    fulfill,
    sendBid,
  };
};
