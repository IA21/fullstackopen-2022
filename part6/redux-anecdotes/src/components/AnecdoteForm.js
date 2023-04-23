import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add_anecdote = async (event) => {
        event.preventDefault()

        dispatch(addNewAnecdote(event.target.content.value))
        dispatch(setNotification(`anecdote '${event.target.content.value}' added!`, 3))

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
