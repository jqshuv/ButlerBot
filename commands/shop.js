// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Formatters } = require('discord.js');
const { CurrencyShop } = require('../database/dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const items = await CurrencyShop.findAll();
		return await interaction.reply(Formatters.codeBlock(items.map(i => `${i.name}: ${i.cost}💰`).join('\n')));
	},
};