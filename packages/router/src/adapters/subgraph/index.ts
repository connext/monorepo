import { GraphQLClient } from "graphql-request";
import { FallbackSubgraph, SubgraphDomain } from "@connext/nxtp-utils";

import { AppContext } from "../../context";

import { Sdk as AnalyticsSdk, getSdk as getAnalyticsSdk } from "./analytics/graphqlsdk";
import { Sdk as RuntimeSdk, getSdk as getRuntimeSdk } from "./runtime/graphqlsdk";

export type ChainSubgraphs = {
  runtime: FallbackSubgraph<RuntimeSdk>;
  analytics: FallbackSubgraph<AnalyticsSdk>;
};

export class SubgraphReader {
  private subgraphs: Map<number, ChainSubgraphs> = new Map();

  constructor(private readonly context: AppContext) {
    if (this.context.adapters.subgraph) {
      throw new Error("Instance already exists.");
    }
    for (const chain of Object.keys(context.config.chains)) {
      const chainId = parseInt(chain);
      const { maxLag, runtime: runtimeUrls, analytics: analyticsUrls } = context.config.chains[chain].subgraph;
      this.subgraphs.set(chainId, {
        runtime: new FallbackSubgraph<RuntimeSdk>(
          chainId,
          (url: string) => getRuntimeSdk(new GraphQLClient(url)),
          maxLag,
          SubgraphDomain.COMMON,
          runtimeUrls,
        ),
        analytics: new FallbackSubgraph<AnalyticsSdk>(
          chainId,
          (url: string) => getAnalyticsSdk(new GraphQLClient(url)),
          maxLag,
          SubgraphDomain.ANALYTICS,
          analyticsUrls,
        ),
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getLiquidity(chain: number, address: string) {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async isRouterApproved(chain: number, address: string) {
    throw new Error("Not implemented");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async isAssetApproved(chain: number, address: string) {
    throw new Error("Not implemented");
  }

  // TODO: PrepareEntity type.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async getOpenPrepares(chain: number, destinations: number[]): Promise<any> {
    throw new Error("Not implemented");
    // Query and return all prepares in the past 30 mins for this chain, assuming the destination chain
    // is included in the respective array argument, `destinations`.
  }
}
