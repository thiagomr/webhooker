require('dotenv').config();

const Consumer = require('../src/subscribers/consumer');
const { broker, logger, history } = require('../mocks/fake-services');
const { fakeMessage } = require('../mocks/stubs');
const consumer = new Consumer({ broker, logger, history });

describe('test callback history', () => {
    test('shoud salve a history event', async () => {
        const message = fakeMessage();
        await consumer.handle(message);
    });
});
