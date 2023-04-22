import { createSlice } from "@reduxjs/toolkit"
import anecdotes_service from "../services/anecdotes"

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

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        dispatch(anecdotesSet(await anecdotes_service.get_all()))
    }
}

export default anecdoteReducer.reducer
