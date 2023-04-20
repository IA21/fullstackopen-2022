import { createSlice } from "@reduxjs/toolkit"

const anecdoteReducer = createSlice({
    name: 'anecdote',
    initialState: [],
    reducers: {
        anecdotesSet(state, action) {
            return action.payload
        },
        anecdoteAdd(state, action) {
            return [...state, {
                id: (100000 * Math.random()).toFixed(0),
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

export const { anecdotesSet, anecdoteAdd, anecdoteVote } = anecdoteReducer.actions
export default anecdoteReducer.reducer
