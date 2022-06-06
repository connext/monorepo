module.exports = {
  apps: [
    {
      name: "routers-poller",
      script: "./dist/routersPoller.js",
      kill_timeout: 1500,
      cron_restart: "* * * * *",
    },
    {
      name: "transfers-poller",
      script: "./dist/transfersPoller.js",
      kill_timeout: 1500,
      cron_restart: "* * * * *",
    },
  ],
};
