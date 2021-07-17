import { fetch } from "cross-fetch";
import { createClient, QueryFetcher } from "gqless";

import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

const queryFetcher: QueryFetcher = async function (query, variables) {
  // Modify "https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli" if needed
  const response = await fetch("https://api.thegraph.com/subgraphs/name/connext/nxtp-goerli", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: "cors",
  });

  const json = await response.json();

  return json;
};

export const client = createClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

export const { query, mutation, mutate, subscription, resolved, refetch } = client;

export * from "./schema.generated";
