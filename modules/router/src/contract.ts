import { TransactionManager as TTransactionManager, IERC20 } from "@connext/nxtp-contracts";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";

class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];
  constructor(private readonly txService: TransactionService, private readonly signerAddress: string) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
  }

  getLiquidity() {
    // read onchain
  }

  addLiquidity() {
    // encode and call tx service
  }

  prepare() {}

  fulfill() {}

  cancel() {}

  removeLiquidity() {}
}
