import { useSelector, useDispatch } from 'react-redux'
import { ac_add_anecdote, ac_vote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(ac_vote(id))
    }

    const add_anecdote = (event) => {
        event.preventDefault()
        dispatch(ac_add_anecdote(event.target.content.value))
        event.target.content.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes} <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                )}
            <h2>create new</h2>
            <form onSubmit={add_anecdote}>
                <div><input type='text' id='content' /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App