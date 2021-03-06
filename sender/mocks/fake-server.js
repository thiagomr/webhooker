const app = require('express')();

app.get('/send', (req, res) => {
    return res.send('ok');
});

app.post('/send', (req, res) => {
    return res.send('ok');
});

app.post('/error', (req, res) => {
    return res.status(500).send({ message: 'error' });
});

app.get('/timeout', (req, res) => {
    setTimeout(() => {
        return res.status(200).send('ok');
    }, 2000);
});

app.listen(5000, () => console.log('listen at 5000'));
