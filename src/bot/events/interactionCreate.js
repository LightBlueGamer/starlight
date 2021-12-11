module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction) {
    if (
      interaction.isButton() ||
      interaction.isMessageComponent() ||
      interaction.isSelectMenu()
    )
      return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    if (!interaction.inGuild()) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
