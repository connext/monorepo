export const getMinimumBidsCountForRound = (round: number) => {
  return Math.pow(2, round - 1);
};
