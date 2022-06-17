// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { TempChannelsManagerEvents } = require('@hunteroi/discord-temp-channels');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tempchannel')
		.setDescription('The Butler brings your a glass of wine.')
		.addSubcommand(subcommand => subcommand
			.setName('text')
			.setDescription('Creates a temporary text channel.')),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'text') {
			await interaction.deferReply({ ephemeral: true });
			interaction.client.manager.emit(TempChannelsManagerEvents.createText, interaction);
		} else {
			interaction.reply({ files: ['https://i.ibb.co/9p8cfdT/achievement.png'], ephemeral: true });
		}
	},
};