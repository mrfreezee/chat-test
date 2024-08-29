const NotificationBar = ({ closeNotification }) => (
    <div className="notification-bar">
        <div className="notification-text">
            Никогда не переводите средства незнакомым лицам без проверки всей информации.
        </div>
        <button className="close-button" onClick={closeNotification}>×</button>
    </div>
);

export default NotificationBar