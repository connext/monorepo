import axios from "axios";
import { Interface } from "ethers/lib/utils";

import { FulfillParams } from "./transactionManager";

import { CHAIN_ID } from ".";

const ACCESS_TOKEN = "4942987b-af28-4ab7-bf75-4bd383e82f80";

const endpoints = {
  [CHAIN_ID.MAINNET]: "https://prod.relay.gelato.digital/mainnet/relay",
  [CHAIN_ID.RINKEBY]: "https://staging.relay.gelato.digital/rinkeby/relay",
  [CHAIN_ID.GOERLI]: "https://staging.relay.gelato.digital/goerli/relay",
  [CHAIN_ID.BSC]: "https://prod.relay.gelato.digital/bsc/relay",
  [CHAIN_ID.XDAI]: "https://prod.relay.gelato.digital/gnosis/relay",
  [CHAIN_ID.MATIC]: "https://prod.relay.gelato.digital/matic/relay",
  [CHAIN_ID.FANTOM]: "https://prod.relay.gelato.digital/fantom/relay",
  [CHAIN_ID.ARBITRUM]: "https://prod.relay.gelato.digital/arbitrum/relay",
  [CHAIN_ID.AVALANCHE]: "https://prod.relay.gelato.digital/avalanche/relay",
  [CHAIN_ID.OPTIMISM]: "https://prod.relay.gelato.digital/optimism/relay",
};

const gelatoSend = async (
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
  const ret = await gelatoSend(chainId, address, data, token, fulfillArgs.relayerFee);
  return ret;
};

const isChainSupportedByGelato = (chainId: number): boolean => {
  return Object.keys(endpoints).indexOf(chainId.toString()) !== -1;
};

export { gelatoFulfill, isChainSupportedByGelato, gelatoSend };
