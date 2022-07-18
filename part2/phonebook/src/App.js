import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-1234567' }
   ])
   const [newName, setNewName] = useState('')
   const [newNumber, setNewNumber] = useState('')

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
         <form onSubmit={handleFormSubmit}>
            <div>name: <input value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus /></div>
            <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
            <div><button type="submit">add</button></div>
         </form>
         <h2>Numbers</h2>
         {persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
   )
}

export default App
