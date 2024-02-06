module.exports = {
  apps: [
    {
      name: "admin",
      script: "pnpm",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
