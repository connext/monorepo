import axios from "axios";
import { Interface } from "ethers/lib/utils";

import { FulfillParams } from "./transactionManager";

const gelatoServer = "https://api-gateway.prod.fra.gelato.digital";

const gelatoSend = async (
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: string,
): Promise<any> => {
  const params = { dest, data, token, relayerFee};

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
  }
  catch(error){
    console.error(error);
  }

  return result;
};

export { gelatoFulfill, isChainSupportedByGelato, gelatoSend };
