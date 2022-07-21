import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() => {
        personsService.getPersons().then(resp => {
            setPersons(resp)
        })
    }, [])

    const handleFilterChange = (e) => {
        setFilterName(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        const existing_person = persons.find(person => person.name.toLowerCase() === newName.trim().toLowerCase());

        if (existing_person) {
            // existing person - ask for update
            if (!window.confirm((`${newName} is already added to phonebook, replace the old number with a new one?`)))
                return;

            personsService.updatePerson(existing_person.id, {
                ...existing_person,
                number: newNumber
            }).then(resp => {
                setPersons(persons.map(person => person.id === existing_person.id ? resp : person))
            })
        } else {
            // new person - add
            personsService.addPerson({
                name: newName,
                number: newNumber
            }).then(resp => {
                setPersons(persons.concat(resp))
                setNewName('')
                setNewNumber('')
            })
        }
    }

    const handleDelete = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return;

        personsService.deletePerson(person).then(resp => {
            setPersons(persons.filter(p => p.id !== person.id))
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
            <Persons persons={persons} filterName={filterName} handleDelete={handleDelete} />
        </div>
    )
}

export default App
