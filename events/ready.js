// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let Guilds = [];

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		const deployer = require('../utils/deploy-commands');
		const cliArguments = process.argv.slice(2);
		Guilds = client.guilds.cache.map(guild => guild.id);

		console.log('myArgs: ', cliArguments);
		if (cliArguments.includes('--deploy') || cliArguments.includes('-dc')) {
			deployer(Guilds);
		}

		if (cliArguments.includes('--dev') || cliArguments.includes('-d')) {
			console.log('Running in development mode.');
			client.user.setStatus('dnd');
			client.user.setActivity('in development', { type: 'PLAYING' });
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};