import { getHelpers } from ".";
import { getBuiltGraphClient } from "./shared";

/**
 * Executes queries with `variables`
 * @param document - The graphQL document you're going to execute
 * @param variables - The variables you're going to put
 * @returns The response from subgraph
 */
export const execute = async (document: any, variables = {}): Promise<Map<string, any[]>> => {
  const { execute } = await getBuiltGraphClient();
  const { parser } = getHelpers();
  const response = await execute(document, variables);
  return parser.xquery(response);
};
