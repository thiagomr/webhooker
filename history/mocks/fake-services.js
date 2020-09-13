module.exports.logger = {
    info(msg) {
        console.log(msg);
    },

    error(msg) {
        console.error(msg);
    }
};

module.exports.broker = {
    ack(queue, message) {
        console.log('ack message', queue, message);
    },

    sendMessage(queue, message) {
        console.log('send message', queue, message);
    }
};

module.exports.history = {
    save(event) {
        console.log('save history event', event);
    }
};

