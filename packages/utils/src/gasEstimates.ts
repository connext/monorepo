import { CHAIN_ID } from ".";

export const DEFAULT_GAS_ESTIMATES = {
  prepare: "336000", // https://etherscan.io/tx/0x4e1be107ca80265b7ae65f77e00f14dd726d08dae763955fb1cf2a754d9cc1a8 example tx, add 5% buffer
  fulfill: "378000", // https://bscscan.com/tx/0xcaba240ab17f006586086cd460fffab09a028905d7c497c31667c1d5eb58e153 example tx, add 5% buffer
  cancel: "378000",
  removeLiquidity: "135000",
  prepareL1: "51900", // https://optimistic.etherscan.io/tx/0xd3ae8d8980aa464c4256ef6c734f7eb58211a02a6016201903e30fd35ec3bff8
  fulfillL1: "35400", // https://optimistic.etherscan.io/tx/0x280a1e70c10095d748babb85fa56fdf8285cdcae3e3962eae3dc451045c0b220
  cancelL1: "35400",
  removeLiquidityL1: "35400",
  prepareRouterContract: "363000",
  fulfillRouterContract: "480000",
  cancelRouterContract: "390000",
  removeLiquidityRouterContract: "144000",
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
  [CHAIN_ID.MAINNET]: {
    prepare: "200000", // https://etherscan.io/tx/0x8b8b53c5ce70e9cd05cbee150b332167a13b4c20fbe5c3d7a76306ad2829d531
    fulfill: "210000", // https://etherscan.io/tx/0xdc9c46cae0c443d5ecc7de5fd27f1cdb93f27000b916f140839070a383489228
    cancel: "150000",
    removeLiquidity: "90000",
    prepareRouterContract: "260000",
    fulfillRouterContract: "270000",
    cancelRouterContract: "180000",
    removeLiquidityRouterContract: "90000",
  },
  [CHAIN_ID.OPTIMISM]: {
    prepare: "200000", // https://optimistic.etherscan.io/tx/0x7ba2e4ad1880e6b435c85beb9ef7f6f136b6aa14b4f0e1cef1660128721ab50a
    fulfill: "210000",
    cancel: "150000",
    removeLiquidity: "90000",
    prepareRouterContract: "260000",
    fulfillRouterContract: "270000",
    cancelRouterContract: "180000",
    removeLiquidityRouterContract: "90000",
  },
  [CHAIN_ID.ARBITRUM]: {
    prepare: "2400000", // https://arbiscan.io/tx/0x381ec9af326241282a2d651799e7794dadfa21acd0bcec8c0898f829beb6508c
    fulfill: "1935000", // https://arbiscan.io/tx/0x8d1dcf58d84aedce3d71d14697aefbf2173270c0e3ee7f6aacabc19a50127c29
    cancel: "1935000",
    removeLiquidity: "645000",
    prepareRouterContract: "2400000",
    fulfillRouterContract: "1935000",
    cancelRouterContract: "1935000",
    removeLiquidityRouterContract: "645000",
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
