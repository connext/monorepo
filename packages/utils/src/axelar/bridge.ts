import { AxelarQueryAPI, CHAINS, Environment } from "@axelar-network/axelarjs-sdk";

import { domainToChainId, mainnetDomains } from "../helpers";

export const chainIdToAxelarName: Map<number, string> = new Map([
  [1, CHAINS.MAINNET.ETHEREUM],
  [43114, CHAINS.MAINNET.AVALANCHE],
  [42161, CHAINS.MAINNET.ARBITRUM],
  [250, CHAINS.MAINNET.FANTOM],
  [137, CHAINS.MAINNET.POLYGON],
  [56, CHAINS.MAINNET.BINANCE],
  [1284, CHAINS.MAINNET.MOONBEAM],

  // testnets
  [5, CHAINS.TESTNET.ETHEREUM], // Goerli
  [420, CHAINS.TESTNET.OPTIMISM], // optimism-goerli
  [80001, CHAINS.TESTNET.POLYGON], // mumbai 9991
  [421613, CHAINS.TESTNET.ARBITRUM], // arbitrum-goerli
  [97, CHAINS.TESTNET.BINANCE], // chapel
]);

export const createAxelarQueryAPI = (env: Environment) => {
  return new AxelarQueryAPI({ environment: env });
};

/**
 * Calculate the gas amount for a transaction using axelarjs-sdk.
 * @param {*} sourceDomain - The source chain domain.
 * @param {*} destDomain - The destination chain domain.
 * @param gasLimit (Optional) An estimated gas amount required to execute `executeWithToken` function. The default value is 700000 which should be sufficient for most transactions.
 * @param gasMultiplier (Optional) A multiplier used to create a buffer above the calculated gas fee, to account for potential slippage throughout tx execution, e.g. 1.1 = 10% buffer. supports up to 3 decimal places
 * @returns {number} - The gas amount.
 */
export const calculateAxelarBridgeFee = async (
  sourceDomain: string,
  destDomain: string,
  gasLimit?: number,
  gasMultiplier?: number,
): Promise<string> => {
  const sourceChainId = chainIdToAxelarName.get(domainToChainId(+sourceDomain));
  const destChainId = chainIdToAxelarName.get(domainToChainId(+destDomain));

  if (!sourceChainId || !destChainId) {
    throw new Error("Invalid networks");
  }

  const env = mainnetDomains.includes(+sourceDomain) ? Environment.MAINNET : Environment.TESTNET;
  const api = createAxelarQueryAPI(env);

  const res = await api.estimateGasFee(sourceChainId, destChainId, "", gasLimit, gasMultiplier);
  return res as unknown as string;
};
