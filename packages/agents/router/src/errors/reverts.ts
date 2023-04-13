// All revert errors that would appear when trying to estimate gas
// for execution, that should be treated as a WARNING instead of
// an ERROR
export const KNOWN_REVERTS = {
  SLIPPAGE: "execution reverted: dy < minDy",
  INSUFFICENT_POOL_BALANCE: "execution reverted: more than pool balance",
  EMPTY_APPROVAL: "execution reverted: ERC20: approve to the zero address",
} as const;
export type KnownRevertShorthand = keyof typeof KNOWN_REVERTS;
export type KnownRevertMessage = typeof KNOWN_REVERTS[KnownRevertShorthand];

export const isKnownRevert = (message: string): message is KnownRevertMessage => {
  return Object.values(KNOWN_REVERTS).includes(message as unknown as KnownRevertMessage);
};
