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


app.get('/info', (req, res, next) => {
    Person
        .find({})
        .then(persons => {
            res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`)
        })
        .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            person
                ? res.json(person)
                : res.status(404).end()
        })
        .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    let new_person = req.body;

    if (!new_person.name) {
        res.status(400).json({ error: 'name required' })
        return
    } else if (!new_person.number) {
        res.status(400).json({ error: 'number required' })
        return
    }

    Person
        .find({ name: new_person.name })
        .then(existing_persons => {
            if (existing_persons.length > 0) {
                res.status(409).json({ error: `person with name '${new_person.name}' already exists` })
            } else {
                new Person(new_person)
                    .save()
                    .then(saved_person => res.json(saved_person))
                    .catch(err => next(err))
            }
        })
})

app.put('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndUpdate(req.params.id, { number: req.body.number }, { new: true, runValidators: true, context: 'query' })
        .then(updated_person => res.json(updated_person))
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(removed_person => {
            removed_person
                ? res.send(204).end()
                : res.send(404).end()
        })
        .catch(err => next(err))
})


// middlewares continued


const error_handler = (err, req, res, next) => {
    console.error(err)

    if (err.name === 'CastError')
        res.status(400).send({ error: 'invalid id' })
    if (err.name === 'ValidationError')
        res.status(400).send({ error: err.message })
    else
        res.status(500).end()

    next(err)
}
app.use(error_handler)


// server


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
