import { canonizeId, TokenRegistryAbi } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import { createRequestContext } from "@connext/nxtp-utils";
import { utils } from "ethers";

export const enrollCustom = async (
  canonicalToken: { domain: string; tokenAddress: string },
  otherTokens: { domain: string; tokenAddress: string; TokenRegistry: string }[],
  txService: TransactionService,
) => {
  const requestContext = createRequestContext(enrollCustom.name);
  const canonicalId = utils.hexlify(canonizeId(canonicalToken.tokenAddress));
  const tokenRegistry = new utils.Interface(TokenRegistryAbi as string[]);
  await Promise.all(
    otherTokens.map(async (token) => {
      const data = tokenRegistry.encodeFunctionData("enrollCustom", [canonicalId, canonicalId, token.tokenAddress]);
      await txService.sendTx({ to: token.TokenRegistry, data, value: 0, chainId: +token.domain }, requestContext);
    }),
  );
};
