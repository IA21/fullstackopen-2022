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

const like_blog = async (blog) => {
    const resp = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes + 1 })
    return resp.data
}

const delete_blog = async (blog) => {
    await axios.delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: `bearer ${token}` } })
}

let exps = { setToken, getAll, create, like_blog, delete_blog }
export default exps
