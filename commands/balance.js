// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Replies with Pong!')
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user to check the balance of.')
			.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		return await interaction.reply(`${target.tag} has ${interaction.client.currency.getBalance(target.id)}💰`);
	},
};