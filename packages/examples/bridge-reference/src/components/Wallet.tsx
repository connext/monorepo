/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { ReactElement, useState, useEffect, useCallback } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { providers, utils } from "ethers";
import { IoWalletOutline } from "react-icons/io5";

import { useWallet } from "../contexts/Wallet";
import { useChains } from "../contexts/Chains";

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://mainnet.infura.io/v3/${process.env.PUBLIC_INFURA_ID}`,
        56: "https://bsc-dataseed.binance.org",
        137: "https://polygon-rpc.com",
        42161: "https://arb1.arbitrum.io/rpc",
        10: "https://mainnet.optimism.io",
        43114: "https://api.avax.network/ext/bc/C/rpc",
        250: "https://rpc.ftm.tools",
        100: "https://rpc.gnosischain.com",
        1284: "https://rpc.api.moonbeam.network",
        1285: "https://rpc.api.moonriver.moonbeam.network",
        122: "https://rpc.fuse.io",
        2001: "https://rpc.c1.milkomeda.com:8545",
        288: "https://mainnet.boba.network",
        1666600000: "https://api.harmony.one",
        192837465: "https://mainnet.gather.network",
        25: "https://evm.cronos.org",
        9001: "https://eth.bd.evmos.org:8545",
        3: `https://ropsten.infura.io/v3/${process.env.PUBLIC_INFURA_ID}`,
        4: `https://rinkey.infura.io/v3/${process.env.PUBLIC_INFURA_ID}`,
        5: `https://goerli.infura.io/v3/${process.env.PUBLIC_INFURA_ID}`,
        42: `https://kovan.infura.io/v3/${process.env.PUBLIC_INFURA_ID}`,
        97: "https://data-seed-prebsc-1-s1.binance.org:8545",
        80001: "https://rpc-mumbai.matic.today",
        421611: "https://rinkeby.arbitrum.io/rpc",
        69: "https://kovan.optimism.io",
        43113: "https://api.avax-test.network/ext/bc/C/rpc",
        4002: "https://rpc.testnet.fantom.network",
        1287: "https://rpc.api.moonbase.moonbeam.network",
      },
    },
    display: {
      description: "Gnosis Safe is not supported.",
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      infuraId: process.env.PUBLIC_INFURA_ID,
      appName: "Coinbase Wallet",
      appLogoUrl: "/logos/wallets/coinbase.svg",
    },
  },
};

const chainIdToNetwork = (chain_id: number) => {
  return {
    1: "mainnet",
    56: "binance",
    137: "matic",
    42161: "arbitrum",
    10: "optimism",
    43114: "avalanche-fuji-mainnet",
    250: "fantom",
    100: "xdai",
    // 1284: 'moonbeam',
    // 1285: 'moonriver',
    // 122: 'fuse',
    // 2001: 'milkomeda',
    // 288: 'boba',
    // 1666600000: 'harmony-one',
    // 192837465: 'gather',
    25: "cronos",
    // 9001: 'evmos',
    3: "ropsten",
    4: "rinkeby",
    5: "goerli",
    42: "kovan",
    80001: "mumbai",
    421611: "arbitrum-rinkeby",
  }[chain_id];
};

let web3Modal: Web3Modal;

interface Props {
  connectChainId?: number;
  main?: boolean;
  hidden?: string;
  disabled?: boolean;
  className?: string;
  children?: ReactElement;
  onChangeNetwork?: () => void;
}

export const Wallet = ({
  connectChainId,
  main,
  hidden,
  disabled = false,
  className,
  onChangeNetwork,
  children,
}: Props) => {
  const walletContext = useWallet();
  const chainsContext = useChains();

  const wallet_data = { ...walletContext.state };
  const { chains } = { ...chainsContext.state };

  const { provider, web3_provider, chain_id } = { ...wallet_data };

  const [defaultChainId, setDefaultChainId] = useState<number>();

  useEffect(() => {
    if (connectChainId && connectChainId !== defaultChainId) {
      setDefaultChainId(connectChainId);
    }
  }, [connectChainId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (web3_provider) {
        walletContext.dispatch({
          type: "set",
          payload: { default_chain_id: defaultChainId },
        });
      }

      web3Modal = new Web3Modal({
        network: (defaultChainId && chainIdToNetwork(defaultChainId)) || "mainnet",
        cacheProvider: true,
        providerOptions,
      });
    }
  }, [defaultChainId]);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      connect();
    }
  }, [web3Modal]);

  const connect = useCallback(async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const network = await web3Provider.getNetwork();
    const address = await signer.getAddress();

    walletContext.dispatch({
      type: "set",
      payload: {
        provider,
        web3_provider: web3Provider,
        signer,
        chain_id: network.chainId,
        address,
      },
    });
  }, [web3Modal]);

  const disconnect = useCallback(
    async (is_reestablish?: boolean) => {
      if (web3Modal && !is_reestablish) {
        web3Modal.clearCachedProvider();
      }

      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }

      walletContext.dispatch({
        type: "reset",
      });
    },
    [web3Modal, provider],
  );

  const switchNetwork = async () => {
    if (connectChainId && connectChainId !== chain_id && provider) {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(connectChainId) }],
        });
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: chains?.find((c) => c.chain_id === connectChainId)?.provider_params,
            });
          } catch (error: unknown) {}
        }
      }
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleChainChanged = (chainId: string) => {
        if (!chainId) {
          disconnect();
        } else {
          connect();
        }
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (!accounts[0]) {
          disconnect();
        } else {
          walletContext.dispatch({
            type: "set",
            payload: {
              address: accounts[0],
            },
          });
        }
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        disconnect(error.code === 1013);

        if (error.code === 1013) {
          connect();
        }
      };

      provider.on("chainChanged", handleChainChanged);
      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return (
    (!hidden && (
      <>
        {web3_provider ? (
          !main && connectChainId ? (
            <button
              disabled={disabled}
              onClick={() => {
                switchNetwork();

                if (onChangeNetwork) {
                  onChangeNetwork();
                }
              }}
              className={className}
            >
              {children || (
                <div className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg whitespace-nowrap font-medium py-1 px-2">
                  Switch Network
                </div>
              )}
            </button>
          ) : (
            <button disabled={disabled} onClick={() => disconnect()} className={className}>
              {children || (
                <div className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 rounded-lg whitespace-nowrap text-white font-medium py-1 px-2">
                  Disconnect
                </div>
              )}
            </button>
          )
        ) : (
          <button disabled={disabled} onClick={connect} className={className}>
            {children || (
              <div className="flex items-center space-x-1.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg whitespace-nowrap text-white font-medium py-1 px-2">
                <span>Connect</span>
                <IoWalletOutline size={18} />
              </div>
            )}
          </button>
        )}
      </>
    )) ||
    null
  );
};
