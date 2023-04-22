import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes, anecdoteVote } from '../reducers/anecdoteReducer'
import { cancelNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])

    const anecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes.filter(anc => anc.content.toLowerCase().includes(filter.toLowerCase()))
    )

    const vote = (id) => {
        dispatch(anecdoteVote(id))
        dispatch(setNotification(`you voted '${anecdotes.find(anc => anc.id === id).content}'!`))
        setTimeout(() => dispatch(cancelNotification()), 5000)
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
