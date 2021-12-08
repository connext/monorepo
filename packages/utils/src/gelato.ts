import axios from "axios";
import { Interface } from "ethers/lib/utils";

import { FulfillParams } from "./transactionManager";

const ACCESS_TOKEN = "4942987b-af28-4ab7-bf75-4bd383e82f80";

const CHAIN_ID = {
  MAINNET: 1,
  RINKEBY: 4,
  GOERLI: 5,
  BSC: 56,
  MATIC: 137,
  FANTOM: 250,
  ARBITRUM: 42161,
  AVALANCHE: 43114,
};

const endpoints = {
  [CHAIN_ID.MAINNET]: "https://relay.mainnet.fra.gelato.digital/relay",
  [CHAIN_ID.RINKEBY]: "https://relay.rinkeby.fra.gelato.digital/relay",
  [CHAIN_ID.GOERLI]: "https://relay.goerli.fra.gelato.digital/relay",
  [CHAIN_ID.BSC]: "https://relay.bsc.fra.gelato.digital/relay",
  [CHAIN_ID.MATIC]: "https://relay.matic.fra.gelato.digital/relay",
  [CHAIN_ID.FANTOM]: "https://relay.fantom.fra.gelato.digital/relay",
  [CHAIN_ID.ARBITRUM]: "https://relay.arbitrum.fra.gelato.digital/relay",
  [CHAIN_ID.AVALANCHE]: "https://relay.avalanche.fra.gelato.digital/relay",
};

const sendFulfill = async (
  chainId: number,
  dest: string,
  data: string,
  token: string,
  relayerFee: string,
): Promise<any> => {
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

const gelatoFulfill = async (
  chainId: number,
  address: string,
  abi: Interface,
  fulfillArgs: FulfillParams,
): Promise<any> => {
  const args = { ...fulfillArgs, encodedMeta: "0x" };
  const data = abi.encodeFunctionData("fulfill", [args]);
  const token = fulfillArgs.txData.receivingAssetId;
  const ret = await sendFulfill(chainId, address, data, token, fulfillArgs.relayerFee);
  return ret;
};

const isChainSupportedByGelato = (chainId: number): boolean => {
  return Object.values(CHAIN_ID).indexOf(chainId) !== -1;
};

export { gelatoFulfill, isChainSupportedByGelato };
