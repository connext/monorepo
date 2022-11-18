import {
  jsonifyError,
  XTransfer,
  XTransferStatus,
  RouterBalance,
  XMessage,
  RootMessage,
  Logger,
  AggregatedRoot,
  PropagatedRoot,
} from "@connext/nxtp-utils";
import { Pool } from "pg";
import { TxnClientForRepeatableRead } from "zapatos/db";

import {
  getTransfersByStatus,
  getTransfersWithOriginPending,
  getTransfersWithDestinationPending,
  saveTransfers,
  saveRouterBalances,
  saveMessages,
  saveSentRootMessages,
  saveProcessedRootMessages,
  saveCheckPoint,
  getCheckPoint,
  transaction,
  getRootMessages,
  saveAggregatedRoots,
  savePropagatedRoots,
  getUnProcessedMessages,
  getUnProcessedMessagesByIndex,
  getAggregateRoot,
  getAggregateRootCount,
  getMessageRootIndex,
  getLatestMessageRoot,
  getMessageRootFromIndex,
  getMessageRootCount,
  getSpokeNode,
  getSpokeNodes,
  getHubNode,
  getHubNodes,
  getRoot,
  putRoot,
} from "./client";

export * as db from "zapatos/db";

export type Checkpoints = {
  prefix: string;
  checkpoints: { domain: string; checkpoint: number }[];
};

export type Database = {
  saveTransfers: (xtransfers: XTransfer[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  getTransfersByStatus: (
    status: XTransferStatus,
    limit: number,
    offset?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<XTransfer[]>;
  getTransfersWithOriginPending: (
    domain: string,
    limit: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string[]>;
  getTransfersWithDestinationPending: (
    domain: string,
    limit: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string[]>;
  saveRouterBalances: (routerBalances: RouterBalance[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  saveMessages: (messages: XMessage[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  getRootMessages: (
    processed: boolean | undefined,
    limit?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<RootMessage[]>;
  saveSentRootMessages: (messages: RootMessage[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  saveProcessedRootMessages: (messages: RootMessage[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  saveCheckPoint: (check: string, point: number, _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  getCheckPoint: (check_name: string, _pool?: Pool | TxnClientForRepeatableRead) => Promise<number>;
  transaction: (callback: (client: TxnClientForRepeatableRead) => Promise<void>) => Promise<void>;
  saveAggregatedRoots: (roots: AggregatedRoot[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  savePropagatedRoots: (roots: PropagatedRoot[], _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
  getUnProcessedMessages: (
    limit?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<XMessage[]>;
  getUnProcessedMessagesByIndex: (
    origin_domain: string,
    destination_domain: string,
    index: number,
    offset: number,
    limit?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<XMessage[]>;
  getAggregateRoot: (messageRoot: string, _pool?: Pool | TxnClientForRepeatableRead) => Promise<string | undefined>;
  getAggregateRootCount: (
    aggregateRoot: string,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<number | undefined>;
  getMessageRootIndex: (
    domain: string,
    messageRoot: string,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<number | undefined>;
  getLatestMessageRoot: (domain: string, _pool?: Pool | TxnClientForRepeatableRead) => Promise<RootMessage | undefined>;
  getMessageRootFromIndex: (
    domain: string,
    index: number,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string | undefined>;
  getMessageRootCount: (
    domain: string,
    messageRoot: string,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<number | undefined>;
  getSpokeNode: (
    domain: string,
    index: number,
    count: number,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string | undefined>;
  getSpokeNodes: (
    domain: string,
    start: number,
    end: number,
    count: number,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string[]>;
  getHubNode: (index: number, count: number, _pool?: Pool | TxnClientForRepeatableRead) => Promise<string | undefined>;
  getHubNodes: (
    start: number,
    end: number,
    count: number,
    _pool?: Pool | TxnClientForRepeatableRead,
  ) => Promise<string[]>;
  getRoot: (domain: string, path: string, _pool?: Pool | TxnClientForRepeatableRead) => Promise<string | undefined>;
  putRoot: (domain: string, path: string, hash: string, _pool?: Pool | TxnClientForRepeatableRead) => Promise<void>;
};

export let pool: Pool;

export const getDatabase = async (databaseUrl: string, logger: Logger): Promise<Database> => {
  pool = new Pool({ connectionString: databaseUrl, idleTimeoutMillis: 3000, allowExitOnIdle: true });
  pool.on("error", (err: Error) => logger.error("Database error", undefined, undefined, jsonifyError(err))); // don't let a pg restart kill your app

  try {
    await pool.query("SELECT NOW()");
  } catch (e: unknown) {
    logger.error("Database connection error", undefined, undefined, jsonifyError(e as Error));
    throw new Error("Database connection error");
  }

  return {
    saveTransfers,
    getTransfersByStatus,
    getTransfersWithOriginPending,
    getTransfersWithDestinationPending,
    saveRouterBalances,
    saveMessages,
    getRootMessages,
    saveSentRootMessages,
    saveProcessedRootMessages,
    saveCheckPoint,
    getCheckPoint,
    transaction,
    saveAggregatedRoots,
    savePropagatedRoots,
    getUnProcessedMessages,
    getUnProcessedMessagesByIndex,
    getAggregateRoot,
    getAggregateRootCount,
    getMessageRootIndex,
    getLatestMessageRoot,
    getMessageRootFromIndex,
    getMessageRootCount,
    getSpokeNode,
    getSpokeNodes,
    getHubNode,
    getHubNodes,
    getRoot,
    putRoot,
  };
};

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
