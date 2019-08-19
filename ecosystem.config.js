module.exports = {
  apps: [
    {
      name: "Component",
      script: "./server/server.js"
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-18-191-246-3.us-east-2.compute.amazonaws.com",
      key: "~/.ssh/Zbay.pem",
      ref: "origin/master",
      repo: "https://github.com/zbay-fec/Item-Details.git",
      path: "/home/ubuntu/Zbay",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
