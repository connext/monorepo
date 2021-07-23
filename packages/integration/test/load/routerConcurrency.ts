/**
 * Sets up a basic concurrency test through the router. Will slowly add more agents up to `maxConcurrency` sending the given `numberTransactions` through the router simultaneously
 *
 * @param maxConcurrency - Concurrency to build up to. Refleced as the number of agents who will transfer simultaneously
 * @param numberTransactions - Number of transactions each agent will send simultaneously through the router
 */
const routerConcurrencyTest = async (maxConcurrency: number, numberTransactions: number) => {};

routerConcurrencyTest(parseInt(process.env.CONCURRENCY) ?? 10, parseInt(process.env.NUM_TRANSACTIONS) ?? 5);
