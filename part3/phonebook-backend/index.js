require('dotenv').config()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')
const express = require('express')
const app = express()


// middlewares


app.use(cors())

app.use(express.json())

app.use(express.static('build'))

morgan.token('req_data', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_data'))


// routes


app.get('/info', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`)
        })
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => res.json(person))
        .catch(err => {
            console.error(err)
            res.status(404).end()
        })
})

app.post('/api/persons', (req, res) => {
    let new_person = req.body;

    if (!new_person.name) {
        res.status(400).json({ error: 'name required' })
        return
    } else if (!new_person.number) {
        res.status(400).json({ error: 'number required' })
        return
    }

    new Person(new_person)
        .save()
        .then(saved_person => res.json(saved_person))
})

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id != req.params.id)
    res.status(204).end()
})


// server


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
