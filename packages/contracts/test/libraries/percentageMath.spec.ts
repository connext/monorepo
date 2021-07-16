import { ethers, waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";

use(solidity);

import { PercentageMath } from "../../typechain/PercentageMath";
import { utils } from "ethers";

const createFixtureLoader = waffle.createFixtureLoader;
describe("PercentageMath", () => {
  const [wallet, other, receiver] = waffle.provider.getWallets();

  let libPercentageMath: PercentageMath;

  const fixture = async () => {
    const libPercentageMathFactory = await ethers.getContractFactory("PercentageMath");

    libPercentageMath = (await libPercentageMathFactory.deploy()) as PercentageMath;
    return { libPercentageMath };
  };

  before(async () => {
    const loadFixture = createFixtureLoader([wallet, other]);
    ({ libPercentageMath } = await loadFixture(fixture));
  });

  describe("percentMul + calculatePercent", () => {
    type TestCase = {
      value: string;
      percentage: number;
      expected: string;
    };
    const cases: TestCase[] = [
      {
        value: utils.parseEther("1").toString(),
        percentage: 50,
        expected: utils.parseEther("0.5").toString(),
      },
      {
        value: utils.parseEther("0.5").toString(),
        percentage: 50,
        expected: utils.parseEther("0.25").toString(),
      },
      {
        value: utils.parseEther("0.0005").toString(),
        percentage: 50,
        expected: utils.parseEther("0.00025").toString(),
      },
      {
        value: utils.parseEther("1").toString(),
        percentage: 0.1,
        expected: utils.parseEther("0.001").toString(),
      },
      {
        value: utils.parseEther("1").toString(),
        percentage: 0.01,
        expected: utils.parseEther("0.0001").toString(),
      },
      {
        value: utils.parseEther(".0001").toString(),
        percentage: 0.01,
        expected: utils.parseEther("0.00000001").toString(),
      },
      {
        value: utils.parseEther("3").toString(),
        percentage: 50,
        expected: utils.parseEther("1.5").toString(),
      },
      {
        value: utils.parseEther("3").toString(),
        percentage: 3,
        expected: utils.parseEther("0.09").toString(),
      },
      {
        value: utils.parseEther(".00003").toString(),
        percentage: 0.07,
        expected: utils.parseEther("0.000000021").toString(),
      },
    ];

    const stringMulBy100 = (val: number) => {
      if (!val.toString().includes(".")) {
        return val.toString() + "00";
      }

      // convert
      const [ints, decimals] = val.toString().split(".");

      const decimalsAdded = decimals + "00";

      // may have format 007.
      const product = ints + decimalsAdded.substring(0, 2) + "." + decimalsAdded.substring(2);

      return (+product).toString();
    };

    for (const { value, percentage, expected } of cases) {
      it(`${value} * ${percentage}% should be ${expected}`, async () => {
        const workingPct = stringMulBy100(percentage);
        const amount = await libPercentageMath.percentMul(value, workingPct);
        expect(amount).to.be.eq(expected);

        // get percentage
        const calculated = await libPercentageMath.calculatePercent(amount, value);
        expect(calculated).to.be.eq(workingPct);
      });
    }
  });
});
