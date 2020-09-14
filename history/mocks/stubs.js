module.exports.fakeMessage = () => {
    return {
        content: JSON.stringify({
            key: 'foobar',
            data: {},
            date: '2020-09-13T18:47:00.215Z',
            responseBody: {
                message: 'ok'
            },
            responseStatus: 200,
            error: false
        })
    };
};
