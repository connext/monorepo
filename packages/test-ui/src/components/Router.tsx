import { Button, Checkbox, Col, Form, Input, Row, Typography, Table, Divider } from "antd";
import { BigNumber, constants, Contract, providers, Signer, utils } from "ethers";
import { ReactElement, useEffect, useState } from "react";
import { ChainData, ERC20Abi, getDeployedSubgraphUri, isValidAddress } from "@connext/nxtp-utils";
import { getDeployedTransactionManagerContract } from "@connext/nxtp-sdk";
import { request, gql } from "graphql-request";

import { getChainName, getExplorerLinkForAddress } from "../utils";

type RouterProps = {
  web3Provider?: providers.Web3Provider;
  signer?: Signer;
  chainData?: ChainData[];
};

const decimals: Record<string, number> = {};

const CHAINS = [56, 100, 137, 250];

type BalanceEntry = {
  chain: string;
  symbol: string;
  assetId: string;
  balance: string;
};

const getLiquidityQuery = gql`
  query getLiquidity($router: ID!) {
    router(id: $router) {
      assetBalances {
        amount
        id
      }
    }
  }
`;

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

  const getDecimals = async (assetId: string, provider?: providers.StaticJsonRpcProvider): Promise<number> => {
    if (decimals[assetId.toLowerCase()]) {
      return decimals[assetId.toLowerCase()]!;
    }
    if (assetId === constants.AddressZero) {
      decimals[assetId] = 18;
      return 18;
    }
    const token = provider ? new Contract(assetId, ERC20Abi, provider) : new Contract(assetId, ERC20Abi, signer);
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
    if (!isValidAddress(routerAddress)) {
      return;
    }

    const entries = await Promise.all(
      CHAINS.map(async (chainId) => {
        const uri = getDeployedSubgraphUri(chainId);
        if (!uri) {
          console.error("Subgraph not available for chain: ", chainId);
          return;
        }
        const data = chainData?.find((c) => c.chainId === chainId);
        if (!data) {
          console.error("Chaindata not available for chain: ", chainId);
          return;
        }
        const liquidity = await request(uri, getLiquidityQuery, { router: routerAddress!.toLowerCase() });
        const balanceEntries = liquidity?.router?.assetBalances.map(
          ({ amount, id }: { amount: string; id: string }): BalanceEntry | undefined => {
            console.log("chainId: ", chainId);
            console.log("id: ", id);
            console.log("amount: ", amount);
            const assetId = utils.getAddress(id.split("-")[0]);
            const decimals =
              data.assetId[assetId]?.decimals ??
              data.assetId[assetId.toLowerCase()]?.decimals ??
              data.assetId[assetId.toUpperCase()].decimals;
            if (!decimals) {
              console.error(`No decimals for asset ${assetId} on chain ${chainId}`);
              return;
            }
            return {
              assetId,
              balance: utils.formatUnits(amount, decimals),
              chain: data.chain,
              symbol: data.assetId[assetId]?.symbol || assetId,
            };
          },
        );

        return balanceEntries.filter((x: BalanceEntry | undefined) => !!x);
      }),
    );
    const liquidityTable = entries.filter((x) => !!x).flat() as BalanceEntry[];

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
            dataSource={balances?.map((l, i) => ({ ...l, token: l.symbol.toUpperCase(), key: i }))}
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
