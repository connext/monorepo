import axios from "axios";

import { FulfillParams } from "@connext/nxtp-utils";
import { getContractAddress, getTxManagerInterface } from "../../adapters/contract/contract";

const ACCESS_TOKEN = "4942987b-af28-4ab7-bf75-4bd383e82f80";

const CHAIN_ID = {
  RINKEBY: 4,
  GOERLI: 5,
};

const endpoints = {
  [CHAIN_ID.RINKEBY]: "https://relay.rinkeby.fra.gelato.digital/relay",
  [CHAIN_ID.GOERLI]: "https://relay.goerli.fra.gelato.digital/relay",
}; 


const sendFulfill = async (chainId: number, dest: string, data: string) => {
  const server = endpoints[chainId];
  const params = {dest, data, access_token: ACCESS_TOKEN };

  let output;
  try {
    const res = await axios.post(server, params);
    output = res.data;
  } catch (error) {
    console.error(error);
    output = error;
  }
  return output;
};


const gelatoFulfill = async (chainId: number, fulfillArgs: FulfillParams ) => {
  const args = {... fulfillArgs, encodedMeta: "0x"};
  const data = getTxManagerInterface().encodeFunctionData("fulfill", [args]);
  const destAddress = getContractAddress(chainId);
  const ret = await sendFulfill(chainId, destAddress, data);
  return ret;
};

export { gelatoFulfill };