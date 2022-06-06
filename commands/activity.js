// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* global logger */

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Replies with Pong!')
		.addStringOption(option => option
			.setName('type')
			.setDescription('The input to echo back')
			.setRequired(true)
			.addChoices(
				{ name: 'Youtube 🔴', value: 'youtube' },
				{ name: 'Poker 🃏', value: 'poker' },
				{ name: 'Chess ♟️', value: 'chess' },
				{ name: 'Fishington 🎣', value: 'fishington' },
				{ name: 'Letter Tile Ⓜ️', value: 'lettertile' },
			)),
	async execute(interaction) {
		const activityTypeRequest = interaction.options.getString('type');

		try {
			if (interaction.member.voice.channel) {
				interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, activityTypeRequest).then(async invite => {
					return interaction.reply(`${invite.code}`);
				});
			} else {
				return interaction.reply('You must be in a voice channel to use this command.');
			}
		} catch (error) {
			logger.stdoutLogger.error('Error creating activity: ', error);
			await interaction.reply('There was an error creating your activity. Please try again.');
		}
	},
};