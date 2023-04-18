import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter(anc => anc.content.toLowerCase().includes(filter.toLowerCase()))
    )

    const vote = (id) => {
        dispatch(anecdoteVote(id))
    }

    return (
        <>
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
        </>
    )
}

export default AnecdoteList
