/* eslint-disable */
import { getMeshOptions, getBuiltGraphClient } from "../../../.graphclient";

/**
 * Gets the subgraph names from .graphclientrc.yml
 */
export const getSubgraphNames = async (): Promise<string[]> => {
  const meshOptions = await getMeshOptions();
  const names = meshOptions.sources.map((source: { name: string }) => source.name);
  return names;
};

export const executeXQuery = async (document: any, variables: any): Promise<any> => {
  const { execute } = await getBuiltGraphClient();
  const response = await execute(document, variables);
  return response;
};
