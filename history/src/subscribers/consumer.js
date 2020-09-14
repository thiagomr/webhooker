class Consumer {
    constructor({ logger, broker, history }) {
        this.logger = logger;
        this.broker = broker;
        this.history = history;
    }

    async handle(msg) {
        let content;

        try {
            content = JSON.parse(msg.content);
            content.date = new Date(content.date);

            await this.history.save(content);

            this.broker.ack(process.env.HISTORY_QUEUE, msg);
        } catch (e) {
            this.logger.error(e);
            this.broker.nack(process.env.HISTORY_QUEUE, msg);
        }
    }
}

module.exports = Consumer;
