const { SlashCommandBuilder } = require('@discordjs/builders');
const { getConfig, checkMod, checkAdmin, checkPermissions } = require('../../../modules/functions');
const { MessageEmbed } = require('discord.js');
module.exports = {
	devCmd: true,
	permLevel: 0,
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member from the server.')
		.addUserOption((option) => option.setName('target').setDescription('User to ban').setRequired(true))
		.addStringOption((option) => option.setName('input').setDescription('Reason'))
		.addBooleanOption((option) => option.setName('choice').setDescription('Delete messages sent by the user.'))
		.toJSON(),
	async execute(interaction) {
		const reason = interaction.options.getString('input') || '\u200b';
		const member = interaction.options.getMember('target');
		const boolean = interaction.options.getBoolean('choice');
		const author = interaction.member;

		if (
			author.permissions.has('BAN_MEMBERS') ||
			(checkMod(message.guild, author.id) && checkPermissions(message.guild, 'moderatorCommands', 'ban')) ||
			(checkAdmin(message.guild, author.id) && checkPermissions(message.guild, 'adminCommands', 'ban'))
		) {
			try {
				member.send(`You have been banned from ${interaction.guild.name}\nReason: ${reason}`);
				member.ban({ days: boolean ? 0 : 7, reason });
				message.channel.send(`${member.displayName} has been banned.\nReason: ${reason}`);
			} catch (error) {
				member.ban({ days: boolean ? 0 : 7, reason });
				message.channel.send(`${member.displayName} has been banned.\nReason: ${reason}`);
			} finally {
				if (
					getConfig(message.guild, 'logging') &&
					getConfig(message.guild, 'logChannels').length > 0 &&
					getConfig(message.guild, 'logger').includes('ban')
				) {
					getConfig(message.guild, 'logChannels').forEach((channel) => {
						const embed = new MessageEmbed()
							.setTitle(`Member was banned`)
							.addField(`Member banned`, member.displayName)
							.addField(`Banned by`, interaction.member.displayName)
							.addField(`Reason`, reason)
							.setColor(`GREEN`);
						channel.send({ embeds: embed });
					});
				}
			}
		} else return interaction.reply({ content: `You don't have permissions to run this command.`, ephemeral: true });
	}
};
