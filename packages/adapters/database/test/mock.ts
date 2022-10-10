import { mock } from "@connext/nxtp-utils";
import { stub } from "sinon";

import { Database } from "../src/index";

export const mockDatabase = (): Database => {
  return {
    getCheckPoint: stub().resolves(42),
    getPendingMessages: stub().resolves([mock.entity.xMessage()]),
    getRootMessages: stub().resolves([mock.entity.rootMessage()]),
    getTransfersByStatus: stub().resolves([mock.entity.xtransfer()]),
    getTransfersWithDestinationPending: stub().resolves([mock.entity.xtransfer()]),
    getTransfersWithOriginPending: stub().resolves([mock.entity.xtransfer()]),
    saveCheckPoint: stub().resolves(),
    saveMessages: stub().resolves(),
    saveProcessedRootMessages: stub().resolves(),
    saveRouterBalances: stub().resolves(),
    saveSentRootMessages: stub().resolves(),
    saveTransfers: stub().resolves(),
    transaction: stub().yields(null),
  };
};
