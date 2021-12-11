const { client } = require('../bot/index');

/**
 * @param {*} guild The guild to get the config from.
 * @param {string} configOption The config option to get.
 * @returns Configuration.
 */
function getConfig(guild, configOption) {
	return client.guildConfig.get(guild.id, configOption);
}

/**
 * @param {*} guild The guild to get the config from.
 * @param {string} id The id of the member/role.
 * @returns {boolean} Wether the member/role is a moderator.
 */
function checkMod(guild, id) {
	return getConfig(guild, 'moderators').includes(id);
}

/**
 * @param {*} guild The guild to get the config from.
 * @param {string} id The id of the member/role.
 * @returns {boolean} Wether the member/role is a moderator.
 */
function checkAdmin(guild, id) {
	return getConfig(guild, 'admins').includes(id);
}

/**
 * @param {*} guild The guild to get the config from.
 * @param {string} category The category to get the config from.
 * @param {permission} permission The permission to compare against.
 * @returns {boolean} Wether the member/role is a moderator.
 */
function checkPermissions(guild, category, permission) {
	return getConfig(message.guild, category).includes(permission);
}

module.exports = { getConfig, checkMod, checkAdmin, checkPermissions };
