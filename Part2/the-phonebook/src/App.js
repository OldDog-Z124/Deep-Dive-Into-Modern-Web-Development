import { useState, useEffect } from "react"
import personServices from './services/persons'

import Filter from "./compoents/Filter"
import PersonForm from "./compoents/PersonForm"
import Persons from "./compoents/Persons"
import Notification from './compoents/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageState, setMessageState] = useState('normal')
  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()) || 
    person.number.toLowerCase().includes(filter.toLowerCase())
  )

  const handleAddPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (newName === '' || newNumber === '') {
      alert('Please fill in the complete information')
      return
    }
    else if (persons.some(person => person.name === newName && person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    else if (persons.some(person => person.name === newName && person.number !== newNumber)) {
      const isUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (!isUpdate) return

      const id = persons.find(person => person.name === newName).id
      updatePerson(id, newPerson)
    }
    else {
      addPerson(newPerson)
    }
  }
  const updatePerson = (id, newPerson) => {
    personServices
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson ))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setMessage(`Information of ${newPerson.name} has already been remove from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessageState('error')
      })
  }
  const addPerson = (newPerson) => {
    personServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        
        setMessageState('normal')
      })
  }

  const deletePerson = (person) => {
    const isDelete = window.confirm(`Delete ${person.name}`)

    if (!isDelete) return
    
    personServices
      .deletePerson(person.id)
      .then(response => {
        if (response.status === 200) {
          setPersons(persons.filter(p => p.id !== person.id))
        }
      })
      .catch(error => {
        setMessage(`Information of ${person.name} has already been remove from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setMessageState('error')
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  const handleFilterChnage = event => {
    setFilter(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} state={messageState} />
      <Filter filter={filter} onChange={handleFilterChnage} />
      <h2>Add A New</h2>
      <PersonForm 
        addPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={filteredPersons}
        onClick={deletePerson}
      />
    </div>
  )
}

export default App
