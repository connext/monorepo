/**
 * Returns local asset address on destination domain corresponding to local asset on origin domain
 *
 * @param originDomain
 * @param originLocalAsset The asset sent over the bridge
 * @param destinationDomain
 * @returns
 */
export const getDestinationLocalAsset = async (
  originDomain: string,
  originLocalAsset: string,
  destinationDomain: string,
): Promise<string> => {
  // TODO: Not implemented yet

  // const encoded = getTokenRegistryInterface().encodeFunctionData("getLocalAddress(uint32,address)", [
  //   originDomain,
  //   originLocalAsset
  // ]);

  return originLocalAsset;
};
