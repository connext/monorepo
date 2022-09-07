import { createLoggingContext, OriginMessage } from "@connext/nxtp-utils";
import { getContext } from "../../shared";

export const updateMessages = async () => {
  const {
    adapters: { subgraph, database },
    logger,
    domains,
  } = getContext();
  const { requestContext, methodContext } = createLoggingContext(updateMessages.name);

  for (const domain of domains) {
    const offset = await database.getCheckPoint("message_" + domain);
    const limit = 100;
    logger.debug("Retrieving messages", requestContext, methodContext, {
      domain: domain,
      offset: offset,
      limit: limit,
    });

    const originMessages = await subgraph.getOriginMessagesByDomain([{ domain, offset, limit }]);
    await database.saveMessages(
      originMessages.map((origin: OriginMessage) => {
        return { leaf: origin.leaf, origin: { index: origin.index, root: origin.root, message: origin.message } };
      }),
    );

    // Reset offset at the end of the cycle.
    const newOffset = originMessages.length == 0 ? 0 : originMessages[originMessages.length - 1].index;
    await database.saveCheckPoint("message_" + domain, newOffset);

    logger.debug("Saved messages", requestContext, methodContext, { domain: domain, offset: newOffset });
  }
};
