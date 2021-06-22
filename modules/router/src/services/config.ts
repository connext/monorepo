// import {
//     AllowedSwap,
//     Result,
//     jsonifyError,
//     IVectorChainReader,
//     DEFAULT_ROUTER_MAX_SAFE_PRICE_IMPACT,
// } from "@connext/vector-types"
import { JsonRpcProvider } from "@ethersproject/providers";
import { getAddress } from "@ethersproject/address";
import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";

import {getConfig} from "../config";
// import { ConfigServiceError } from "../errors";
import { BaseLogger } from "pino";
import { AddressZero } from "@ethersproject/constants";

export const getMappedAssets = (_assetId: string, _chainId: number): { assetId: string; chainId: number }[] => {
    let pair: { assetId: string; chainId: number }[] = [{ assetId: _assetId, chainId: _chainId }];
    const uniquePairs = Array.from(new Set(pair.map((s) => s.assetId))).map((x) => {
        return pair.find((z) => z.assetId === x)!;
    });
    return uniquePairs;
}
export const onSwapGivenIn = async (

)