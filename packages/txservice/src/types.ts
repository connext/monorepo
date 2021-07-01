import { BigNumber, BigNumberish } from "ethers";

export type MinimalTransaction = {
  chainId: number;
  to: string;
  value: BigNumberish;
  data: string;
  from?: string;
};

export type FullTransaction = {
  nonce?: number;
  gasPrice: BigNumber;
} & MinimalTransaction;

export type ProviderConfig = {
  // URL string.
  url: string;

  // Auth header params, if needed.
  user?: string;
  password?: string;

  /* From ethers:
   * The priority used for the provider. Lower-value priorities are favoured over higher-value priorities. If
   * multiple providers share the same priority, they are chosen at random.
   * 
   * Defaults to 1.
   */
  priority?: number;

  /* From ethers:
   * The weight a response from this provider provides. This can be used if a given Provider is more trusted, for example.
   * 
   * Defaults to 1.
   */
  weight?: number;

  /* From ethers:
   * The timeout (in ms) after which another Provider will be attempted. This does not affect the current Provider; 
   * if it returns a result it is counted as part of the quorum.
   * Lower values will result in more network traffic, but may reduce the response time of requests.
   */
  stallTimeout?: number;
}
