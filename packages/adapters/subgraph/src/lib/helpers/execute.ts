import { getBuiltGraphClient } from "../../../.graphclient";

export const execute = async (document: any, variables = {}): Promise<any> => {
  const { execute } = await getBuiltGraphClient();
  const response = await execute(document, variables);
  return response;
};
