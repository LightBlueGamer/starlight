const { SlashCommandBuilder } = require('@discordjs/builders');
const { getConfig, checkMod, checkAdmin, checkPermissions } = require('../../../modules/functions');
const { MessageEmbed } = require('discord.js');
module.exports = {
	devCmd: true,
	permLevel: 0,
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member from the server.')
		.addUserOption((option) => option.setName('target').setDescription('User to kick').setRequired(true))
		.addStringOption((option) => option.setName('input').setDescription('Reason'))
		.toJSON(),
	async execute(interaction) {
		const reason = interaction.options.getString('input') || '\u200b';
		const member = interaction.options.getMember('target');
		const author = interaction.member;

		if (
			author.permissions.has('KICK_MEMBERS') ||
			(checkMod(message.guild, author.id) && checkPermissions(message.guild, 'moderatorCommands', 'kick')) ||
			(checkAdmin(message.guild, author.id) && checkPermissions(message.guild, 'adminCommands', 'kick'))
		) {
			try {
				member.send(`You have been kicked from ${interaction.guild.name}\nReason: ${reason}`);
				member.kick(reason);
				message.channel.send(`${member.displayName} has been kicked.\nReason: ${reason}`);
			} catch (error) {
				member.kick(reason);
				message.channel.send(`${member.displayName} has been kicked.\nReason: ${reason}`);
			} finally {
				if (
					getConfig(message.guild, 'logging') &&
					getConfig(message.guild, 'logChannels').length > 0 &&
					getConfig(message.guild, 'logger').includes('kick')
				) {
					getConfig(message.guild, 'logChannels').forEach((channel) => {
						const embed = new MessageEmbed()
							.setTitle(`Member was kicked`)
							.addField(`Member kicked`, member.displayName)
							.addField(`Kicked by`, interaction.member.displayName)
							.addField(`Reason`, reason)
							.setColor(`GREEN`);
						channel.send({ embeds: embed });
					});
				}
			}
		} else return interaction.reply({ content: `You don't have permissions to run this command.`, ephemeral: true });
	}
};
