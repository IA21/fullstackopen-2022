import { useDispatch } from "react-redux"
import { filterAnecdotes } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const filter_anecdotes = ({ target }) => {
        dispatch(filterAnecdotes(target.value))
    }

    return (
        <>
            <form onChange={filter_anecdotes} onSubmit={(e) => { e.preventDefault() }}>
                filter <input type='text' id='query' />
            </form>
            <br />
        </>
    )
}

export default AnecdoteFilter
