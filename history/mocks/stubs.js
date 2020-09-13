module.exports.fakeMessage = () => {
    return {
        content: JSON.stringify({
            key: 'foobar',
            data: {},
            date: new Date(),
            responseBody: {
                message: 'ok'
            },
            responseStatus: 200,
            error: false
        })
    };
};
