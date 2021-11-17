import { NxtpError } from "@connext/nxtp-utils";
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
    const endpoint = Web3SignerApi.ENDPOINTS.SIGN;
    let response: AxiosResponse<string> = await axios.post(this.formatUrl(endpoint, identifier), {
      data,
    });
    response = this.sanitizeResponse(response, endpoint);
    return response.data;
  }

  public async getServerStatus(): Promise<string> {
    const endpoint = Web3SignerApi.ENDPOINTS.SERVER_STATUS;
    let response: AxiosResponse<string> = await axios.get(this.formatUrl(endpoint));
    response = this.sanitizeResponse(response, endpoint);
    return response.data[0];
  }

  public async getPublicKey(): Promise<string> {
    const endpoint = Web3SignerApi.ENDPOINTS.PUBLIC_KEY;
    let response: AxiosResponse<string> = await axios.get(this.formatUrl(endpoint));
    response = this.sanitizeResponse(response, endpoint);
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

  private sanitizeResponse(
    response: AxiosResponse<string>,
    endpoint: typeof Web3SignerApi.ENDPOINTS[keyof typeof Web3SignerApi.ENDPOINTS],
  ): AxiosResponse<string> {
    if (!response || !response.data || response.data.length === 0) {
      throw new NxtpError(
        "Received bad response from web3signer instance; make sure your key file is configured correctly.",
        {
          response,
          endpoint,
        },
      );
    }
    return response;
  }
}
