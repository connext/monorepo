import {
  convertFromDbRootMessage,
  RootMessage,
  convertFromDbMessage,
  XMessage,
  PropagatedRoot,
  convertFromDbAggregatedRoot,
  convertFromDbPropagatedRoot,
  AggregatedRoot,
} from "@connext/nxtp-utils";

import { dc, db, pool } from "./index";

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

export const getAggregateRoot = async (outboundRootIndex: number): Promise<string | undefined> => {
  // Get the most recent unprocessed propagated root
  const dbRoot: PropagatedRoot = convertFromDbPropagatedRoot(
    await db
      .selectOne(
        "propagated_roots",
        { leaf_count: dc.gte(outboundRootIndex) },
        { limit: 1, order: { by: "leaf_count", direction: "ASC" } },
      )
      .run(pool),
  );
  return dbRoot?.aggregate;
};

export const getOutboutRootIndex = async (outboundRoot: string): Promise<number | undefined> => {
  // Find the index emitted from the RootAggregated event
  const dbRoot: AggregatedRoot = convertFromDbAggregatedRoot(
    await db.selectOne("aggregated_roots", { received_root: outboundRoot }).run(pool),
  );
  return dbRoot?.index;
};

export const getRootFromIndex = async (domain: string, index: number): Promise<string | undefined> => {
  // Find the first published outbound root that contains the index, for a given domain
  // const dbRoot = await db.selectOne("aggregated_roots", { received_root: outboundRoot }).run(pool);
  return;
};
