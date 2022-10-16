import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const requare = axios.get(baseUrl)
  return requare.then(response => response.data)
}

const create = (newPerson) => {
  const requare = axios.post(baseUrl, newPerson)
  return requare.then(response => response.data)
}

const update = (id, newPerson) => {
  const url = `${baseUrl}/${id}`
  const requare = axios.put(url, newPerson)
  console.log(requare)
  return requare.then(response => response.data)
}

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`
  const requare = axios.delete(url)
  return requare
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll, create, update, deletePerson}