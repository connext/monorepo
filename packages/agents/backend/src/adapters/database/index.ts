import pg from "pg";

import { getContext } from "../../backend";

export let pool: pg.Pool;

export const getDatabase = async () => {
  const { config } = getContext();
  pool = new pg.Pool({ connectionString: config.databaseUrl });
  pool.on("error", (err) => console.error(err)); // don't let a pg restart kill your app
};
