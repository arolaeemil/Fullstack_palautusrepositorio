/* eslint-disable no-undef */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  //Blog.find({}).then(blogs => {
    //response.json(blogs)
  //})
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)  
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

    const chosenuser = await User.findOne()

    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: chosenuser,
    })
    const savedBlog = await blog.save();
    response.json(savedBlog);
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter