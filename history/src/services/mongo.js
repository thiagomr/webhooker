const mongoose = require('mongoose');

class Mongo {
    constructor({ logger }) {
        this.logger = logger;
        this.url = `mongodb://${process.env.MONGO_HOST}:27017/${process.env.MONGO_SCHEMA}`;
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        mongoose.connection.on('connected', () => this.logger.info(`[mongo] connected at ${process.env.MONGO_HOST}/${process.env.MONGO_SCHEMA}`));
        mongoose.connection.on('error', () => this.logger.error('[mongo] error'));
        mongoose.connection.on('disconnected', () => this.logger.warn('[mongo] disconnected'));
        mongoose.connection.on('reconnectFailed', () => this.logger.error('[mongo] failed'));
    }

    async connect() {
        await mongoose.connect(this.url, this.options);
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

module.exports = Mongo;
