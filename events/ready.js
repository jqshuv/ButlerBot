// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let Guilds = [];
const config = require('../config.json');

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

		client.manager.registerChannel(config.tempChannel.master, {
			childCategory: config.tempChannel.category,
			childAutoDeleteIfEmpty: true,
			childAutoDeleteIfOwnerLeaves: false,
			childVoiceFormat: (str) => `「🦖」${str}`,
			childVoiceFormatRegex: /^Example #\d+ \|/,
			childTextFormat: (str) => `「🦖」${str}`,
			childTextFormatRegex: /^example-\d+_/i,
			textChannelAsThreadParent: config.tempChannel.text,
			threadArchiveDuration: 60,
		});

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};