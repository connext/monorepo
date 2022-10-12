import { mock } from "@connext/nxtp-utils";
import { stub } from "sinon";

import { Database } from "../src/index";

export const mockDatabase = (): Database => {
  return {
    getCheckPoint: stub().resolves(42),
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
    getUnProcessedMessages: stub().resolves([]),
    getAggregateRoot: stub().resolves(),
    getAggregateRootCount: stub().resolves(),
    getMessageRootIndex: stub().resolves(),
    getMessageRootFromIndex: stub().resolves(),
    getMessageRootCount: stub().resolves(),
    getSpokeNode: stub().resolves(),
    getSpokeNodes: stub().resolves([]),
    getHubNode: stub().resolves(),
    getHubNodes: stub().resolves([]),
    getRoot: stub().resolves(),
    putRoot: stub().resolves(),
    saveAggregatedRoots: stub().resolves(),
    savePropagatedRoots: stub().resolves(),
  };
};
