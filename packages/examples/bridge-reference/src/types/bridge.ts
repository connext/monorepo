import { Asset } from "../types/asset";
import { Chain } from "../types/chain";

export interface Bridge {
  source_chain?: Chain;
  destination_chain?: Chain;
  asset?: Asset;
  amount?: number;
}
