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
    let new_id, new_person = req.body;

    // error handling
    if (!new_person.name) {
        res.status(400).json({ error: 'name required' })
        return
    } else if (!new_person.number) {
        res.status(400).json({ error: 'number required' })
        return
    } else if (persons.find(person => person.name.toLowerCase() === new_person.name.toLowerCase())) {
        res.status(400).json({ error: 'name must be unique' })
        return
    }

    do {
        new_id = Math.floor(Math.random() * 1000000)
    } while (persons.map(p => p.id).find(id => id === new_id))  // keep generating ids until you get a unique one

    new_person = { id: new_id, ...new_person }
    persons.push(new_person)
    res.json(new_person)
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
