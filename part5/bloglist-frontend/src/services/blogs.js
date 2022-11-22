import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (new_token) => {
    token = new_token
}

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const create = async (new_blog) => {
    const resp = await axios.post(baseUrl, new_blog, { headers: { Authorization: `bearer ${token}` } })
    return resp.data
}

let exps = { setToken, getAll, create }
export default exps
