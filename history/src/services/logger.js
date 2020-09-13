const moment = require('moment-timezone');
const colors = require('colors');

class Logger {
    info(...msg) {
        console.log(`[${moment().format()}]`, colors.green('[INFO]'), ...msg);
    }

    error(...msg) {
        console.log(`[${moment().format()}]`, colors.red('[ERROR]'), ...msg);
    }

    warn(...msg) {
        console.log(`[${moment().format()}]`, colors.yellow('[WARN]'), ...msg);
    }
}

module.exports = Logger;
