///NXTP Config Generator based on vector/modules/router/src/config.ts
///Differences: removed the
import {Type, Static} from '@sinclair/typebox';
import {readFileSync} from "fs";
import Ajv from "ajv";

const ajv = new Ajv();

//todo:why was I getting an error importing the same exact Types from @connext/vector-types?; possible sinclair version mismatch?
// String pattern types
export const TAddress = Type.RegEx(/^0x[a-fA-F0-9]{40}$/);
export const TIntegerString = Type.RegEx(/^([0-9])*$/);
export const TUrl = Type.String({ format: "uri" });
// Convenience types
export const TChainId = Type.Number({ minimum: 1 });
export const TDecimalString = Type.RegEx(/^[0-9]*\.?[0-9]*$/);

export type RebalanceProfile = Static<typeof RebalanceProfileSchema>;

const RebalanceProfileSchema = Type.Object({
    chainId: TChainId,
    assetId: TAddress,
    reclaimThreshold: TIntegerString,
    target: TIntegerString,
    collateralizeThreshold: TIntegerString,
});
export const AllowedSwapSchema = Type.Object({
    fromChainId: TChainId,
    toChainId: TChainId,
    fromAssetId: TAddress,
    toAssetId: TAddress,
    priceType: Type.Union([Type.Literal("hardcoded")]),
    hardcodedRate: TDecimalString,
    rebalancerUrl: Type.Optional(Type.String({ format: "uri" })),
    rebalanceThresholdPct: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    percentageFee: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    flatFee: Type.Optional(TIntegerString),
    gasSubsidyPercentage: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
});

const NxtpRouterConfigSchema = Type.Object({
    adminToken: Type.String(),
    allowedSwaps: Type.Array(AllowedSwapSchema),
    nodeUrl: TUrl,
    chainProviders: Type.Dict(TUrl),
    routerUrl: TUrl,
    logLevel: Type.Optional(
        Type.Union([
            Type.Literal("fatal"),
            Type.Literal("error"),
            Type.Literal("warn"),
            Type.Literal("info"),
            Type.Literal("debug"),
            Type.Literal("trace"),
            Type.Literal("silent"),
        ]),
    ),
    messagingUrl: Type.Optional(TUrl),
    natsUrl: Type.Optional(Type.String()),
    authUrl: Type.Optional(TUrl),
    rebalanceProfiles: Type.Array(RebalanceProfileSchema),
    mnemonic: Type.Optional(Type.String()),
    stableAmmChainId: Type.Optional(TChainId),
    stableAmmAddress: Type.Optional(TAddress),
    routerMaxSafePriceImpact: Type.Optional(TIntegerString),
    autoRebalanceInterval: Type.Optional(Type.Number({ minimum: 1_800_000 })),
    basePercentageFee: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    baseFlatFee: Type.Optional(TIntegerString),
    baseGasSubsidyPercentage: Type.Optional(Type.Number({ minimum: 0, maximum: 100 })),
    feeQuoteExpiry: Type.Optional(Type.Number({ minimum: 15_000 })),
})

export type NxtpRouterConfig = Static<typeof NxtpRouterConfigSchema>;

