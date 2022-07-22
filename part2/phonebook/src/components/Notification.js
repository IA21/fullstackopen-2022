const Notification = ({ message }) => {
    if (message === '')
        return;

    return (
        <div className="notification">{message}</div>
    )
}

export default Notification