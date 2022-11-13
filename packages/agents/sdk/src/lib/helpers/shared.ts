import { getContractInterfaces } from "@connext/nxtp-txservice";
import {
  ajv,
  TUrl,
  jsonifyError,
  getChainData as _getChainData,
  getChainIdFromDomain as _getChainIdFromDomain,
  getConversionRate as _getConversionRate,
  getDecimalsForAsset as _getDecimalsForAsset,
  getGelatoEstimatedFee as _getGelatoEstimatedFee,
  getHardcodedGasLimits as _getHardcodedGasLimits,
  axiosGet,
} from "@connext/nxtp-utils";
import { providers } from "ethers";

import { UriInvalid, ApiRequestFailed, ParseConnextLogFailed } from "../errors/index";

export const relayerBufferPercentage = 20; // 20% bump on total estimated relayer fee

export const getChainData = _getChainData;
export const getChainIdFromDomain = _getChainIdFromDomain;
export const getConversionRate = _getConversionRate;
export const getGelatoEstimatedFee = _getGelatoEstimatedFee;
export const getHardcodedGasLimits = _getHardcodedGasLimits;
export const getDecimalsForAsset = _getDecimalsForAsset;

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
    const response = await axiosGet(uri);
    return response.data;
  } catch (err: any) {
    throw new ApiRequestFailed({ error: jsonifyError(err as Error) });
  }
};

export const parseConnextLog = (log: providers.Log): any => {
  const contracts = getContractInterfaces();
  try {
    return contracts.connext.parseLog(log);
  } catch (error: any) {
    throw new ParseConnextLogFailed({ log });
  }
};
