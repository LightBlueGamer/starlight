const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ms = require('pretty-ms');
module.exports = {
	devCmd: true,
	permLevel: 0,
	data: new SlashCommandBuilder().setName('ping').setDescription('Checks bot status.').toJSON(),
	async execute(interaction) {
		const msg = await interaction.channel.send(`Pinging...`);

		const embed = new MessageEmbed()
			.setTitle('Bot Status')
			.setDescription(`Bot latency: ${ms(msg.createdTimestamp - interaction.createdTimestamp)}\nAPI Latency: ${ms(interaction.client.ws.ping)}`)
			.seColor(`RANDOM`);

		interaction.channel.send({ embeds: embed });
	}
};
