import { Signer, providers, utils, Bytes } from "ethers";
import { getAddressFromPublicKey } from "@connext/nxtp-utils";

import { signing, getPublicKey } from "./api";

export class Web3Signer extends Signer {
  public address?: string;
  public provider?: providers.Provider;

  constructor(public readonly web3SignerUrl: string, provider?: providers.Provider) {
    super();
    this.web3SignerUrl = web3SignerUrl;
    this.provider = provider;
  }

  public connect(provider: providers.Provider): Web3Signer {
    this.provider = provider;
    return this;
  }

  public async getAddress(): Promise<string> {
    const publicKey = await getPublicKey(this.web3SignerUrl);
    const address = getAddressFromPublicKey(publicKey);
    this.address = address;
    return address;
  }

  public async signMessage(message: Bytes | string): Promise<string> {
    const response = await signing(this.web3SignerUrl, message);
    return response;
  }

  public async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    const tx: utils.UnsignedTransaction = {
      ...transaction,
      nonce: Number(transaction.nonce),
    };
    const data = utils.serializeTransaction(tx);

    const response = await this.signMessage(data);
    return response;
  }
}
