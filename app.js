const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const knex = require('./database-connection')
const app = module.exports = express()
const port = parseInt(process.env.PORT || 5000)
const concerts = require('./routes/concerts')
const queries = require('./queries')
// const data = './01_concerts.js'  //how do I reference my JSON within this file

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({
  origin: true,
  credentials: true
}))

app.get('/:id', (req, res) => {
  queries.read(req.params.id)
    .then(concert => res.json(concert))
    .then(concert => res.json(concert))
})

app.post('/', (req, res, next) => {
  queries.create(req.body)
    .then(concert => res.json(concert[0]))
})

app.get('/', (req,res) => {                      
  queries.list()
    .then(concert => res.json(concert))                           
})

app.put('/:id', (req,res) => {
  queries.update(req.params.id, req.body)
    .then(concert => res.json(concert[0]))
})

app.delete('/:id', (req,res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      message: 'Entry Deleted'
    })
  }) 
})


app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
  const url = req.originalUrl
  if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
    console.error('[404: Requested file not found] ', url)
  }
  res.status(404).send({
    error: 'Url not found',
    status: 404,
    url
  })
}

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({
    error: err.message,
    stack,
    url: req.originalUrl
  })
}

app.listen(port)
  .on('error', console.error.bind(console))
  .on('listening', console.log.bind(console, 'Listening on ' + port))