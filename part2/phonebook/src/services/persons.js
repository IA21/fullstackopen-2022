import axios from 'axios'

const DB_BASE_URL = process.env.REACT_APP_API_ENDPOINT;
console.log('API_ENDPOINT', DB_BASE_URL)

const getPersons = () => {
    return axios.get(`${DB_BASE_URL}/persons`).then(resp => resp.data)
}

const addPerson = (person) => {
    return axios.post(`${DB_BASE_URL}/persons`, person).then(resp => resp.data)
}

const updatePerson = (id, person) => {
    return axios.put(`${DB_BASE_URL}/persons/${id}`, person).then(resp => resp.data)
}

const deletePerson = (person) => {
    return axios.delete(`${DB_BASE_URL}/persons/${person.id}`)
}

const exps = { getPersons, addPerson, updatePerson, deletePerson }

export default exps