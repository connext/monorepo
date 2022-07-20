module.exports = {
  apps: [
    {
      name: "transfers-poller",
      script: "./dist/entryTransfers.js",
      kill_timeout: 1500,
      cron_restart: "*/5 * * * *",
    },
    {
      name: "routers-poller",
      script: "./dist/entryRouters.js",
      kill_timeout: 1500,
      cron_restart: "*/5 * * * *",
    },
  ],
};
