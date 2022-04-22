import { getBuiltGraphClient, getMeshOptions } from "../../../.graphclient";

export const execute = async (document: any, variables = {}): Promise<any> => {
  const { execute } = await getBuiltGraphClient();
  const response = await execute(document, variables);
  return response;
};

export const getSubgraphNames = async (): Promise<string[]> => {
  const { sources } = await getMeshOptions();
  const names = sources.map((source) => source.name);
  return names;
};
