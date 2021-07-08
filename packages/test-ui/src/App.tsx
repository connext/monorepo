import React, { useEffect, useState } from "react";
import { Col, Row, Input, Typography, Form, Button, Select, Table } from "antd";
import { BigNumber, providers, Signer, utils } from "ethers";
import pino from "pino";
import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { getRandomBytes32 } from "@connext/nxtp-utils";

import "./App.css";
import { providerUrls, swapConfig } from "./constants";
import { getBalance, mintTokens as _mintTokens } from "./utils";

function App(): React.ReactElement | null {
  const [web3Provider, setProvider] = useState<providers.Web3Provider>();
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [signer, setSigner] = useState<Signer>();
  const [sdk, setSdk] = useState<NxtpSdk>();
  const [activeTransferTableColumns, setActiveTransferTableColumns] = useState<
    {
      key: string;
      txId: string;
      sendingChain: string;
      sendingAsset: string;
      receivingChain: string;
      receivingAsset: string;
      amount: string;
      status: string;
    }[]
  >([]);

  const [userBalance, setUserBalance] = useState<BigNumber>();

  const [form] = Form.useForm();

  const connectMetamask = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === "undefined") {
      alert("Please install Metamask");
      return;
    }
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new providers.Web3Provider(ethereum);
      const _signer = provider.getSigner();
      const address = await _signer.getAddress();
      console.log("address: ", address);

      const sendingAssetId = swapConfig.find((sc) => sc.name === form.getFieldValue("asset"))?.assets[
        form.getFieldValue("sendingChain")
      ];
      if (!sendingAssetId) {
        throw new Error("Bad configuration for swap");
      }
      const _balance = await getBalance(_signer, sendingAssetId);
      setUserBalance(_balance);

      setSigner(_signer);
      setProvider(provider);
      form.setFieldsValue({ receivingAddress: address });

      // metamask events
      ethereum.on("chainChanged", (_chainId: string) => {
        console.log("_chainId: ", _chainId);
        window.location.reload();
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!signer || !web3Provider) {
        return;
      }
      const { chainId } = await signer.provider!.getNetwork();
      setInjectedProviderChainId(chainId);
      const chainProviders: { [chainId: number]: providers.JsonRpcProvider } = {};
      Object.entries(providerUrls).forEach(
        ([chainId, url]) => (chainProviders[parseInt(chainId)] = new providers.JsonRpcProvider(url, parseInt(chainId))),
      );
      const _sdk = await NxtpSdk.init(chainProviders, signer, pino({ level: "info" }));
      setSdk(_sdk);
      _sdk.attach(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
        console.log("SenderTransactionPrepared:", data);
        const { txData } = data;
        const table = activeTransferTableColumns;
        table.push({
          amount: txData.amount,
          key: txData.transactionId,
          receivingAsset: txData.receivingAssetId,
          receivingChain: txData.receivingChainId.toString(),
          sendingAsset: txData.sendingAssetId,
          sendingChain: txData.sendingChainId.toString(),
          status: NxtpSdkEvents.SenderTransactionPrepared,
          txId: txData.transactionId,
        });
        setActiveTransferTableColumns(table);
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, (data) => {
        console.log("SenderTransactionFulfilled:", data);
        setActiveTransferTableColumns(activeTransferTableColumns.filter((t) => t.txId !== data.txData.transactionId));
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, (data) => {
        console.log("SenderTransactionCancelled:", data);
        setActiveTransferTableColumns(activeTransferTableColumns.filter((t) => t.txId !== data.txData.transactionId));
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, (data) => {
        console.log("ReceiverTransactionPrepared:", data);
        const { txData } = data;
        const index = activeTransferTableColumns.findIndex((col) => col.txId === txData.transactionId);
        activeTransferTableColumns[index].status = NxtpSdkEvents.ReceiverTransactionPrepared;
        setActiveTransferTableColumns(activeTransferTableColumns);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionFulfilled, (data) => {
        console.log("ReceiverTransactionFulfilled:", data);
        const { txData } = data;
        const index = activeTransferTableColumns.findIndex((col) => col.txId === txData.transactionId);
        activeTransferTableColumns[index].status = NxtpSdkEvents.ReceiverTransactionFulfilled;
        setActiveTransferTableColumns(activeTransferTableColumns);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionCancelled, (data) => {
        console.log("ReceiverTransactionCancelled:", data);
        setActiveTransferTableColumns(activeTransferTableColumns.filter((t) => t.txId !== data.txData.transactionId));
      });
      const activeTxs = await _sdk.getActiveTransactions();

      // TODO: race condition with the event listeners
      setActiveTransferTableColumns(
        activeTxs.map((tx) => {
          return {
            amount: tx.txData.amount,
            status: tx.status,
            sendingChain: tx.txData.sendingChainId.toString(),
            sendingAsset: tx.txData.sendingAssetId,
            receivingChain: tx.txData.receivingChainId.toString(),
            receivingAsset: tx.txData.receivingAssetId,
            key: tx.txData.transactionId,
            txId: tx.txData.transactionId,
          };
        }),
      );
      console.log("activeTxs: ", activeTxs);
    };
    init();
  }, [web3Provider, signer]);

  const switchChains = async (targetChainId: number) => {
    if (!signer || !web3Provider) {
      return;
    }
    if (injectedProviderChainId === targetChainId) {
      console.log("targetChainId: ", targetChainId);
      console.log("injectedProviderChainId: ", injectedProviderChainId);
      return;
    }
    if (!providerUrls[targetChainId]) {
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
            params: [{ chainId, rpcUrl: providerUrls[targetChainId] }],
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

  const transfer = async (
    sendingChainId: number,
    sendingAssetId: string,
    receivingChainId: number,
    receivingAssetId: string,
    amount: string,
    routerAddress: string,
    receivingAddress: string,
  ) => {
    if (!sdk) {
      return;
    }

    if (injectedProviderChainId !== sendingChainId) {
      alert("Please switch chains to the sending chain!");
      throw new Error("Wrong chain");
    }

    // Create txid
    const transactionId = getRandomBytes32();

    try {
      await sdk.transfer({
        router: routerAddress,
        sendingAssetId,
        sendingChainId,
        receivingChainId,
        receivingAssetId,
        receivingAddress,
        amount,
        transactionId,
        expiry: (Date.now() + 3600 * 24 * 2).toString(), // 2 days
        // callData?: string;
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const columns = [
    {
      title: "Transaction Id",
      dataIndex: "txId",
      key: "txId",
    },
    {
      title: "Sending Chain",
      dataIndex: "sendingChain",
      key: "sendingChain",
    },
    {
      title: "Sending Asset",
      dataIndex: "sendingAsset",
      key: "sendingAsset",
    },
    {
      title: "Receiving Chain",
      dataIndex: "receivingChain",
      key: "receivingChain",
    },
    {
      title: "Receiving Asset",
      dataIndex: "receivingAsset",
      key: "receivingAsset",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const mintTokens = async () => {
    const testToken = swapConfig.find((sc) => sc.name === form.getFieldValue("asset"))?.assets[
      injectedProviderChainId!
    ];
    if (!testToken) {
      throw new Error(`Not configured for TEST token on chain: ${injectedProviderChainId}`);
    }
    const resp = await _mintTokens(signer!, testToken);
    console.log("resp: ", resp);
  };

  const addToMetamask = async () => {
    const testToken = swapConfig.find((sc) => sc.name === form.getFieldValue("asset"))?.assets[
      injectedProviderChainId!
    ];
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
    <div style={{ marginTop: 36, marginLeft: 12, marginRight: 12 }}>
      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={5}>
          <Typography.Title>NXTP</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={connectMetamask} disabled={!!web3Provider}>
            Connect Metamask
          </Button>
        </Col>
      </Row>

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
              <Table
                columns={columns}
                dataSource={activeTransferTableColumns.map((c) => {
                  return {
                    ...c,
                    receivingAsset: "TEST",
                    sendingAsset: "TEST",
                    txId: `${c.txId.substr(0, 6)}...${c.txId.substr(c.txId.length - 5, c.txId.length - 1)}`,
                    amount: utils.formatEther(c.amount),
                  };
                })}
              />
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
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(vals) => {
              const sendingAssetId = swapConfig.find((sc) => sc.name === vals.asset)?.assets[vals.sendingChain];
              const receivingAssetId = swapConfig.find((sc) => sc.name === vals.asset)?.assets[vals.receivingChain];
              if (!sendingAssetId || !receivingAssetId) {
                throw new Error("Configuration doesn't support selected swap");
              }
              transfer(
                parseInt(vals.sendingChain),
                sendingAssetId,
                parseInt(vals.receivingChain),
                receivingAssetId,
                utils.parseEther(vals.amount).toString(),
                vals.routerAddress,
                vals.receivingAddress,
              );
            }}
            onFieldsChange={(changed) => {
              console.log("changed: ", changed);
            }}
            initialValues={{
              sendingChain: "4",
              receivingChain: "5",
              asset: "TEST",
              amount: "1",
              routerAddress: "0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6",
            }}
          >
            <Form.Item label="Sending Chain" name="sendingChain">
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item name="sendingChain">
                    <Select>
                      <Select.Option value="4">Rinkeby</Select.Option>
                      <Select.Option value="5">Goerli</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item dependencies={["sendingChain"]}>
                    {() => (
                      <Button
                        onClick={() => switchChains(parseInt(form.getFieldValue("sendingChain")))}
                        disabled={injectedProviderChainId === parseInt(form.getFieldValue("sendingChain"))}
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
                      <Select.Option value="4">Rinkeby</Select.Option>
                      <Select.Option value="5">Goerli</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item label="Asset" name="asset">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="asset">
                    <Select>
                      <Select.Option value="TEST">Test Token</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {form.getFieldValue("asset") === "TEST" && (
                  <>
                    <Col span={6}>
                      <Button block onClick={() => mintTokens()}>
                        Get TEST
                      </Button>
                    </Col>
                    <Col span={6}>
                      <Button type="link" onClick={() => addToMetamask()}>
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

            <Form.Item label="Router Address" name="routerAddress">
              <Input />
            </Form.Item>

            <Form.Item label="Receiving Address" name="receivingAddress">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} dependencies={["sendingChain", "receivingChain"]}>
              {() => (
                <Button
                  disabled={form.getFieldValue("sendingChain") === form.getFieldValue("receivingChain")}
                  type="primary"
                  htmlType="submit"
                >
                  Transfer
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
