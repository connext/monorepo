import { constants, providers, BigNumber } from "ethers";
import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/nxtp-contracts";

import { parseConnextLog } from "./lib/helpers";
import { SignerAddressMissing, ContractAddressMissing } from "./lib/errors";
import { NxtpSdkConfig } from "./config";

/**
 * @classdesc Base class to facilitate on-chain interactions with Connext.
 */
export class NxtpSdkBase {
  readonly config: NxtpSdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly logger: Logger;
  protected readonly chainReader: ChainReader;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainReader = new ChainReader(
      this.logger.child({ module: "ChainReader" }, this.config.logLevel),
      this.config.chains,
    );
  }

  async getConnext(domainId: string): Promise<Connext> {
    const connextAddress = this.config.chains[domainId]?.deployments?.connext;
    if (!connextAddress) {
      throw new ContractAddressMissing();
    }

    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    return Connext__factory.connect(connextAddress, provider);
  }

  async getERC20(domainId: string, tokenAddress: string): Promise<IERC20> {
    const provider = new providers.JsonRpcProvider(this.config.chains[domainId].providers[0]);
    return IERC20__factory.connect(tokenAddress, provider);
  }

  async approveIfNeeded(
    domainId: string,
    assetId: string,
    amount: string,
    infiniteApprove = true,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name);

    const signerAddress = this.config.signerAddress;
    this.logger.info("Method start", requestContext, methodContext, {
      domainId,
      assetId,
      amount,
      signerAddress,
    });

    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    const connextContract = await this.getConnext(domainId);
    const erc20Contract = await this.getERC20(domainId, assetId);

    if (assetId !== constants.AddressZero) {
      const approved = await erc20Contract.allowance(signerAddress, connextContract.address);

      if (BigNumber.from(approved).lt(amount)) {
        const approveData = erc20Contract.populateTransaction.approve(
          connextContract.address,
          infiniteApprove ? constants.MaxUint256 : amount,
        );
        return approveData;
      } else {
        this.logger.info("Allowance sufficient", requestContext, methodContext, {
          approved: approved.toString(),
          amount,
        });
        return undefined;
      }
    }
    return undefined;
  }

  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }

  parseConnextTransactionReceipt(transactionReceipt: providers.TransactionReceipt): any {
    const parsedlogs: any = [];
    transactionReceipt.logs.forEach((log) => {
      parsedlogs.push(parseConnextLog(log));
    });

    return parsedlogs;
  }
}
