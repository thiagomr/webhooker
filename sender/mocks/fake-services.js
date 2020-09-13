module.exports.logger = {
    info(msg) {
        console.log(msg);
    }
};

module.exports.broker = {
    ack(queue, message) {
        console.log('ack message', queue, message);
    }
};
