///NXTP Config Generator based on vector/modules/router/src/config.ts
import { Type, Static } from "@sinclair/typebox";
import { ajv, ChainData, TAddress, TLogLevel } from "@connext/nxtp-utils";
import { ConnextContractDeployments, ContractPostfix } from "@connext/nxtp-txservice";

import { getChainData } from "./lib/helpers";

export const TAssetDescription = Type.Object({
  name: Type.String(),
  address: TAddress,
  symbol: Type.String(),
  mainnetEquivalent: Type.Optional(TAddress),
});

export type AssetDescription = Static<typeof TAssetDescription>;

export const TChainDeployments = Type.Object({
  connext: TAddress,
  multisend: Type.Optional(TAddress),
  unwrapper: Type.Optional(TAddress),
  stableSwap: Type.Optional(TAddress),
});

export type ChainDeployments = Static<typeof TChainDeployments>;

export const TChainConfig = Type.Object({
  providers: Type.Optional(Type.Array(Type.String())),
  gasStations: Type.Optional(Type.Array(Type.String())),
  confirmations: Type.Optional(Type.Integer({ minimum: 1 })), // What we consider the "safe confirmations" number for this chain.
  chainId: Type.Optional(Type.Number()),
  deployments: Type.Optional(TChainDeployments),
  disabled: Type.Optional(Type.Boolean()),
  disabledAssets: Type.Optional(Type.Array(TAddress)), // By adopted address
});

export type ChainConfig = Static<typeof TChainConfig>;

export const SdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TChainConfig),
  signerAddress: Type.Optional(TAddress),
  logLevel: Type.Optional(TLogLevel),
  cartographerUrl: Type.Optional(Type.String()),
  network: Type.Optional(
    Type.Union([Type.Literal("testnet"), Type.Literal("mainnet"), Type.Literal("local"), Type.Literal("devnet")]),
  ),
  environment: Type.Optional(Type.Union([Type.Literal("staging"), Type.Literal("production")])),
});

export type SdkConfig = Static<typeof SdkConfigSchema>;

export const TValidationChainConfig = Type.Object({
  providers: Type.Array(Type.String()),
  gasStations: Type.Array(Type.String()),
  confirmations: Type.Integer({ minimum: 1 }), // What we consider the "safe confirmations" number for this chain.
  deployments: Type.Object({
    connext: TAddress,
    multisend: Type.Optional(TAddress),
    stableSwap: Type.Optional(TAddress),
  }),
  assets: Type.Optional(Type.Array(TAssetDescription)), /// Not Being Used
});

export const NxtpValidationSdkConfigSchema = Type.Object({
  chains: Type.Record(Type.String(), TValidationChainConfig),
  signerAddress: Type.Optional(TAddress),
  logLevel: TLogLevel,
  cartographerUrl: Type.String(),
  network: Type.Union([
    Type.Literal("testnet"),
    Type.Literal("mainnet"),
    Type.Literal("local"),
    Type.Literal("devnet"),
  ]),
  environment: Type.Union([Type.Literal("staging"), Type.Literal("production")]),
});

/**
 * Gets and validates the router config from the environment.
 *
 * @returns The router config with sensible defaults
 */
export const getEnvConfig = (
  _nxtpConfig: SdkConfig,
  chainData: Map<string, ChainData>,
  deployments: ConnextContractDeployments,
): SdkConfig => {
  const nxtpConfig: SdkConfig = {
    ..._nxtpConfig,
    logLevel: _nxtpConfig.logLevel || "info",
    network: _nxtpConfig.network || "mainnet",
    environment: _nxtpConfig.environment || "production",
    cartographerUrl: _nxtpConfig.cartographerUrl
      ? _nxtpConfig.cartographerUrl
      : _nxtpConfig.network === "testnet"
      ? _nxtpConfig.environment === "staging"
        ? "https://postgrest.testnet.staging.connext.ninja"
        : "https://postgrest.testnet.connext.ninja"
      : "https://postgrest.mainnet.connext.ninja",
  };

  const defaultConfirmations = chainData && (chainData.get("1")?.confirmations ?? 1 + 3);

  const contractPostfix: ContractPostfix =
    nxtpConfig.environment === "production"
      ? ""
      : (`${nxtpConfig.environment![0].toUpperCase()}${nxtpConfig.environment!.slice(1)}` as ContractPostfix);
  // add contract deployments if they exist
  Object.entries(nxtpConfig.chains).forEach(([domainId, chainConfig]) => {
    nxtpConfig.chains[domainId].disabled = chainConfig.disabled ?? false;
    nxtpConfig.chains[domainId].disabledAssets = chainConfig.disabledAssets ?? [];

    const chainDataForChain = chainData.get(domainId);
    const chainRecommendedConfirmations = chainDataForChain?.confirmations ?? defaultConfirmations;
    const chainRecommendedGasStations = chainDataForChain?.gasStations ?? [];

    // Make sure deployments is filled out correctly.
    // allow passed in address to override
    // format: { [domainId]: { { "deployments": { "connext": <address>, ... } }
    nxtpConfig.chains[domainId].deployments = {
      connext:
        chainConfig.deployments?.connext ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.connext(chainDataForChain.chainId, contractPostfix, nxtpConfig.network);
            if (res) {
              return res.address;
            }
          }
          throw new Error(`No Connext contract address for domain ${domainId}`);
        })(),
      multisend:
        chainConfig.deployments?.multisend ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.multisend(chainDataForChain.chainId);
            return res?.address;
          }
          return undefined;
        })(),
      unwrapper:
        chainConfig.deployments?.unwrapper ??
        (() => {
          if (chainDataForChain) {
            const res = deployments.unwrapper(chainDataForChain.chainId);
            return res?.address;
          }
          return undefined;
        })(),
    };

    nxtpConfig.chains[domainId].confirmations = chainConfig.confirmations ?? chainRecommendedConfirmations;

    nxtpConfig.chains[domainId].gasStations = (nxtpConfig.chains[domainId].gasStations ?? []).concat(
      chainRecommendedGasStations,
    );
  });

  const validate = ajv.compile(NxtpValidationSdkConfigSchema);

  const valid = validate(nxtpConfig);

  if (!valid) {
    throw new Error(validate.errors?.map((err: unknown) => JSON.stringify(err, null, 2)).join(","));
  }

  return nxtpConfig;
};

