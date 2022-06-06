// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users, CurrencyShop } = require('../database/dbObjects.js');
const { Op } = require('sequelize');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('Replies with Pong!')
		.addStringOption(option => option
			.setName('item')
			.setDescription('The user to check the balance of.')
			.setRequired(true)),
	async execute(interaction) {
		const itemName = interaction.options.getString('item');
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: itemName } } });

		if (!item) return interaction.reply('That item doesn"t exist.');
		if (item.cost > interaction.client.currency.getBalance(interaction.user.id)) {
			return interaction.reply(`You currently have ${interaction.client.currency.getBalance(interaction.user.id)}, but the ${item.name} costs ${item.cost}!`);
		}

		const user = await Users.findOne({ where: { user_id: interaction.user.id } });
		interaction.client.currency.add(interaction.user.id, -item.cost);
		await user.addItem(item);

		return await interaction.reply(`You've bought: ${item.name}.`);
	},
};