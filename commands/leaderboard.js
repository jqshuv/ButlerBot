// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Formatters } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return await interaction.reply(
			Formatters.codeBlock(
				interaction.client.currency.sort((a, b) => b.balance - a.balance)
					.filter(user => interaction.client.users.cache.has(user.user_id))
					.first(10)
					.map((user, position) => `(${position + 1}) ${(interaction.client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
					.join('\n'),
			),
		);
	},
};