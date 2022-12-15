import { constants, providers, BigNumber } from "ethers";
import { Logger, createLoggingContext, ChainData } from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";

import { getChainIdFromDomain, parseConnextLog } from "./lib/helpers";
import { SignerAddressMissing } from "./lib/errors";
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

  async approveIfNeeded(
    domain: string,
    assetId: string,
    amount: string,
    infiniteApprove = true,
  ): Promise<providers.TransactionRequest | undefined> {
    const { requestContext, methodContext } = createLoggingContext(this.approveIfNeeded.name);

    const signerAddress = this.config.signerAddress;
    this.logger.info("Method start", requestContext, methodContext, {
      domain,
      assetId,
      amount,
      signerAddress,
    });

    if (!signerAddress) {
      throw new SignerAddressMissing();
    }

    let chainId = this.config.chains[domain].chainId;
    if (!chainId) {
      chainId = await getChainIdFromDomain(domain, this.chainData);
    }

    if (assetId !== constants.AddressZero) {
      const ConnextContractAddress = this.config.chains[domain].deployments!.connext;

      const approvedData = this.contracts.erc20.encodeFunctionData("allowance", [
        signerAddress,
        ConnextContractAddress,
      ]);
      this.logger.debug("Got approved data", requestContext, methodContext, { approvedData });
      const approvedEncoded = await this.chainReader.readTx({
        to: assetId,
        data: approvedData,
        chainId: Number(domain),
      });
      this.logger.debug("Got approved data", requestContext, methodContext, { approvedEncoded });
      const [approved] = this.contracts.erc20.decodeFunctionResult("allowance", approvedEncoded);
      this.logger.debug("Got approved data", requestContext, methodContext, { approved });

      this.logger.info("Got approved tokens", requestContext, methodContext, { approved: approved.toString() });
      if (BigNumber.from(approved).lt(amount)) {
        const data = this.contracts.erc20.encodeFunctionData("approve", [
          ConnextContractAddress,
          infiniteApprove ? constants.MaxUint256 : amount,
        ]);
        const txRequest = {
          to: assetId,
          data,
          from: signerAddress,
          value: 0,
          chainId,
        };
        this.logger.info("Approve transaction created", requestContext, methodContext, txRequest);
        return txRequest;
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

  parseConnextTransactionReceipt(transactionReceipt: providers.TransactionReceipt): any {
    const parsedlogs: any = [];
    transactionReceipt.logs.forEach((log) => {
      parsedlogs.push(parseConnextLog(log));
    });

    return parsedlogs;
  }

  async changeSignerAddress(signerAddress: string) {
    this.config.signerAddress = signerAddress;
  }
}
