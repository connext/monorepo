const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const Permit = [
  { name: "owner", type: "address" },
  { name: "spender", type: "address" },
  { name: "value", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "deadline", type: "uint256" },
];
export const createTypedData = (param: {
  message: { owner: string; spender: string; value: string; nonce: string; deadline: number };
  token: { name: string; version: string; chainId: number; address: string };
}): { typedData: string } => {
  const { message, token } = param;

  const domain = {
    name: token.name,
    version: token.version,
    chainId: token.chainId,
    verifyingContract: token.address,
  };

  const typedData = JSON.stringify({
    types: {
      EIP712Domain,
      Permit,
    },
    primaryType: "Permit",
    domain,
    message,
  });

  //   return sanitizeSignature(
  //     await(signer.provider as providers.Web3Provider).send("eth_signTypedData_v3", [message.owner, typedData]) as string,
  //   );

  return { typedData };
};
