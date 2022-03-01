export type Sequencer = {
  sendBid(Bid: any): Promise<any>;
};

export const getSequencer = async (): Promise<Sequencer> => {
  return {
    sendBid: async () => {},
  };
};
