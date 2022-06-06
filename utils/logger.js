// Copyright (c) 2022 Joshua Schmitt
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const pino = require('pino');
const dayjs = require('dayjs');
const fs = require('node:fs');

const logDir = './logs';

const stdoutLogger = pino();

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const transport = pino.transport({
	target: 'pino/file',
	options: { destination: `./logs/${dayjs().format('YYYY-MM-DD')}.json` },
});

const fileLogger = pino(transport);

module.exports = { fileLogger, stdoutLogger };