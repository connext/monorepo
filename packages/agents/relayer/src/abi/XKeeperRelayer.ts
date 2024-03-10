export const XKeeperRelayerAbi = [
  {
    inputs: [{ internalType: "contract IKeep3rV2", name: "_keep3rV2", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "Keep3rRelay_Keep3rNotAllowed", type: "error" },
  { inputs: [], name: "Keep3rRelay_NoExecData", type: "error" },
  { inputs: [], name: "Keep3rRelay_NotKeeper", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "contract IAutomationVault", name: "_automationVault", type: "address" },
      { indexed: true, internalType: "address", name: "_relayCaller", type: "address" },
      {
        components: [
          { internalType: "address", name: "job", type: "address" },
          { internalType: "bytes", name: "jobData", type: "bytes" },
        ],
        indexed: false,
        internalType: "struct IAutomationVault.ExecData[]",
        name: "_execData",
        type: "tuple[]",
      },
    ],
    name: "AutomationVaultExecuted",
    type: "event",
  },
  {
    inputs: [],
    name: "KEEP3R_V2",
    outputs: [{ internalType: "contract IKeep3rV2", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IAutomationVault", name: "_automationVault", type: "address" },
      {
        components: [
          { internalType: "address", name: "job", type: "address" },
          { internalType: "bytes", name: "jobData", type: "bytes" },
        ],
        internalType: "struct IAutomationVault.ExecData[]",
        name: "_execData",
        type: "tuple[]",
      },
    ],
    name: "exec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
