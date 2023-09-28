import { NxtpError } from "../types/error";

export class GelatoEstimatedFeeRequestError extends NxtpError {
  constructor(chainId: number, public readonly context: any = {}) {
    super(`Error with API request for Gelato fee estimate`, {
      ...context,
      chainId,
    });
  }
}

export class GelatoConversionRateRequestError extends NxtpError {
  constructor(chainId: number, public readonly context: any = {}) {
    super(`Error with API request for Gelato conversion rate`, {
      ...context,
      chainId,
    });
  }
}
