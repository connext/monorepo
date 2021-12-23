/* eslint-disable require-jsdoc */
import { useEffect, useState, ReactElement } from "react";
import { Col, Row, Input, Typography, Form, Button, Select, Table, Switch } from "antd";
import { BigNumber, constants, providers, Signer, utils } from "ethers";
import { ActiveTransaction, NxtpSdk, NxtpSdkEvents, HistoricalTransaction, GetTransferQuote } from "@connext/nxtp-sdk";
import {
  AuctionResponse,
  ChainData,
  CrosschainTransaction,
  getRandomBytes32,
  Logger,
  TransactionPreparedEvent,
} from "@connext/nxtp-utils";
import { Interface, parseUnits } from "ethers/lib/utils";

import { chainConfig, swapConfig } from "../constants";
import { getExplorerLinkForTx, mintTokens as _mintTokens, TestTokenABI } from "../utils";

const findAssetInSwap = (crosschainTx: CrosschainTransaction) =>
  swapConfig.find((sc) =>
    Object.values(sc.assets).find(
      (a) => utils.getAddress(a) === utils.getAddress(crosschainTx.invariant.sendingAssetId),
    ),
  )?.name ?? "UNKNOWN";

type SwapProps = {
  web3Provider?: providers.Web3Provider;
  signer?: Signer;
  chainData?: Map<string, ChainData>;
};

