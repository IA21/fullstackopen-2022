import { PropTypes } from "prop-types"

const Notification = ({ message, type }) => {
    if (!message)
        return <></>
    else
        return (
            <div className={`notification ${type}`}>
                {message}
            </div>
        )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default Notification
