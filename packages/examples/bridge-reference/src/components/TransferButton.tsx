/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState, useEffect } from "react";
import { BiMessageError, BiMessageCheck, BiMessageDetail } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { FixedNumber, utils } from "ethers";
import { XTransferStatus } from "@connext/nxtp-utils";
import { SdkXCallParams } from "@connext/sdk-core";

import { useWallet } from "../contexts/Wallet";
import { useAssets } from "../contexts/Assets";
import { useChains } from "../contexts/Chains";
import { Bridge } from "../types/bridge";
import { useSdk } from "../contexts/Sdk";
import { useBalances } from "../contexts/Balances";
import { Chain } from "../types/chain";

import { Wallet } from "./Wallet";
import Alert from "./Alert";

type Props = {
  bridge: Bridge;
  setBridge: (bridge: Bridge) => void;
  getBalances: (chain?: Chain) => void;
};

type Response = { status: string; message: string; tx_hash?: string };

const GAS_LIMIT_ADJUSTMENT = Number(process.env.GAS_LIMIT_ADJUSTMENT) || 1;
const DEFAULT_BRIDGE_SLIPPAGE_PERCENTAGE = Number(process.env.DEFAULT_BRIDGE_SLIPPAGE_PERCENTAGE) || 3;

export const TransferButton = ({
  setBridge,
  getBalances,
  bridge: { source_chain, destination_chain, asset, amount },
}: Props) => {
  const {
    state: { web3_provider, provider, address, chain_id, signer },
  } = useWallet();

  const {
    state: { chains },
  } = useChains();
  const {
    state: { assets },
  } = useAssets();

  const {
    state: { sdk },
  } = useSdk();

  const {
    state: { balances },
  } = useBalances();

  const [approving, setApproving] = useState<boolean | null>(null);
  const [approveProcessing, setApproveProcessing] = useState(false);
  const [approveResponse, setApproveResponse] = useState<Response>();

  const [xcall, setXcall] = useState<Record<any, any>>();
  const [calling, setCalling] = useState(false);
  const [callProcessing, setCallProcessing] = useState(false);
  const [xcallResponse, setXcallResponse] = useState<Response>();

  const checkSupport = () => {
    const source_asset_data = assets?.find((a) => a?.id === asset?.id);
    const destination_asset_data = assets?.find((a) => a?.id === asset?.id);

    return (
      source_chain &&
      destination_chain &&
      source_asset_data &&
      destination_asset_data &&
      !(
        source_asset_data.contracts?.findIndex(
          (c) => c?.chain_id === chains?.find((_c) => _c?.id === source_chain.id)?.chain_id,
        ) < 0
      ) &&
      !(
        destination_asset_data.contracts?.findIndex(
          (c) => c?.chain_id === chains?.find((_c) => _c?.id === destination_chain.id)?.chain_id,
        ) < 0
      )
    );
  };

  const call = async () => {
    setApproving(null);
    setCalling(true);

    if (sdk) {
      const source_chain_data = chains?.find((c) => c?.id === source_chain?.id);
      const source_asset_data = assets?.find((a) => a?.id === asset?.id);
      const source_contract_data = source_asset_data?.contracts?.find(
        (c) => c?.chain_id === source_chain_data?.chain_id,
      );
      const source_symbol = source_contract_data?.symbol || source_asset_data?.symbol;
      const destination_chain_data = chains?.find((c) => c?.id === destination_chain?.id);

      const xcallParams: SdkXCallParams = {
        destination: destination_chain_data!.domain_id!,
        to: address!,
        asset: source_contract_data!.contract_address,
        delegate: address!,
        amount: utils.parseUnits(amount!.toString() || "0", source_contract_data?.decimals || 18).toString(),
        slippage: (DEFAULT_BRIDGE_SLIPPAGE_PERCENTAGE * 100).toString(),
        callData: "0x",
        origin: source_chain_data!.domain_id!,
      };

      let failed = false;

      try {
        const approve_request = await sdk.sdkBase.approveIfNeeded(
          xcallParams.origin,
          xcallParams.asset!,
          xcallParams.amount!,
          false,
        );

        if (approve_request) {
          setApproving(true);

          const approve_response = await signer.sendTransaction(approve_request);
          const tx_hash = approve_response?.hash;

          setApproveResponse({
            status: "pending",
            message: `Wait for ${source_symbol} approval`,
            tx_hash,
          });

          setApproveProcessing(true);
          const approve_receipt = await signer.provider.waitForTransaction(tx_hash);

          setApproveResponse(
            approve_receipt?.status
              ? undefined
              : {
                  status: "failed",
                  message: `Failed to approve ${source_symbol}`,
                  tx_hash,
                },
          );
          failed = !approve_receipt?.status;
          setApproveProcessing(false);
          setApproving(false);
        } else {
          setApproving(false);
        }
      } catch (error: any) {
        setApproveResponse({
          status: "failed",
          message: error?.data?.message || error?.message,
        });

        failed = true;
        setApproveProcessing(false);
        setApproving(false);
      }

      if (!failed) {
        try {
          const xcall_request = await sdk.sdkBase.xcall(xcallParams);
          if (xcall_request) {
            let gasLimit: string = await signer.estimateGas(xcall_request);
            if (gasLimit) {
              gasLimit = FixedNumber.fromString(gasLimit.toString())
                .mulUnsafe(FixedNumber.fromString(GAS_LIMIT_ADJUSTMENT.toString()))
                .round(0)
                .toString()
                .replace(".0", "");
              xcall_request.gasLimit = gasLimit;
            }
            const xcall_response = await signer.sendTransaction(xcall_request);
            const tx_hash = xcall_response?.hash;

            setCallProcessing(true);

            const xcall_receipt = await signer.provider.waitForTransaction(tx_hash);

            setXcall(xcall_receipt);

            failed = !xcall_receipt?.status;

            setXcallResponse({
              status: failed ? "failed" : "success",
              message: failed
                ? "Failed to send transaction"
                : `${source_symbol} transfer detected, waiting for execution`,
              tx_hash,
            });
          }
        } catch (error: any) {
          setXcallResponse({
            status: "failed",
            message: error?.data?.message || error?.message,
          });
          failed = true;
        }
      }
      if (failed) {
        setXcall(undefined);
      }
    }
    setCallProcessing(false);
    setCalling(false);
  };

  const reset = () => {
    setBridge({
      source_chain,
      destination_chain,
      asset,
      amount: undefined,
    });

    setXcall(undefined);

    setApproving(null);
    setApproveProcessing(false);
    setApproveResponse(undefined);

    setCalling(false);
    setCallProcessing(false);
    setXcallResponse(undefined);

    getBalances(source_chain);
    getBalances(destination_chain);
  };

  useEffect(() => {
    const update = async () => {
      if (sdk && address && xcall) {
        if (!xcall?.transfer_id && xcall?.transactionHash) {
          let transfer;
          try {
            const response = await sdk.sdkUtils.getTransfers({ transactionHash: xcall.transactionHash });
            transfer = response?.find((t: any) => t?.xcall_transaction_hash === xcall.transactionHash);
          } catch (error: unknown) {}
          try {
            const response = await sdk.sdkUtils.getTransfers({ userAddress: address });
            transfer = response?.find((t: any) => t?.xcall_transaction_hash === xcall.transactionHash);
          } catch (error: unknown) {}
          if (
            [XTransferStatus.Executed, XTransferStatus.CompletedFast, XTransferStatus.CompletedSlow].includes(
              transfer?.status as any,
            )
          ) {
            reset();
          } else if (transfer?.transfer_id) {
            setXcall({
              ...xcall,
              transfer_id: transfer.transfer_id,
            });
          }
        } else if (xcall.transfer_id) {
          const response = await sdk.sdkUtils.getTransfers({ transferId: xcall.transfer_id });

          const transfer = response?.find((t: any) => t?.transfer_id === xcall.transfer_id);

          if (
            [XTransferStatus.Executed, XTransferStatus.CompletedFast, XTransferStatus.CompletedSlow].includes(
              transfer?.status as any,
            )
          ) {
            reset();
          }
        }
      }
    };
    update();

    const interval = setInterval(() => update(), 10000);

    return () => {
      clearInterval(interval);
    };
  }, [sdk, address, xcall]);

  const source_contract = asset?.contracts?.find((c) => c?.chain_id === source_chain?.chain_id);
  const source_balance = balances?.[source_chain!.chain_id]?.find(
    (b) => b?.contract_address === source_contract?.contract_address,
  );
  const source_amount = (source_balance && Number(source_balance.amount)) || 0;

  const min_amount = 0;

  const wrong_chain = chain_id !== source_chain?.chain_id && !xcall;
  const is_walletconnect = provider?.constructor?.name === "WalletConnectProvider";

  const disabled = calling || Boolean(approving);

  return (
    <>
      {checkSupport() && (xcall || source_balance) && (typeof amount === "number" || (web3_provider && wrong_chain)) ? (
        web3_provider && wrong_chain ? (
          <Wallet
            connectChainId={source_chain?.chain_id}
            className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl flex items-center justify-center text-white text-base sm:text-lg space-x-1.5 sm:space-x-2 py-3 sm:py-4 px-2 sm:px-3"
          >
            <span className="mr-1.5 sm:mr-2">
              {is_walletconnect ? "Reconnect" : "Switch"} to <span className="font-semibold">{source_chain?.name}</span>{" "}
            </span>
          </Wallet>
        ) : !xcall && (Number(amount) > source_amount || Number(amount) < min_amount || Number(amount) <= 0) ? (
          <Alert
            color="bg-red-400 dark:bg-red-500 text-white text-base"
            icon={<BiMessageError className="w-4 sm:w-6 h-4 sm:h-6 stroke-current mr-3" />}
            closeDisabled={true}
            rounded={true}
            className="rounded-xl p-4.5"
          >
            <span>
              {Number(amount) > source_amount
                ? "Insufficient Balance"
                : Number(amount) < min_amount
                ? "The transfer amount cannot be less than the transfer fee."
                : Number(amount) <= 0
                ? "The transfer amount cannot be equal or less than 0."
                : ""}
            </span>
          </Alert>
        ) : !xcall && !xcallResponse ? (
          <button
            disabled={disabled}
            onClick={() => {
              call();
            }}
            className={`w-full ${
              disabled
                ? "bg-blue-400 dark:bg-blue-500"
                : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            } rounded-xl flex items-center justify-center text-white text-base sm:text-lg py-3 sm:py-4 px-2 sm:px-3`}
          >
            <span className="flex items-center justify-center space-x-1.5">
              {(calling || approving) && <FaSpinner className="spinner" />}
              <span>
                {calling
                  ? approving
                    ? approveProcessing
                      ? "Approving"
                      : "Please Approve"
                    : callProcessing
                    ? "xCalling"
                    : typeof approving === "boolean"
                    ? "Please Confirm"
                    : "Checking Approval"
                  : "Transfer"}
              </span>
            </span>
          </button>
        ) : (
          (xcallResponse || (!xcall && approveResponse)) &&
          [xcallResponse || approveResponse].map((r, i) => (
            <Alert
              key={i}
              color={`${
                r?.status === "failed"
                  ? "bg-red-400 dark:bg-red-500"
                  : r?.status === "success"
                  ? xcallResponse
                    ? "bg-yellow-400 dark:bg-blue-500"
                    : "bg-green-400 dark:bg-green-500"
                  : "bg-blue-400 dark:bg-blue-500"
              } text-white text-base`}
              icon={
                r?.status === "failed" ? (
                  <BiMessageError className="w-4 sm:w-6 h-4 sm:h-6 stroke-current mr-3" />
                ) : r?.status === "success" ? (
                  xcallResponse ? (
                    <div className="mr-3">
                      <FaSpinner className="spinner" />
                    </div>
                  ) : (
                    <BiMessageCheck className="w-4 sm:w-6 h-4 sm:h-6 stroke-current mr-3" />
                  )
                ) : (
                  <BiMessageDetail className="w-4 sm:w-6 h-4 sm:h-6 stroke-current mr-3" />
                )
              }
              closeDisabled={true}
              rounded={true}
              className="rounded-xl p-4.5"
            >
              <div className="flex items-center justify-between space-x-2">
                <span className="break-all">{r?.message}</span>
                <div className="flex items-center space-x-2">
                  {r?.status === "failed" ? (
                    <button
                      onClick={() => reset()}
                      className="bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center text-white p-1"
                    >
                      <MdClose size={20} />
                    </button>
                  ) : r?.status === "success" ? (
                    <button
                      onClick={() => reset()}
                      className={`${
                        xcallResponse ? "bg-yellow-500 dark:bg-blue-400" : "bg-green-500 dark:bg-green-400"
                      } rounded-full flex items-center justify-center text-white p-1`}
                    >
                      <MdClose size={20} />
                    </button>
                  ) : null}
                </div>
              </div>
            </Alert>
          ))
        )
      ) : web3_provider ? (
        <button
          disabled={true}
          className="w-full bg-slate-100 dark:bg-slate-900 cursor-not-allowed rounded-xl text-slate-400 dark:text-slate-500 text-base sm:text-lg text-center py-3 sm:py-4 px-2 sm:px-3"
        >
          Transfer
        </button>
      ) : (
        <Wallet
          connectChainId={source_chain?.chain_id}
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-xl text-white text-base sm:text-lg text-center sm:space-x-2 py-3 sm:py-4 px-2 sm:px-3"
        >
          <span>Connect Wallet</span>
        </Wallet>
      )}
    </>
  );
};
