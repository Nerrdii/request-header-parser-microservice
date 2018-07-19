const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.ip || req.ips,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`App now listening on port ${PORT}...`));
