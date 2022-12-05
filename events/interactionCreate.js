// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const createEmbed = require('../utils/createEmbed');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		} else if (interaction.isSelectMenu()) {
			const guild = await interaction.client.guilds.cache.get(interaction.guildId);

			await interaction.deferUpdate();

			let avaiableRoles = [];

			if (interaction.customId === 'select_role') { avaiableRoles = ['999077371632177295', '999077362354368643', '999077854652420167', '999077850265174136', '999077849514397776', '999077853402501232', '999077852504932403', '999077854237171742', '999077851796078734', '999077851817050182', '999077374937288725']; }
			if (interaction.customId === 'select_age') { avaiableRoles = ['999099298878857296', '999099314406166530']; }
			if (interaction.customId === 'select_gender') { avaiableRoles = ['999098871068229664', '999098901166567544', '999098923551567964']; }
			if (interaction.customId === 'select_twitch_notify') { avaiableRoles = ['998580127984275456', '999367091016699978', '999367088055533691']; }


			if (await interaction.values.includes('clean')) {
				avaiableRoles.forEach(async roleId => {
					if (await interaction.member.roles.cache.has(roleId)) {
						await interaction.member.roles.remove(roleId);
						console.log(`Removed role ${roleId} from ${interaction.member.user.tag}`);
					}
				});
			} else if (await interaction.values) {

				const roles = [];

				for (const value of await interaction.values) {
					console.log(value);
					const role = await guild.roles.fetch(value);
					roles.push(role);
				}

				avaiableRoles.forEach(async roleId => {
					if (await interaction.member.roles.cache.has(roleId)) {
						await interaction.member.roles.remove(roleId);
						console.log(`Removed role ${roleId} from ${interaction.member.user.tag}`);
					}
				});

				roles.forEach(async role => {
					await interaction.member.roles.add(role);
					console.log(`Added role ${role.id} to ${interaction.member.user.tag}`);
				});

				await interaction.followUp({ embeds: [createEmbed('Erfolgreich Vergeben!', 'Rolle(n) erfolgreich an dich vergeben.', '#2ECC71')], ephemeral: true });
			}
		}


	},
};