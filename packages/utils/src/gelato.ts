import axios from "axios";
import { BigNumber } from "ethers";
import { Interface } from "ethers/lib/utils";

import { FulfillParams } from "./transactionManager";

const gelatoServer = "https://relay.gelato.digital";

const gelatoSend = async (
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: string,
): Promise<any> => {
  const params = { dest, data, token, relayerFee };

  let output;
  try {
    const res = await axios.post(`${gelatoServer}/relays/${chainId}`, params);
    output = res.data;
  } catch (error) {
    console.error(error);
    output = error;
  }
  return output;
};

const gelatoFulfill = async (
  chainId: number,
  address: string,
  abi: Interface,
  fulfillArgs: FulfillParams,
): Promise<any> => {
  const args = { ...fulfillArgs, encodedMeta: "0x" };
  const data = abi.encodeFunctionData("fulfill", [args]);
  const token = fulfillArgs.txData.receivingAssetId;
  const ret = await gelatoSend(chainId, address, data, token, fulfillArgs.relayerFee);
  return ret;
};

const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  const chainsSupportedByGelato = await getGelatoRelayChains();
  return chainsSupportedByGelato.includes(chainId.toString());
};

const getGelatoRelayChains = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/relays/`);
    result = res.data.relays;
  } catch (error) {
    console.error(error);
  }

  return result;
};

const getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
  gasLimitL1 = 0,
): Promise<BigNumber> => {
  const result = await _getEstimatedFee(chainId, paymentToken, gasLimit, isHighPriority, gasLimitL1);
  return result;
};

const _getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
  gasLimitL1: number,
): Promise<BigNumber> => {
  const params = { paymentToken, gasLimit, isHighPriority, gasLimitL1 };
  let result: BigNumber;
  try {
    const res = await axios.get(`${gelatoServer}/oracles/${chainId}/estimate`, { params });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error) {
    let message: string = (error as Error).message;
    if (axios.isAxiosError(error) && error.response) {
      message = error.response?.data;
    }
    throw new Error(message);
  }
  return result;
};

const isOracleActive = async (chainId: number): Promise<boolean> => {
  const oracles = await getGelatoOracles();
  return oracles.includes(chainId.toString());
};

const getGelatoOracles = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/oracles/`);
    result = res.data.oracles;
  } catch (error) {
    console.error(error);
  }

  return result;
};

const isPaymentTokenSupported = async (chainId: number, token: string): Promise<boolean> => {
  const paymentTokens = await getPaymentTokens(chainId);
  const lowerPaymentTokens = paymentTokens.map((address) => {
    return address.toLowerCase();
  });
  return lowerPaymentTokens.includes(token.toString().toLowerCase());
};

const getPaymentTokens = async (chainId: number): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/oracles/${chainId}/paymentTokens/`);
    result = res.data.paymentTokens;
  } catch (error) {
    console.error(error);
  }

  return result;
};

export {
  gelatoFulfill,
  isChainSupportedByGelato,
  gelatoSend,
  isOracleActive,
  getEstimatedFee,
  getPaymentTokens,
  isPaymentTokenSupported,
};
