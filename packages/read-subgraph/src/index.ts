import { GraphQLClient } from "graphql-request";

import { getSdk } from "./adapters/runtime/graphqlsdk";

export const getRuntimeSdk = (url: string) => getSdk(new GraphQLClient(url));

export { Sdk, GetPreparedTransactionsQuery } from "./adapters/runtime/graphqlsdk";

export { SubgraphReader } from "./subgraphReader";

export { ReadSubgraphConfig } from "./lib/entities";
