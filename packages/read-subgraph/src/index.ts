import { GraphQLClient } from "graphql-request";

import { getSdk } from "./runtime/graphqlsdk";

export const getRuntimeSdk = (url: string) => getSdk(new GraphQLClient(url));

export { Sdk, GetPreparedTransactionsQuery } from "./runtime/graphqlsdk";
