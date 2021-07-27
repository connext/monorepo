describe("Contract", () => {
  describe.skip("class TransactionManager", () => {
    it("happy: constructor", () => {});
    it("happy: constructor with optional config param", () => {});

    describe.skip("prepare", () => {
      it("should error if chainId is not supported in config", () => {});

      describe("should error if function encoding fails", () => {
        it("invalid user", () => {});
        it("invalid router", () => {});
        it("invalid sendingChainId", () => {});
        it("invalid sendingAssetId", () => {});
        it("invalid receivingChainId", () => {});
        it("invalid receivingAssetId", () => {});
        it("invalid sendingChainFallback", () => {});
        it("invalid callTo", () => {});
        // receivingAddress
        // callDataHash
        // transactionId
        // amount
        // expiry
        // encryptedCallData
        // encodedBid
        // bidSignature
      });

      it("should error if transaction fails", () => {});
      it("happy case: prepare erc20", () => {});
      it("happy case: prepare native", () => {});
    });

    describe.skip("fulfill", () => {
      it("should error if chainId is not supported in config", () => {});
      describe("should error if function encoding fails", () => {});
      it("should error if transaction fails", () => {});
      it("happy case: fulfill erc20", () => {});
      it("happy case: fulfill native", () => {});
    });
    describe.skip("cancel", () => {
      it("should error if chainId is not supported in config", () => {});
      describe("should error if function encoding fails", () => {});
      it("should error if transaction fails", () => {});
      it("happy case: cancel erc20", () => {});
      it("happy case: cancel native", () => {});
    });
    describe.skip("removeLiquidity", () => {
      it("should error if chainId is not supported in config", () => {});
      describe("should error if function encoding fails", () => {});
      it("should error if transaction fails", () => {});
      it("happy case: removeLiquidity erc20", () => {});
      it("happy case: removeLiquidity native", () => {});
    });
    describe.skip("getRouterBalance", () => {
      it("should error if chainId is not supported in config", () => {});
      describe("should error if function encoding fails", () => {});
      it("should error if read transaction fails", () => {});
      it("happy case: getRouterBalance erc20", () => {});
      it("happy case: getRouterBalance native", () => {});
    });
  });
});
