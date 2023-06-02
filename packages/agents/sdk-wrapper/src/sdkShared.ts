import { SdkConfig } from "@connext/sdk-core";
import { getContractInterfaces, ConnextContractInterfaces, ChainReader } from "@connext/nxtp-txservice";
import { Logger, ChainData } from "@connext/nxtp-utils";

export class SdkShared {
  readonly config: SdkConfig;
  readonly chainData: Map<string, ChainData>;
  readonly contracts: ConnextContractInterfaces;
  protected readonly chainreader: ChainReader;
  protected readonly logger: Logger;

  protected readonly baseUri = "http://example.com"; // TODO: replace with SDK server uri based on env

  constructor(config: SdkConfig, logger: Logger, chainData: Map<string, ChainData>) {
    this.config = config;
    this.logger = logger;
    this.chainData = chainData;
    this.contracts = getContractInterfaces();
    this.chainreader = new ChainReader(logger.child({ module: "ChainReader" }, this.config.logLevel), config.chains);
  }

  // TODO: add the rest of the shared methods
}
