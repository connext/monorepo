export const GAS_ESTIMATES = {
  prepare: "112000", // https://etherscan.io/tx/0x4e1be107ca80265b7ae65f77e00f14dd726d08dae763955fb1cf2a754d9cc1a8 example tx, add 5% buffer
  fulfill: "126000", // https://bscscan.com/tx/0xcaba240ab17f006586086cd460fffab09a028905d7c497c31667c1d5eb58e153 example tx, add 5% buffer
  cancel: "126000", // TODO
  prepareL1: "17300", // https://optimistic.etherscan.io/tx/0xd3ae8d8980aa464c4256ef6c734f7eb58211a02a6016201903e30fd35ec3bff8
  fulfillL1: "11800", // https://optimistic.etherscan.io/tx/0x280a1e70c10095d748babb85fa56fdf8285cdcae3e3962eae3dc451045c0b220
  cancelL1: "11800", // TODO
};
