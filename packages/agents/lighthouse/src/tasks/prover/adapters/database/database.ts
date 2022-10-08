import { convertFromDbRootMessage, RootMessage, convertFromDbMessage, XMessage } from "@connext/nxtp-utils";

import { db, pool } from "./index";

export const getUnProcessedRootMessages = async (
  limit = 100,
  orderDirection: "ASC" | "DESC" = "ASC",
): Promise<RootMessage[]> => {
  const messages = await db
    .select("root_messages", { processed: false }, { limit, order: { by: "block_number", direction: orderDirection } })
    .run(pool);
  return messages.map(convertFromDbRootMessage);
};

export const getUnProcessedMessages = async (
  limit = 100,
  orderDirection: "ASC" | "DESC" = "ASC",
): Promise<XMessage[]> => {
  const messages = await db
    .select("messages", { processed: false }, { limit, order: { by: "index", direction: orderDirection } })
    .run(pool);
  return messages.map(convertFromDbMessage);
};

export const getCurrentAggregateRoot = async (): Promise<string> => {
  const root = "0x0000000000000000000000000000000000000000000000000000000000000000";
  return root;
};

export const getOutboutRootIndex = async (outboundRoot: string): Promise<number> => {
  // TODO: Find the index emitted from the RootAggregated event
  const index = outboundRoot.length;
  return index;
};
