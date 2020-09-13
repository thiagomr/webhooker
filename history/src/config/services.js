const Logger = require('../services/logger');
const RabbitMq = require('../services/rabbitmq');
const Mongo = require('../services/mongo');
const History = require('../services/history');

module.exports.logger = new Logger();

module.exports.broker = new RabbitMq({
    logger: this.logger
});

module.exports.database = new Mongo({
    logger: this.logger
});

module.exports.history = new History();
