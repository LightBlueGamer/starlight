const config = require("../../config");
const fs = require("fs");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Client logged in successfully as ${client.user.username}`);
  },
};
