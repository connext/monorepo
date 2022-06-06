module.exports = {
  apps: [
    {
      name: "routers-poller",
      script: "./dist/entryRouters.js",
      kill_timeout: 1500,
      cron_restart: "* * * * *",
    },
    {
      name: "transfers-poller",
      script: "./dist/entryTransfers.js",
      kill_timeout: 1500,
      cron_restart: "* * * * *",
    },
  ],
};
