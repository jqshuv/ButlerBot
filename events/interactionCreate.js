// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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

			if (interaction.customId === 'select_role') {
				const avaiableRoles = ['999077371632177295', '999077362354368643', '999077854652420167', '999077850265174136', '999077849514397776', '999077853402501232', '999077852504932403', '999077854237171742', '999077851796078734', '999077851817050182', '999077374937288725'];

				await interaction.deferUpdate();


				if (await interaction.values[0] === 'clean') {
					avaiableRoles.forEach(async roleId => {
						if (await interaction.member.roles.cache.has(roleId)) {
							await interaction.member.roles.remove(roleId);
							console.log(`Removed role ${roleId} from ${interaction.member.user.tag}`);
						}
					});
				} else if (await interaction.values) {
					const role = await guild.roles.fetch(interaction.values[0]);

					avaiableRoles.forEach(async roleId => {
						if (await interaction.member.roles.cache.has(roleId)) {
							await interaction.member.roles.remove(roleId);
							console.log(`Removed role ${roleId} from ${interaction.member.user.tag}`);
						}
					});

					await interaction.member.roles.add(role);
					await interaction.followUp({ content: 'Nachricht gesendet!', ephemeral: true });
					console.log(`Added role ${role.id} to ${interaction.member.user.tag}`);
				}
			}
		}


	},
};