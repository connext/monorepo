import { fastifyStart } from "./createAuctioneer";
import bidRoute from './handlers/bid';

console.log(`Creating Auctioneer`)

export async function makeAuctioneer() {
  const serverInstance = await fastifyStart();

}

makeAuctioneer();