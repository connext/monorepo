import { NxtpError } from "@connext/nxtp-utils";

export class NoMainnetEquivalent extends NxtpError {
  constructor(public assetId: string, chainId: number, context: any) {
    super(`No mainnet equivalent for asset ${assetId} on chain ${chainId}`, context, "NoMainnetEquivalent");
  }
}

export class NoChainDataAvailable extends NxtpError {
  constructor(public chainId: number, context: any) {
    super(`No chain data available for chain ${chainId}`, context, "NoChainDataAvailable");
  }
}
