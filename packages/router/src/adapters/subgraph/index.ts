import { CrosschainTransaction } from "@connext/nxtp-utils";
import { GraphQLClient } from "graphql-request";

import { getContext } from "../..";
import { getSdk, Sdk } from "../../graphqlsdk";

export type ContractReader = {
  getActiveTransactions: () => Promise<CrosschainTransaction[]>;
};

const sdks: Record<number, Sdk> = {};

export const ContractReader = () => {
  const { config } = getContext();
  Object.entries(config.chainConfig).forEach(([chainId, { subgraph }]) => {
    const client = new GraphQLClient(subgraph);
    sdks[parseInt(chainId)] = getSdk(client);
  });
};
