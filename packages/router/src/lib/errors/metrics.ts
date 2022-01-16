import { NxtpError } from "@connext/nxtp-utils";

export class FailedToGetExpressiveAssetBalances extends NxtpError {
  static getMessage(chainIds: number[]): string {
    return `Failed to get expressive asset balances for chains: ${chainIds.join()}`;
  }
  constructor(chainIds: number[], context: any = {}) {
    super(
      FailedToGetExpressiveAssetBalances.getMessage(chainIds),
      { chainIds, ...context },
      FailedToGetExpressiveAssetBalances.name,
    );
  }
}
