export type CancelInput = {
  amount: string;
  expiry: number;
  preparedBlockNumber: number;
  side: "sender" | "receiver";
};
