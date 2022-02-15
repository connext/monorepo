import  Auctioneer  from "./createAuctioneer";
import bidRoute from './handlers/bid';

console.log(`Creating Auctioneer`)

export async function makeAuctioneer() {
  const auctioneer = new Auctioneer();
  await auctioneer.fastifyStart();
  await auctioneer.redisStart();
  

}

makeAuctioneer();