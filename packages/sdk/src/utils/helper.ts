import { utils } from "ethers";

export const getRandomBytes32 = (): string => {
  return utils.hexlify(utils.randomBytes(32));
};
