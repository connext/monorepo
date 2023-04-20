import { Swapper } from "../types";

export const SwapperMapping: Record<string, { type: Swapper; address: string }> = {
  "6648936": { type: Swapper.OneInch, address: "" }, // ETH mainnet
  "1869640809": { type: Swapper.OneInch, address: "" }, // Optimism
  "6450786": { type: Swapper.OneInch, address: "" }, // BNB Chain
  "6778479": { type: Swapper.OneInch, address: "" }, // Gnosis Chain
  "1886350457": { type: Swapper.OneInch, address: "" }, // Polygon
  "1634886255": { type: Swapper.OneInch, address: "" }, // Arbitrum One
  "2053862243": { type: Swapper.OneInch, address: "" }, // zkSync2 mainnet
  "1887071085": { type: Swapper.OneInch, address: "" }, // Polygon zkEVM
};
