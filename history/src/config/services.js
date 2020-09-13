const Logger = require('../services/logger');
const RabbitMq = require('../services/rabbitmq');

module.exports.logger = new Logger();

module.exports.broker = new RabbitMq({
    logger: this.logger
});
