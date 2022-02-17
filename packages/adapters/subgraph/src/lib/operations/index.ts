import { create } from "./create";
import { GraphQLClient } from "graphql-request";
// import { redisUpdate } from "./redisUpdate";

import { getSdk } from "../../runtime/graphqlsdk";

export const getRuntimeSdk = (url: string) => getSdk(new GraphQLClient(url));

export const getOperations = () => {
  return {
    create,
    // redisUpdate
  };
};
