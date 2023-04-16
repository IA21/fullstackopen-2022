import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { anecdoteReducer, filterReducer } from './reducers/anecdoteReducer'

const store = createStore(combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
}))

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
