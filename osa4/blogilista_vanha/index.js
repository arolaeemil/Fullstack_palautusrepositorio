require('dotenv').config()
//const Blog = require('./models/blog')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = 'mongodb://localhost/bloglist'
// mongoose.connect(mongoUrl)

const url =
`mongodb+srv://eemilarola:${password}@klusteri0.fnctmrq.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})