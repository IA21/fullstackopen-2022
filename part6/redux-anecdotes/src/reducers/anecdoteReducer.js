import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        id: getId(),
        votes: 0,
        content: anecdote,
    }
}

const anecdoteReducer = createSlice({
    name: 'anecdote',
    initialState: anecdotesAtStart.map(asObject),
    reducers: {
        anecdoteAdd(state, action) {
            return [...state, {
                id: getId(),
                votes: 0,
                content: action.payload,
            }]
        },
        anecdoteVote(state, action) {
            return state.map(anecdote =>
                anecdote.id === action.payload
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            )
        },
    }
})

export const { anecdoteAdd, anecdoteVote } = anecdoteReducer.actions
export default anecdoteReducer.reducer