/**
 * Caches and returns the environment config
 *
 * @returns The config
 */
export const getConfig = async (
  _nxtpConfig: SdkConfig,
  deployments: ConnextContractDeployments,
  _chainData?: Map<string, ChainData>,
): Promise<{ nxtpConfig: SdkConfig; chainData: Map<string, ChainData> }> => {
  let chainData = _chainData;
  if (!chainData) {
    chainData = await getChainData();
  }
  const nxtpConfig = getEnvConfig(_nxtpConfig, chainData, deployments);
  return { nxtpConfig: nxtpConfig, chainData: chainData };
};

export const domainsToChainNames: Record<string, string> = {
  "6648936": "ethereum",
  "1869640809": "optimism",
  "1886350457": "polygon",
  "1634886255": "arbitrum",
  "6450786": "bsc",
  "6778479": "xdai",
  "1818848877": "linea",
};

// Need to add more domains here.
export const XERC20REGISTRY_DOMAIN_ADDRESS: Record<string, string> = {
  "6648936": "0xbf29a2d67efb6766e44c163b19c6f4118b164702",
  "1869640809": "0x5543eafd20e25fbbbd66e2c154ff8ff8407e3a57",
  "1886350457": "0x3606b0d9c84224892c7407d4e8dcfd7e9e2126a2",
  "1634886255": "0x63828ede703f981a3c4a4460b730faeb97028df1",
  "6450786": "0x222af8c1411dc8b125338cf876547b03467bb3d1",
  "6778479": "0x2056c11b071ae4cdd55007136c2493f3d4c1b678",
  "1818848877": "0x11984dc4465481512eb5b777e44061c158cf2259",
  "1735353714": "0x8aB29a37E7780F6230B4D951fcd69CA8f1014c55",
  "1735356532": "0xaB591adE0D0e08F117086c2b3159e50e2746AcA6",
  "9991": "0xE4e98Bd63F134FFf3DD54BF29cCa024538D836f5",
  "1835365481": "0xbe57a0A92C33dB065D8Db102e27805C1526e0E99", //metis
  "1650553709": "0xcc1ce162fb1d70a377d1542873b1db57f5ff14d1", //base
  "1836016741": "0x689cCB572262e0ca66146FE5Ed5D998543d3AA3B", //mode
};

// Need to add more domains here.
export const LOCKBOX_ADAPTER_DOMAIN_ADDRESS: Record<string, string> = {
  "6648936": "0x45bf3c737e57b059a5855280ca1adb8e9606ac68",
  "1869640809": "0x81dADc774d2ae44Eb30D2290d076Ae67F9800bd5",
  "1886350457": "0x6777c6713F13e499232B3a0CdA246e357a9Cf5EB",
  "1634886255": "0x0B52cA1406eeA3Ce1fcc37dC0121845eF1de3Ae8",
  "6450786": "0xB71D06f2e73918386B75c24dD26c95DD938f7912",
  "6778479": "0x3Cb55bFBB1f4973FCb9705Bab4aBb7E72BF85eAF",
  "1818848877": "0x4895aa5d666c81a04ebcc7a9aa47f249b1c46aa6",
  "1735353714": "0x8528d3B173a149CB0eae5e2d7335123bcF888c9f",
  "1735356532": "0x55fc076b9b0618a657f8986c83a97bd06e8a80f2",
  "9991": "0xec531b272fa2b82efe49ef6d830c2d848753642a",
  "1835365481": "0x5bB83e95f63217CDa6aE3D181BA580Ef377D2109", //metis
  "1650553709": "0x542AaB88B14055e47222791276967Db5f9B840f6", //base
  "1836016741": "0x981A06E33b228299f33a45a892d7AA61d0b95a83", //mode
};
