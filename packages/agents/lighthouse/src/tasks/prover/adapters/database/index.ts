import { jsonifyError, RootMessage, XMessage } from "@connext/nxtp-utils";
import { Pool } from "pg";

import { getContext } from "../../prover";

import {
  getUnProcessedRootMessages,
  getUnProcessedMessages,
  getAggregateRoot,
  getAggregateRootCount,
  getMessageRootIndex,
  getMessageRootFromIndex,
  getMessageRootCount,
} from "./database";

export { conditions as dc } from "zapatos/db";
export * as db from "zapatos/db";
// TODO: Resolve
// export type * as s from "../../../../../../../adapters/database/src/zapatos/schema";

export type DbClient = {
  getUnProcessedRootMessages: () => Promise<RootMessage[]>;
  getUnProcessedMessages: () => Promise<XMessage[]>;
  getAggregateRoot: (messageRootIndex: number) => Promise<string | undefined>;
  getAggregateRootCount: (aggregateRoot: string) => Promise<number | undefined>;
  getMessageRootIndex: (domain: string, messageRoot: string) => Promise<number | undefined>;
  getMessageRootFromIndex: (domain: string, index: number) => Promise<string | undefined>;
  getMessageRootCount: (domain: string, messageRoot: string) => Promise<number | undefined>;
};

export let pool: Pool;

export const setupDbClient = async (): Promise<DbClient> => {
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
    getUnProcessedRootMessages,
    getUnProcessedMessages,
    getAggregateRoot,
    getAggregateRootCount,
    getMessageRootIndex,
    getMessageRootFromIndex,
    getMessageRootCount,
  };
};

export const closeDatabase = async (): Promise<void> => {
  await pool.end();
};
