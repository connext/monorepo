import { GelatoRelaySDK } from "@gelatonetwork/relay-sdk";
import {
  RelayerRequest,
  RelayResponse,
  RelayRequestOptions,
  axiosGet as _axiosGet,
  axiosPost as _axiosPost,
} from "@connext/nxtp-utils";

export const gelatoRelayWithSponsoredCall = (
  request: RelayerRequest,
  sponsorApiKey: string,
  options: RelayRequestOptions = {},
): Promise<RelayResponse> => {
  return GelatoRelaySDK.relayWithSponsoredCall(request, sponsorApiKey, options);
};

export const axiosGet = _axiosGet;

export const axiosPost = _axiosPost;
