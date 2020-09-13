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
                code: e.code,
                message: e.message,
                stack: e.stack
            };

            this.retry(content);
        }

        this.logger.info(result);
        this.broker.sendMessage(process.env.HISTORY_QUEUE, JSON.stringify(result));
        this.broker.ack(process.env.WEBHOOK_QUEUE, msg);

        return result;
    }

    retry(content) {
        content.retry = content.retry ? content.retry++ : 1;
        this.broker.sendMessage(process.env.RETRY_QUEUE, JSON.stringify(content));
    }
}

module.exports = Webhooker;
