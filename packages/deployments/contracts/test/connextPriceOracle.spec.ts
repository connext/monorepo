import { waffle } from "hardhat";
import { expect, use } from "chai";
import { solidity } from "ethereum-waffle";
use(solidity);

import { constants, Wallet } from "ethers";
import { deployContract } from "./utils";
import { ConnextPriceOracle, TestERC20, TestAggregator } from "../typechain-types";
import { mkAddress } from "@connext/nxtp-utils";
import { parseEther } from "ethers/lib/utils";

const createFixtureLoader = waffle.createFixtureLoader;

describe("ConnextPriceOracle.sol", () => {
  const [wallet, other] = waffle.provider.getWallets() as Wallet[];

  let connextPriceOracle: ConnextPriceOracle;
  let v1PriceOracle: ConnextPriceOracle;
  let stableToken: TestERC20;
  let tokenA: TestERC20;
  let tokenB: TestERC20;
  let tokenC: TestERC20;
  let wrappedToken: string = mkAddress("0xA");
  let aggregatorMock: TestAggregator;

  const fixture = async () => {
    connextPriceOracle = await deployContract<ConnextPriceOracle>("ConnextPriceOracle", wrappedToken);
    v1PriceOracle = await deployContract<ConnextPriceOracle>("ConnextPriceOracle", wrappedToken);
    stableToken = await deployContract<TestERC20>("TestERC20");
    tokenA = await deployContract<TestERC20>("TestERC20");
    tokenB = await deployContract<TestERC20>("TestERC20");
    tokenC = await deployContract<TestERC20>("TestERC20");
    aggregatorMock = await deployContract<TestAggregator>("TestAggregator");
    return { connextPriceOracle, v1PriceOracle, stableToken, tokenA, tokenB, tokenC, aggregatorMock };
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before("create fixture loader", async () => {
    loadFixture = createFixtureLoader([wallet, other]);
  });

  beforeEach(async () => {
    await loadFixture(fixture);
  });

  describe("setAdmin", () => {
    it("should work", async () => {
      // default admin
      let admin = await connextPriceOracle.admin();
      expect(admin).to.be.eq(wallet.address);

      // change admin
      let tx = await connextPriceOracle.connect(wallet).setAdmin(other.address);
      await tx.wait();
      admin = await connextPriceOracle.admin();
      expect(admin).to.be.eq(other.address);

      // revert admin
      tx = await connextPriceOracle.connect(other).setAdmin(wallet.address);
      await tx.wait();
      admin = await connextPriceOracle.admin();
      expect(admin).to.be.eq(wallet.address);
    });

    it("should revert if msg.sender is not admin", async () => {
      await expect(connextPriceOracle.connect(other).setAdmin(other.address)).to.be.revertedWith(
        "caller is not the admin",
      );
    });
  });

  describe("setAggregators", () => {
    it("should revert if msg.sender is not admin", async () => {
      const tokenAddresses = [mkAddress("0xaaa")];
      const aggregatorsAddresses = [mkAddress("0xbbb")];
      await expect(
        connextPriceOracle.connect(other).setAggregators(tokenAddresses, aggregatorsAddresses),
      ).to.be.revertedWith("caller is not the admin");
    });

    it("should success if msg.sender is admin", async () => {
      const tokenAddresses = [mkAddress("0xaaa")];
      const aggregatorsAddresses = [mkAddress("0xbbb")];
      const tx = await connextPriceOracle.connect(wallet).setAggregators(tokenAddresses, aggregatorsAddresses);
      await tx.wait();
      const aggregator = await connextPriceOracle.aggregators(tokenAddresses[0]);
      expect(aggregator.toLocaleLowerCase()).to.be.eq(aggregatorsAddresses[0].toLocaleLowerCase());
    });
  });

  describe("setDirectPrice", () => {
    it("should revert if msg.sender is not admin", async () => {
      const tokenAddress = mkAddress("0xaaa");
      const price = parseEther("100").toString();
      await expect(connextPriceOracle.connect(other).setDirectPrice(tokenAddress, price)).to.be.revertedWith(
        "caller is not the admin",
      );
    });

    it("should success if msg.sender is admin", async () => {
      const tokenAddress = mkAddress("0xaaa");
      const price = parseEther("100").toString();
      const tx = await connextPriceOracle.connect(wallet).setDirectPrice(tokenAddress, price);
      await tx.wait();
      const assetPrice = await connextPriceOracle.assetPrices(tokenAddress);
      expect(assetPrice.toString()).to.be.eq(price);
    });
  });

  describe("setDexPriceInfo", () => {
    it("should revert if msg.sender is not admin", async () => {
      const baseTokenAddress = mkAddress("0xaaa");
      const tokenAddress = mkAddress("0xbbb");
      const lpTokenAddress = mkAddress("0xccc");

      await expect(
        connextPriceOracle.connect(other).setDexPriceInfo(tokenAddress, baseTokenAddress, lpTokenAddress, true),
      ).to.be.revertedWith("caller is not the admin");
    });

    it("should revert if base token is invalid", async () => {
      const baseTokenAddress = mkAddress("0xbbb");
      const tokenAddress = mkAddress("0xaaa");
      const lpTokenAddress = mkAddress("0xccc");

      await expect(
        connextPriceOracle.connect(wallet).setDexPriceInfo(tokenAddress, baseTokenAddress, lpTokenAddress, true),
      ).to.be.revertedWith("invalid base token");
    });

    it("happy case", async () => {
      const tokenAddress = mkAddress("0xaaa");
      let tx = await connextPriceOracle.connect(wallet).setAggregators([tokenAddress], [aggregatorMock.address]);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getTokenPrice(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("1").toString());

      const tokenAddress2 = mkAddress("0xbbb");
      const lpAddress2 = mkAddress("0xaaabbb");
      tx = await connextPriceOracle.connect(wallet).setDexPriceInfo(tokenAddress2, tokenAddress, lpAddress2, true);
      expect(await tx.wait()).to.be.ok;
    });
  });

  describe("setV1PriceOracle", () => {
    it("should revert if msg.sender is not admin", async () => {
      const v1PriceOracleAddress = mkAddress("0xaaa");
      await expect(connextPriceOracle.connect(other).setV1PriceOracle(v1PriceOracleAddress)).to.be.revertedWith(
        "caller is not the admin",
      );
    });

    it("should success if msg.sender is admin", async () => {
      const v1PriceOracleAddress = mkAddress("0xaaa");
      const tx = await connextPriceOracle.connect(wallet).setV1PriceOracle(v1PriceOracleAddress);
      await tx.wait();
      expect((await connextPriceOracle.v1PriceOracle()).toString().toLowerCase()).to.be.eq(
        v1PriceOracleAddress.toLowerCase(),
      );
    });
  });

  describe("getPriceFromChainlink", () => {
    it("should return 0 if aggregator isn't configured", async () => {
      const tokenAddress = mkAddress("0xbbb");
      const tokenPrice = await connextPriceOracle.getPriceFromChainlink(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("0").toString());
    });

    it("should return 0 if aggregator answers with 0", async () => {
      const tokenAddress = mkAddress("0xaaa");
      let tx = await aggregatorMock.connect(wallet).updateMockAnswer(parseEther("0"));
      await tx.wait();
      tx = await connextPriceOracle.connect(wallet).setAggregators([tokenAddress], [aggregatorMock.address]);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getPriceFromChainlink(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("0").toString());
    });

    it("should return if aggregator is configured", async () => {
      const tokenAddress = mkAddress("0xaaa");
      let tx = await aggregatorMock.connect(wallet).updateMockAnswer(parseEther("1"));
      await tx.wait();
      tx = await connextPriceOracle.connect(wallet).setAggregators([tokenAddress], [aggregatorMock.address]);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getPriceFromChainlink(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("1").toString());
    });
  });

  describe("getPriceFromOracle", () => {
    it("should return 0 if aggregator isn't configured", async () => {
      const tokenAddress = mkAddress("0xbbb");
      const tokenPrice = await connextPriceOracle.getPriceFromOracle(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("0").toString());
    });

    it("should return if aggregator is configured", async () => {
      const tokenAddress = mkAddress("0xaaa");
      let tx = await connextPriceOracle.connect(wallet).setAggregators([tokenAddress], [aggregatorMock.address]);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getPriceFromOracle(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("1").toString());
    });
  });

  describe("getPriceFromDex", () => {
    it("should return 0 if price record isn't configured", async () => {
      const tokenAddress = mkAddress("0xbbb");
      const tokenPrice = await connextPriceOracle.getPriceFromDex(tokenAddress);
      expect(tokenPrice.toString()).to.be.eq(parseEther("0").toString());
    });

    it("should return if price record is configured", async () => {
      let tx = await connextPriceOracle.connect(wallet).setAggregators([stableToken.address], [aggregatorMock.address]);
      await tx.wait();

      const lpTokenAddress = mkAddress("0xaaaaa");
      tx = await stableToken.connect(wallet).transfer(lpTokenAddress, parseEther("100"));
      await tx.wait();

      tx = await tokenA.connect(wallet).transfer(lpTokenAddress, parseEther("50"));
      await tx.wait();

      tx = await connextPriceOracle
        .connect(wallet)
        .setDexPriceInfo(tokenA.address, stableToken.address, lpTokenAddress, true);

      const tokenPrice = await connextPriceOracle.getPriceFromDex(tokenA.address);
      expect(tokenPrice.toString()).to.be.eq(parseEther("2").toString());
    });
  });

  describe("getTokenPrice", () => {
    it("should return 0 if no configured", async () => {
      const tokenPrice = await connextPriceOracle.getTokenPrice(tokenB.address);
      expect(tokenPrice.toString()).to.be.eq(parseEther("0").toString());
    });

    it("should return native token price if address is zero", async () => {
      let tx = await connextPriceOracle.connect(wallet).setDirectPrice(wrappedToken, parseEther("4500").toString());
      await tx.wait();

      const wrappedTokePrice = await connextPriceOracle.assetPrices(wrappedToken);
      const nativeTokenPrice = await connextPriceOracle.getTokenPrice(constants.AddressZero);
      expect(wrappedTokePrice.toString()).to.be.eq(nativeTokenPrice.toString());
    });

    it("should get direct price", async () => {
      let tx = await connextPriceOracle.connect(wallet).setDirectPrice(tokenB.address, parseEther("100").toString());
      await tx.wait();

      const directPrice = await connextPriceOracle.assetPrices(tokenB.address);
      const tokenPrice = await connextPriceOracle.getTokenPrice(tokenB.address);
      expect(directPrice.toString()).to.be.eq(tokenPrice.toString());
    });

    it("should return chainlink price", async () => {
      let tx = await connextPriceOracle.connect(wallet).setAggregators([stableToken.address], [aggregatorMock.address]);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getTokenPrice(stableToken.address);
      const chainlinkPrice = await connextPriceOracle.getPriceFromOracle(stableToken.address);
      expect(chainlinkPrice.toString()).to.be.eq(tokenPrice.toString());
    });

    it("should return dex price", async () => {
      let tx = await connextPriceOracle.connect(wallet).setAggregators([stableToken.address], [aggregatorMock.address]);
      await tx.wait();

      const lpTokenAddress = mkAddress("0xaaaaa");
      tx = await stableToken.connect(wallet).transfer(lpTokenAddress, parseEther("100"));
      await tx.wait();

      tx = await tokenA.connect(wallet).transfer(lpTokenAddress, parseEther("50"));
      await tx.wait();

      tx = await connextPriceOracle
        .connect(wallet)
        .setDexPriceInfo(tokenA.address, stableToken.address, lpTokenAddress, true);

      const dexPrice = await connextPriceOracle.getPriceFromDex(tokenA.address);
      const tokenPrice = await connextPriceOracle.getTokenPrice(tokenA.address);

      expect(tokenPrice.toString()).to.be.eq(dexPrice.toString());
    });

    it("should get price from v1PriceOracle", async () => {
      let tx = await v1PriceOracle.connect(wallet).setDirectPrice(tokenC.address, parseEther("5").toString());
      await tx.wait();

      tx = await connextPriceOracle.connect(wallet).setV1PriceOracle(v1PriceOracle.address);
      await tx.wait();

      const tokenPrice = await connextPriceOracle.getTokenPrice(tokenC.address);
      const v1TokenPrice = await v1PriceOracle.getTokenPrice(tokenC.address);

      expect(tokenPrice.toString()).to.be.eq(v1TokenPrice.toString());
    });
  });
});
