const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) =>
  res.send('Hello Track Coronavirus backend!')
)

require('./routes/live-stats')(app);

app.listen(9000, () => console.log('Track Coronavirus app listening on port 9000!'))


