require('dotenv').config();
require('../mocks/fake-server');

const { broker, logger } = require('../mocks/fake-services');
const { message } = require('../mocks/stubs');
const Webhooker = require('../src/subscribers/webhooker');
const webhooker = new Webhooker({ broker, logger });

describe('Test webhook sender', () => {
    test('should return status code 200', async () => {
        message.content.url = 'http://localhost:5000/send';
        message.content.method = 'GET';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.responseStatus).toBe(200);
    });
});
