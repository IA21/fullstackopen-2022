import { useDispatch } from 'react-redux'
import { anecdoteAdd } from '../reducers/anecdoteReducer'
import { cancelNotification, setNotification } from '../reducers/notificationReducer'
import anecdotes_service from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add_anecdote = async (event) => {
        event.preventDefault()

        let new_anc = await anecdotes_service.add(event.target.content.value)

        dispatch(anecdoteAdd(new_anc.content))
        dispatch(setNotification(`anecdote '${new_anc.content}' added!`))
        setTimeout(() => dispatch(cancelNotification()), 5000)

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
