import { PartialDeploymentsExtension } from "../../../deploy/deploy-nervos";

interface AddRouterOptions {
  router?: string;
  txManagerAddress?: string;
}

async function getNamedAccounts() {
  return {
    deployer: '0xD173313A51f8fc37BcF67569b463abd89d81844f'
  };
}

export async function addRouter({ router, txManagerAddress: _txManagerAddress }: AddRouterOptions, deployments: PartialDeploymentsExtension) {
  const namedAccounts = await getNamedAccounts();

  console.log("router: ", router);
  console.log("namedAccounts: ", namedAccounts);
  
  let txManagerAddress = _txManagerAddress;
  if (!txManagerAddress) {
    const txManagerDeployment = await deployments.get("TransactionManager");
    txManagerAddress = txManagerDeployment.address;
  }
  console.log("txManagerAddress: ", txManagerAddress);

  const txManager = await deployments.getContractAt("TransactionManager", txManagerAddress);
  const approved = await txManager.approvedRouters(router);
  if (approved) {
    console.log("approved, no need to add");
    return;
  }

  const tx = await txManager.addRouter(router, { from: namedAccounts.deployer });
  console.log("addRouter tx: ", tx);
  const receipt = await tx.wait();
  console.log("addRouter tx mined: ", receipt.transactionHash);

  const isRouterApproved = await txManager.approvedRouters(router);
  console.log("isRouterApproved: ", isRouterApproved);
}
