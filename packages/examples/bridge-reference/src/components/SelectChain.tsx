import React from "react";

import { getChainTitle } from "../utils/chain";
import { Chain, ChainTerminus } from "../types/chain";
import { useChains } from "../contexts/Chains";

interface Props {
  chain_terminus?: ChainTerminus;
  chain?: Chain;
  onSelect: (chain?: Chain) => void;
}

export const SelectChain = ({ chain_terminus, chain, onSelect }: Props) => {
  const {
    state: { chains },
  } = useChains();

  return (
    <div>
      <label
        htmlFor={chain_terminus}
        className="block capitalize items-center text-slate-400 dark:text-white text-sm sm:text-base sm:font-semibold gap-2 pt-8 pb-2"
      >
        {chain_terminus}
      </label>
      <select
        id={chain_terminus}
        name={chain_terminus}
        value={chain?.chain_id}
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
