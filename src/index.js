const express = require('express')
const app = express()
app.get('/', (req, res) =>
  res.send('Hello Track Coronavirus backend!')
)
app.listen(9000, () => console.log('Track Coronavirus app listening on port 9000!'))

