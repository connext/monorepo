import React, { useEffect, useState } from "react";
import { Col, Row, Input, Typography, Form, Button, Select, Steps } from "antd";
import { BigNumber, constants, providers, Signer, utils } from "ethers";
import pino from "pino";
import { NxtpSdk, NxtpSdkEvents } from "@connext/nxtp-sdk";
import { getRandomBytes32 } from "@connext/nxtp-utils";

import "./App.css";

// NOTE: infura urls ignore cors issues
const receivingProviderUrl = "https://rpc.goerli.mudit.blog/";

function App(): React.ReactElement | null {
  const [step, setStep] = useState<0 | 1 | 2>(0);
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
      const provider = new providers.Web3Provider((window as any).ethereum);
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
      const _sdk = await NxtpSdk.init(
        web3Provider,
        new providers.JsonRpcProvider(receivingProviderUrl, 5),
        signer,
        pino({ level: "info" }),
      );
      setSdk(_sdk);
      _sdk.attach(NxtpSdkEvents.TransactionPrepared, (data) => {
        console.log("tx prepared:", data);
      });

      _sdk.attach(NxtpSdkEvents.TransactionCompleted, (data) => {
        console.log("tx completed:", data);
      });

      _sdk.attach(NxtpSdkEvents.TransactionFulfilled, (data) => {
        console.log("tx fulfilled:", data);
      });

      _sdk.attach(NxtpSdkEvents.TransactionCancelled, (data) => {
        console.log("tx cancelled:", data);
      });
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
            params: [{ chainId, rpcUrl: receivingProviderUrl }],
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

  const transfer = async (sendingChain: number, receivingChain: number, amount: string) => {
    if (!sdk) {
      return;
    }

    // Create txid
    const transactionId = getRandomBytes32();

    await switchChains(sendingChain);

    // Add listeners
    sdk.attachOnce(
      NxtpSdkEvents.TransactionPrepared,
      () => setStep(1),
      (data) => data.txData.sendingChainId === sendingChain && data.txData.transactionId === transactionId,
    );

    sdk.attachOnce(
      NxtpSdkEvents.TransactionCompleted,
      () => setStep(2),
      (data) => data.txData.sendingChainId === receivingChain && data.txData.transactionId === transactionId,
    );

    sdk.attachOnce(
      NxtpSdkEvents.TransactionCancelled,
      () => setStep(0),
      (data) => data.txData.sendingChainId === sendingChain && data.txData.transactionId === transactionId,
    );

    try {
      await sdk.transfer({
        router: routerAddress,
        sendingAssetId: constants.AddressZero,
        receivingAssetId: constants.AddressZero,
        receivingAddress,
        amount,
        transactionId,
        expiry: (Date.now() + 3600 * 24 * 2).toString(), // 2 days
        // callData?: string;
      });
      setStep(2);
    } catch (e) {
      console.log(e);
      setStep(0);
      throw e;
    }
  };

  return (
    <div style={{ margin: 36 }}>
      <Row gutter={16}>
        <Col span={16}>
          <Typography.Title>NXTP</Typography.Title>
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
            <Form.Item label=" ">
              <Button type="primary" onClick={connectMetamask} disabled={!!web3Provider}>
                Connect Metamask
              </Button>
            </Form.Item>

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
              <Button type="primary" htmlType="submit">
                Transfer
              </Button>
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
          </Form>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Steps current={step}>
            <Steps.Step title="Pending" description="Waiting for user action." />
            <Steps.Step title="Prepared" description="Transaction prepared on sender chain." />
            <Steps.Step title="Fulfilled" description="Transfer completed." />
          </Steps>
        </Col>
      </Row>
    </div>
  );
}

export default App;
