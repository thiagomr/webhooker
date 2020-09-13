require('dotenv').config();

const { broker, logger } = require('./config/services');
const webhooker = require('./subscribers/webhooker');

(async() => {
    try {
        await broker.connect();
        await broker.assertQueue(process.env.WEBHOOK_QUEUE, 100);

        broker.consumer(process.env.WEBHOOK_QUEUE, webhooker);
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
