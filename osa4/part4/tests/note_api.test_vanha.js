//const { test, after } = require('node:test')
const { test, after, beforeEach } = require('node:test')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const helper = require('./test_helper')

const api = supertest(app)

/* const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
] */

/* beforeEach(async () => {
  await Note.deleteMany({})
  //let noteObject = new Note(initialNotes[0])
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  //noteObject = new Note(initialNotes[1])
  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
}) */

/* beforeEach(async () => {
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')
}) */

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)

  /*const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray) */

  /*for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  } */
})

test.only('notes are returned as json', async () => {
  console.log('entered test')
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('there are two notes', async () => {
  const response = await api.get('/api/notes')

  //assert.strictEqual(response.body.length, 2)
  //assert.strictEqual(response.body.length, initialNotes.length)
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})


test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(e => e.content)

  //assert.strictEqual(contents.includes('HTML is easy'), true)
  // is the parameter truthy
  assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  //assert.strictEqual(response.body.length, initialNotes.length + 1)
  assert.strictEqual(response.body.length, helper.initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  //assert.strictEqual(response.body.length, initialNotes.length)
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})