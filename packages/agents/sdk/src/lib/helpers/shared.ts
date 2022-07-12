import {
  ajv,
  TUrl,
  jsonifyError,
  getChainData as _getChainData,
  getChainIdFromDomain as _getChainIdFromDomain,
  ChainData,
} from "@connext/nxtp-utils";
import axios from "axios";

import { UriInvalid, ApiRequestFailed } from "../errors/index";

export const getChainData = _getChainData;
export const getChainIdFromDomain = _getChainIdFromDomain;

export const validateUri = (uri: string): void => {
  const validateInput = ajv.compile(TUrl);
  const validInput = validateInput(uri);
  if (!validInput) {
    const msg = validateInput.errors?.map((err: any) => `${err.instancePath} - ${err.message}`).join(",");
    throw new UriInvalid({
      paramsError: msg,
      uri,
    });
  }
};

export const axiosGetRequest = async (uri: string): Promise<any> => {
  try {
    const response = await axios.get(uri);
    return response.data;
  } catch (err: any) {
    throw new ApiRequestFailed({ error: jsonifyError(err as Error) });
  }
};

export const getExecuteGasAmountForDomain = async (
  domain: string,
  _chainData?: Map<string, ChainData>,
): Promise<string> => {
  const chainData = _chainData ?? (await getChainData());

  if (chainData.has(domain)) {
    const gasEstimates = chainData.get(domain)!.gasEstimates;

    if (gasEstimates.execute) {
      return gasEstimates.execute;
    } else {
      throw new Error(`GasEstiamte doesn't have a record of execute, for domain: ${domain}`);
    }
  } else {
    throw new Error(`ChainData doesn't have a record for domain: ${domain}`);
  }
};
