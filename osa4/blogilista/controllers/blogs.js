/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//VIIMEISIN
//const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} */

blogsRouter.get('/', async (request, response) => {
  //Blog.find({}).then(blogs => {
    //response.json(blogs)
  //})
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
  return response.json(blogs)  
})


/* blogsRouter.post('/', (request, response, next) => {
    const body = request.body
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: chosenuser
    })

    blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
    })
    .catch(error => next(error))
}) */

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user
    //console.log("user info:")
    //console.log(request.user)

    /* const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    } */

    //VIIMEISIN
    /* const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken) {
      return response.status(401).json({ error: 'Token missing or invalid' })
    } */

    //const chosenuser = await User.findOne()

    //VIIMEISIN
    //const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      //user: chosenuser,
      //user: user._id
      user: request.user._id
    })

    const savedBlog = await blog.save()
    //console.log("new blog id:")
    //console.log(savedBlog._id)
    //console.log("user blogs:")
    //console.log(user.blogs)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
/*   const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const userId = decodedToken.id */
  const userId = request.user._id
  const targetBlog = await Blog.findById(request.params.id)
  if (targetBlog) {
    if (targetBlog.user.toString() === userId.toString()){
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
  }
  else {
    return response.status(403).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const reqbody = request.body
  const blog = {
    title: reqbody.title,
    author: reqbody.author,
    likes: reqbody.likes,
    url: reqbody.url
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  return response.status(201).json(updatedBlog)
})

module.exports = blogsRouter