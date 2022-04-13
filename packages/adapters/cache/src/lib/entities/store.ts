import { Redis } from "ioredis";
import { Logger } from "@connext/nxtp-utils";

export type StoreManagerParams = {
  redis: { host: string | undefined; port: number | undefined; instance?: Redis };
  logger: Logger;
  mock?: boolean;
};

export enum TxStatus {
  Completed = "Completed",
  Pending = "Pending",
}
