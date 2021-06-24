import React, { useState } from "react";
import { Col, Row, Input, Typography, Form, Button, Select, Steps } from "antd";

import "./App.css";

function App() {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  const connectMetamask = async () => {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum === "undefined") {
      alert("Please install Metamask");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log("account: ", account);
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
            initialValues={{ sendingChain: "4", receivingChain: "5", asset: "TEST", amount: "1" }}
          >
            <Form.Item label=" ">
              <Button type="primary" onClick={connectMetamask}>
                Connect Metamask
              </Button>
            </Form.Item>

            <Form.Item label="Sending Chain" name="sendingChain">
              <Select>
                <Select.Option value="4">Rinkeby</Select.Option>
                <Select.Option value="5">Goerli</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Receiving Chain" name="receivingChain">
              <Select>
                <Select.Option value="4">Rinkeby</Select.Option>
                <Select.Option value="5">Goerli</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Asset" name="asset">
              <Select>
                <Select.Option value="TEST">Test Token</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Amount" name="amount">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Transfer
              </Button>
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
