import { Deployments } from "../deployments";

// Based on current deployment addresses, set up an .env file for the upgrade suite of
// forge tests to use for reference.
export const setupEnv = () => {
  /**
   * 'Deployments' looks like this:
   * {
   *   '<chainId>': [
   *     {
   *       name: '<chain name>'
   *       contracts: {
   *         <contract name>: {
   *           address: '<contract addr>',
   *           abi: [
   *             {<fragment>},
   *             ...
   *           ]
   *         },
   *         ...
   *       }
   *     }
   *   ]
   * }
   *
   * We're going to format our .env file like this:
   * <chainId:ContractName>="0x000000..."
   */
  const envVars: { [contract: string]: string } = {};
  const deployments = Deployments as any;
  for (const chainId of Object.keys(deployments)) {
    const { contracts } = deployments[chainId][0];
    for (const contract of Object.keys(contracts)) {
      envVars[`${chainId}:${contract}`] = contracts[contract].address;
    }
  }

  // TODO: Additionally, we need to provide the addresses of assets-in-use.
};
