import { Knex, knex } from "knex";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const dbConfig: Knex.Config = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
};

const knexInstance = knex(dbConfig);
