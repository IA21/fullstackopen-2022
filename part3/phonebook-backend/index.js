const express = require('express')
const app = express()

app.use(express.json())

// data

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
]

// routes

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    let requested_person = persons.find(person => person.id == req.params.id)
    requested_person
        ? res.json(requested_person)
        : res.status(404).end()
})

// server
app.listen(3001)
console.log('server listening on port 3001')
