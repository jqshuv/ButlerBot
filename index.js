// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// Require the necessary discord.js classes
const { Collection, Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const { Users } = require('./database/dbObjects.js');
const fs = require('node:fs');
const path = require('node:path');
const { DiscordTogether } = require('discord-together');


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Collection();
client.discordTogether = new DiscordTogether(client);
client.ghostpingcheck = require('discord.js-ghost-ping');
client.currency = new Collection();

Reflect.defineProperty(client.currency, 'add', {
	value: async (id, amount) => {
		const user = client.currency.get(id);

		if (user) {
			user.balance += Number(amount);
			return user.save();
		}

		const newUser = await Users.create({ user_id: id, balance: amount });
		client.currency.set(id, newUser);

		return newUser;
	},
});

Reflect.defineProperty(client.currency, 'getBalance', {
	value: id => {
		const user = client.currency.get(id);
		return user ? user.balance : 0;
	},
});

global.isinvite = require('is-discord-invite');
global.logger = require('./utils/logger');

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.login(token);