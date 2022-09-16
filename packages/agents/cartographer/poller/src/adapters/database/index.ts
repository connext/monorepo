import { jsonifyError, XTransfer, XTransferStatus, RouterBalance, XMessage, RootMessage } from "@connext/nxtp-utils";
import { Pool } from "pg";

import { getContext } from "../../shared";

import {
  getTransfersByStatus,
  getTransfersWithOriginPending,
  getTransfersWithDestinationPending,
  saveTransfers,
  saveRouterBalances,
  saveMessages,
  saveSentRootMessages,
  saveProcessedRootMessages,
  getPendingMessages,
  saveCheckPoint,
  getCheckPoint,
} from "./client";

export type Database = {
  saveTransfers: (xtransfers: XTransfer[], _pool?: Pool) => Promise<void>;
  getTransfersByStatus: (
    status: XTransferStatus,
    limit: number,
    offset?: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool,
  ) => Promise<XTransfer[]>;
  getTransfersWithOriginPending: (
    domain: string,
    limit: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool,
  ) => Promise<string[]>;
  getTransfersWithDestinationPending: (
    domain: string,
    limit: number,
    orderDirection?: "ASC" | "DESC",
    _pool?: Pool,
  ) => Promise<string[]>;
  saveRouterBalances: (routerBalances: RouterBalance[], _pool?: Pool) => Promise<void>;
  saveMessages: (messages: XMessage[], _pool?: Pool) => Promise<void>;
  saveSentRootMessages: (messages: RootMessage[], _pool?: Pool) => Promise<void>;
  saveProcessedRootMessages: (messages: RootMessage[], _pool?: Pool) => Promise<void>;
  getPendingMessages: (_pool?: Pool) => Promise<XMessage[]>;
  saveCheckPoint: (check: string, point: number, _pool?: Pool) => Promise<void>;
  getCheckPoint: (check_name: string, _pool?: Pool) => Promise<number>;
};

export let pool: Pool;

export const getDatabase = async (): Promise<Database> => {
  const { config, logger } = getContext();
  pool = new Pool({ connectionString: config.database.url, idleTimeoutMillis: 3000, allowExitOnIdle: true });
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
    saveSentRootMessages,
    saveProcessedRootMessages,
    getPendingMessages,
    saveCheckPoint,
    getCheckPoint,
  };
};

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
