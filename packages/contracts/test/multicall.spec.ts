import { waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { Contract, Wallet } from "ethers";
import { deployContract } from "./utils";
import { Multicall, RevertableERC20 } from "../typechain";
import { Bytes, Interface, parseEther } from "ethers/lib/utils";
import { MulticallAbi } from "@connext/nxtp-utils";

const createFixtureLoader = waffle.createFixtureLoader;
describe("Multicall.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];
  let multicall: Multicall;
  let tokenA: RevertableERC20;
  const fixture = async () => {
    const _multicall = await deployContract<Multicall>("Multicall");
    multicall = new Contract(_multicall.address, MulticallAbi, wallet) as Multicall;
    tokenA = await deployContract<RevertableERC20>("RevertableERC20");

    return { multicall, tokenA };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("aggregate", () => {
    it("should work", async () => {
      const abiInterface = tokenA.interface as Interface;
      const calls = [
        { address: tokenA.address, name: "balanceOf", params: [wallet.address] },
        { address: tokenA.address, name: "shouldRevert" },
        { address: tokenA.address, name: "decimals" },
      ];

      const calldata = calls.map((call) => {
        return {
          target: call.address.toLowerCase(),
          callData: abiInterface.encodeFunctionData(call.name, call.params),
        };
      });

      const res = (await multicall.aggregate(calldata)) as any;
      const decodedRes = res.returnData.map((call: Bytes, i: number) =>
        abiInterface.decodeFunctionResult(calls[i].name, call),
      );
      expect(decodedRes[0].toString()).to.be.eq(parseEther("1000000").toString());
      expect(decodedRes[1][0]).to.be.eq(false);
      expect(decodedRes[2][0]).to.be.eq(18);
    });
  });
});
