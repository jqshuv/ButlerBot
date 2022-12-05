// Copyright (c) 2022 Unately
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const { MessageEmbed } = require('discord.js');

function createEmbed(title, description, color = 0x00AE86) {
	const embed = new MessageEmbed()
		.setTitle(title)
		.setDescription(description)
		.setColor(color)
		.setTimestamp(Date.now());

	return embed;
}

module.exports = createEmbed;