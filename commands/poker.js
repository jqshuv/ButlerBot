// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* global logger */

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poker')
		.setDescription('Starts a new Poker session.'),
	async execute(interaction) {
		const user = interaction.member;

		if (user.voice.channel) {
			try {
				interaction.client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'poker').then(async invite => {
					return interaction.reply(`**Click on the __blue link__**: \n${invite.code}`);
				});
			} catch (error) {
				logger.stdoutLogger.error('Error creating activity: ', error);
				await interaction.reply('There was an error creating your activity. Please try again.');
			}
		} else [
			await interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true }),
		];
	},
};