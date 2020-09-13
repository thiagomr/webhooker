module.exports.fakeMessage = () => {
    return {
        content: {
            url: '',
            method: 'GET',
            key: 'foobar',
            data: {
                name: 'test',
                value: 10
            }
        }
    };
};

