// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const createEmbed = require('../utils/createEmbed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {

		const embed1 = createEmbed('Icon Auswahl', 'Wähle ein Icon aus.', '#ffffff');

		const embed2 = createEmbed('Alter Auswahl', 'Wähle dein Alter aus.', '#ffffff');

		const row1 = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_role')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Remove Role Icon',
							value: 'clean',
							emoji: '<:mellohi:939966198551052288>',
						},
						{
							label: 'Emerald',
							value: '999077371632177295',
							emoji: '<:1736emerald:999092958206885928>',
						},
						{
							label: 'Ruby',
							value: '999077362354368643',
							emoji: '<:1908ruby:999092959335157901>',
						},
						{
							label: 'Tin',
							value: '999077854652420167',
							emoji: '<:2922tin:999092960790597672>',
						},
						{
							label: 'Platinum',
							value: '999077850265174136',
							emoji: '<:4617platinum:999092962413789325>',
						},
						{
							label: 'Sapphire',
							value: '999077849514397776',
							emoji: '<:6804sapphire:999092963722407956>',
						},
						{
							label: 'Pearl',
							value: '999077853402501232',
							emoji: '<:6850pearl:999092949843464222>',
						},
						{
							label: 'Amethyst',
							value: '999077852504932403',
							emoji: '<:7217amethyst:999092951378571344>',
						},
						{
							label: 'Bronze',
							value: '999077854237171742',
							emoji: '<:7217bronze:999092952456499300>',
						},
						{
							label: 'Diamond',
							value: '999077851796078734',
							emoji: '<:7217diamond:999092953823858838>',
						},
						{
							label: 'Silver',
							value: '999077851817050182',
							emoji: '<:9735silver:999092955375747153>',
						},
						{
							label: 'Gold',
							value: '999077374937288725',
							emoji: '<:9933gold:999092956956987393>',
						},


					]),
			);

		const row2 = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select_age')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: '-18',
							value: '18_plus',
							emoji: '<:juicebox_mango:999075178342514748>',
						},
						{
							label: '18+',
							value: 'minus_18',
							emoji: '<:juicebox_strawberry:999075189268693002>',
						},


					]),
			);

		await interaction.reply({ content: 'Nachricht gesendet!', ephemeral: true });

		interaction.channel.send({ embeds: [embed1], components: [row1] });
		interaction.channel.send({ embeds: [embed2], components: [row2] });
	},
};