require('dotenv').config();
require('../mocks/fake-server');

const { broker, logger } = require('../mocks/fake-services');
const { fakeMessage } = require('../mocks/stubs');
const Webhooker = require('../src/subscribers/webhooker');
const webhooker = new Webhooker({ broker, logger });

jest.setTimeout(50000);

describe('Test webhook sender', () => {
    test('should return status code 200 [GET]', async () => {
        const message = fakeMessage();

        message.content.url = 'http://localhost:5000/send';
        message.content.method = 'GET';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.responseStatus).toBe(200);
    });

    test('should return status code 200 [POST]', async () => {
        const message = fakeMessage();

        message.content.url = 'http://localhost:5000/send';
        message.content.method = 'POST';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.responseStatus).toBe(200);
    });

    test('should return status code 500', async () => {
        const message = fakeMessage();

        message.content.url = 'http://localhost:5000/error';
        message.content.method = 'POST';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.responseStatus).toBe(500);
        expect(result.responseBody.message).toBe('error');
    });

    test('should return server timeout after 2000ms', async () => {

        const message = fakeMessage();

        message.content.url = 'http://localhost:5000/timeout';
        message.content.method = 'GET';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.code).toBe('ECONNABORTED');
    });

    test('should return server connection error', async () => {

        const message = fakeMessage();

        message.content.url = 'http://localhost:1000';
        message.content.method = 'GET';
        message.content = JSON.stringify(message.content);

        const result = await webhooker.handle(message);

        expect(result.code).toBe('ECONNREFUSED');
    });
});
