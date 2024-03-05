const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://eemilarola:${password}@klusteri0.fnctmrq.mongodb.net/blogApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  author: 'Is?',
  tite: 'This?',
  url: 'Working?',
  likes: 0
})

blog.save().then(result => {
  console.log('blog saved!')
  mongoose.connection.close()
})

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})