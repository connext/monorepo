import { providers } from "ethers";
import Ajv from "ajv";

export const ajv = new Ajv();

export const verifyCorrectChain = async (expectedChain: number, provider: providers.JsonRpcProvider): Promise<void> => {
  // Make sure user is on the correct chain
  const { chainId } = await provider.getNetwork();

  if (chainId !== expectedChain) {
    throw new Error(`user is on ${chainId} and should be on ${expectedChain}`);
  }
};
