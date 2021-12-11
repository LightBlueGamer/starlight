const config = require("../../config");
const guildConfig = require("../../server-config");
const fs = require("fs");

module.exports = {
  name: "guildCreate",
  once: true,
  async execute(guild) {
    guild.client.guildConfig.ensure(guild.id, guildConfig);
  },
};
