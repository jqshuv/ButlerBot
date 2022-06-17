// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = {
	name: 'messageDelete',
	async execute(message) {
		message.client.ghostpingcheck.detector('messageDelete', message);
	},
};
