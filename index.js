const express = require('express');
const bodyParser = require('body-parser');
const {nanoid}  = import('nanoid');

const app = express();
const PORT = process.env.PORT || 8080;

const urlStore = {}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

app.get('/:shortId', (req,res) => {
    const {shortId } = req.params;
    const originalUrl = urlStore[shortId];

    if(originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.post('/shorten',(req,res)=> {
    const {url} = req.body;
    if(!url) {
        return res.status(400).send('URL is required');
    }

    const shortId = nanoid(6);
    urlStore[shortId] = url;
    const shortUrl = `http://localhost:${PORT}/${shortId}`;
    res.send({shortUrl})
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});