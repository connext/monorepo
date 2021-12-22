import { CHAIN_ID } from ".";

export const DEFAULT_GAS_ESTIMATES = {
  prepare: "112000", // https://etherscan.io/tx/0x4e1be107ca80265b7ae65f77e00f14dd726d08dae763955fb1cf2a754d9cc1a8 example tx, add 5% buffer
  fulfill: "126000", // https://bscscan.com/tx/0xcaba240ab17f006586086cd460fffab09a028905d7c497c31667c1d5eb58e153 example tx, add 5% buffer
  cancel: "126000",
  prepareL1: "17300", // https://optimistic.etherscan.io/tx/0xd3ae8d8980aa464c4256ef6c734f7eb58211a02a6016201903e30fd35ec3bff8
  fulfillL1: "11800", // https://optimistic.etherscan.io/tx/0x280a1e70c10095d748babb85fa56fdf8285cdcae3e3962eae3dc451045c0b220
  cancelL1: "11800",
  prepareRouterContract: "121000",
  fulfillRouterContract: "160000",
  cancelRouterContract: "130000",
};

export const GAS_LIMIT_MAP = {
  [CHAIN_ID.ARBITRUM]: {
    prepare: "2400000", // https://arbiscan.io/tx/0x381ec9af326241282a2d651799e7794dadfa21acd0bcec8c0898f829beb6508c
    fulfill: "1935000", // https://arbiscan.io/tx/0x8d1dcf58d84aedce3d71d14697aefbf2173270c0e3ee7f6aacabc19a50127c29
    cancel: "1935000",
    prepareRouterContract: "2400000",
    fulfillRouterContract: "1935000",
    cancelRouterContract: "1935000",
  },
};

export const getHardcodedGasLimits = (
  chainId: number,
): {
  prepare: string;
  fulfill: string;
  cancel: string;
  prepareRouterContract: string;
  fulfillRouterContract: string;
  cancelRouterContract: string;
} => {
  if (GAS_LIMIT_MAP[chainId]) {
    return GAS_LIMIT_MAP[chainId];
  } else {
    return {
      prepare: DEFAULT_GAS_ESTIMATES.prepare,
      fulfill: DEFAULT_GAS_ESTIMATES.fulfill,
      cancel: DEFAULT_GAS_ESTIMATES.cancel,
      prepareRouterContract: DEFAULT_GAS_ESTIMATES.prepareRouterContract,
      fulfillRouterContract: DEFAULT_GAS_ESTIMATES.fulfillRouterContract,
      cancelRouterContract: DEFAULT_GAS_ESTIMATES.cancelRouterContract,
    };
  }
};
