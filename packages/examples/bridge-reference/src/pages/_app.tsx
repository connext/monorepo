// import React from "react";

// import { CrossChainTransfer } from "../components/CrossChainTransfer";
// import { Pool } from "../components/Pool";
import Head from "next/head";

import { Header } from "../components/Header";
import { WalletProvider } from "../contexts/Wallet";
import { ChainsProvider } from "../contexts/Chains";
import { AssetsProvider } from "../contexts/Assets";
import { BalancesProvider } from "../contexts/Balances";
import { SdkProvider } from "../contexts/Sdk";
import { Pools } from "../components/Pools";
import { CrossChainTransfer } from "../components/CrossChainTransfer";

const App = () => {
  return (
    <>
      <Head>
        <title>Bridge Reference</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <WalletProvider>
        <ChainsProvider>
          <AssetsProvider>
            <BalancesProvider>
              <SdkProvider>
                <div className="overflow-auto pb-3 px-3 h-full antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
                  <Header />
                  <div className="flex justify-center pt-10 pb-10 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                    <p>Cross-Chain Transfer</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <CrossChainTransfer />
                  </div>
                  <div className="flex justify-center pt-10 pb-10 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
                    <p>Pool</p>
                  </div>
                  <div className="flex justify-center items-center">
                    <Pools />
                  </div>
                </div>
              </SdkProvider>
            </BalancesProvider>
          </AssetsProvider>
        </ChainsProvider>
      </WalletProvider>
    </>
  );
};

export default App;
