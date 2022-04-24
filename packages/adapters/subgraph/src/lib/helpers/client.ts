import { getBuiltGraphClient } from "./shared";

/**
 * Executes queries with `variables`
 * @param document - The graphQL document you're going to execute
 * @param variables - The variables you're going to put
 * @returns The response from subgraph
 */
export const execute = async (document: any, variables = {}): Promise<any> => {
  const { execute } = await getBuiltGraphClient();
  const response = await execute(document, variables);
  return response;
};
