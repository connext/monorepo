import contractDeployments from "@connext/nxtp-contracts/deployments.json";

export const getTransactionManagerContract = (chainId: number): { address: string; abi: any } => {
  const address =
    (Object.values((contractDeployments as any)[chainId])[0] as any).contracts.TransactionManager.address ?? undefined;

  const abi =
    (Object.values((contractDeployments as any)[chainId])[0] as any).contracts.TransactionManager.abi ?? undefined;

  if (!address || !abi) {
    const err = "Chain not supported yet, please contact connext team";
    console.log(err);
    throw new Error(err);
  }

  return { address, abi };
};
