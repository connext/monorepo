/* eslint-disable */
import { getBuiltGraphClient } from "./shared";

import { getHelpers } from ".";
import { RuntimeError } from "../errors";

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

    // TODO: Document needs to be validated before it gets executed.
    const response = await execute(document, variables);
    return parser.xquery(response);
  } catch (e: any) {
    throw new RuntimeError({ document, variables, e });
  }
};
