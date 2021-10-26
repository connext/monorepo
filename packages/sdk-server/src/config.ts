import { providers } from "ethers";

export const getConfig = () => {
  const config = {
    network: undefined,
    chainConfig: {
      "4": {
        provider: new providers.FallbackProvider([
          new providers.JsonRpcProvider("https://rinkeby.infura.io/v3/f7a467b4bd1045bf991c169d4fefe17b"),
        ]),
      },
      "5": {
        provider: new providers.FallbackProvider([
          new providers.JsonRpcProvider("https://goerli.infura.io/v3/f7a467b4bd1045bf991c169d4fefe17b"),
        ]),
      },
    },
    mnemonic: "category matrix shine sense east large leave pony talk enrich orchard flip",
  };
  return config;
};
