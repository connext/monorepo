import { GraphQLClient } from "graphql-request";

import { getSdk as _getRuntimeSdk, Sdk as _RuntimeSdk } from "./runtime/graphqlsdk";

export const getRuntimeSdk = (url: string) => _getRuntimeSdk(new GraphQLClient(url));

export type RuntimeSdk = _RuntimeSdk;
