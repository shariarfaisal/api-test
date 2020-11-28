const express = require('express')
const app = express()
const port = 4040
const getFare = require('./routes/getFare')

app.use('/api/getFare',getFare)

app.use('/',(req,res) => {
  res.send('Welcome! Server running.')
})

app.listen(port,() => {
  console.log(`Server running on port ${port}`);
})
