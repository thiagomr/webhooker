const axios = require('axios');

class Webhooker {
    constructor({ logger, broker }) {
        this.logger = logger;
        this.broker = broker;
    }

    async handle(msg) {
        let content, result;

        try {
            content = JSON.parse(msg.content);

            const { status, data } = await axios({
                method: content.method,
                url: content.url,
                data: content.data,
                timeout: 2000
            });

            result = {
                key: content.key,
                data: content.data,
                date: new Date(),
                responseBody: data,
                responseStatus: status,
                error: false
            };
        } catch (e) {
            result = {
                key: content ? content.key : null,
                data: content ? content.data : null,
                date: new Date(),
                responseBody: e.isAxiosError && e.response && e.response.data ? e.response.data : null,
                responseStatus: e.isAxiosError && e.response && e.response.status ? e.response.status : null,
                error: true,
                message: e.message,
                stack: e.stack,
            };
        }

        this.logger.info(result);
        this.broker.ack(process.env.WEBHOOK_QUEUE, msg);

        return result;
    }
}

module.exports = Webhooker;
