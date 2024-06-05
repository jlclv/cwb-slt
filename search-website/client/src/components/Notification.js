const Notification = ({ message, type }) => {
    const notificationStyle = `alert alert-${type}`;
    if (!message) {
        return null;
    }
    return <div className={notificationStyle}>{message}</div>;
};

export default Notification;
