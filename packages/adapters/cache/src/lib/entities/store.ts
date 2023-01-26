import { Redis } from "ioredis";
import { Logger } from "@connext/utils";

export type StoreManagerParams = {
  redis: { host: string | undefined; port: number | undefined; instance?: Redis };
  logger: Logger;
  mock?: boolean;
};

export enum TxStatus {
  Completed = "Completed",
  Pending = "Pending",
}
