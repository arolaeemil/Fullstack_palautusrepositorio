const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  //console.log('Headers:', request.headers);
  //console.log('Request body (raw):', request.body);
  //console.log("request body:")
  //console.log(request.body)

  if (!password || password.length < 3) {
    const error = new Error('Password must be at least 3 characters long')
    error.name = 'PasswordValidationError'
    return next(error)
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    const error = new Error('Username must be unique')
    error.name = 'UsernameValidationError'
    return next(error)
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  // const passwordHash = password

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  //const users = await User.find({})
  const users = await User
    .find({}).populate('blogs', { author: 1, title: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter