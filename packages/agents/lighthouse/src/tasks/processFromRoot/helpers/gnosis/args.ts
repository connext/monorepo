import { GetProcessArgsParams } from "..";

export const getProcessFromGnosisRootArgs = async ({
  spokeChainId,
  hubChainId,
  spokeProvider,
  hubProvider,
  sendHash,
  _requestContext,
}: GetProcessArgsParams): Promise<[string, string]> => {
  throw new Error(`Not implemented yet`);
};
