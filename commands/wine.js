// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wine')
		.setDescription('The Butler brings your a glass of wine.'),
	async execute(interaction) {
		await interaction.reply('🍷');
	},
};