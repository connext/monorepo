import { TransactionManager as TTransactionManager } from "@connext/nxtp-contracts/typechain";
import { TransactionService } from "@connext/nxtp-txservice";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { Interface } from "ethers/lib/utils";
import { BigNumber, constants, providers } from "ethers";
import { jsonifyError, FulfillParams, PrepareParams, CancelParams } from "@connext/nxtp-utils";
import hyperid from "hyperid";
import { BaseLogger } from "pino";

const hId = hyperid();

export class TransactionManager {
  private readonly txManagerInterface: TTransactionManager["interface"];

  constructor(
    private readonly txService: TransactionService,
    private readonly signerAddress: string,
    private readonly logger: BaseLogger,
  ) {
    this.txManagerInterface = new Interface(TransactionManagerArtifact.abi) as TTransactionManager["interface"];
  }

  async getActiveTransactionBlocks(chainId: number) {
    const getLiquidityData = this.txManagerInterface.encodeFunctionData("activeTransactionBlocks", [
      this.signerAddress,
      0,
    ]);
    const liquidity = await this.txService.readTx(chainId, {
      chainId: chainId,
      to: this.config.chainConfig[chainId].transactionManagerAddress,
      value: 0,
      data: getLiquidityData,
    });
  }
}
