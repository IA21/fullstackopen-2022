import axios from 'axios'

const base_url = `http://localhost:3001/anecdotes`

const get_all = async () => {
    let res = await axios.get(base_url)
    return res.data
}

export default { get_all } // eslint-disable-line import/no-anonymous-default-export
