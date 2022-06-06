// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users } = require('../database/dbObjects.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Replies with Pong!')
		.addUserOption(option => option
			.setName('user')
			.setDescription('The user to check the balance of.')
			.setRequired(true)),
	async execute(interaction) {
		const target = interaction.options.getUser('user') ?? interaction.user;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return interaction.reply(`${target.tag} has nothing!`);

		return await interaction.reply(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
	},
};