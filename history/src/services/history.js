const CallbackHistory = require('../models/callback-history');

class History {
    save(content) {
        return CallbackHistory.collection.insertOne(content);
    }
}

module.exports = History;
