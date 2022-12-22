import { constants, providers, BigNumber } from "ethers";
import { Logger, createLoggingContext, ChainData, getCanonicalHash } from "@connext/nxtp-utils";
import { getContractInterfaces, ConnextContractInterfaces } from "@connext/nxtp-txservice";
import { Connext, Connext__factory, IERC20, IERC20__factory } from "@connext/nxtp-contracts";
import memoize from "memoizee";

import { parseConnextLog } from "./lib/helpers";
import { SignerAddressMissing, ContractAddressMissing } from "./lib/errors";
import { NxtpSdkConfig } from "./config";

/**
 * @classdesc Base class to facilitate on-chain interactions with Connext.
 */
export class NxtpSdkShared {
  readonly config: NxtpSdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly logger: Logger;

  constructor(config: NxtpSdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
  }

  getProvider = memoize((domainId: string): providers.StaticJsonRpcProvider => {
    return new providers.StaticJsonRpcProvider(this.config.chains[domainId].providers[0]);
  });

  getConnext = memoize(
    async (domainId: string): Promise<Connext> => {
      const connextAddress = this.config.chains[domainId]?.deployments?.connext;
      if (!connextAddress) {
        throw new ContractAddressMissing();
      }

      const provider = this.getProvider(domainId);
      return Connext__factory.connect(connextAddress, provider);
    },
    { promise: true },
  );

  getERC20 = memoize(
    async (domainId: string, tokenAddress: string): Promise<IERC20> => {
      const provider = this.getProvider(domainId);
      return IERC20__factory.connect(tokenAddress, provider);
    },
    { promise: true },
  );

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

  /**
   * Returns the hash of the canonical id + domain.
   * @param domainId The canonical domain id of the token.
   * @param tokenAddress The address of the canonical token.
   */
  calculateCanonicalKey(domainId: string, tokenId: string): string {
    return getCanonicalHash(domainId, tokenId);
  }

  async getCanonicalTokenId(domainId: string, tokenAddress: string): Promise<[string, string]> {
    const connextContract = await this.getConnext(domainId);
    const tokenId = await connextContract.getTokenId(tokenAddress);

    return [tokenId.domain.toString(), tokenId.id];
  }
}
