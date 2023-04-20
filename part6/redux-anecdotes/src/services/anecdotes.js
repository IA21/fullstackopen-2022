import axios from 'axios'

const base_url = `http://localhost:3001/anecdotes`

const get_all = async () => {
    let res = await axios.get(base_url)
    return res.data
}

const add = async (content) => {
    let res = await axios.post(base_url, {
        id: (100000 * Math.random()).toFixed(0),
        votes: 0,
        content: content,
    })
    return res.data
}

export default { get_all, add } // eslint-disable-line import/no-anonymous-default-export
