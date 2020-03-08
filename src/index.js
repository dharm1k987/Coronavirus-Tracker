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

app.get('/', (req, res) =>
  res.send('Hello Track Coronavirus backend!')
)

require('./routes/live-stats')(app);

app.listen(9000, () => console.log('Track Coronavirus app listening on port 9000!'))


