import { Signer, providers, utils, Bytes, Wallet } from "ethers";
import { getAddressFromPublicKey, isValidHexString } from "@connext/nxtp-utils";
import { arrayToBuffer, concatBuffers, hexToBuffer, utf8ToBuffer } from "eccrypto-js";

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
    const identifier = await getPublicKey(this.web3SignerUrl);

    const prefix = "\x19Ethereum Signed Message:\n";

    const digestBytes = utils.hexlify(
      utils.keccak256(
        concatBuffers(Buffer.from(prefix), Buffer.from(`${message.length}`), Buffer.from(message.toString())),
      ),
    );

    // const digestBytes = utils.arrayify(utils.hashMessage(message));

    console.log("digestBytes", digestBytes);

    const response = await signing(this.web3SignerUrl, identifier, digestBytes);

    const wallet = Wallet.fromMnemonic(
      "luxury genuine glue face keep wasp victory clever solution drive venue convince",
    );
    const cRes = await wallet.signMessage(message);

    console.log("compare", response, cRes);
    return response;
  }

  public async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    const tx: utils.UnsignedTransaction = {
      ...transaction,
      nonce: Number(transaction.nonce),
    };
    const data = utils.keccak256(utils.serializeTransaction(tx));

    const response = await this.signMessage(data);
    return response;
  }
}
