const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get('/api', (req, res) => {
    const ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    const language = req.headers["accept-language"].split(",")[0];
    let software = req.headers['user-agent'];
    software = software.substring(software.indexOf("(")+1, software.indexOf(")"));

    res.json({
        "ip-address": ip,
        "language": language,
        "software": software
    });
});

app.listen(port, () => console.log(`App now listening on port ${port}...`));
