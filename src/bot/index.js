const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
const { Client, Intents, Collection } = require("discord.js");
const config = require("../../config");
const client = new Client({ intents: config.intents });
module.exports = { client };

client.commands = new Collection();
client.events = new Collection();

const categories = fs.readdirSync(path.join(__dirname, "/commands"));
const eventFiles = fs.readdirSync(path.join(__dirname, "/events"));

for (const category of categories) {
  const commands = fs
    .readdirSync(path.join(__dirname, `/commands/${category}`))
    .filter((file) => file.endsWith(".js"));
  for (const cmd of commands) {
    const command = require(path.join(
      __dirname,
      `/commands/${category}/${cmd}`
    ));
    client.commands.set(command.data.name, { category, command });

    console.log(
      `The command ${command.data.name} has been successfully loaded.`
    );
  }
}

for (const file of eventFiles) {
  const event = require(path.join(__dirname, `/events/${file}`));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  console.log(`The event ${event.name} has successfully been loaded.`);
}

client.guildConfig = new Enmap({ name: "guildConfig" });

require("dotenv").config();
client.login(process.env.DISCORD_TOKEN);
