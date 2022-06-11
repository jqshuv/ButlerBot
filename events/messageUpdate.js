// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
	name: 'messageUpdate',
	async execute(oldMessage, newMessage) {
		console.log(`${oldMessage.author.tag} in #${oldMessage.channel.name} triggered an interaction.`);
		newMessage.client.ghostpingcheck.detector('messageUpdate', oldMessage, newMessage);
	},
};