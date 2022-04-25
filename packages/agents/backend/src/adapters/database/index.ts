import { XTransfer, XTransferStatus } from "@connext/nxtp-utils";
import { Pool } from "pg";

import { getContext } from "../../backend";

import { getLatestNonce, getTransferByTransferId, getTransfersByStatus, saveTransfers } from "./client";

export type Database = {
  getTransferByTransferId: (transferId: string, _pool?: Pool) => Promise<XTransfer | undefined>;
  saveTransfers: (xtransfers: XTransfer[], _pool?: Pool) => Promise<void>;
  getLatestNonce: (domain: string, _pool?: Pool) => Promise<number>;
  getTransfersByStatus: (status: XTransferStatus, _pool?: Pool) => Promise<XTransfer[]>;
};

export let pool: Pool;

export const getDatabase = async (): Promise<Database> => {
  const { config } = getContext();
  pool = new Pool({ connectionString: config.databaseUrl });
  pool.on("error", (err) => console.error(err)); // don't let a pg restart kill your app

  return { getLatestNonce, getTransferByTransferId, saveTransfers, getTransfersByStatus };
};
