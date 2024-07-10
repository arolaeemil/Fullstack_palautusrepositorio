/* eslint-disable no-undef */
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const blogs = require('../controllers/blogs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('correct blog amount is returned', async () => {
        const response = await api.get('/api/blogs')
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
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
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
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
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
        .send(newBlog)
        .expect(400)
    })
})

after(async () => {
    await mongoose.connection.close()
})