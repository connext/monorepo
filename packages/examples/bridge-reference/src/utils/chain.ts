import { Chain } from "../types/chain";
import testnet_chains from "../../config/testnet/chains.json";
import mainnet_chains from "../../config/mainnet/chains.json";

export const getChains: () => Chain[] = () =>
  process.env.NEXT_PUBLIC_NETWORK === "testnet" ? testnet_chains : mainnet_chains;

export const getChainTitle = (data: Chain) =>
  data?.name && data.name.split(" ").length < 3 ? data.name : data?.short_name;
