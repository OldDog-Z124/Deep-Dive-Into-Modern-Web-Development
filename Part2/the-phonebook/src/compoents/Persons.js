const Persons = ({persons, onClick}) => {
  return (
    <div>
      {persons.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => onClick(person)}>delete</button>  
        </p>
      )}
    </div>
  )
}

export default Persons