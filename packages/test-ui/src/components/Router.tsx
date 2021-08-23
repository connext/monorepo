import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";
import { BigNumber, constants, Contract, providers, Signer } from "ethers";
import { ReactElement, useEffect, useState } from "react";
import { ChainData, ERC20Abi } from "@connext/nxtp-utils";
import { getDeployedTransactionManagerContract } from "@connext/nxtp-sdk";

import { getChainName, getExplorerLinkForAddress } from "../utils";

type RouterProps = {
  web3Provider?: providers.Web3Provider;
  signer?: Signer;
  chainData?: ChainData[];
};

export const Router = ({ web3Provider, signer, chainData }: RouterProps): ReactElement => {
  const [txManager, setTxManager] = useState<Contract>();
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [form] = Form.useForm();

  useEffect(() => {
    const init = async () => {
      if (!web3Provider || !signer) {
        return;
      }
      const { chainId } = await signer.provider!.getNetwork();
      setInjectedProviderChainId(chainId);
      const _txManager = getDeployedTransactionManagerContract(chainId);
      if (_txManager) {
        setTxManager(new Contract(_txManager.address, _txManager.abi, signer));
      }
    };
    init();
  }, [web3Provider, signer]);

  const addLiquidity = async (
    routerAddress: string,
    assetId: string,
    liquidityToAdd: string,
    infiniteApprove: boolean,
  ): Promise<BigNumber> => {
    console.log("Add liquidity: ", routerAddress, assetId, liquidityToAdd, infiniteApprove);
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    }
    let value = liquidityToAdd;
    if (assetId !== constants.AddressZero) {
      const token = new Contract(assetId, ERC20Abi, signer);
      const tx = await token.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : liquidityToAdd);
      console.log("approve tx: ", tx);
      await tx.wait();
      value = "0";
    }
    console.log("value: ", value);
    const addLiquidity = await txManager.addLiquidityFor(liquidityToAdd, assetId, routerAddress, { value });
    console.log("addLiquidity tx: ", addLiquidity);
    await addLiquidity.wait();
    const liquidity = await getLiquidity(form.getFieldValue("routerAddress"), form.getFieldValue("assetId"));
    form.setFieldsValue({
      currentLiquidity: liquidity.toString(),
    });
    return liquidity;
  };

  const getLiquidity = async (routerAddress: string, assetId: string): Promise<BigNumber> => {
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    }
    const liquidity = await txManager.routerBalances(routerAddress, assetId);
    console.log("liquidity: ", liquidity.toString());
    return liquidity;
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={21}>
          <Typography.Paragraph>
            Connected to{" "}
            {injectedProviderChainId && chainData && txManager ? (
              <>
                {getChainName(injectedProviderChainId, chainData)}:{" "}
                <a
                  href={getExplorerLinkForAddress(txManager.address, injectedProviderChainId, chainData)}
                  target="_blank"
                >
                  Transaction Manager Contract
                </a>
              </>
            ) : (
              "-"
            )}
          </Typography.Paragraph>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3}></Col>
        <Col span={8}>
          <Typography.Title level={2}>Manage Liquidity</Typography.Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={({ routerAddress, assetId, liquidityToAdd, infiniteApproval }) => {
              addLiquidity(routerAddress, assetId, liquidityToAdd, infiniteApproval);
            }}
            onFieldsChange={() => {}}
            initialValues={{
              assetId: constants.AddressZero,
            }}
          >
            <Form.Item label="Router Address" name="routerAddress">
              <Input />
            </Form.Item>

            <Form.Item label="Asset Id" name="assetId">
              <Input />
            </Form.Item>

            <Form.Item label="Current Liquidity" name="currentLiquidity">
              <Input
                disabled
                placeholder="..."
                addonAfter={
                  <Button
                    disabled={!web3Provider || !signer || !txManager}
                    type="primary"
                    onClick={async () => {
                      const liquidity = await getLiquidity(
                        form.getFieldValue("routerAddress"),
                        form.getFieldValue("assetId"),
                      );
                      form.setFieldsValue({
                        currentLiquidity: liquidity.toString(),
                      });
                    }}
                  >
                    Get Current Liquidity
                  </Button>
                }
              />
            </Form.Item>

            <Form.Item label="Liquidity to Add" name="liquidityToAdd">
              <Input />
            </Form.Item>

            <Form.Item label="Infinite Approval" name="infiniteApproval">
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Add Liquidity
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
