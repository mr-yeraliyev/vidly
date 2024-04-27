const express = require('express')
const morgan = require('morgan')
// const debug = require('debug')('app:routes-api')
const genres = require('./routes/genres')

const app = express()

app.use(morgan('dev')) // log every request to the console
app.use(express.json())
app.use('/api/genres', genres)

app.listen(3000, () => console.log('Listenig port 3000...'))
