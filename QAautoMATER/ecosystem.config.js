module.exports = {
  apps: [
    {
      name: "QAautoMATER",
      script: "backend/server.js",
      cwd: "./",
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "3006"
      }
    }
  ]
};
