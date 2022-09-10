import React from "react";

import { useBalances } from "../contexts/Balances";
import { useWallet } from "../contexts/Wallet";
import { Asset } from "../types/asset";

interface Props {
  chainId: number;
  asset: Asset;
}

export const Balance = ({ chainId, asset }: Props) => {
  const {
    state: { web3_provider },
  } = useWallet();

  const balancesContext = useBalances();

  const contract_data = asset.contracts?.find((c) => c?.chain_id === chainId);

  const balance = balancesContext.state?.balances?.[chainId]?.find(
    (b) => b?.contract_address?.toLowerCase() === contract_data?.contract_address?.toLowerCase(),
  );

  const amount = balance && Number(balance.amount);
  const symbol = contract_data?.symbol || asset?.symbol;

  return (
    (chainId && asset && (
      <div className="flex items-center justify-center text-slate-600 dark:text-white text-xs space-x-1">
        {typeof amount === "number" ? (
          <>
            <span className="font-bold">{amount}</span>
            <span className="hidden sm:block font-semibold">{symbol}</span>
          </>
        ) : typeof amount === "string" ? (
          <span>n/a</span>
        ) : (
          web3_provider && <span>Loading...</span>
        )}
      </div>
    )) || <></>
  );
};
