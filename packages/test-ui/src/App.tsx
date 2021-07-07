import React, { useEffect, useState } from "react";
import { Col, Row, Input, Typography, Form, Button, Select, Table } from "antd";
import { BigNumber, constants, providers, Signer, utils } from "ethers";
import pino from "pino";
import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { getRandomBytes32 } from "@connext/nxtp-utils";

import "./App.css";
import { providerUrls } from "./constants";

function App(): React.ReactElement | null {
  const [web3Provider, setProvider] = useState<providers.Web3Provider>();
  const [routerAddress, setRouterAddress] = useState<string>("0xDc150c5Db2cD1d1d8e505F824aBd90aEF887caC6");
  const [receivingAddress, setReceivingAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("0.01");
  const [signer, setSigner] = useState<Signer>();
  const [sdk, setSdk] = useState<NxtpSdk>();

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
      setSigner(_signer);
      const address = await _signer.getAddress();
      console.log("address: ", address);
      console.log(address);
      setReceivingAddress(address);
      setProvider(provider);
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
      const chainProviders: { [chainId: number]: providers.JsonRpcProvider } = {};
      Object.entries(providerUrls).forEach(
        ([chainId, url]) => (chainProviders[parseInt(chainId)] = new providers.JsonRpcProvider(url, parseInt(chainId))),
      );
      const _sdk = await NxtpSdk.init(chainProviders, signer, pino({ level: "info" }));
      setSdk(_sdk);
      _sdk.attach(NxtpSdkEvents.SenderTransactionPrepared, (data) => {
        console.log("SenderTransactionPrepared:", data);
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionFulfilled, (data) => {
        console.log("SenderTransactionFulfilled:", data);
      });

      _sdk.attach(NxtpSdkEvents.SenderTransactionCancelled, (data) => {
        console.log("SenderTransactionCancelled:", data);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionPrepared, (data) => {
        console.log("ReceiverTransactionPrepared:", data);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionFulfilled, (data) => {
        console.log("ReceiverTransactionFulfilled:", data);
      });

      _sdk.attach(NxtpSdkEvents.ReceiverTransactionCancelled, (data) => {
        console.log("ReceiverTransactionCancelled:", data);
      });
      const activeTxs = await _sdk.getActiveTransactions();
      console.log("activeTxs: ", activeTxs);
    };
    init();
  }, [web3Provider, signer]);

  const switchChains = async (targetChainId: number) => {
    if (!signer || !web3Provider) {
      return;
    }
    const { chainId: _chainId } = await signer.provider!.getNetwork();
    if (_chainId === targetChainId) {
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
      window.location.reload();
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

  const transfer = async (sendingChainId: number, receivingChainId: number, amount: string) => {
    if (!sdk) {
      return;
    }

    // Create txid
    const transactionId = getRandomBytes32();

    await switchChains(sendingChainId);

    try {
      await sdk.transfer({
        router: routerAddress,
        sendingAssetId: constants.AddressZero,
        sendingChainId,
        receivingChainId,
        receivingAssetId: constants.AddressZero,
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

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

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
      title: "Amount Received",
      dataIndex: "amountReceived",
      key: "amountReceived",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

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

      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={8}>
          <Typography.Title level={2}>Active Transfers</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={3}></Col>
        <Col span={20}>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
        <Col span={3}></Col>
      </Row>

      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={8}>
          <Typography.Title level={2}>New Transfer</Typography.Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(vals) => {
              transfer(
                parseInt(vals.sendingChain),
                parseInt(vals.receivingChain),
                utils.parseEther(vals.amount).toString(),
              );
            }}
            initialValues={{ sendingChain: "4", receivingChain: "5", asset: "TEST", amount: "1" }}
          >
            <Form.Item label="Sending Chain" name="sendingChain">
              <Select>
                <Select.Option value="4">Rinkeby</Select.Option>
                {/* <Select.Option value="5">Goerli</Select.Option> */}
              </Select>
            </Form.Item>

            <Form.Item label="Receiving Chain" name="receivingChain">
              <Select>
                {/* <Select.Option value="4">Rinkeby</Select.Option> */}
                <Select.Option value="5">Goerli</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Asset" name="asset">
              <Select>
                <Select.Option value="TEST">Test Token</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Amount" name="amount">
              <Input type="number" onChange={(event) => setAmount(event.target.value)} value={amount} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Input
                addonBefore="Router Address"
                onChange={(event) => setRouterAddress(event.target.value)}
                value={routerAddress}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Input
                addonBefore="Receiving Address"
                onChange={(event) => setReceivingAddress(event.target.value)}
                value={receivingAddress}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Transfer
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default App;
