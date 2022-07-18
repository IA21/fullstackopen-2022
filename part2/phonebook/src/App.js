import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
   const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
   ])
   const [filterName, setFilterName] = useState('')
   const [newName, setNewName] = useState('')
   const [newNumber, setNewNumber] = useState('')

   const handleFilterChange = (e) => {
      setFilterName(e.target.value)
   }

   const handleFormSubmit = (e) => {
      e.preventDefault()

      if (persons.filter(person => person.name.toLowerCase() === newName.trim().toLowerCase()).length > 0) {
         alert(`${newName} is already added to phonebook`)
         return;
      }

      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
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
