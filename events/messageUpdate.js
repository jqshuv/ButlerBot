// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		console.log(`${message.author.tag} in #${message.channel.name} triggered an interaction.`);
		newMessage.client.ghostpingcheck.detector('messageUpdate', oldMessage, newMessage);
	},
};