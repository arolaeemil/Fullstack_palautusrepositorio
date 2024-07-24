/* eslint-disable no-undef */
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require('../controllers/blogs')
const users = require('../controllers/users')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
require('express-async-errors')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'tokentester', passwordHash })
        await user.save()

        const response = await api
            .post('/api/login')
            .send({ username: 'tokentester', password: 'sekret' })

        const userList = await helper.usersInDb()
        testUserId = userList[0]._id

        //testUserId = response.body.user._id
        token = response.body.token


    })
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('correct blog amount is returned', async () => {
        const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blog idenfication field is named "id"', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]
        idFieldName = Object.keys(blogToView).pop()
        assert.strictEqual(idFieldName, "id")
    })
    test('a new blog can be added with HTTP POST-request and the added blog is correct one', async () => {
        const newBlog = {
                _id: "123456789",
                title: "somethingwillremovesoon",
                author: "willberemovedsoonenough",
                url: "http://doesnotexistandwillberemovedsoon",
                likes: 999,
                __v: 0
        }
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        //console.log(response)
        assert.strictEqual(response.body.length, (helper.initialBlogs.length + 1))

        const resultBlog = response.body.find(blog => blog.title === "somethingwillremovesoon")
        const addedBlog = {
            title: resultBlog.title,
            author: resultBlog.author,
            url: resultBlog.url,
            likes: resultBlog.likes
        }
        const expectedBlog = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes
        }
        assert.deepStrictEqual(addedBlog, expectedBlog)
    })
    test('a blog added with no likes-value will have 0 likes by default', async () => {
        const newBlog = {
                _id: "123456789",
                title: "liketestblog",
                author: "willberemovedsoonenough",
                url: "http://doesnotexistandwillberemovedsoon",
                __v: 0
        }
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        .set('Authorization', `Bearer ${token}`)

        const resultBlog = response.body.find(blog => blog.title === "liketestblog")
        assert.deepStrictEqual(resultBlog.likes, 0)
    })
    test('if added blog has no fields "title" or/and "url" it will be met with "400 Bad request"', async () => {
        const newBlog = {
                _id: "123456789",
                author: "willberemovedsoonenough",
                __v: 0
        }
        await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
    })

    test('if a blog is tried to be added without/with wrong token it will result in statuscode 401 Unauthorized"', async () => {
      const newBlog = {
              _id: "123456789",
              author: "willberemovedsoonenough",
              __v: 0
      }
      wrongToken = "is_wrong_token"
      //wrong token
      await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${wrongToken}`)
      .send(newBlog)
      .expect(401)
      //no token
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            /*const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0] */
            const toBeDeletedBlog = {
              _id: "123456789",
              title: "delete_test_blog",
              author: "willberemovedsoonenough",
              url: "http://doesnotexistandwillberemovedsoon",
              __v: 0
            }
            await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(toBeDeletedBlog)
            .expect('Content-Type', /application\/json/)

            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[blogsAtStart.length-1]

            await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            //console.log(blogsAtEnd)
            //not helper.initialBlogs.length-1 since the to be deleted blog is added so set the current user as the owner
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

            const contents = blogsAtEnd.map(blog => blog.title)
            assert(!contents.includes(blogToDelete.title))
        })
    })
    
    describe('altering of a blog', () => {
        test('succeeds with like amount change with status code 201', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToChange = blogsAtStart[0]
            const updatedBlog = { ...blogToChange, likes: 100 }
            await api
            .put(`/api/blogs/${blogToChange.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBlog)
            .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            //console.log(blogsAtEnd)
            const changedBlog = blogsAtEnd[0]
            assert.strictEqual(changedBlog.likes, 100)
        })
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', name: 'root root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
      //console.log("users in Db:")
      //console.log(usersAtStart)
  
      const newUser = {
        username: 'testi',
        name: 'Superuser',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })
  
    test('creation fails with proper statuscode if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
      
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salaisuus',
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        const usersAtEnd = await helper.usersInDb()
      
        //assert(result.body.error.includes('expected `username` to be unique'))
        assert(result.body.error.includes('username is already taken'))
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode if password is too short', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'testi',
          name: 'Superuser',
          password: '11',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
    
        assert(result.body.error.includes('password must be at least 3 characters long'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
})

after(async () => {
    await mongoose.connection.close()
})