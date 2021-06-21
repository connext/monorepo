import fastify from "fastify";

const server = fastify();

server.get("/ping", async () => {
  return "pong\n";
});

server.addHook("onReady", async function() {
  // initialize all internal classes here
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
