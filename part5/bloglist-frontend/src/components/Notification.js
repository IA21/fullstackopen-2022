const Notification = ({ message, type }) => {
    console.log({ message, type })

    if (!message)
        return <></>
    else
        return (
            <div className={`notification ${type}`}>
                {message}
            </div>
        )
}

export default Notification
