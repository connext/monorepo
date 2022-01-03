import { newAuction } from "./auction";
import { fulfill } from "./fulfill";
import { prepare } from "./prepare";
import { cancel } from "./cancel";
import { getStatus } from "./status";
import { sendMetaTx } from "./metaTx";

export const getOperations = () => {
  return {
    newAuction,
    fulfill,
    prepare,
    cancel,
    getStatus,
    sendMetaTx,
  };
};
