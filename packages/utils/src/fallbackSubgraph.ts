import { GraphQLClient } from "graphql-request";
import { Variables, RequestDocument } from "graphql-request/dist/types";
import { Headers } from "graphql-request/dist/types.dom";
// eslint-disable-next-line import/no-named-as-default
import gql from "graphql-tag";

import { Logger } from "./logger";
import { MethodContext, RequestContext } from "./request";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

export type GetBlockNumberQueryVariables = Exact<{ [key: string]: never }>;
export type GetBlockNumberQuery = {
  __typename?: "Query";
  _meta?: Maybe<{ __typename?: "_Meta_"; block: { __typename?: "_Block_"; number: number } }>;
};
export const GetBlockNumberDocument = gql`
  query GetBlockNumber {
    _meta {
      block {
        number
      }
    }
  }
`;

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
        return subgraph.client.request(document, variables, requestHeaders);
      } catch (e) {
        continue;
      }
    }
    throw new Error("No subgraphs available");
  }

  public async sync(realBlockNumber: number, requestContext: RequestContext, methodContext: MethodContext) {
    this.logger.debug("Getting sync records.", requestContext, methodContext, {
      chainId: this.chainId,
      uris: this.uris,
    });
    for (let i = 0; i < this.subgraphs.length; i++) {
      const { _meta } = await this.subgraphs[i].client.request<GetBlockNumberQuery>(GetBlockNumberDocument);
      const subgraphBlockNumber = _meta?.block.number ?? 0;
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
      this.logger.warn(
        `${allOutOfSync ? "ALL subgraphs" : "Subgraph(s)"} out of sync.`,
        requestContext,
        methodContext,
        {
          chainId: this.chainId,
          outOfSyncRecords: outOfSyncRecords.map((subgraph) => ({
            uri: subgraph.uri,
            latestBlock: subgraph.latestBlock,
            syncedBlock: subgraph.syncedBlock,
          })),
        },
      );
    }
  }
}
