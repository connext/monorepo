import React, { useEffect } from "react";
import { create, SdkConfig, ChainConfig } from "@connext/sdk-core";
import { HiOutlineDocumentSearch } from "react-icons/hi";

import { useWallet } from "../contexts/Wallet";
import { useChains } from "../contexts/Chains";
import { useAssets } from "../contexts/Assets";
import { useSdk } from "../contexts/Sdk";

import { Wallet } from "./Wallet";

export const Header = () => {
  const walletContext = useWallet();
  const {
    state: { chains },
  } = useChains();
  const {
    state: { assets },
  } = useAssets();

  const {
    state: { sdk },
    dispatch,
  } = useSdk();

  const { web3_provider, provider, address, signer } = { ...walletContext.state };

  // init sdk
  useEffect(() => {
    const init = async () => {
      if (!(chains && assets)) {
        return;
      }

      const chains_config: Record<string, ChainConfig> = {};
      for (const chain_data of chains) {
        const { chain_id, domain_id, provider_params } = { ...chain_data };

        const rpc_urls = provider_params?.[0]?.rpcUrls?.filter((url) => url) || [];

        if (domain_id) {
          chains_config[domain_id] = {
            providers: rpc_urls,
            assets: assets
              .filter((a) => a?.contracts?.findIndex((c) => c?.chain_id === chain_id) > -1)
              .map((a) => {
                const { name, contracts } = { ...a };
                const contract_data = contracts.find((c) => c?.chain_id === chain_id);
                const { contract_address } = { ...contract_data };
                const symbol = contract_data?.symbol || a?.symbol;
                return {
                  name: name || symbol,
                  address: contract_address,
                  symbol,
                  mainnetEquivalent: undefined,
                };
              }),
          } as ChainConfig;
        }
      }
      let network: "testnet" | "mainnet" | "local" | "devnet" | undefined = undefined;
      let environment: "staging" | "production" | undefined = undefined;

      if (
        process.env.NEXT_PUBLIC_NETWORK === "testnet" ||
        process.env.NEXT_PUBLIC_NETWORK === "mainnet" ||
        process.env.NEXT_PUBLIC_NETWORK === "local" ||
        process.env.NEXT_PUBLIC_NETWORK === "devnet"
      ) {
        network = process.env.NEXT_PUBLIC_NETWORK;
      } else if (!process.env.NEXT_PUBLIC_ENVIRONMENT) {
        console.error("Wrong NEXT_PUBLIC_NETWORK environment variable");
      }

      if (process.env.NEXT_PUBLIC_ENVIRONMENT === "staging" || process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
        environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
      } else if (!process.env.NEXT_PUBLIC_ENVIRONMENT) {
        console.error("Wrong NEXT_PUBLIC_ENVIRONMENT environment variable");
      }

      const config: SdkConfig = {
        chains: chains_config,
        logLevel: "info",
        network,
        environment,
      };

      dispatch({
        type: "set",
        payload: await create(config),
      });

      console.log("[SDK config]", config);
    };

    init();
  }, [chains, assets]);

  useEffect(() => {
    const update = async () => {
      if (sdk && address) {
        if (sdk.sdkBase) {
          await sdk.sdkBase.changeSignerAddress(address);
        }
        if (sdk.sdkRouter) {
          await sdk.sdkRouter.changeSignerAddress(address);
        }

        dispatch({
          type: "set",
          payload: sdk,
        });

        console.log("[Signer address]", address);
      }
    };
    update();
  }, [sdk, provider, web3_provider, address, signer]);

  const className = `bg-transparent hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg flex items-center uppercase text-blue-600 dark:text-white text-xs font-medium font-bold space-x-1.5 py-2 px-2.5`;

  return (
    <div className="py-4 border-b border-slate-900/10 px-8  dark:border-slate-300/10 mx-4 lg:mx-0">
      <div className="flex justify-between lg:px-10 items-center px-1 pb-5 md:pb-0">
        <div className="flex">
          {/* <img src={connextLogo} alt="Connext Logo" className="h-8 w-auto sm:h-10 sm:mr-3" /> */}
          <div className="hidden sm:block">
            <div className="normal-case text-base font-semibold text-white">Connext</div>
            <div className="max-w-min bg-blue-600 rounded whitespace-nowrap text-white pb-0.5 px-1.5 mt-0.5">
              {process.env.NEXT_PUBLIC_NETWORK}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
          {web3_provider && address && (
            <div className="hidden sm:flex flex-col space-y-0.5 mx-2">
              <div className="flex items-center space-x-2">
                <span title={address} className="normal-case text-black dark:text-white text-base font-semibold">
                  <span>{address}</span>
                </span>
              </div>
            </div>
          )}
          {address ? (
            <a
              href={`${process.env.PUBLIC_EXPLORER_URL}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              <span className="pr-1">
                <HiOutlineDocumentSearch />
              </span>{" "}
              My Transfers
            </a>
          ) : (
            <a href={process.env.PUBLIC_EXPLORER_URL} target="_blank" rel="noopener noreferrer" className={className}>
              <span className="pr-1">
                <HiOutlineDocumentSearch />
              </span>{" "}
              Explorer
            </a>
          )}

          <div className="mx-2">
            <Wallet main={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
