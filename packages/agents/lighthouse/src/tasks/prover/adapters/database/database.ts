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
  const root: PropagatedRoot = convertFromDbPropagatedRoot(
    await db
      .selectOne(
        "propagated_roots",
        { leaf_count: dc.gte(outboundRootIndex) },
        { limit: 1, order: { by: "leaf_count", direction: "ASC" } },
      )
      .run(pool),
  );
  return root?.aggregate;
};

export const getAggregateRootCount = async (aggreateRoot: string): Promise<number | undefined> => {
  // Get the leaf count at the aggregated root
  const root: PropagatedRoot = convertFromDbPropagatedRoot(
    await db.selectOne("propagated_roots", { aggregate_root: aggreateRoot }).run(pool),
  );
  return root?.count;
};

export const getOutboutRootIndex = async (domain: string, outboundRoot: string): Promise<number | undefined> => {
  // Find the index emitted from the RootAggregated event
  const root: AggregatedRoot = convertFromDbAggregatedRoot(
    await db.selectOne("aggregated_roots", { domain: domain, received_root: outboundRoot }).run(pool),
  );
  return root?.index;
};

export const getOutboundRootFromIndex = async (domain: string, index: number): Promise<string | undefined> => {
  // Find the first published outbound root that contains the index, for a given domain
  const root: RootMessage = convertFromDbRootMessage(
    await db
      .selectOne(
        "root_messages",
        { leaf_count: dc.gte(index) },
        { limit: 1, order: { by: "leaf_count", direction: "ASC" } },
      )
      .run(pool),
  );
  return root?.root;
};

export const getOutboutRootCount = async (domain: string, outboundRoot: string): Promise<number | undefined> => {
  // Find the index of the last message in the published outboundRoot.
  // This will be the count at the time outboundRoot was sent
  const message: XMessage = convertFromDbMessage(await db.selectOne("messages", { root: outboundRoot }).run(pool));
  return message?.origin?.index;
};
