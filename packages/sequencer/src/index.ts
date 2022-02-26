import Sequencer from "./sequencer";

export async function makeSequencer() {
  console.log("Initializing Sequencer...");
  const auctioneer = new Sequencer();
  await auctioneer.start();
}

makeSequencer();
