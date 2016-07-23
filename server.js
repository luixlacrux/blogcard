'use strict'
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const socket = socketio(server)

const PORT = process.env.PORT || 3000

const moreArticles = [
  {
    "id":10,
    "title": "Sorry for bording",
    "author":{
      "id": 1,
      "username": "luka",
      "avatar": "http://lorempixel.com/60/60/"
    },
    image: 'http://lorempixel.com/410/400/',
    date: "1996-07-12",
    tag: null,
    stract: "loremp is sad class class sort",
    likes: 231,
    liked: false
  },
  {
    "id":16,
    "title": "Party in the rock with Koa",
    "author":{
      "id": 6,
      "username": "diego",
      "avatar": "http://lorempixel.com/g/60/60/"
    },
    image: 'http://lorempixel.com/g/350/350/',
    date: "2016-07-12",
    tag: null,
    stract: "my school is best that some college",
    likes: 1,
    liked: true
  }
]

const articles = [
  {
    "id":1,
    "title": "Forever isn´t carding",
    "author":{
      "id": 1,
      "username": "admin",
      "avatar": "http://lorempixel.com/60/60/"
    },
    image: 'http://lorempixel.com/400/400/',
    date: "1996-07-12",
    tag: null,
    stract: "loremp is sad class class sort",
    likes: 231,
    liked: false
  },
  {
    "id":6,
    "title": "Never give up",
    "author":{
      "id": 6,
      "username": "admin",
      "avatar": "http://lorempixel.com/g/60/60/"
    },
    image: 'http://lorempixel.com/g/350/350/',
    date: "2016-07-12",
    tag: null,
    stract: "my school is best that some college",
    likes: 1,
    liked: true
  },
  {
    "id":4,
    "title": "Loking isn´t best that lost",
    "author":{
      "id": 3,
      "username": "andres",
      "avatar": "http://lorempixel.com/g/60/60/"
    },
    image: 'http://lorempixel.com/g/400/400/',
    date: "2014-12-10",
    tag: null,
    stract: "scream is my first movie that see here",
    likes: 11,
    liked: true
  }
]

app.use(express.static('public'))

app.get('/api/articles', (req,res) => {
  articles[3] = moreArticles[0]
  res.json(articles)
})

socket.on('connection' , socket => {
  console.log('User connect', socket.id)

  socket.emit('articles', articles)
  setTimeout(() => {
    emitter()
  }, 10000)

  function emitter () {
    console.log('emiti')
    socket.emit('article', moreArticles[0])
  }
})



server.listen(PORT, () => {
  console.log('Server listen in:', PORT)
})