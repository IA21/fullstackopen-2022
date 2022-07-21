const Persons = ({ persons, filterName, handleDelete }) => {
    return (
        <>
            {
                persons.map((person) => {
                    if (person.name.toLowerCase().includes(filterName.trim().toLowerCase()))
                        return <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>

                    return false; // not necessary - stops compiler warnings
                })
            }
        </>
    )
}

export default Persons