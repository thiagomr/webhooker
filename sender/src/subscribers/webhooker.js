const axios = require('axios');
const { broker, logger } = require('../config/services');

module.exports = async (msg) => {
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

    logger.info(result);
    broker.ack(process.env.WEBHOOK_QUEUE, msg);
};
