import { convertFromDbRootMessage, RootMessage } from "@connext/nxtp-utils";

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
