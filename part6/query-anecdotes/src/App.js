import { useQuery } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const result = useQuery(
        'anecdotes',
        () => axios.get(`http://localhost:3001/anecdotes`).then(res => res.data),
        {
            retry: 0,
        },
    )

    if (result.isLoading) {
        return <div>loading...</div>
    }

    if (result.isError) {
        return <div>error: {result.error.message}</div>
    }

    const anecdotes = result.data

    const handleVote = (anecdote) => {
        console.log('vote')
    }

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
