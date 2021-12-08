/* eslint-disable require-jsdoc */
import { ChainData, getChainData } from "@connext/nxtp-utils";
import { Button, Col, Row, Tabs, Typography } from "antd";
import { providers, Signer } from "ethers";
import { ReactElement, useEffect, useState } from "react";

import "./App.css";
import { Router } from "./components/Router";
import { Swap } from "./components/Swap";

function App(): ReactElement | null {
  const [web3Provider, setProvider] = useState<providers.Web3Provider>();
  const [signer, setSigner] = useState<Signer>();
  const [chainData, setChainData] = useState<ChainData[]>([]);
  const [account, setAccount] = useState(null);
  const connectMetamask = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === "undefined") {
      alert("Please install Metamask");
      return;
    }
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("accounts: ", accounts);
      setAccount(accounts[0]);
      const provider = new providers.Web3Provider(ethereum);
      const _signer = provider.getSigner();
      const address = await _signer.getAddress();
      setSigner(_signer);
      setProvider(provider);
      console.log("address: ", address);

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
      const data = await getChainData();
      setChainData(data);
    };
    init();
  }, []);

  return (
    <div style={{ marginTop: 36, marginLeft: 12, marginRight: 12 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Typography.Title>NXTP Test UI</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={connectMetamask} disabled={!!web3Provider}>
            {account ? `${account}` : "Connect Metamask"}
          </Button>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Swap" key="1">
          <Swap web3Provider={web3Provider} signer={signer} chainData={chainData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Router" key="2">
          <Router web3Provider={web3Provider} signer={signer} chainData={chainData} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default App;
