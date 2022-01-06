import { CHAIN_ID } from ".";

export const DEFAULT_GAS_ESTIMATES = {
  prepare: "232826", // https://etherscan.io/tx/0x8b8b53c5ce70e9cd05cbee150b332167a13b4c20fbe5c3d7a76306ad2829d531 example tx, add 20% buffer
  fulfill: "249512", // https://etherscan.io/tx/0xdc9c46cae0c443d5ecc7de5fd27f1cdb93f27000b916f140839070a383489228 example tx, add 20% buffer
  cancel: "204271", // https://ftmscan.com/tx/0xd1a4bdb36d188ee1764d3979e503c698b34947decebdb3bb787d4821042f9e50 example tx, add 20% buffer
  removeLiquidity: "45000",
  prepareL1: "20623", // https://optimistic.etherscan.io/tx/0xd3ae8d8980aa464c4256ef6c734f7eb58211a02a6016201903e30fd35ec3bff8, add 20% buffer
  fulfillL1: "13965", // https://optimistic.etherscan.io/tx/0x280a1e70c10095d748babb85fa56fdf8285cdcae3e3962eae3dc451045c0b220, add 20% buffer
  cancelL1: "13965",
  removeLiquidityL1: "45000",
  prepareRouterContract: "232826",
  fulfillRouterContract: "249512",
  cancelRouterContract: "204271",
  removeLiquidityRouterContract: "48000",
};

export type GasEstimates = {
  prepare: string;
  fulfill: string;
  cancel: string;
  removeLiquidity: string;
  prepareRouterContract: string;
  fulfillRouterContract: string;
  cancelRouterContract: string;
  removeLiquidityRouterContract: string;
};

export const GAS_LIMIT_MAP: Record<number, GasEstimates> = {
  [CHAIN_ID.ARBITRUM]: {
    prepare: "600000", // https://arbiscan.io/tx/0x381ec9af326241282a2d651799e7794dadfa21acd0bcec8c0898f829beb6508c
    fulfill: "500000", // https://arbiscan.io/tx/0x8d1dcf58d84aedce3d71d14697aefbf2173270c0e3ee7f6aacabc19a50127c29
    cancel: "500000",
    removeLiquidity: "170000",
    prepareRouterContract: "600000",
    fulfillRouterContract: "500000",
    cancelRouterContract: "500000",
    removeLiquidityRouterContract: "170000",
  },
};

export const getHardcodedGasLimits = (chainId: number): GasEstimates => {
  if (GAS_LIMIT_MAP[chainId]) {
    return GAS_LIMIT_MAP[chainId];
  } else {
    return {
      prepare: DEFAULT_GAS_ESTIMATES.prepare,
      fulfill: DEFAULT_GAS_ESTIMATES.fulfill,
      cancel: DEFAULT_GAS_ESTIMATES.cancel,
      removeLiquidity: DEFAULT_GAS_ESTIMATES.removeLiquidity,
      prepareRouterContract: DEFAULT_GAS_ESTIMATES.prepareRouterContract,
      fulfillRouterContract: DEFAULT_GAS_ESTIMATES.fulfillRouterContract,
      cancelRouterContract: DEFAULT_GAS_ESTIMATES.cancelRouterContract,
      removeLiquidityRouterContract: DEFAULT_GAS_ESTIMATES.removeLiquidityRouterContract,
    };
  }
};
