import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVote, anecdotesSet } from '../reducers/anecdoteReducer'
import { cancelNotification, setNotification } from '../reducers/notificationReducer'
import anecdotes_service from "../services/anecdotes"

const AnecdoteList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecdotes_service
            .get_all()
            .then(anecdotes => dispatch(anecdotesSet(anecdotes)))
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
