import { useSelector } from "react-redux"

const Notification = () => {
    const content = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div style={style}>
            {content}
        </div>
    )
}

export default Notification