export const AMB_BRIDGE_HELPER_ABI = [
  {
    inputs: [{ internalType: "address", name: "_homeBridge", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AMBcontract",
    outputs: [{ internalType: "contract IHomeBridge", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  { inputs: [], name: "clean", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "bytes", name: "_message", type: "bytes" }],
    name: "getSignatures",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "view",
    type: "function",
  },
];
