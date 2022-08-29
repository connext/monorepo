import React from "react";

import { getChainTitle, Chain } from "../utils/chain";
import { useChains } from "../contexts/Chains";

interface Props {
  origin?: boolean;
  source_chain?: Chain;
  destination_chain?: Chain;
  onSelect: (chain?: Chain) => void;
}

export const SelectChain = ({ origin, source_chain, destination_chain, onSelect }: Props) => {
  const {
    state: { chains },
  } = useChains();

  const chainType = origin ? "origin" : "destination";

  return (
    <div>
      <label
        htmlFor={chainType}
        className="block capitalize items-center text-slate-400 dark:text-white text-sm sm:text-base sm:font-semibold gap-2 pt-8 pb-2"
      >
        {chainType}
      </label>
      <select
        id={chainType}
        name={chainType}
        value={origin ? source_chain?.chain_id : destination_chain?.chain_id}
        onChange={(e) => {
          onSelect(chains.find((chain) => chain.chain_id.toString() === e.target.value));
        }}
        className="bg-slate-50 dark:bg-slate-900 px-3 py-3 rounded-md border-0 focus:ring-0 gap-2 w-full"
      >
        {chains.map((chain) => (
          <option key={chain.chain_id} title={getChainTitle(chain)} value={chain.chain_id}>
            {getChainTitle(chain)}
          </option>
        ))}
      </select>
    </div>
  );
};
