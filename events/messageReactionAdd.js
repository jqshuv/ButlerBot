// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction) {
		const banEmoji = reaction.message.guild.emojis.cache.get('972950420882329701');
		const logChannel = reaction.client.channels.cache.get('909433906514771988');
		const message = await reaction.client.channels.cache.get(reaction.message.channelId).messages.fetch(reaction.message.id);
		const author = await message.guild.members.fetch(await reaction.client.users.cache.get(reaction.message.author.id));

		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.error('Something went wrong when fetching the message:', error);
				return;
			}
		}

		function createEmbed(title, description, color) {
			const embed = new MessageEmbed()
				.setTitle(title)
				.setDescription(description)
				.setColor(color)
				.setTimestamp(Date.now());

			return embed;
		}

		if (reaction.emoji == banEmoji && reaction.count >= 3) {

			if (author) {
				try {
					await author.timeout(3 * 60 * 60 * 1000, 'Deleted message due to 3 reactions.')
						.catch(console.error);
					await author.send({ embeds: [createEmbed('You got a Timeout', 'Duration: `3h`' + '\n' + 'Reason: `Deleted message due to 3 reactions.`' + '\n' + 'Unban: ' + '[Here](https://discord.gg/92BpbxjdkE)', 0x00AE86)] });
				} catch (error) {
					// eslint-disable-next-line no-undef
					logger.stdoutLogger.error('Something went wrong when timeouting the user:', error);
				}
			} else {
				logChannel.send({ embeds: [createEmbed('Error: Timeout', 'User: ' + reaction.message.author.tag + '\n' + 'User ID: ' + reaction.message.author.id + '\n' + 'Message: ' + reaction.message.content + '\n' + 'Channel: ' + reaction.message.channel.name + '\n' + 'Message ID: ' + reaction.message.id, 0xFF0000)] });
			}


			reaction.message.delete();
			logChannel.send({ embeds: [createEmbed('Deleted Message due to reactions', 'Message: ' + reaction.message.content + '\n' + 'Channel: ' + reaction.message.channel.name + '\n' + 'Author: ' + reaction.message.author.tag + '\n' + 'Message ID: ' + reaction.message.id, 0x00AE86)] });
		} else console.log('?');

	},
};