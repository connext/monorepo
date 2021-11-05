import { Signer, providers, utils, Bytes, BigNumber } from "ethers";
import { getAddressFromPublicKey } from "@connext/nxtp-utils";

import { Web3SignerApi } from "./api";

export class Web3Signer extends Signer {
  private static MESSAGE_PREFIX = "\x19Ethereum Signed Message:\n";

  private static getAddressFromPublicKey(publicKey: string): string {
    return getAddressFromPublicKey(publicKey);
  }

  private static prepareEthereumSignedMessage(message: Bytes | string): Bytes {
    if (typeof message === "string") {
      message = utils.toUtf8Bytes(message);
    }
    return utils.concat([
      utils.toUtf8Bytes(Web3Signer.MESSAGE_PREFIX),
      utils.toUtf8Bytes(String(message.length)),
      message,
    ]);
  }

  public address?: string;
  public provider?: providers.Provider;
  private api: Web3SignerApi;

  constructor(public readonly web3SignerUrl: string, provider?: providers.Provider) {
    super();
    this.web3SignerUrl = web3SignerUrl;
    this.provider = provider;
    this.api = new Web3SignerApi(web3SignerUrl);
  }

  public connect(provider: providers.Provider): Web3Signer {
    this.provider = provider;
    return new Web3Signer(this.web3SignerUrl, provider);
  }

  public async getAddress(): Promise<string> {
    const publicKey = await this.api.getPublicKey();
    const address = Web3Signer.getAddressFromPublicKey(publicKey);
    this.address = address;
    return address;
  }

  public async signMessage(message: Bytes | string): Promise<string> {
    const identifier = await this.api.getPublicKey();
    const data = Web3Signer.prepareEthereumSignedMessage(message);
    const digestBytes = utils.hexZeroPad(data, data.length);

    return await this.api.sign(identifier, digestBytes);
  }

  public async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    const tx = await utils.resolveProperties(transaction);
    const baseTx: utils.UnsignedTransaction = {
      to: tx.to || undefined,
      nonce: tx.nonce ? BigNumber.from(tx.nonce).toNumber() : undefined,
      gasLimit: tx.gasLimit || undefined,
      gasPrice: tx.gasPrice || undefined,
      data: tx.data || undefined,
      value: tx.value || undefined,
      chainId: tx.chainId || undefined,
      type: tx.type || undefined,
    };

    const identifier = await this.api.getPublicKey();
    const digestBytes = utils.serializeTransaction(baseTx);

    const signature = await this.api.sign(identifier, digestBytes);
    return utils.serializeTransaction(baseTx, signature);
  }
}
