import { RuntimeError } from "../errors";

import { executeXQuery } from "./graphclient";

import { getHelpers } from ".";

/**
 * Executes queries with `variables`
 * @param document - The graphQL document you're going to execute
 * @param variables - The variables you're going to put
 * @returns The response from subgraph
 */
export const execute = async (document: any, variables = {}): Promise<Map<string, any[]>> => {
  try {
    const { parser } = getHelpers();
    const response = await executeXQuery(document, variables);
    return parser.xquery(response);
  } catch (e: any) {
    throw new RuntimeError({ document, variables, e });
  }
};
