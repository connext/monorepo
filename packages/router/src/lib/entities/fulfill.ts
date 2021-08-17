export type FulfillInput = {
  amount: string;
  expiry: number;
  preparedBlockNumber: number;
  signature: string;
  relayerFee: string;
  callData: string;
  side: "sender" | "receiver";
};
