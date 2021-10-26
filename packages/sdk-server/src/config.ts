import { SdkBaseChainConfigParams } from "@connext/nxtp-sdk";

export const getConfig = () => {
  const config = {
    network: undefined,
    chainConfig: {} as SdkBaseChainConfigParams,
    mnemonic: "",
  };
  return config;
};
