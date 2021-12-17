import { PartialDeploymentsExtension } from "../../../deploy/deploy-nervos";
import { addRouter } from "./addRouter";

interface SetupTestRouterNervosOptions {
  txManagerAddress?: string;
  amount?: string;
  assetId?: string;
}

export async function setupTestRouter(router: string, { amount: _amount, assetId: _assetId, txManagerAddress: _txManagerAddress }: SetupTestRouterNervosOptions, deployments: PartialDeploymentsExtension) {
  console.log("router: ", router);

  let txManagerAddress = _txManagerAddress;
  if (!txManagerAddress) {
    const txManagerDeployment = await deployments.get("TransactionManager");
    txManagerAddress = txManagerDeployment.address;
  }
  console.log("txManagerAddress: ", txManagerAddress);

  let assetId = _assetId;
  if (!_assetId) {
    const assetIdDeployment = await deployments.get("TestERC20");
    assetId = assetIdDeployment.address;
  }

  let amount = _amount;
  if (!amount) {
    amount = "2500000000000000000000000";
  }

  const txManager = await deployments.getContractAt("TransactionManager", txManagerAddress);

  const isRouterApproved = await txManager.approvedRouters(router);
  console.log("isRouterApproved: ", isRouterApproved);
  if (!isRouterApproved) {
    await addRouter({ router, txManagerAddress }, deployments);
  }
  console.log("Router approved");
}
