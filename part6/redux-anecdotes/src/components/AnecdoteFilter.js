import { useDispatch } from "react-redux"
import { ac_filter } from "../reducers/anecdoteReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const filter_anecdotes = ({ target }) => {
        dispatch(ac_filter(target.value))
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
