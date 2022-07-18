import { useState } from 'react'

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
         <label>filter shown with <input value={filterName} onChange={handleFilterChange} /></label>
         <h1>add a new</h1>
         <form onSubmit={handleFormSubmit}>
            <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} /></div>
            <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
            <div><button type="submit">add</button></div>
         </form>
         <h2>Numbers</h2>
         {persons.map((person) => {
            if (person.name.toLowerCase().includes(filterName.trim().toLowerCase()))
               return <div key={person.name}>{person.name} {person.number}</div>
         })}
      </div>
   )
}

export default App
