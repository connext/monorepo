import { Asset } from "../types/asset";
import testnet_assets from "../../config/testnet/assets.json";
import mainnet_assets from "../../config/mainnet/assets.json";

export const getAssets: () => Asset[] = () =>
  process.env.NEXT_PUBLIC_NETWORK === "testnet" ? testnet_assets : mainnet_assets;
