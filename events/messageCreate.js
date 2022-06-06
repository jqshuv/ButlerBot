// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* global logger, isinvite */

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		console.log(`${message.author.tag} in #${message.channel.name} triggered an interaction.`);
		logger.fileLogger.info(`${message.author.tag} in #${message.channel.name} sended the message ${message.content.toString()}.`);
		message.client.currency.add(message.author.id, 1);
		if (isinvite(message.content.toString()) && !message.member.permissions.has('MANAGE_MESSAGES')) {
			if (message.author)
				message.delete()
					.then(console.log(`Deleted invite ${message.author.content} from ${message.author.tag} in #${message.channel.name}`));
		}
	},
};