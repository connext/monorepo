import { jsonifyError, XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { Pool } from "pg";

import { getContext } from "../../backend";

import { getLatestNonce, getTransferByTransferId, getTransfersByStatus, saveTransfers } from "./client";

export type Database = {
  getTransferByTransferId: (transferId: string, _pool?: Pool) => Promise<XTransfer | undefined>;
  saveTransfers: (xtransfers: XTransfer[], _pool?: Pool) => Promise<void>;
  getLatestNonce: (domain: string, _pool?: Pool) => Promise<number>;
  getTransfersByStatus: (status: XTransferStatus | "XCalled", _pool?: Pool) => Promise<XTransfer[]>;
};

export let pool: Pool;

export const getDatabase = async (): Promise<Database> => {
  const { config, logger } = getContext();
  pool = new Pool({ connectionString: config.databaseUrl });
  pool.on("error", (err: Error) => logger.error("Database error", undefined, undefined, jsonifyError(err))); // don't let a pg restart kill your app

  try {
    await pool.query("SELECT NOW()");
  } catch (e: unknown) {
    logger.error("Database connection error", undefined, undefined, jsonifyError(e as Error));
    throw new Error("Database connection error");
  }

  return { getLatestNonce, getTransferByTransferId, saveTransfers, getTransfersByStatus };
};
