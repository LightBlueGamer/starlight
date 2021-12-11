const config = require('../../../config');
const guildConfig = require('../../../server-config');
const functions = require('../functions');
const fs = require('fs');
const econCooldown = new Set();
const levelCooldown = new Set();
const { getConfig } = require('../../modules/functions');

module.exports = {
	name: 'messageCreate',
	once: true,
	async execute(message) {
		// Config init
		const client = message.client;
		client.guildConfig.ensure(message.guild.id, guildConfig);
		// Config init

		// AutoMod word blacklist
		if (
			!getConfig(message.guild, 'ignoredChannels').includes(message.channel.id) &&
			getConfig(message.guild, 'deleteBlacklistedWords') &&
			message.content.split(' ').includes(getConfig(message.guild, 'blacklistedWords'))
		) {
			message.delete();
			message.reply({ cotent: `You're message contained a blacklisted word`, ephemeral: true });
		}
	}
};
