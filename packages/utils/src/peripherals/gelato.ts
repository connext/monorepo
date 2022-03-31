import axios from "axios";
import { BigNumber } from "ethers";

const gelatoServer = "https://relay.gelato.digital";

export const gelatoSend = async (
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

export const isChainSupportedByGelato = async (chainId: number): Promise<boolean> => {
  const chainsSupportedByGelato = await getGelatoRelayChains();
  return chainsSupportedByGelato.includes(chainId.toString());
};

export const getGelatoRelayChains = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/relays/`);
    result = res.data.relays;
  } catch (error) {
    console.error(error);
  }

  return result;
};

export const getEstimatedFee = async (
  chainId: number,
  paymentToken: string,
  gasLimit: number,
  isHighPriority: boolean,
): Promise<BigNumber> => {
  let result = BigNumber.from("0");
  const params = { paymentToken, gasLimit, isHighPriority };

  try {
    const res = await axios.get(`${gelatoServer}/oracles/${chainId}/estimate`, { params });
    result = BigNumber.from(res.data.estimatedFee);
  } catch (error) {
    console.error(error);
  }
  return result;
};

export const isOracleActive = async (chainId: number): Promise<boolean> => {
  const oracles = await getGelatoOracles();
  return oracles.includes(chainId.toString());
};

export const getGelatoOracles = async (): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/oracles/`);
    result = res.data.oracles;
  } catch (error) {
    console.error(error);
  }

  return result;
};

export const isPaymentTokenSupported = async (chainId: number, token: string): Promise<boolean> => {
  const paymentTokens = await getPaymentTokens(chainId);
  const lowerPaymentTokens = paymentTokens.map((address) => {
    return address.toLowerCase();
  });
  return lowerPaymentTokens.includes(token.toString().toLowerCase());
};

export const getPaymentTokens = async (chainId: number): Promise<string[]> => {
  let result = [];
  try {
    const res = await axios.get(`${gelatoServer}/oracles/${chainId}/paymentTokens/`);
    result = res.data.paymentTokens;
  } catch (error) {
    console.error(error);
  }

  return result;
};
