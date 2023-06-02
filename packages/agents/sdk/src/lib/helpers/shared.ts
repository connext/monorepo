import { getContractInterfaces } from "@connext/nxtp-txservice";
import {
  ajv,
  TUrl,
  jsonifyError,
  getChainData as _getChainData,
  domainToChainId as _domainToChainId,
  getConversionRate as _getConversionRate,
  getDecimalsForAsset as _getDecimalsForAsset,
  getGelatoEstimatedFee as _getGelatoEstimatedFee,
  getHardcodedGasLimits as _getHardcodedGasLimits,
  calculateRelayerFee as _calculateRelayerFee,
  axiosGet,
  XTransferStatus,
} from "@connext/nxtp-utils";
import { providers } from "ethers";

import { UriInvalid, ApiRequestFailed, ParseConnextLogFailed } from "../errors/index";

export const relayerBufferPercentage = 20; // 20% bump on total estimated relayer fee

export const getChainData = _getChainData;
export const domainToChainId = _domainToChainId;
export const getConversionRate = _getConversionRate;
export const getGelatoEstimatedFee = _getGelatoEstimatedFee;
export const getHardcodedGasLimits = _getHardcodedGasLimits;
export const getDecimalsForAsset = _getDecimalsForAsset;
export const calculateRelayerFee = _calculateRelayerFee;

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

export type Transfer = {
  transfer_id: string;
  nonce: number;
  to: string;
  call_data: string;
  origin_domain: string;
  destination_domain: string;
  receive_local: boolean;
  origin_chain: string;
  origin_transacting_asset: string;
  origin_transacting_amount: string;
  origin_bridged_asset: string;
  origin_bridged_amount: string;
  xcall_caller: string;
  xcall_transaction_hash: string;
  xcall_timestamp: string;
  xcall_gas_price: string;
  xcall_gas_limit: string;
  xcall_block_number: string;
  destination_chain: string;
  status: XTransferStatus;
  routers: string[];
  destination_transacting_asset: string;
  destination_transacting_amount: string;
  destination_local_asset: string;
  destination_local_amount: string;
  execute_caller: string;
  execute_transaction_hash: string;
  execute_timestamp: number;
  execute_gas_price: string;
  execute_gas_limit: string;
  execute_block_number: number;
  execute_origin_sender: string;
  reconcile_caller: string;
  reconcile_transaction_hash: string;
  reconcile_timestamp: string;
  reconcile_gas_price: string;
  reconcile_gas_limit: string;
  reconcile_block_number: number;
  update_time: string;
  delegate: string;
  message_hash: string;
  canonical_domain: string;
  slippage: number;
  origin_sender: string;
  bridged_amt: string;
  normalized_in: string;
  canonical_id: string;
  router_fee?: string;
  xcall_tx_origin: string;
  execute_tx_origin: string;
  reconcile_tx_origin: string;
  relayer_fee: string;
  error_status?: string;
  execute_simulation_input?: string;
  execute_simulation_from?: string;
  execute_simulation_to?: string;
  execute_simulation_network?: string;
  error_message?: string;
  message_status?: string;
  relayer_fees?: string[];
};
