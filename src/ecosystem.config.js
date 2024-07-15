module.exports = {
  apps: [
    {
      name: "nextjs-app",
      script: "npm",
      args: "start -- --port 3001",
      cwd: "/var/www/html/admin", // Change this to the correct directory of your Next.js app
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