export const getEnvConfig = (): NxtpRouterConfig => {
    let configJson: Record<string, any> = {};
    let configFile: any = {};

    try {
        let json;
        if (process.env.NXTP_CONFIG_FILE) {
            console.log("process.env.NXTP_CONFIG_FILE: ", process.env.NXTP_CONFIG_FILE);
            json = readFileSync(process.env.NXTP_CONFIG_FILE, "utf-8");
        } else {
            json = readFileSync("config.json", "utf-8");
        }
        if (json) {
            configFile = JSON.parse(json);
            console.log("configFile: ", configFile);
            console.log("Found configFile");
        }
    } catch (e) {
        console.warn("No config file available...");
    }
    // return configFile;

    if (process.env.VECTOR_CONFIG) {
        try {
            configJson = JSON.parse(process.env.NXTP_CONFIG || "");
            if(configJson)
                console.log("Found process.env.VECTOR_CONFIG");
        } catch (e) {
            console.warn("No VECTOR_CONFIG exists...");
        }
    }

    const nxtpConfig:NxtpRouterConfig = {
        mnemonic: process.env.NXTP_MNEMONIC || configJson.mnemonic || configFile.mnemonic,
        messagingUrl: process.env.NXTP_MESSAGING_URL || configJson.messagingUrl || configFile.messagingUrl,
        authUrl: process.env.NXTP_AUTH_URL || configJson.authUrl || configFile.authUrl,
        natsUrl: process.env.NXTP_NATS_URL || configJson.natsUrl || configFile.natsUrl,
        adminToken: process.env.NXTP_ADMIN_TOKEN || configJson.adminToken || configFile.adminToken,
        baseGasSubsidyPercentage: process.env.NXTP_BASE_GAS_SUBSIDY_PERCENTAGE
            ? process.env.NXTP_BASE_GAS_SUBSIDY_PERCENTAGE
            : configJson.baseGasSubsidyPercentage
                ? configJson.baseGasSubsidyPercentage
                : configFile.baseGasSubsidyPercentage
                    ? configFile.baseGasSubsidyPercentage
                    : 100,
        chainProviders: process.env.NXTP_CHAIN_PROVIDERS
            ? JSON.parse(process.env.NXTP_CHAIN_PROVIDERS)
            : configJson.chainProviders
                ? configJson.chainProviders
                : configFile.chainProviders,
        allowedSwaps: process.env.NXTP_ALLOWED_SWAPS
            ? JSON.parse(process.env.NXTP_ALLOWED_SWAPS)
            : configJson.allowedSwaps
                ? configJson.allowedSwaps
                : configFile.allowedSwaps,
        stableAmmChainId:
            process.env.NXTP_STABLE_AMM_CHAIN_ID || configJson.stableAmmChainId || configFile.stableAmmChainId,
        routerMaxSafePriceImpact:
            process.env.ROUTER_MAX_SAFE_PRICE_IMPACT ||
            configJson.routerMaxSafePriceImpact ||
            configFile.routerMaxSafePriceImpact,
        stableAmmAddress:
            process.env.NXTP_STABLE_AMM_ADDRESS || configJson.stableAmmAddress || configFile.stableAmmAddress,
        nodeUrl: process.env.NXTP_NODE_URL || configJson.nodeUrl || configFile.nodeUrl || "http://node:8000",
        routerUrl: process.env.NXTP_ROUTER_URL || configJson.routerUrl || configFile.routerUrl || "http://router:8000",
        rebalanceProfiles:
            process.env.NXTP_REBALANCE_PROFILES || configJson.rebalanceProfiles || configFile.rebalanceProfiles,
        autoRebalanceInterval:
            process.env.NXTP_AUTOREBALANCE_INTERVAL || configJson.autoRebalanceInterval || configFile.autoRebalanceInterval,
        baseFlatFee: process.env.NXTP_BASE_FLAT_FEE || configJson.baseFlatFee || configFile.baseFlatFee,
        basePercentageFee:
            process.env.NXTP_BASE_PERCENTAGE_FEE || configJson.basePercentageFee || configFile.basePercentageFee,
        feeQuoteExpiry: process.env.NXTP_FEE_QUOTE_EXPIRY || configJson.feeQuoteExpiry || configFile.feeQuoteExpiry,
        logLevel: process.env.NXTP_FEE_LOG_LEVEL || configJson.logLevel || configFile.logLevel,
    };
    return  nxtpConfig;
}

const nxtpConfig:NxtpRouterConfig = getEnvConfig();
const validate = ajv.compile(NxtpRouterConfigSchema);

const valid = validate(nxtpConfig);

if (!nxtpConfig.adminToken && !nxtpConfig.messagingUrl && !nxtpConfig.natsUrl) {
    nxtpConfig.messagingUrl = "http://messaging";
}

if (!valid) {
    console.error(`Invalid config: ${JSON.stringify(nxtpConfig, null, 2)}`);
    throw new Error(validate.errors?.map((err) => err.message).join(","));
}
