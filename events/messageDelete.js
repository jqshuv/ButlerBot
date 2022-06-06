// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		console.log(`${message.author.tag} in #${message.channel.name} triggered an interaction.`);
		message.client.ghostpingcheck.detector('messageDelete', message);
	},
};