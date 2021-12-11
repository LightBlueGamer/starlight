const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("../../config.js");
const path = require("path");
require("dotenv").config();
const token = process.env.DISCORD_TOKEN || process.env.DEV_TOKEN;
const commands = [];
const devCmds = [];

const categories = fs.readdirSync(path.join(__dirname, "/commands"));

for (const category of categories) {
  const commands = fs
    .readdirSync(path.join(__dirname, `/commands/${category}`))
    .filter((file) => file.endsWith(".js"));
  for (const command of commands) {
    const cmd = require(path.join(
      __dirname,
      `/commands/${category}/${command}`
    ));
    if (cmd.devCmd) devCmds.push(cmd.data);
    else commands.push(cmd.data);
  }
}

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: devCmds,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
