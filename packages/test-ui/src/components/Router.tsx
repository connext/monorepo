import { Button, Checkbox, Col, Form, Input, Row, Typography, Table, Divider } from "antd";
import { BigNumber, constants, Contract, providers, Signer, utils } from "ethers";
import { ReactElement, useEffect, useState } from "react";
import { ChainData, ERC20Abi, getAmountsOut, getDeployedSubgraphUri, isValidAddress } from "@connext/nxtp-utils";
import { getDeployedTransactionManagerContract } from "@connext/nxtp-sdk";
import { request, gql } from "graphql-request";
import { getAddress } from "ethers/lib/utils";
import TransactionManagerArtifact from "@connext/nxtp-contracts/artifacts/contracts/TransactionManager.sol/TransactionManager.json";
import { getChainName, getExplorerLinkForAddress } from "../utils";

// Stable swap addresses
// 1338: 0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC
// 1337: 0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC

// TODO: get from config/utils
// Stable swap on rinkeby
const AMPLIFICATION = "85";

// router: 0x627306090abaB3A6e1400e9345bC60c78a8BEf57

type RouterProps = {
  web3Provider?: providers.Web3Provider;
  signer?: Signer;
  chainData?: ChainData[];
};

const decimals: Record<string, number> = {};

// const LOCAL_STABLE_SWAP_ADDR = "0xEcFcaB0A285d3380E488A39B4BB21e777f8A4EaC";
const LOCAL_TOKEN = "0xF12b5dd4EAD5F743C6BaA640B0216200e89B60Da";
const LOCAL_TRANSACTION_MANAGER = "0x8CdaF0CD259887258Bc13a92C0a6dA92698644C0";
const LOCAL_CHAINS = [1337, 1338];

const TESTNET_CHAINS = [421611, 97, 43113, 5, 42, 80001, 4, 3];

const MAINNET_CHAINS = [56, 100, 137, 250, 42161, 43114];

type BalanceEntry = {
  chain: string;
  symbol: string;
  assetId: string;
  balance: string;
  decimals: number;
  chainId: number;
};

type PriceImpactEntry = {
  chain: string;
  amountIn: string;
  symbol: string;
  oldAmountOut: string;
  newAmountOut: string;
};

const Networks = {
  Mainnets: "Mainnets",
  Testnets: "Testnets",
  Local: "Local",
} as const;
type Network = keyof typeof Networks;

enum LIQUIDITY_ACTION {
  NONE,
  ADD,
  REMOVE,
}

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

const getSwapRateFromStableMath = async (
  amountIn: BigNumber,
  balances: BigNumber[],
  indexIn: number,
  indexOut: number,
): Promise<BigNumber> => {
  const amountOut = await getAmountsOut(
    AMPLIFICATION,
    balances.map((balance) => balance.toString()),
    indexIn,
    indexOut,
    amountIn.toString(),
  );
  return BigNumber.from(amountOut);
};

