import {
  // UrlString,
  // IChannelSigner,
  // PublicIdentifier,
  // PublicKey,
  PrivateKey,
  SignatureString,
} from "@connext/vector-types";
import { Signer, Wallet, providers, Bytes } from "ethers";

export class TransactionSigner extends Signer {
  // public address: Address;
  // public publicIdentifier: PublicIdentifier;
  // public publicKey: PublicKey;
  public provider?: providers.Provider;

  // NOTE: without this property, the Signer.isSigner
  // function will not return true, even though this class
  // extends / implements the signer interface. See:
  // https://github.com/ethers-io/ethers.js/issues/779
  private readonly _ethersType = "Signer";

  constructor(private readonly privateKey: PrivateKey, provider: providers.Provider) {
    super();
    this.privateKey = privateKey;
    // this.publicKey = getPublicKeyFromPrivateKey(privateKey);
    // this.address = getAddressFromPublicKey(this.publicKey);
    // this.publicIdentifier = getPublicIdentifierFromPublicKey(this.publicKey);
  }

  public connect(provider: providers.Provider): TransactionSigner {
    this.provider = provider;
    return this
  }

  public getAddress(): Promise<string> {
    // return this.address;
    throw new Error("Method not implemented.");
  }

  public async signMessage(message: string | Bytes): Promise<string> {
    // return signChannelMessage(message, this.privateKey);
    throw new Error("Method not implemented.");
  }

  public async signUtilityMessage(message: string): Promise<SignatureString> {
    // return signUtilityMessage(message, this.privateKey);
    throw new Error("Method not implemented.");
  }

  public async signTransaction(transaction: providers.TransactionRequest): Promise<string> {
    if (!this.provider) {
      throw new Error(`ChannelSigner can't send transactions without being connected to a provider`);
    }
    const wallet = new Wallet(this.privateKey, this.provider);
    return wallet.signTransaction(transaction);
  }
}