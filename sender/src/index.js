require('dotenv').config();

const { broker, logger } = require('./config/services');
const Webhooker = require('./subscribers/webhooker');

(async() => {
    try {
        const webhooker = new Webhooker({ broker, logger });

        await broker.connect();
        await broker.assertQueue(process.env.WEBHOOK_QUEUE, 100);

        broker.consumer(process.env.WEBHOOK_QUEUE, webhooker.handle.bind(webhooker));
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
