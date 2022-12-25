import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch({
            type: 'VOTE',
            data: {
                id,
            }
        })
    }

    const add_anecdote = (event) => {
        event.preventDefault()
        dispatch({
            type: 'ADD_ANECDOTE',
            data: {
                content: event.target.content.value,
            }
        })
        event.target.content.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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