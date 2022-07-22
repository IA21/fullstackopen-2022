const Notification = ({ details }) => {
    if (typeof details.message === 'undefined')
        return;

    return (
        <div className={`notification notification-${details.type}`}>{details.message}</div>
    )
}

export default Notification