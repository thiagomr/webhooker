const mongoose = require('mongoose');

const CallbackHistorySchema = new mongoose.Schema({
    url: String,
    method: String,
    key: String,
    data: Object
});

module.exports = mongoose.model('CallbackHistory', CallbackHistorySchema);
