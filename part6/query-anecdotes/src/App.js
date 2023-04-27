import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
    const queryClient = useQueryClient()

    const voteMutator = useMutation({
        mutationFn: (anecdote) => {
            return axios
                .put(`http://localhost:3001/anecdotes/${anecdote.id}`, anecdote)
                .then(res => res.data)
        },
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries('anecdotes')
        }
    })

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
        voteMutator.mutate({ ...anecdote, votes: anecdote.votes + 1 })
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
