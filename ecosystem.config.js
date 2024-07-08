module.exports = {
  apps: [
    {
      name: "scrumpoker",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