export const Router = ({ web3Provider, signer, chainData }: RouterProps): ReactElement => {
  const [txManager, setTxManager] = useState<Contract>();
  const [injectedProviderChainId, setInjectedProviderChainId] = useState<number>();
  const [routerAddress, setRouterAddress] = useState<string>("0x29A519e21d6A97cdB82270b69c98bAc6426CDCf9");
  const [balances, setBalances] = useState<BalanceEntry[]>();
  const [priceImpactsOnAdd, setPriceImpactsOnAdd] = useState<PriceImpactEntry[]>();
  const [priceImpactsOnRemove, setPriceImpactsOnRemove] = useState<PriceImpactEntry[]>();
  const [form] = Form.useForm();
  const [network, setNetwork] = useState<Network>(Networks.Mainnets);
  const [liquidityAmountToAdd, setLiquidityAmountToAdd] = useState(0);
  const [liquidityAmountToRemove, setLiquidityAmountToRemove] = useState(0);
  const [assetIdToAdd, setAssetIdToAdd] = useState("");
  const [assetIdToRemove, setAssetIdToRemove] = useState("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    if (injectedProviderChainId) {
      if (MAINNET_CHAINS.includes(injectedProviderChainId)) {
        setNetwork(Networks.Mainnets);
      } else if (TESTNET_CHAINS.includes(injectedProviderChainId)) {
        setNetwork(Networks.Testnets);
      } else if (LOCAL_CHAINS.includes(injectedProviderChainId)) {
        setNetwork(Networks.Local);
      }
    }
  }, [injectedProviderChainId]);

  const getChains = (_network?: Network): number[] => {
    const n = _network ?? network;
    switch (n) {
      case Networks.Local:
        return LOCAL_CHAINS;
      case Networks.Mainnets:
        return MAINNET_CHAINS;
      case Networks.Testnets:
        return TESTNET_CHAINS;
      default:
        console.error("Unrecognized network:", n);
        return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!web3Provider || !signer) {
        return;
      }
      const { chainId } = await signer.provider!.getNetwork();
      const signerAddress = await signer.getAddress();
      setAccount(signerAddress);
      setInjectedProviderChainId(chainId);
      const _txManager = LOCAL_CHAINS.includes(chainId)
        ? { address: LOCAL_TRANSACTION_MANAGER, abi: TransactionManagerArtifact.abi }
        : getDeployedTransactionManagerContract(chainId);
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

  const getSubgraphAndChainDataForChain = (chainId: number): { uri?: string; data?: any } => {
    let uri: string | undefined;
    let data: any | undefined;
    if (LOCAL_CHAINS.includes(chainId)) {
      uri = `http://localhost:${chainId === 1337 ? 9 : 8}010/subgraphs/name/connext/nxtp`;
      data = {
        chain: chainId.toString(),
        assetId: {
          [constants.AddressZero]: {
            decimals: 18,
            symbol: constants.EtherSymbol,
          },
          [LOCAL_TOKEN]: {
            decimals: 18,
            symbol: "TEST",
          },
        },
      };
    } else {
      uri = getDeployedSubgraphUri(chainId);
      data = chainData?.find((c) => c.chainId === chainId);
    }
    return { uri, data };
  };

  const addLiquidity = async (assetId: string, liquidityToAdd: string, infiniteApprove: boolean): Promise<string> => {
    console.log("Add liquidity: ", routerAddress, assetId, liquidityToAdd, infiniteApprove);
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    } else if (!routerAddress) {
      throw new Error("Needs router address");
    }
    let value: BigNumber;
    let liquidityToAddWei: BigNumber;
    const chainId = await signer.getChainId();

    // if arbitrum bump gas limit to 10M
    const gasLimit = chainId === 42161 ? 10_000_000 : 250_000;

    const signerAddress = account;
    const decimals = await getDecimals(assetId);
    if (assetId !== constants.AddressZero) {
      const token = new Contract(assetId, ERC20Abi, signer);
      liquidityToAddWei = utils.parseUnits(liquidityToAdd, decimals);
      const allowance = await token.allowance(signerAddress, txManager.address);
      console.log("allowance: ", allowance.toString());

      if (allowance.lt(liquidityToAddWei)) {
        const tx = await token.approve(txManager.address, infiniteApprove ? constants.MaxUint256 : liquidityToAddWei, {
          gasLimit: gasLimit,
        });
        console.log("approve tx: ", tx);
        await tx.wait();
      } else {
        console.log("allowance is sufficient");
      }
      value = constants.Zero;
    } else {
      value = utils.parseEther(liquidityToAdd);
      liquidityToAddWei = value;
    }
    console.log("value: ", value.toString());
    console.log("liquidityWei: ", liquidityToAddWei.toString());

    const addLiquidityTx = await txManager.addLiquidityFor(liquidityToAddWei, assetId, routerAddress, {
      value,
      gasLimit: gasLimit,
    });
    console.log("addLiquidity tx: ", addLiquidityTx);
    await addLiquidityTx.wait();
    const liquidity = await getLiquidity(assetId);
    return liquidity;
  };

  const removeLiquidity = async (assetId: string, liquidityToRemove: string): Promise<string> => {
    console.log("Remove liquidity: ", routerAddress, assetId, liquidityToRemove);
    if (!signer || !txManager) {
      throw new Error("Needs signer");
    } else if (!routerAddress) {
      throw new Error("Needs router address");
    }
    let value: BigNumber;
    let liquidityToRemoveWei: BigNumber;
    const decimals = await getDecimals(assetId);
    if (assetId !== constants.AddressZero) {
      liquidityToRemoveWei = utils.parseUnits(liquidityToRemove, decimals);
      value = constants.Zero;
    } else {
      value = utils.parseEther(liquidityToRemove);
      liquidityToRemoveWei = value;
    }
    console.log("value: ", value.toString());
    console.log("liquidityWei: ", liquidityToRemoveWei.toString());

    const removeLiquidityTx = await txManager.removeLiquidity(liquidityToRemoveWei, assetId, routerAddress, {
      gasLimit: 250_000,
    });
    console.log("removeLiquidity tx: ", removeLiquidityTx);
    await removeLiquidityTx.wait();
    const liquidity = await getLiquidity(assetId);
    return liquidity;
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

  const getBalancesFromSubgraph = async (chainId: number): Promise<BalanceEntry[] | undefined> => {
    const { data, uri } = getSubgraphAndChainDataForChain(chainId);
    if (!uri) {
      console.error("Subgraph not available for chain: ", chainId);
      return;
    }
    if (!data) {
      console.error("Chaindata not available for chain: ", chainId);
      return;
    }
    console.log("**** data", data);
    const liquidity = await request(uri, getLiquidityQuery, { router: routerAddress.toLowerCase() });
    const balanceEntries = (liquidity?.router?.assetBalances ?? []).map(
      ({ amount, id }: { amount: string; id: string }): BalanceEntry | undefined => {
        const assetId = utils.getAddress(id.split("-")[0]);
        let decimals =
          data.assetId[getAddress(assetId)]?.decimals ??
          data.assetId[assetId.toLowerCase()]?.decimals ??
          data.assetId[assetId.toUpperCase()]?.decimals;
        if (!decimals) {
          console.warn(`No decimals for asset ${assetId} on chain ${chainId}, using 18`);
          decimals = 18;
        }
        const chain = data.chain === "ETH" ? data.network : data.chain;
        return {
          chainId,
          assetId,
          balance: amount,
          decimals,
          chain,
          symbol:
            data.assetId[getAddress(assetId)]?.symbol ??
            data.assetId[assetId.toLowerCase()]?.symbol ??
            data.assetId[assetId.toUpperCase()]?.symbol ??
            assetId,
        };
      },
    );
    return balanceEntries.filter((x: BalanceEntry | undefined) => !!x);
  };

  // Refreshes the balances table with human readable values for each asset on current chain.
  const refreshBalances = async (_network?: Network): Promise<void> => {
    if (!isValidAddress(routerAddress)) {
      return;
    }

    const entries = (
      await Promise.all(
        getChains(_network).map(async (chainId) => {
          const balances = (await getBalancesFromSubgraph(chainId)) ?? [];
          if (balances.length === 0) {
            return undefined;
          }
          return balances;
        }),
      )
    )
      .flat()
      .filter((x) => !!x) as unknown as BalanceEntry[];

    // convert to human-readable
    const liquidityTable = entries.map((e) => {
      return {
        ...e,
        balance: utils.formatUnits(e.balance, e.decimals),
      };
    });

    setBalances(liquidityTable);
  };

  // Fetches price impacts
  const fetchPriceImpacts = async (
    liquidity: number,
    assetId: string,
    actionType: LIQUIDITY_ACTION,
    _network?: Network,
  ): Promise<void> => {
    if (actionType == LIQUIDITY_ACTION.ADD) {
      setPriceImpactsOnAdd([]);
    } else if (actionType == LIQUIDITY_ACTION.REMOVE) {
      setPriceImpactsOnRemove([]);
    }

    let entries = (
      await Promise.all(
        getChains(_network).map(async (chainId) => {
          const balances = (await getBalancesFromSubgraph(chainId)) ?? [];
          if (balances.length === 0) {
            return undefined;
          }
          return balances;
        }),
      )
    )
      .flat()
      .filter((x) => !!x) as unknown as BalanceEntry[];

    const activeEntry = entries.find((e) => e.assetId.toLocaleLowerCase() === assetId.toLocaleLowerCase());
    if (!activeEntry) return;
    const symbol = activeEntry.symbol.toLocaleLowerCase() == "xdai" ? "dai" : activeEntry.symbol.toLocaleLowerCase();
    console.log("> fetchPriceImpacts, symbol = ", symbol);
    console.log("entries = ", entries);

    if (_network === Networks.Mainnets) {
      entries = entries.filter((e) => e?.symbol.toLocaleLowerCase() === symbol.toLocaleLowerCase());
    }

    const oldBalanceList = entries.map((e) => {
      return {
        chainId: e.chainId,
        chain: e.chain,
        assetId: e.assetId,
        balance: utils.formatUnits(e.balance, e.decimals),
        decimals: e.decimals,
        symbol: e.symbol,
      };
    });

    const newBalanceList = entries.map((e) => {
      const oldBal = Number(utils.formatUnits(e.balance, e.decimals));
      const newBal =
        e.chainId === injectedProviderChainId
          ? actionType == LIQUIDITY_ACTION.ADD
            ? (oldBal + liquidity).toString()
            : actionType == LIQUIDITY_ACTION.REMOVE
            ? (oldBal - liquidity).toString()
            : oldBal.toString()
          : oldBal.toString();
      return {
        chainId: e.chainId,
        chain: e.chain,
        assetId: e.assetId,
        balance: newBal,
        decimals: e.decimals,
        symbol: e.symbol,
      };
    });

    const oldBalances = oldBalanceList.map((e) => {
      return utils.parseEther(e.balance);
    });

    const newBalances = newBalanceList.map((e) => {
      return utils.parseEther(e.balance);
    });

    const activeChainBalance = oldBalanceList.find((e) => e.chainId === injectedProviderChainId);
    const activeChainBalanceIndex = oldBalanceList.findIndex(
      (e) => e.assetId.toLocaleLowerCase() === assetId.toLocaleLowerCase(),
    );
    if (activeChainBalance) {
      const amountIn = utils.parseEther("1");
      const priceImpactList = await Promise.all(
        oldBalanceList.map(async (e, index) => {
          let oldAmountOut = BigNumber.from(0);
          let newAmountOut = BigNumber.from(0);
          if (activeChainBalanceIndex !== index) {
            try {
              oldAmountOut = await getSwapRateFromStableMath(amountIn, oldBalances, activeChainBalanceIndex, index);

              newAmountOut = await getSwapRateFromStableMath(amountIn, newBalances, activeChainBalanceIndex, index);
            } catch (e) {
              console.error("##################################### onSwapGiveIn Errror");
              console.log(e);
              console.log("index = ", index);
              console.log("activeChainBalanceIndex = ", activeChainBalanceIndex);
            }
          } else {
            oldAmountOut = amountIn;
            newAmountOut = amountIn;
          }

          const priceImpactItem: PriceImpactEntry = {
            chain: e.chain,
            amountIn: utils.formatUnits(amountIn.toString(), 18),
            symbol: e.symbol,
            oldAmountOut: utils.formatUnits(oldAmountOut.toString(), 18),
            newAmountOut: utils.formatUnits(newAmountOut.toString(), 18),
          };
          console.log("> priceImpactItem, ", priceImpactItem);
          return priceImpactItem;
        }),
      );
      if (actionType == LIQUIDITY_ACTION.ADD) {
        setPriceImpactsOnAdd(priceImpactList);
      } else if (actionType == LIQUIDITY_ACTION.REMOVE) {
        setPriceImpactsOnRemove(priceImpactList);
      }
    }
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
          <Row justify="space-around">
            <Button type="primary" onClick={() => refreshBalances()}>
              Reload
            </Button>
            <Button type="default">{network}</Button>
          </Row>
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
            dataSource={(balances ?? []).map((l, i) => ({ ...l, token: l.symbol.toUpperCase(), key: i }))}
            footer={() => (
              <div>
                Total:{" "}
                {(balances ?? []).map((l) => (l.balance ? Number(l.balance) : 0)).reduce((a, b) => a + b, 0) || "0"}
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
            onFinish={({ assetIdToAdd, liquidityToAdd, infiniteApproval }) => {
              addLiquidity(assetIdToAdd, liquidityToAdd, infiniteApproval);
            }}
          >
            <Form.Item label="Asset ID" name="assetIdToAdd">
              <Input
                value={assetIdToAdd}
                onChange={(e) => {
                  setAssetIdToAdd(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="Liquidity to Add" name="liquidityToAdd">
              <Input
                value={liquidityAmountToAdd}
                type="number"
                onChange={(e) => {
                  setLiquidityAmountToAdd(Number(e.target.value));
                }}
              />
            </Form.Item>

            <Form.Item label="Infinite Approval" name="infiniteApproval" valuePropName="checked">
              <Checkbox></Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type="primary"
                htmlType="button"
                style={{ margin: "2px" }}
                onClick={async () => {
                  await fetchPriceImpacts(liquidityAmountToAdd, assetIdToAdd, LIQUIDITY_ACTION.ADD, network);
                }}
              >
                Price Impact
              </Button>
              <Button type="primary" htmlType="submit">
                Add Liquidity
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
                    dataIndex: "symbol",
                    key: "symbol",
                  },
                  {
                    title: "AmountIn",
                    dataIndex: "amountIn",
                    key: "amountIn",
                  },
                  {
                    title: "OldAmountOut",
                    dataIndex: "oldAmountOut",
                    key: "oldAmountOut",
                  },
                  {
                    title: "NewAmountOut",
                    dataIndex: "newAmountOut",
                    key: "newAmountOut",
                  },
                ]}
                dataSource={(priceImpactsOnAdd ?? []).map((l, i) => ({ ...l, key: i }))}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {account == routerAddress ? (
        <>
          <Divider />
          <Row gutter={16}>
            <Col span={3} />
            <Col span={8}>
              <Typography.Title level={4}>Remove Liquidity</Typography.Title>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={({ assetIdToRemove, liquidityToRemove }) => {
                  removeLiquidity(assetIdToRemove, liquidityToRemove);
                }}
              >
                <Form.Item label="Asset ID" name="assetIdToRemove">
                  <Input
                    value={assetIdToRemove}
                    onChange={(e) => {
                      setAssetIdToRemove(e.target.value);
                    }}
                  />
                </Form.Item>

                <Form.Item label="Liquidity to Remove" name="liquidityToRemove">
                  <Input
                    value={liquidityAmountToRemove}
                    type="number"
                    onChange={(e) => {
                      setLiquidityAmountToRemove(Number(e.target.value));
                    }}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="button"
                    style={{ margin: "2px" }}
                    onClick={async () => {
                      const balanceToRemove = balances?.find((e) => e.assetId === assetIdToRemove);
                      if (!balanceToRemove) {
                        console.log("Need to fetch balances by clicking `reload`");
                        return;
                      }
                      const liquidityAmount = Number(balanceToRemove.balance);
                      console.log("liquidityAmount = ", liquidityAmount);
                      console.log("liquidityAmountToRemove = ", liquidityAmountToRemove);
                      if (liquidityAmount >= liquidityAmountToRemove) {
                        await fetchPriceImpacts(
                          liquidityAmountToRemove,
                          assetIdToRemove,
                          LIQUIDITY_ACTION.REMOVE,
                          network,
                        );
                      } else {
                        console.log(
                          `Remove Liquidity Error, amount exceeds current liquidity, liquidity = ${liquidityAmount}, amountToRemove = ${assetIdToRemove}`,
                        );
                        setLiquidityAmountToRemove(0);
                      }
                    }}
                  >
                    Price Impact
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Remove Liquidity
                  </Button>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
                        dataIndex: "symbol",
                        key: "symbol",
                      },
                      {
                        title: "AmountIn",
                        dataIndex: "amountIn",
                        key: "amountIn",
                      },
                      {
                        title: "OldAmountOut",
                        dataIndex: "oldAmountOut",
                        key: "oldAmountOut",
                      },
                      {
                        title: "NewAmountOut",
                        dataIndex: "newAmountOut",
                        key: "newAmountOut",
                      },
                    ]}
                    dataSource={(priceImpactsOnRemove ?? []).map((l, i) => ({ ...l, key: i }))}
                  />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
};
