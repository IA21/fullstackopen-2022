import axios from 'axios'

const DB_BASE_URL = 'http://localhost:3001';

const getPersons = () => {
    return axios.get(`${DB_BASE_URL}/persons`).then(resp => resp.data)
}

const addPerson = (person) => {
    return axios.post(`${DB_BASE_URL}/persons`, person).then(resp => resp.data)
}

const exps = { getPersons, addPerson }

export default exps