export const Swap = ({ web3Provider, signer, chainData }: SwapProps): ReactElement => {
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [sdk, setSdk] = useState<NxtpSdk>();
  const [auctionResponse, setAuctionResponse] = useState<AuctionResponse>();
  const [activeTransferTableColumns, setActiveTransferTableColumns] = useState<ActiveTransaction[]>([]);
  const [activeTransferTableColumnsConverted, setActiveTransferTableColumnsConverted] = useState<any[]>([]);
  const [historicalTransferTableColumns, setHistoricalTransferTableColumns] = useState<HistoricalTransaction[]>([]);
  const [selectedPoolIndex, setSelectedPoolIndex] = useState(0);
  const [userBalance, setUserBalance] = useState<BigNumber>();

  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      console.log("signer: ", signer);
      console.log("web3Provider: ", web3Provider);
      if (!signer || !web3Provider) {
        return;
      }
      const { chainId } = await signer.provider!.getNetwork();
      console.log("chainId: ", chainId);
      setInjectedProviderChainId(chainId);

      const sendingChain = form.getFieldValue("sendingChain");
      console.log('form.getFieldValue("sendingChain"): ', form.getFieldsValue(true));
      console.log("sendingChain: ", sendingChain);

      const address = await signer.getAddress();

      const _balance = await getUserBalance(
        typeof sendingChain === "number" ? sendingChain : parseInt(sendingChain),
        signer,
      );
      console.log("_balance: ", _balance);
      setUserBalance(_balance);
      form.setFieldsValue({ receivingAddress: address });

      const _sdk = await NxtpSdk.create({
        chainConfig,
        signer,
        messaging: undefined,
        natsUrl: process.env.REACT_APP_NATS_URL_OVERRIDE,
        authUrl: process.env.REACT_APP_AUTH_URL_OVERRIDE,
        logger: new Logger({ level: "info" }),
        network: (process.env.REACT_APP_NETWORK as "mainnet") ?? "mainnet",
      });
      setSdk(_sdk);
      const activeTxs = await _sdk.getActiveTransactions();

      // TODO: race condition with the event listeners
      // Will not update the transactions appropriately if sender tx prepared and no txs set
      setActiveTransferTableColumns(activeTxs);
      console.log("activeTxs: ", activeTxs);

      const convertedActiveTxs = await Promise.all(
        activeTxs.map(async (tx) => {
          let gasAmount = "0";
          if (tx.status === NxtpSdkEvents.ReceiverTransactionPrepared) {
            const { invariant } = tx.crosschainTx;
            try {
              const gasAmountInBigNum = await _sdk?.estimateMetaTxFeeInReceivingToken(
                invariant.sendingChainId,
                invariant.sendingAssetId,
                invariant.receivingChainId,
                invariant.receivingAssetId,
              );
              gasAmount = utils.formatEther(gasAmountInBigNum);
            } catch (e) {
              console.log(e);
            }
          }

          // Use receiver side info by default
          const variant = tx.crosschainTx.receiving ?? tx.crosschainTx.sending;
          return {
            sentAmount: utils.formatEther(tx.crosschainTx.sending?.amount ?? "0"),
            receivedAmount: utils.formatEther(tx.crosschainTx.receiving?.amount ?? "0"),
            gasAmount: gasAmount,
            status: tx.status,
            sendingChain: tx.crosschainTx.invariant.sendingChainId.toString(),
            receivingChain: tx.crosschainTx.invariant.receivingChainId.toString(),
            asset: findAssetInSwap(tx.crosschainTx),
            key: tx.crosschainTx.invariant.transactionId,
            preparedAt: tx.preparedTimestamp,
            expires:
              variant.expiry > Date.now() / 1000
                ? `${((variant.expiry - Date.now() / 1000) / 3600).toFixed(2)} hours`
                : "Expired",
            action: tx,
          };
        }),
      );

      console.log("convertedActiveTransactions = ", convertedActiveTxs);
      setActiveTransferTableColumnsConverted(convertedActiveTxs);

      const historicalTxs = await _sdk.getHistoricalTransactions();
      setHistoricalTransferTableColumns(historicalTxs);
      console.log("historicalTxs: ", historicalTxs);

      _sdk.attach(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
        console.log("SenderTransactionPrepared:", data);
        const { amount, expiry, preparedBlockNumber, ...invariant } = data.txData;
        const table = [...activeTransferTableColumns];
        table.push({
          crosschainTx: {
            invariant,
            sending: { amount, expiry, preparedBlockNumber },
          },
          preparedTimestamp: Math.floor(Date.now() / 1000),
          bidSignature: data.bidSignature,
          encodedBid: data.encodedBid,
          encryptedCallData: data.encryptedCallData,
          status: NxtpSdkEvents.SenderTransactionPrepared,
        });
        setActiveTransferTableColumns(table);
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, (data) => {
        console.log("SenderTransactionFulfilled:", data);
        setActiveTransferTableColumns(
          activeTransferTableColumns.filter(
            (t) => t.crosschainTx.invariant.transactionId !== data.txData.transactionId,
          ),
        );
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, (data) => {
        console.log("SenderTransactionCancelled:", data);
        setActiveTransferTableColumns(
          activeTransferTableColumns.filter(
            (t) => t.crosschainTx.invariant.transactionId !== data.txData.transactionId,
          ),
        );
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, (data) => {
        console.log("ReceiverTransactionPrepared:", data);
        const { amount, expiry, preparedBlockNumber, ...invariant } = data.txData;
        const index = activeTransferTableColumns.findIndex(
          (col) => col.crosschainTx.invariant.transactionId === invariant.transactionId,
        );

        const table = [...activeTransferTableColumns];
        if (index === -1) {
          // TODO: is there a better way to
          // get the info here?
          table.push({
            preparedTimestamp: Math.floor(Date.now() / 1000),
            crosschainTx: {
              invariant,
              sending: {} as any, // Find to do this, since it defaults to receiver side info
              receiving: { amount, expiry, preparedBlockNumber },
            },
            bidSignature: data.bidSignature,
            encodedBid: data.encodedBid,
            encryptedCallData: data.encryptedCallData,
            status: NxtpSdkEvents.ReceiverTransactionPrepared,
          });
          setActiveTransferTableColumns(table);
        } else {
          const item = { ...table[index] };
          table[index] = {
            ...item,
            status: NxtpSdkEvents.ReceiverTransactionPrepared,
            crosschainTx: {
              ...item.crosschainTx,
              receiving: { amount, expiry, preparedBlockNumber },
            },
          };
          setActiveTransferTableColumns(table);
        }
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionFulfilled, async (data) => {
        console.log("ReceiverTransactionFulfilled:", data);
        // setActiveTransferTableColumns(
        //   activeTransferTableColumns.filter(
        //     (t) => t.crosschainTx.invariant.transactionId !== data.txData.transactionId,
        //   ),
        // );

        const historicalTxs = await _sdk.getHistoricalTransactions();
        setHistoricalTransferTableColumns(historicalTxs);
        console.log("historicalTxs: ", historicalTxs);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionCancelled, (data) => {
        console.log("ReceiverTransactionCancelled:", data);
        setActiveTransferTableColumns(
          activeTransferTableColumns.filter(
            (t) => t.crosschainTx.invariant.transactionId !== data.txData.transactionId,
          ),
        );
      });

      _sdk.attach(NxtpSdkEvents.SenderTokenApprovalMined, (data) => {
        console.log("SenderTokenApprovalMined:", data);
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionPrepareSubmitted, (data) => {
        console.log("SenderTransactionPrepareSubmitted:", data);
      });
    };
    init();
  }, [web3Provider, signer]);

  const getUserBalance = async (_chainId: number, _signer: Signer) => {
    if (_chainId === 0 || !sdk) {
      return BigNumber.from(0);
    }
    const address = await _signer.getAddress();
    const sendingAssetId = swapConfig[form.getFieldValue("asset")]?.assets[_chainId];
    if (!sendingAssetId) {
      throw new Error("Bad configuration for swap");
    }
    if (!chainConfig || !chainConfig[_chainId]) {
      throw new Error(`No config for chainId: ${_chainId}. Supported: ${Object.keys(chainConfig).toString()}`);
    }
    return await sdk.getBalance(_chainId, address, sendingAssetId, TestTokenABI);
  };

  const switchChains = async (targetChainId: number) => {
    if (!signer || !web3Provider) {
      return;
    }
    if (injectedProviderChainId === targetChainId) {
      return;
    }
    if (!chainConfig[targetChainId]) {
      throw new Error(`No provider configured for chain ${targetChainId}`);
    }
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === "undefined") {
      alert("Please install Metamask");
      return;
    }
    const chainId = "0x" + BigNumber.from(targetChainId)._hex.split("0x")[1].replace(/\b0+/g, "");
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (error.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{ chainId, rpcUrl: chainConfig[targetChainId] }],
          });
        } catch (addError) {
          // handle "add" error
          throw new Error(`Error adding chain ${targetChainId}: ${addError.message}`);
        }
      }
      throw error;
      // handle other "switch" errors
    }
  };

  const getTransferQuote = async (): Promise<GetTransferQuote | undefined> => {
    if (!sdk) {
      return;
    }

    const sendingChainId = parseInt(form.getFieldValue("sendingChain"));
    if (injectedProviderChainId !== sendingChainId) {
      alert("Please switch chains to the sending chain!");
      throw new Error("Wrong chain");
    }
    const receivingChainId = parseInt(form.getFieldValue("receivingChain"));

    // Create txid
    const transactionId = getRandomBytes32();

    const sendingAssetId = swapConfig[form.getFieldValue("asset")]?.assets[form.getFieldValue("sendingChain")];
    const receivingAssetId = swapConfig[form.getFieldValue("asset")]?.assets[form.getFieldValue("receivingChain")];
    if (!sendingAssetId || !receivingAssetId) {
      throw new Error("Configuration doesn't support selected swap");
    }

    if (!sdk) {
      throw new Error("No SDK available");
    }

    const generateCalldata = form.getFieldValue("generateCalldata");
    let callTo;
    let callData;
    if (generateCalldata) {
      console.log("Generating calldata");
      callTo = "0x180eb9C86bAFf427B8B91D4e6d61Fb0dD86f1e45";
      // Get calldata
      const counter = new Interface([
        "function incrementAndSend(address assetId, address recipient, uint256 amount) public payable",
      ]);
      const address = await signer!.getAddress();
      callData = counter.encodeFunctionData("incrementAndSend", [receivingAssetId, address, "1"]);
      console.log("callData: ", callData);
    }

    const sendingDecimals = await sdk.getDecimalsForAsset(sendingChainId, sendingAssetId);
    const receivingDecimals = await sdk.getDecimalsForAsset(receivingChainId, receivingAssetId);
    const response = await sdk.getTransferQuote({
      sendingChainId,
      sendingAssetId,
      receivingChainId,
      receivingAssetId,
      receivingAddress: form.getFieldValue("receivingAddress"),
      amount: parseUnits(form.getFieldValue("amount"), sendingDecimals).toString(),
      preferredRouters: form.getFieldValue("preferredRouters")
        ? form.getFieldValue("preferredRouters").split(",")
        : undefined,
      transactionId,
      expiry: Math.floor(Date.now() / 1000) + 3600 * 24 * 3, // 3 days
      callData,
      callTo,
    });
    form.setFieldsValue({
      receivedAmount: utils.formatUnits(response?.bid.amountReceived ?? constants.Zero, receivingDecimals),
      gasFeeAmount: utils.formatUnits(response?.gasFeeInReceivingToken ?? constants.Zero, receivingDecimals),
      metaTxFeeInRouter: utils.formatUnits(response?.metaTxRelayerFee ?? constants.Zero, receivingDecimals),
    });
    setAuctionResponse(response);
    return response;
  };

  const transfer = async () => {
    if (!sdk) {
      return;
    }
    if (!auctionResponse) {
      alert("Please request quote first");
      throw new Error("Please request quote first");
    }

    if (injectedProviderChainId !== auctionResponse.bid.sendingChainId) {
      alert("Please switch chains to the sending chain!");
      throw new Error("Wrong chain");
    }
    const transfer = await sdk.prepareTransfer(auctionResponse, true);
    console.log("transfer: ", transfer);
  };

  const finishTransfer = async ({
    bidSignature,
    encodedBid,
    encryptedCallData,
    txData,
  }: Omit<TransactionPreparedEvent, "caller">) => {
    if (!sdk) {
      return;
    }

    const finish = await sdk.fulfillTransfer({ bidSignature, encodedBid, encryptedCallData, txData }, true);
    console.log("finish: ", finish);
    if (finish?.transactionHash || finish.transactionHash === "") {
      setActiveTransferTableColumns(
        activeTransferTableColumns.filter((t) => t.crosschainTx.invariant.transactionId !== txData.transactionId),
      );
    }
  };

  const getRouterStatus = async () => {
    if (!sdk) {
      return;
    }

    const res = await sdk.getRouterStatus("testUI");

    console.log(res);
  };

  const columns = [
    {
      title: "Prepared At",
      dataIndex: "preparedAt",
      key: "preparedAt",
    },
    {
      title: "Sending Chain",
      dataIndex: "sendingChain",
      key: "sendingChain",
    },
    {
      title: "Receiving Chain",
      dataIndex: "receivingChain",
      key: "receivingChain",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Sent Amount",
      dataIndex: "sentAmount",
      key: "sentAmount",
    },
    {
      title: "Received Amount",
      dataIndex: "receivedAmount",
      key: "receivedAmount",
    },
    {
      title: "Gas Amount",
      dataIndex: "gasAmount",
      key: "gasAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Expires",
      dataIndex: "expires",
      key: "expires",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: ({ crosschainTx, status, bidSignature, encodedBid, encryptedCallData }: ActiveTransaction) => {
        const { receiving, sending, invariant } = crosschainTx;
        const variant = receiving ?? sending;
        const sendingTxData = {
          ...invariant,
          ...sending,
        };

        const receivingTxData =
          typeof receiving === "object"
            ? {
                ...invariant,
                ...receiving,
              }
            : undefined;
        if (Date.now() / 1000 > variant.expiry) {
          return (
            <Button
              type="link"
              onClick={() =>
                sdk?.cancel({ signature: "0x", txData: sendingTxData }, crosschainTx.invariant.sendingChainId)
              }
            >
              Cancel
            </Button>
          );
        } else if (status === NxtpSdkEvents.ReceiverTransactionPrepared) {
          return (
            <Button
              type="link"
              onClick={() => {
                if (!receivingTxData) {
                  console.error("Incorrect data to fulfill");
                  return;
                }
                finishTransfer({ bidSignature, encodedBid, encryptedCallData, txData: receivingTxData });
              }}
            >
              Finish
            </Button>
          );
        } else {
          return <></>;
        }
      },
    },
  ];

  const historicalColumns = [
    {
      title: "Prepared At",
      dataIndex: "preparedAt",
      key: "preparedAt",
    },
    {
      title: "Sending Chain",
      dataIndex: "sendingChain",
      key: "sendingChain",
    },
    {
      title: "Receiving Chain",
      dataIndex: "receivingChain",
      key: "receivingChain",
    },
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Sent Amount",
      dataIndex: "sentAmount",
      key: "sentAmount",
    },
    {
      title: "Received Amount",
      dataIndex: "receivedAmount",
      key: "receivedAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tx Hash",
      dataIndex: "txHash",
      key: "txHash",
      render: ({ txHash, chainId }: { txHash: string; chainId: number }) =>
        txHash ? (
          <a href={getExplorerLinkForTx(txHash, chainId, chainData!)} target="_blank">
            View Tx
          </a>
        ) : (
          <></>
        ),
    },
  ];

  const mintTokens = async () => {
    const testToken = swapConfig[form.getFieldValue("asset")]?.assets[injectedProviderChainId!];
    if (!testToken) {
      throw new Error(`Not configured for TEST token on chain: ${injectedProviderChainId}`);
    }
    if (!signer) {
      return;
    }
    const resp = await _mintTokens(signer, testToken);
    console.log("resp: ", resp);
  };

  const addToMetamask = async () => {
    const testToken = swapConfig[form.getFieldValue("asset")]?.assets[injectedProviderChainId!];
    if (!testToken) {
      throw new Error(`Not configured for TEST token on chain: ${injectedProviderChainId}`);
    }
    const resp = await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: testToken,
          symbol: "TEST",
          decimals: 18,
        },
      },
    });
    console.log("resp: ", resp);
  };

  return (
    <>
      {activeTransferTableColumns.length > 0 && (
        <>
          <Row gutter={16}>
            <Col span={3}></Col>
            <Col span={8}>
              <Typography.Title level={2}>Active Transfers</Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col span={3}></Col>
            <Col span={20}>
              <Table columns={columns} dataSource={activeTransferTableColumnsConverted} />
            </Col>
            <Col span={3}></Col>
          </Row>
        </>
      )}

      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={8}>
          <Typography.Title level={2}>New Transfer</Typography.Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          {chainData && (
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={() => {
                transfer();
              }}
              initialValues={{
                sendingChain: Object.keys(swapConfig[selectedPoolIndex].assets)[0],
                receivingChain: Object.keys(swapConfig[selectedPoolIndex].assets)[1],
                asset: selectedPoolIndex,
                amount: "10",
                generateCalldata: false,
              }}
            >
              <Form.Item label="Sending Chain" name="sendingChain">
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item name="sendingChain">
                      <Select
                        onChange={async (val) => {
                          console.log("val: ", val);
                          if (!signer) {
                            console.error("No signer available");
                            return;
                          }
                          const _balance = await getUserBalance(
                            typeof val === "number" ? val : parseInt(val as string),
                            signer,
                          );
                          setUserBalance(_balance);
                        }}
                      >
                        {Object.keys(swapConfig[selectedPoolIndex].assets).map((chainId) => (
                          <Select.Option key={chainId} value={chainId}>
                            {parseInt(chainId)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item dependencies={["sendingChain"]}>
                      {() => (
                        <Button
                          onClick={() => switchChains(parseInt(form.getFieldValue("sendingChain")))}
                          disabled={
                            !web3Provider || injectedProviderChainId === parseInt(form.getFieldValue("sendingChain"))
                          }
                        >
                          Switch To Chain {form.getFieldValue("sendingChain")}
                        </Button>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="Receiving Chain">
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item name="receivingChain">
                      <Select>
                        {Object.keys(swapConfig[selectedPoolIndex].assets).map((chainId) => (
                          <Select.Option key={chainId} value={chainId}>
                            {parseInt(chainId)}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="Asset">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="asset">
                      <Select
                        onChange={(value) => {
                          value ? setSelectedPoolIndex(parseInt(value?.toString())) : 0;
                        }}
                      >
                        {swapConfig.map(({ name }, index) => (
                          <Select.Option key={name} value={index}>
                            {name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  {swapConfig[selectedPoolIndex].name === "TEST" && (
                    <>
                      <Col span={6}>
                        <Button block onClick={() => mintTokens()}>
                          Get TEST
                        </Button>
                      </Col>
                      <Col span={6}>
                        <Button disabled={!web3Provider} type="link" onClick={() => addToMetamask()}>
                          Add to Metamask
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Form.Item>

              <Form.Item label="Amount">
                <Row gutter={16}>
                  <Col span={16}>
                    <Form.Item name="amount">
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    Balance:{" "}
                    <Button
                      onClick={() => form.setFieldsValue({ amount: utils.formatEther(userBalance ?? 0) })}
                      type="link"
                    >
                      {utils.formatEther(userBalance ?? 0)}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item label="Receiving Address" name="receivingAddress">
                <Input />
              </Form.Item>

              <Form.Item label="Preferred Routers" name="preferredRouters">
                <Input placeholder="Do not use unless testing routers" />
              </Form.Item>

              <Form.Item label="Generate Calldata" name="generateCalldata" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item label="Received Amount" name="receivedAmount">
                <Input
                  disabled
                  placeholder="..."
                  addonAfter={
                    <Button
                      disabled={
                        !web3Provider || injectedProviderChainId !== parseInt(form.getFieldValue("sendingChain"))
                      }
                      type="primary"
                      onClick={getTransferQuote}
                    >
                      Get Quote
                    </Button>
                  }
                />
              </Form.Item>

              <Form.Item label="MetaTx Fee (Router)" name="metaTxFeeInRouter">
                <Input disabled placeholder="..." />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }} dependencies={["sendingChain", "receivingChain"]}>
                {() => (
                  <Button
                    disabled={
                      form.getFieldValue("sendingChain") === form.getFieldValue("receivingChain") || !auctionResponse
                    }
                    type="primary"
                    htmlType="submit"
                  >
                    Transfer
                  </Button>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }} dependencies={["sendingChain", "receivingChain"]}>
                {() => (
                  <Button
                    disabled={
                      !web3Provider ||
                      injectedProviderChainId !== parseInt(form.getFieldValue("sendingChain")) ||
                      form.getFieldValue("sendingChain") === form.getFieldValue("receivingChain")
                    }
                    type="primary"
                    onClick={async () => {
                      const sendingAssetId =
                        swapConfig[form.getFieldValue("asset")]?.assets[form.getFieldValue("sendingChain")];
                      const receivingAssetId =
                        swapConfig[form.getFieldValue("asset")]?.assets[form.getFieldValue("receivingChain")];
                      if (!sendingAssetId || !receivingAssetId) {
                        throw new Error("Configuration doesn't support selected swap");
                      }
                      const sendingChainId = parseInt(form.getFieldValue("sendingChain"));
                      const receivingChainId = parseInt(form.getFieldValue("receivingChain"));

                      const transferFeeInSendingToken = await sdk?.estimateFeeForRouterTransferInSendingToken(
                        sendingChainId,
                        sendingAssetId,
                        receivingChainId,
                        receivingAssetId,
                      );

                      const metaTxFeeInSendingToken = await sdk?.estimateMetaTxFeeInSendingToken(
                        sendingChainId,
                        sendingAssetId,
                        receivingChainId,
                        receivingAssetId,
                      );

                      if (transferFeeInSendingToken && metaTxFeeInSendingToken) {
                        form.setFieldsValue({
                          transferFeeInSDK: utils.formatEther(transferFeeInSendingToken),
                          metaTxFeeInSDK: utils.formatEther(metaTxFeeInSendingToken),
                        });
                      }
                    }}
                  >
                    Calculate Fee
                  </Button>
                )}
              </Form.Item>
              <Form.Item label="Transfer Fee (SDK)" name="transferFeeInSDK">
                <Input disabled placeholder="..." />
              </Form.Item>

              <Form.Item label="MetaTx Fee (SDK)" name="metaTxFeeInSDK">
                <Input disabled placeholder="..." />
              </Form.Item>

              <Form.Item label="Router Status" name="routerStatus">
                <Button onClick={() => getRouterStatus()}>router status</Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>

      {historicalTransferTableColumns.length > 0 && (
        <>
          <Row gutter={16}>
            <Col span={3}></Col>
            <Col span={8}>
              <Typography.Title level={2}>Historical Transfers</Typography.Title>
            </Col>
          </Row>
          <Row>
            <Col span={3}></Col>
            <Col span={20}>
              <Table
                columns={historicalColumns}
                dataSource={historicalTransferTableColumns
                  .sort((a, b) => b.preparedTimestamp - a.preparedTimestamp)
                  .map((tx) => {
                    // Use receiver side info by default
                    return {
                      sentAmount: utils.formatEther(tx.crosschainTx.sending.amount),
                      receivedAmount: utils.formatEther(tx.crosschainTx.receiving?.amount ?? "0"),
                      status: tx.status,
                      sendingChain: tx.crosschainTx.invariant.sendingChainId.toString(),
                      receivingChain: tx.crosschainTx.invariant.receivingChainId.toString(),
                      asset: findAssetInSwap(tx.crosschainTx),
                      key: tx.crosschainTx.invariant.transactionId,
                      preparedAt: tx.preparedTimestamp,
                      txHash: { txHash: tx.fulfilledTxHash, chainId: tx.crosschainTx.invariant.receivingChainId },
                    };
                  })}
              />
            </Col>
            <Col span={3}></Col>
          </Row>
        </>
      )}
    </>
  );
};
