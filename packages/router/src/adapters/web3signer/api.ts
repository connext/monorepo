import axios, { AxiosResponse } from "axios";
import { Bytes } from "ethers";

// TODO: This class might benefit from some error handling / logging and response sanitization logic.
/**
 * Simple class for wrapping axios calls to the web3signer API.
 */
export class Web3SignerApi {
  private static ENDPOINTS = {
    SIGN: "api/v1/eth1/sign",
    SERVER_STATUS: "upcheck",
    PUBLIC_KEY: "api/v1/eth1/publicKeys",
  };

  constructor(private readonly url: string) {}

  public async sign(identifier: string, data: string | Bytes): Promise<string> {
    const response: AxiosResponse<string> = await axios.post(this.formatUrl(Web3SignerApi.ENDPOINTS.SIGN, identifier), {
      data,
    });
    return response.data;
  }

  public async getServerStatus() {
    const response: AxiosResponse<string> = await axios.get(this.formatUrl(Web3SignerApi.ENDPOINTS.SERVER_STATUS));
    return response.data[0];
  }

  public async getPublicKey() {
    const response: AxiosResponse<string> = await axios.get(this.formatUrl(Web3SignerApi.ENDPOINTS.PUBLIC_KEY));
    return response.data[0];
  }

  private formatUrl(
    endpoint: typeof Web3SignerApi.ENDPOINTS[keyof typeof Web3SignerApi.ENDPOINTS],
    identifier?: string,
  ): string {
    let url = `${this.url}/${endpoint}`;
    if (identifier) {
      url += `/${identifier}`;
    }
    return url;
  }
}
