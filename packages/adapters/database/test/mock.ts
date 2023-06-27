import { mkAddress, mkHash, mock } from "@connext/nxtp-utils";
import { Pool } from "pg";
import { stub } from "sinon";

import { Database } from "../src/index";

export const mockDatabasePool = (): Pool => {
  let pool: Pool = undefined as any;
  return pool;
};

export const mockDatabase = (): Database => {
  return {
    getCheckPoint: stub().resolves(42),
    getRootMessages: stub().resolves([mock.entity.rootMessage()]),
    getTransfersByStatus: stub().resolves([mock.entity.xtransfer()]),
    getTransfersWithDestinationPending: stub().resolves([mock.entity.xtransfer()]),
    getTransfersWithOriginPending: stub().resolves([mock.entity.xtransfer()]),
    getPendingTransfersByDomains: stub().resolves([mock.entity.xtransfer()]),
    getCompletedTransfersByMessageHashes: stub().resolves([mock.entity.xtransfer()]),
    saveCheckPoint: stub().resolves(),
    saveMessages: stub().resolves(),
    saveProcessedRootMessages: stub().resolves(),
    saveRouterBalances: stub().resolves(),
    saveSentRootMessages: stub().resolves(),
    saveTransfers: stub().resolves(),
    deleteNonExistTransfers: stub().resolves([]),
    transaction: stub().yields(null),
    getUnProcessedMessages: stub().resolves([]),
    getUnProcessedMessagesByIndex: stub().resolves([]),
    getUnProcessedMessagesByDomains: stub().resolves([]),
    getAggregateRoot: stub().resolves(),
    getAggregateRootCount: stub().resolves(),
    getMessageRootIndex: stub().resolves(),
    getMessageRootAggregatedFromIndex: stub().resolves(),
    getMessageRootCount: stub().resolves(),
    getLatestMessageRoot: stub().resolves(),
    getLatestAggregateRoots: stub().resolves(),
    getMessageRootStatusFromIndex: stub().resolves(),
    getSpokeNode: stub().resolves(),
    getSpokeNodes: stub().resolves([]),
    getHubNode: stub().resolves(),
    getHubNodes: stub().resolves([]),
    getRoot: stub().resolves(),
    putRoot: stub().resolves(),
    saveAggregatedRoots: stub().resolves(),
    savePropagatedRoots: stub().resolves(),
    saveReceivedAggregateRoot: stub().resolves(),
    increaseBackoff: stub().resolves(),
    saveStableSwapPool: stub().resolves(),
    saveStableSwapExchange: stub().resolves(),
    saveStableSwapTransfers: stub().resolves(),
    saveStableSwapLpBalances: stub().resolves(),
    resetBackoffs: stub().resolves(),
    saveStableSwapPoolEvent: stub().resolves(),
    updateErrorStatus: stub().resolves(),
    markRootMessagesProcessed: stub().resolves(),
    updateSlippage: stub().resolves(),
    saveRouterDailyTVL: stub().resolves(),
    updateExecuteSimulationData: stub().resolves(),
    getPendingTransfersByMessageStatus: stub().resolves([mock.entity.xtransfer()]),
    getMessageRootsFromIndex: stub().resolves(),
    getAggregateRootByRootAndDomain: stub().resolves(),
    getMessageByLeaf: stub().resolves(),
    saveAssets: stub().resolves(),
    saveAssetPrice: stub().resolves(),
    getAssets: stub().resolves([
      mock.entity.asset({
        canonicalDomain: "1337",
        domain: "1337",
        canonicalId: mkHash("0xa"),
        adoptedAsset: mkAddress("0xb"),
      }),
    ]),
    deleteCache: stub().resolves(),
  };
};
