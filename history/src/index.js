require('dotenv').config();

const { broker, logger } = require('./config/services');

(async() => {
    try {
        await broker.connect();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
