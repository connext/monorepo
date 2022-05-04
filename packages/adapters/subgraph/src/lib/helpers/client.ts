/* eslint-disable */
import { getBuiltGraphClient } from "./shared";

import { getHelpers } from ".";

/**
 * Executes queries with `variables`
 * @param document - The graphQL document you're going to execute
 * @param variables - The variables you're going to put
 * @returns The response from subgraph
 */
export const execute = async (document: any, variables = {}): Promise<Map<string, any[]>> => {
  try {
    const { execute } = await getBuiltGraphClient();
    const { parser } = getHelpers();
    const response = await execute(document, variables);
    return parser.xquery(response);
  } catch (e: any) {
    throw new Error(`Running a query failed, err: ${e}`);
  }
};
