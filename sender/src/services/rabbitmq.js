const amqp = require('amqplib');

class RabbitMq {
    constructor({ logger }) {
        this.connection = false;
        this.channels = {};
        this.logger = logger;
    }

    async connect() {
        try {
            this.connection = await amqp.connect(`amqp://${process.env.RABBITMQ_HOST}`);

            this.connection.on('error', (e) => {
                this.logger('rabbitmq connection error', e);
                process.exit(1);
            });

            this.connection.on('blocked', async (e) => {
                this.logger.error('rabbitmq connection error', e);
                process.exit(1);
            });

            this.logger.info(`[rabbitmq] - connected at port ${process.env.RABBITMQ_HOST}`);
        } catch (e) {
            throw e;
        }
    }

    createChannel() {
        try {
            return this.connection.createChannel();
        } catch (e) {
            throw e;
        }
    }

    getChannel(queue) {
        try {
            if (!this.channels[queue]) {
                throw new Error(`channel not exists - ${queue}`);
            }

            return this.channels[queue];
        } catch (e) {
            throw e;
        }
    }

    async assertQueue(queue, concurrency = 1, config = {}) {
        try {
            this.logger.info('[rabbitmq] - assert queue', queue);
            this.channels[queue] = await this.createChannel(queue);
            this.channels[queue].prefetch(concurrency);

            await this.channels[queue].assertQueue(queue, config);

            this.channels[queue].on('close', () => {
                this.logger.error('Channel closed');
                process.exit(1);
            });

            this.channels[queue].on('error', e => {
                this.logger.error('Channel error', e);
                process.exit(1);
            });
        } catch (e) {
            throw e;
        }
    }

    consumer(queue, callback, options) {
        try {
            if (!this.channels[queue]) {
                throw new Error(`channel not exists - ${queue}`);
            }

            this.logger.info('[rabbitmq] - subscriber', queue);
            this.channels[queue].consume(queue, callback, options);
        } catch (e) {
            throw e;
        }
    }

    sendMessage(queue, message) {
        try {
            return this.channels[queue].sendToQueue(queue, Buffer.from(message));
        } catch (e) {
            throw e;
        }
    }

    ack(queue, message) {
        try {
            this.channels[queue].ack(message);
        } catch (e) {
            throw e;
        }
    }

    nack(queue, message) {
        try {
            this.channels[queue].nack(message);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = RabbitMq;
