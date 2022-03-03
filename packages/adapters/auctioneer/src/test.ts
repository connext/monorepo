/* eslint-disable node/no-extraneous-import */
import Redis from "ioredis";


async function main(){
  const redis = new Redis(); // uses defaults unless given configuration object
  const setfoo = await redis.set("foo", "bar");
  console.log(setfoo);

  const getfoo = await redis.get("foo");

  console.log(getfoo);


  //@ts-ignore
  // console.log(redis);


  // ioredis supports all Redis coands:
    //@ts-ignore

  // const set = r.set("foo", "bar"); // returns promise which resolves to string, "OK"
  // console.log(set);
  // the format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
  // the js: ` redis.set("mykey", "Hello") ` is equivalent to the cli: ` redis> SET mykey "Hello" `
  
  // ioredis supports the node.js callback style
    //@ts-ignore

  // const res = r.get("foo");
  // console.log(res);

  
}
main();