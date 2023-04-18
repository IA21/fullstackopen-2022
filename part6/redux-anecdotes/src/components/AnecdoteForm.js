import { useDispatch } from 'react-redux'
import { anecdoteAdd } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add_anecdote = (event) => {
        event.preventDefault()
        dispatch(anecdoteAdd(event.target.content.value))
        event.target.content.value = ''
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={add_anecdote}>
                <div><input type='text' id='content' /></div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
