import { Button, Checkbox, Col, Form, Input, Row, Typography, Table, Divider, Tooltip } from "antd";
import { BigNumber, constants, Contract, providers, Signer, utils } from "ethers";
import { ReactElement, useEffect, useState } from "react";
import { ChainData, ERC20Abi } from "@connext/nxtp-utils";
import { getDeployedTransactionManagerContract } from "@connext/nxtp-sdk";

import { getChainName, getExplorerLinkForAddress } from "../utils";

type RouterProps = {
  web3Provider?: providers.Web3Provider;
  signer?: Signer;
  chainData?: ChainData[];
};

const decimals: Record<string, number> = {};

const USDC_ADDRESS: Record<number, string> = {
  56: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  100: "0xD10Cc63531a514BBa7789682E487Add1f15A51E2",
  137: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
};

export const Router = ({ web3Provider, signer, chainData }: RouterProps): ReactElement => {
  const [txManager, setTxManager] = useState<Contract>();
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [routerAddress, setRouterAddress] = useState<string>();
  const [observedAssetId, setAssetId] = useState<string>(constants.AddressZero);
  const [liquidityTable, setLiquidityTable] = useState<Record<string, string>>();
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

  const getDecimals = async (assetId: string): Promise<number> => {
    if (decimals[assetId.toLowerCase()]) {
      return decimals[assetId.toLowerCase()]!;
    }
    if (assetId === constants.AddressZero) {
      decimals[assetId] = 18;
      return 18;
    }
    const token = new Contract(assetId, ERC20Abi, signer);
    const _decimals = await token.decimals();
    decimals[assetId.toLowerCase()] = _decimals;
    return _decimals;
  };

  const addLiquidity = async (liquidityToAdd: string, infiniteApprove: boolean): Promise<string> => {
    console.log("Add liquidity: ", routerAddress, observedAssetId, liquidityToAdd, infiniteApprove);
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    } else if (!routerAddress) {
      throw new Error("Needs router address");
    }
    let value: BigNumber;
    let liquidityWei: BigNumber;
    const signerAddress = await signer.getAddress();
    const decimals = await getDecimals(observedAssetId);
    if (observedAssetId !== constants.AddressZero) {
      const token = new Contract(observedAssetId, ERC20Abi, signer);
      liquidityWei = utils.parseUnits(liquidityToAdd, decimals);
      const allowance = await token.allowance(signerAddress, txManager.address);
      console.log("allowance: ", allowance.toString());
      if (allowance.lt(liquidityWei)) {
        const tx = await token.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : liquidityWei);
        console.log("approve tx: ", tx);
        await tx.wait();
      } else {
        console.log("allowance is sufficient");
      }
      value = constants.Zero;
    } else {
      value = utils.parseEther(liquidityToAdd);
      liquidityWei = value;
    }
    console.log("value: ", value.toString());
    console.log("liquidityWei: ", liquidityWei.toString());
    const addLiquidity = await txManager.addLiquidityFor(liquidityWei, observedAssetId, routerAddress, { value });
    console.log("addLiquidity tx: ", addLiquidity);
    await addLiquidity.wait();
    const liquidity = await getLiquidity(form.getFieldValue("assetId"));
    return liquidity;
  };

  // Refreshes the liquidity table with human readable values for each asset on current chain.
  const refreshLiquidity = async (): Promise<void> => {
    if (!injectedProviderChainId || !txManager) {
      console.error("Needs signer", signer, txManager, injectedProviderChainId);
      return;
    }
    if (!routerAddress || !(routerAddress.length === 42)) {
      return;
    }

    // Temporarily using hardcoded USDC address for each chain as a backup for convenience.
    const assetId = observedAssetId
      ? observedAssetId
      : injectedProviderChainId in USDC_ADDRESS
      ? USDC_ADDRESS[injectedProviderChainId]
      : "";
    if (!assetId) {
      console.log(`Not supporting chain ${injectedProviderChainId} for monitoring rn`);
      return;
    }

    const liquidity = await getLiquidity(assetId);
    setLiquidityTable((prevLiquidity) => ({
      ...prevLiquidity,
      [assetId]: liquidity,
    }));
  };

  // Returns value in human readable units
  const getLiquidity = async (assetId: string): Promise<string> => {
    if (!txManager) {
      throw new Error("Needs signer");
    }
    const liquidity = await txManager.routerBalances(routerAddress, assetId);
    console.log("liquidity: ", liquidity);
    return utils.formatUnits(liquidity, await getDecimals(assetId));
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
        <Col span={3} />
        <Col span={8}>
          <Typography.Title level={2}>Manage Liquidity</Typography.Title>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={3} />
        <Col span={12}>
          <Typography.Title level={4}>Router Balances</Typography.Title>
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={() => refreshLiquidity()}>
            Reload
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3} />
        <Col span={16}>
          <Input
            addonBefore="Router Address:"
            placeholder="0x..."
            onChange={(e) => {
              setRouterAddress(e.target.value);
              refreshLiquidity();
            }}
            value={routerAddress}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3} />
        <Col span={16}>
          <Input
            addonBefore="Asset ID:"
            onChange={(e) => setAssetId(e.target.value)}
            value={observedAssetId}
            suffix={
              <Tooltip title="Leave blank to use default USDC for current chain.">
                <div>(?)</div>
              </Tooltip>
            }
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={3} />
        <Col span={16}>
          <Table
            pagination={false}
            columns={[
              {
                title: "Asset",
                dataIndex: "assetId",
                key: "assetId",
              },
              {
                title: "Liquidity",
                dataIndex: "liquidity",
                key: "liquidity",
              },
            ]}
            dataSource={(liquidityTable ? Object.entries(liquidityTable) : []).map(([assetId, liquidity]) => ({
              assetId,
              liquidity,
            }))}
          />
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={3} />
        <Col span={8}>
          <Typography.Title level={4}>Add Liquidity</Typography.Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={({ liquidityToAdd, infiniteApproval }) => {
              addLiquidity(liquidityToAdd, infiniteApproval);
            }}
            onFieldsChange={() => {}}
            initialValues={{
              assetId: constants.AddressZero,
            }}
          >
            <Form.Item label="Liquidity to Add" name="liquidityToAdd">
              <Input />
            </Form.Item>

            <Form.Item label="Infinite Approval" name="infiniteApproval" valuePropName="checked">
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
