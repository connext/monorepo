module.exports = {
  apps: [
    {
      name: "routers-poller",
      script: "./dist/entryRouters.js",
      kill_timeout: 1500,
      cron_restart: "*/5 * * * *",
    },
  ],
};
