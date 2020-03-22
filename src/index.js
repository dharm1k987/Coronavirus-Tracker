const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.headers.origin);
  if (req.headers.origin === 'https://track-coronavirus.com') {
    res.setHeader('Access-Control-Allow-Origin', 'https://track-coronavirus.com');
  } else if (req.headers.origin === 'https://dev.track-coronavirus.com') {
    res.setHeader('Access-Control-Allow-Origin', 'https://dev.track-coronavirus.com');
  } else if (req.headers.origin === 'http://localhost:3000') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});

app.get('/', (req, res) => res.send('Hello Track Coronavirus backend!'));

require('./routes/live-stats')(app);

app.listen(9000, () => console.log('Track Coronavirus app listening on port 9000!'))


