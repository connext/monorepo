import { NxtpError } from "@connext/nxtp-utils";

export class NoMainnetEquivalent extends NxtpError {
  constructor(public assetId: string, chainId: string, context: any) {
    super(`No mainnet equivalent for asset ${assetId} on chain ${chainId}`, context, "NoMainnetEquivalent");
  }
}
