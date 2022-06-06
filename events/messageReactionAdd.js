// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction) {
		const banEmoji = reaction.message.guild.emojis.cache.get('972950420882329701');
		const channel = reaction.client.channels.cache.get('909433906514771988');

		if (reaction.partial) {
			try {
				await reaction.fetch();
			} catch (error) {
				console.error('Something went wrong when fetching the message:', error);
				return;
			}
		}


		const embed = new MessageEmbed()
			.setTitle('Deleted Message due to reactions')
			.setDescription('Message: ' + reaction.message.content + '\n' + 'Channel: ' + reaction.message.channel.name + '\n' + 'Author: ' + reaction.message.author.tag + '\n' + 'Message ID: ' + reaction.message.id)
			.setColor(0x00AE86)
			.setTimestamp(Date.now());

		if (reaction.emoji == banEmoji && reaction.count == 3) {
			reaction.message.delete();
			channel.send({ embeds: [embed ] });
		} else console.log('?');

	},
};