import React, { useState, useEffect } from "react";
import { constants, Contract, utils, providers, BigNumberish } from "ethers";

import { Chain, ChainTerminus } from "../types/chain";
import { useChains } from "../contexts/Chains";
import { useAssets } from "../contexts/Assets";
import { Contract as IContract } from "../types/asset";
import { useWallet } from "../contexts/Wallet";
import { useBalances } from "../contexts/Balances";
import { Bridge } from "../types/bridge";

import { Balance } from "./Balance";
import { SelectAsset } from "./SelectAsset";
import { SelectChain } from "./SelectChain";
import { TransferButton } from "./TransferButton";

export const CrossChainTransfer = () => {
  const balancesContext = useBalances();

  const {
    state: { address },
  } = useWallet();

  const {
    state: { chains },
  } = useChains();

  const {
    state: { assets },
  } = useAssets();

  const [bridge, setBridge] = useState<Bridge>({
    source_chain: chains[0],
    destination_chain: chains[1],
    asset: assets[0],
    amount: undefined,
  });

  // update balances
  useEffect(() => {
    balancesContext.dispatch({
      type: "reset",
    });

    if (address) {
      getBalances(bridge.source_chain);
      getBalances(bridge.destination_chain);
    }
  }, [address]);

  const getBalances = (chain?: Chain) => {
    const getBalance = async (chain_id: number, contract_data: IContract) => {
      const { contract_address, contract_decimals } = { ...contract_data };
      const decimals = contract_decimals || 18;

      const rpc_urls = chain?.provider_params?.[0]?.rpcUrls?.filter((url) => url) || [];
      const rpc = new providers.FallbackProvider(rpc_urls.map((url) => new providers.JsonRpcProvider(url)));

      let balance: BigNumberish = 0;

      if (rpc && contract_address) {
        if (contract_address === constants.AddressZero) {
          balance = await rpc.getBalance(address!);
        } else {
          const contract = new Contract(
            contract_address,
            ["function balanceOf(address owner) view returns (uint256)"],
            rpc,
          );

          balance = await contract.balanceOf(address);
        }
      }

      balancesContext.dispatch({
        type: "set",
        payload: {
          chainId: chain_id,
          balance: {
            ...contract_data,
            amount: Number(utils.formatUnits(balance, decimals)),
          },
        },
      });
    };
    const { chain_id } = { ...chains?.find((c) => c?.id === chain?.id) };
    const contracts = assets
      ?.map((asset) => {
        return {
          ...asset,
          ...asset?.contracts?.find((c) => c?.chain_id === chain_id),
        };
      })
      .filter((a) => a?.contract_address);
    contracts?.forEach((c) => getBalance(chain_id!, c));
  };

  return (
    <div className="bg-slate-800 flex flex-col 2xl:w-[30%] lg:w-[55%] px-8 py-2 w-[85%] xl:w-[38%] rounded-xl pb-8 border border-slate-800">
      <div className="grid grid-cols-2 gap-4">
        <SelectChain
          onSelect={(c) => {
            const _source_chain: Chain | undefined = c;
            console.log(`selected chain: ${c?.name}`);

            setBridge({
              ...bridge,
              source_chain: _source_chain,
            });

            getBalances(_source_chain);
          }}
          chain_terminus={ChainTerminus.origin}
          chain={bridge.source_chain}
        />
        <SelectChain
          onSelect={(c) => {
            // const _source_chain = c === bridge.source_chain ? bridge.destination_chain : bridge.source_chain;
            console.log(`selected chain: ${c?.name}`);
            const _destination_chain: Chain | undefined = c;

            setBridge({
              ...bridge,
              destination_chain: _destination_chain,
            });

            // getBalances(_source_chain);
            getBalances(_destination_chain);
          }}
          chain_terminus={ChainTerminus.destination}
          chain={bridge.destination_chain}
        />
      </div>
      <SelectAsset
        disabled={!(bridge.source_chain && bridge.destination_chain)}
        value={bridge.asset}
        onSelect={(a) => {
          setBridge({
            ...bridge,
            asset: a,
          });
        }}
      />

      <div className="grid grid-flow-row grid-cols-5 sm:grid-cols-5 gap-6 pt-8 pb-8">
        <div className="col-span-2 sm:col-span-2 space-y-1">
          <div className="flex items-center justify-start sm:justify-start space-x-1 sm:space-x-2.5">
            <span className="text-slate-400 dark:text-white text-sm sm:text-base sm:font-semibold">Amount</span>
          </div>
          {(bridge.source_chain?.chain_id && bridge.asset && (
            <div className="flex items-center space-x-1">
              <div className="text-slate-400 dark:text-slate-600 text-xs font-medium">Balance</div>
              <Balance chainId={bridge.source_chain?.chain_id} asset={bridge.asset} />
            </div>
          )) || <></>}
        </div>
        <div className="col-span-3 sm:col-span-3 flex items-center justify-end sm:justify-end">
          <input
            type="number"
            placeholder="0.00"
            disabled={!bridge.asset}
            value={typeof bridge.amount === "number" && bridge.amount >= 0 ? bridge.amount : ""}
            onChange={(e) => {
              const regex = /^[0-9.\b]+$/;
              let _amount = 0;
              if (e.target.value === "" || regex.test(e.target.value)) {
                _amount = Number(e.target.value);
              }
              _amount = _amount < 0 ? 0 : _amount;

              setBridge({
                ...bridge,
                amount: _amount && !isNaN(_amount) ? Number(_amount) : _amount,
              });
            }}
            onKeyDown={(e) => ["e", "E", "-"].includes(e.key) && e.preventDefault()}
            className="w-36 sm:w-48 bg-slate-50 focus:bg-slate-100 dark:bg-slate-900 dark:focus:bg-slate-700 border-0 focus:ring-0 rounded-xl sm:text-lg font-semibold text-right py-1.5 sm:py-2 px-2 sm:px-3"
          />
        </div>
      </div>
      <TransferButton bridge={bridge} setBridge={setBridge} getBalances={getBalances} />
    </div>
  );
};
