export const getMappedAssets = (_assetId: string, _chainId: number): { assetId: string; chainId: number }[] => {
  let pair: { assetId: string; chainId: number }[] = [{ assetId: _assetId, chainId: _chainId }];
  const uniquePairs = Array.from(new Set(pair.map(s => s.assetId))).map(x => {
    return pair.find(z => z.assetId === x)!;
  });
  return uniquePairs;
};

export const onSwapGivenIn = () => {};
