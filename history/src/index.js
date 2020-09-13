require('dotenv').config();

const { broker, logger, database, history } = require('./config/services');
const Consumer = require('./subscribers/consumer');

(async() => {
    try {
        const consumer = new Consumer({
            broker,
            logger,
            history
        });

        await database.connect();
        await broker.connect();
        await broker.assertQueue(process.env.HISTORY_QUEUE);

        broker.consumer(process.env.HISTORY_QUEUE, consumer.handle.bind(consumer));
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
