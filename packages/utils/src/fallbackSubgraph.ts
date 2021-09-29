import { GraphQLClient } from "graphql-request";
import { Variables, RequestDocument } from "graphql-request/dist/types";
import { Headers } from "graphql-request/dist/types.dom";

import { Logger } from "./logger";
import { createLoggingContext } from "./request";

export type SubgraphSyncRecord = {
  client: GraphQLClient;
  uri: string;
  synced: boolean;
  latestBlock: number;
  syncedBlock: number;
};

export class FallbackSubgraph {
  private readonly subgraphs: SubgraphSyncRecord[];

  constructor(
    private readonly logger: Logger,
    private readonly chainId: number,
    private readonly uris: string[],
    private readonly allowUnsynced: number = 1,
  ) {
    this.subgraphs = this.uris.map((uri) => ({
      client: new GraphQLClient(uri),
      uri,
      synced: false,
      latestBlock: 0,
      syncedBlock: 0,
    }));
  }

  public request<T = any, V = Variables>(
    document: RequestDocument,
    variables?: V,
    requestHeaders?: Headers | string[][] | Record<string, string>,
  ): Promise<T> {
    for (const subgraph of this.subgraphs) {
      try {
        if (subgraph.synced) {
          return subgraph.client.request(document, variables, requestHeaders);
        }
      } catch (e) {
        continue;
      }
    }
    throw new Error("No subgraphs available / in-sync!");
  }

  public async sync(realBlockNumber: number, getBlockNumberCallback: (client: GraphQLClient) => Promise<number>) {
    const { methodContext } = createLoggingContext(this.sync.name);
    this.logger.debug("Getting sync records.", undefined, methodContext, {
      chainId: this.chainId,
      uris: this.uris,
    });
    for (let i = 0; i < this.subgraphs.length; i++) {
      const subgraphBlockNumber = await getBlockNumberCallback(this.subgraphs[i].client);
      if (realBlockNumber - subgraphBlockNumber > this.allowUnsynced) {
        this.subgraphs[i].synced = false;
      } else {
        this.subgraphs[i].synced = true;
      }
      this.subgraphs[i].latestBlock = realBlockNumber;
      this.subgraphs[i].syncedBlock = subgraphBlockNumber;
    }
    const outOfSyncRecords = this.subgraphs.filter((subgraph) => !subgraph.synced);
    if (outOfSyncRecords.length > 0) {
      const allOutOfSync = outOfSyncRecords.length === this.subgraphs.length;
      this.logger.warn(`${allOutOfSync ? "ALL subgraphs" : "Subgraph(s)"} out of sync.`, undefined, methodContext, {
        chainId: this.chainId,
        outOfSyncRecords: outOfSyncRecords.map((subgraph) => ({
          uri: subgraph.uri,
          latestBlock: subgraph.latestBlock,
          syncedBlock: subgraph.syncedBlock,
        })),
      });
    }
  }
}
