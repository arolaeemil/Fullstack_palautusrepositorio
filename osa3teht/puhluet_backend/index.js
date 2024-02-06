const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
// app.use(morgan('tiny'))
morgan.token('req-body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendick",
      number: "39-23-6423122"
    },
  ]

app.get('/', (request, response) => {
  response.send('<h1>Puhelinluettelo!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
  const person_amount = persons.length
  const time_now = new Date()
  const responsestring1 = '<h3>Phonebook has info for ' + person_amount + ' people'
  const responsestring2 = '<h3>' + time_now + '</h3>'
  response.send(responsestring1 + responsestring2)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const minvalue = 0
  const maxvalue = 10000
  const min = Math.ceil(minvalue)
  const max = Math.floor(maxvalue)
  const randomizedID = Math.floor(Math.random() * (max - min + 1)) + min
  return randomizedID
}

const isAlready = (searchName) => {
  const isFound = persons.some(person => person.name === searchName)
  return isFound
}


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  else if (isAlready(body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})