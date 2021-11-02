import axios from "axios";
import { Interface } from "ethers/lib/utils";

import { FulfillParams } from "./transactionManager";


const ACCESS_TOKEN = "4942987b-af28-4ab7-bf75-4bd383e82f80";

const CHAIN_ID = {
  RINKEBY: 4,
  GOERLI: 5,
  MATIC: 137,
  FANTOM: 250,
};

const endpoints = {
  [CHAIN_ID.RINKEBY]: "https://relay.rinkeby.fra.gelato.digital/relay",
  [CHAIN_ID.GOERLI]: "https://relay.goerli.fra.gelato.digital/relay",
  [CHAIN_ID.MATIC]: "https://relay.matic.fra.gelato.digital/relay",
  [CHAIN_ID.FANTOM]: "https://relay.fantom.fra.gelato.digital/relay",
}; 


const sendFulfill = async (chainId: number, dest: string, data: string, token: string, relayerFee: string) => {
  const server = endpoints[chainId];
  const params = { dest, data, token, relayerFee, access_token: ACCESS_TOKEN };

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


const gelatoFulfill = async (chainId: number, address: string, abi: Interface, fulfillArgs: FulfillParams ) => {
  const args = {... fulfillArgs, encodedMeta: "0x"};
  const data = abi.encodeFunctionData("fulfill", [args]);
  const token = fulfillArgs.txData.receivingAssetId;
  const ret = await sendFulfill(chainId, address, data, token, fulfillArgs.relayerFee);
  return ret;
};

export { gelatoFulfill };