import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import { RelayerRequest, RelayResponse, RelayRequestOptions } from "@connext/nxtp-utils";

export const gelatoRelayWithSponsoredCall = (
  request: RelayerRequest,
  sponsorApiKey: string,
  options: RelayRequestOptions = {},
): Promise<RelayResponse> => {
  return GelatoRelaySDK.relayWithSponsoredCall(request, sponsorApiKey, options);
};
