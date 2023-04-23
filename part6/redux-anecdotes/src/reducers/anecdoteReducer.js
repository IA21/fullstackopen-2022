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
            return [...state, action.payload]
        },
        anecdoteVote(state, action) {
            return state.map(anecdote =>
                anecdote.id === action.payload.id
                    ? action.payload
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

export const addNewAnecdote = (content) => {
    return async (dispatch) => {
        dispatch(anecdoteAdd(await anecdotes_service.add(content)))
    }
}

export const voteForAnecdote = (anc) => {
    return async (dispatch) => {
        dispatch(anecdoteVote(await anecdotes_service.vote(anc)))
    }
}

export default anecdoteReducer.reducer
