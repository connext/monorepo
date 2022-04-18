import type { Knex } from "knex";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "connext",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
