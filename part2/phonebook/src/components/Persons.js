const Persons = ({ persons, filterName }) => {
   return (
      <>
         {
            persons.map((person) => {
               if (person.name.toLowerCase().includes(filterName.trim().toLowerCase()))
                  return <div key={person.name}>{person.name} {person.number}</div>

               return false; // not necessary - stops compiler warnings
            })
         }
      </>
   )
}

export default Persons