import React, { useState, useEffect } from "react";
import { Pool as SdkPool } from "@connext/nxtp-sdk";

import { Chain } from "../types/chain";
import { useChains } from "../contexts/Chains";
import { useAssets } from "../contexts/Assets";
import { Asset } from "../types/asset";
import { useSdk } from "../contexts/Sdk";

interface Props {
  chain?: Chain;
  asset?: Asset;
}

export const Pool = ({ chain, asset }: Props) => {
  const {
    state: { chains },
  } = useChains();

  const {
    state: { assets },
  } = useAssets();

  const {
    state: { sdk },
  } = useSdk();

  const [pool, setPool] = useState<SdkPool | undefined>(undefined);
  const [yieldData, setYieldData] = useState<any | undefined>(undefined);

  useEffect(() => {
    const getPool = async (domainId: string, tokenAddress: string) => {
      if (sdk) {
        const p = await sdk.nxtpSdkPool.getPool(domainId, tokenAddress);
        console.log(`getting pool ${domainId} ${tokenAddress}`);
        if (p) {
          setPool(p);
          console.log(p);
        }
      }
    };

    const getYieldData = async (domainId: string, tokenAddress: string) => {
      if (sdk) {
        const d = await sdk.nxtpSdkPool.getYieldData(domainId, tokenAddress);
        console.log(`getting yield data ${domainId} ${tokenAddress}`);
        if (d) {
          setYieldData(d);
          console.log(d);
        }
      }
    };

    if (sdk) {
      const chain_data = chains?.find((c) => c?.id === chain?.id);
      const asset_data = assets?.find((a) => a?.id === asset?.id);
      const asset_contract = asset_data?.contracts?.find((c) => c?.chain_id === chain_data?.chain_id);
      if (asset_contract) {
        getPool(chain_data!.domain_id!, asset_contract.contract_address!);
        getYieldData(chain_data!.domain_id!, asset_contract.contract_address!);
      }
    }
  }, [chain, asset]);

  return (
    <>
      <div>{JSON.stringify(pool)}</div>
      <div>{JSON.stringify(yieldData)}</div>
    </>
  );
};
