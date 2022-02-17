import { GraphQLClient } from "graphql-request";

export { SubgraphReader } from "./reader";

import { getSdk } from "./runtime/graphqlsdk";

export const getRuntimeSdk = (url: string) => getSdk(new GraphQLClient(url));
