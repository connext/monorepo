import { fetch } from "cross-fetch";
import { createClient, QueryFetcher } from "gqless";

import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from "./schema.generated";

const getQueryFetcher: (uri: string) => QueryFetcher = (uri: string) =>
  async function (query, variables) {
    const response = await fetch(uri, {
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

export const createClientForURI = (uri: string) =>
  createClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
    schema: generatedSchema,
    scalarsEnumsHash,
    queryFetcher: getQueryFetcher(uri),
  });

export * from "./schema.generated";
