import React from "react";

import { useAssets } from "../contexts/Assets";
import { Asset } from "../types/asset";

interface Props {
  disabled?: boolean;
  value?: Asset;
  onSelect: (asset?: Asset) => void;
}

export const SelectAsset = ({ value, disabled, onSelect }: Props) => {
  const {
    state: { assets },
  } = useAssets();

  return (
    <div>
      <label
        htmlFor="asset"
        className="block items-center text-slate-400 dark:text-white text-sm sm:text-base sm:font-semibold gap-2 pt-8 pb-2"
      >
        Token
      </label>
      <select
        id="asset"
        disabled={disabled}
        name="asset"
        autoComplete="asset-name"
        value={value?.id}
        onChange={(e) => {
          onSelect(assets.find((asset) => asset.id.toString() === e.target.value));
        }}
        className="bg-slate-50 dark:bg-slate-900 px-3 py-3 rounded-md border-0 focus:ring-0 gap-2 w-full"
      >
        {assets.map((asset) => (
          <option key={asset.id} title={asset.name} value={asset.id}>
            {asset.name}
          </option>
        ))}
      </select>
    </div>
  );
};
