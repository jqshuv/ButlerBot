// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('transfer')
		.setDescription('Replies with Pong!')
		.addIntegerOption(option => option
			.setName('amount')
			.setDescription('The amount to transfer.')
			.setRequired(true))
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user to check the balance of.')
			.setRequired(true)),
	async execute(interaction) {
		const currentAmount = interaction.client.currency.getBalance(interaction.user.id);
		const transferAmount = interaction.options.getInteger('amount');
		const transferTarget = interaction.options.getUser('user');

		if (transferAmount > currentAmount) return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
		if (transferAmount <= 0) return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);

		interaction.client.currency.add(interaction.user.id, -transferAmount);
		interaction.client.currency.add(transferTarget.id, transferAmount);

		return await interaction.reply(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${interaction.client.currency.getBalance(interaction.user.id)}💰`);
	},
};