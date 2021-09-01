import { Button, Checkbox, Col, Form, Input, Row, Typography, Table, Divider } from "antd";
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

const ASSETS: Record<number, { [asset: string]: string }> = {
  56: {
    usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    usdt: "0x55d398326f99059ff775485246999027b3197955",
    dai: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3",
  },
  100: {
    usdc: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    usdt: "0x4ecaba5870353805a9f068101a40e0f32ed605c6",
    dai: "0x0000000000000000000000000000000000000000",
  },
  137: {
    usdc: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    usdt: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    dai: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  },
  250: {
    usdc: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
    usdt: "0x049d68029688eabf473097a2fc38ef61633a3c7a",
    dai: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e",
  },
};

type BalanceEntry = {
  chain: string;
  token: string;
  assetId: string;
  balance: string;
};

export const Router = ({ web3Provider, signer, chainData }: RouterProps): ReactElement => {
  const [txManager, setTxManager] = useState<Contract>();
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [routerAddress, setRouterAddress] = useState<string>();
  const [balances, setBalances] = useState<BalanceEntry[]>();
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

  const addLiquidity = async (assetId: string, liquidityToAdd: string, infiniteApprove: boolean): Promise<string> => {
    console.log("Add liquidity: ", routerAddress, assetId, liquidityToAdd, infiniteApprove);
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    } else if (!routerAddress) {
      throw new Error("Needs router address");
    }
    let value: BigNumber;
    let liquidityWei: BigNumber;
    const signerAddress = await signer.getAddress();
    const decimals = await getDecimals(assetId);
    if (assetId !== constants.AddressZero) {
      const token = new Contract(assetId, ERC20Abi, signer);
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
    const addLiquidity = await txManager.addLiquidityFor(liquidityWei, assetId, routerAddress, { value });
    console.log("addLiquidity tx: ", addLiquidity);
    await addLiquidity.wait();
    const liquidity = await getLiquidity(form.getFieldValue("assetId"));
    return liquidity;
  };

  // Refreshes the balances table with human readable values for each asset on current chain.
  const refreshBalances = async (): Promise<void> => {
    if (!routerAddress || !(routerAddress.length === 42)) {
      return;
    }

    const liquidityTable: BalanceEntry[] = [];
    for (const chain of Object.keys(ASSETS)) {
      const chainId = Number(chain);
      const data = chainData?.find((c) => c.chainId === chainId);
      if (!data) {
        continue;
      }

      console.log("Retrieving for", data.chain, "...");

      const provider = new providers.StaticJsonRpcProvider(data.rpc[0]);
      if (!provider) {
        continue;
      }
      const _txManager = getDeployedTransactionManagerContract(chainId);
      if (!_txManager) {
        continue;
      }
      const txm = new Contract(_txManager.address, _txManager.abi, provider);
      const assets = ASSETS[chainId];
      for (const [name, assetId] of Object.entries(assets)) {
        try {
          // TODO: redundant code with getLiquidity and getDecimals
          const liquidity = await txm.routerBalances(routerAddress, assetId);
          const token = new Contract(assetId, ERC20Abi, provider);
          const _decimals = decimals[assetId.toLowerCase()] ? decimals[assetId.toLowerCase()] : await token.decimals();
          decimals[assetId.toLowerCase()] = _decimals;
          const balance = utils.formatUnits(liquidity, _decimals);
          liquidityTable.push({
            chain: data.chain,
            token: name,
            assetId,
            balance,
          });
        } catch (error) {
          console.log("Error requesting router balance for asset:", name, assetId);
          console.log(error);
          liquidityTable.push({
            chain: data.chain,
            token: name,
            assetId,
            balance: "",
          });
        }
      }
    }

    setBalances(liquidityTable);
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
          <Button type="primary" onClick={() => refreshBalances()}>
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
              refreshBalances();
            }}
            value={routerAddress}
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
                title: "Chain",
                dataIndex: "chain",
                key: "chain",
              },
              {
                title: "Asset",
                dataIndex: "token",
                key: "token",
              },
              {
                title: "Asset ID",
                dataIndex: "assetId",
                key: "assetId",
              },
              {
                title: "Balance",
                dataIndex: "balance",
                key: "balance",
              },
            ]}
            dataSource={balances?.map((l, i) => ({ ...l, token: l.token.toUpperCase(), key: i }))}
            footer={() => (
              <div>
                Total: {balances?.map((l) => (l.balance ? Number(l.balance) : 0)).reduce((a, b) => a + b) || "0"}
              </div>
            )}
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
            onFinish={({ assetId, liquidityToAdd, infiniteApproval }) => {
              addLiquidity(assetId, liquidityToAdd, infiniteApproval);
            }}
            onFieldsChange={() => {}}
          >
            <Form.Item label="Asset ID" name="assetId">
              <Input />
            </Form.Item>

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
