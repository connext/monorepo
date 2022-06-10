import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";

export const enrollCustom = async (
  canonicalToken: { domain: string; tokenAddress: string },
  otherTokens: { domain: string; tokenAddress: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(enrollCustom.name);
  for (const token of otherTokens) {
  }
};
