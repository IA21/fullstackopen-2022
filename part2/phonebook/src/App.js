import { useEffect, useState } from 'react'
import personsService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './App.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [filterName, setFilterName] = useState('')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notificationDetails, setNotificationDetails] = useState({})

    useEffect(() => {
        personsService.getPersons().then(resp => {
            setPersons(resp)
        })
    }, [])

    const showNotification = (type, message) => {
        setNotificationDetails({ type, message })
        setTimeout(() => setNotificationDetails({}), 3000)
    }

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
                showNotification('success', `Updated ${existing_person.name}`)
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
                showNotification('success', `Added ${resp.name}`)
            }).catch(err => {
                console.error(err)
                showNotification('error', err.response.data.error)
            })
        }
    }

    const handleDelete = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return;

        personsService.deletePerson(person).then(() => {
            showNotification('success', `Deleted ${person.name}`)
        }).catch(err => {
            showNotification('error', `Information of ${person.name} has already been removed from server`)
            console.error(err)
        }).finally(() => {
            setPersons(persons.filter(p => p.id !== person.id))
        })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification details={notificationDetails} />
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
