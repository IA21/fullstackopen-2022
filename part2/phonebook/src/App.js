import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const DB_BASE_URL = 'http://localhost:3001';

    const [persons, setPersons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        axios.get(`${DB_BASE_URL}/persons`).then(resp => {
            setPersons(resp.data)
        })
    }, [])

    const handleFilterChange = (e) => {
        setFilterName(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (persons.filter(person => person.name.toLowerCase() === newName.trim().toLowerCase()).length > 0) {
            alert(`${newName} is already added to phonebook`)
            return;
        }

        axios.post(`${DB_BASE_URL}/persons`, {
            name: newName, number: newNumber
        }).then(resp => {
            setPersons(persons.concat(resp.data))
            setNewName('')
            setNewNumber('')
        })

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

            <h2>add a new</h2>
            <PersonForm
                handleFormSubmit={handleFormSubmit}
                newName={newName}
                nameChangeHandler={(e) => setNewName(e.target.value)}
                newNumber={newNumber}
                numberChangeHandler={(e) => setNewNumber(e.target.value)}
            />

            <h2>Numbers</h2>
            <Persons persons={persons} filterName={filterName} />
        </div>
    )
}

export default App
