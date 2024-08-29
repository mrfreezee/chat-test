const TopBar = ({ toggleMenu, showModal, isMenuVisible }) => (
    <div className="top-bar">
        <div className="user-info">
            <div className="avatar">F</div>
            <div>
                <div className="username">Fantep</div>
                <div className="user-rating">Рейтинг: 65%</div>
            </div>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>⋮</div>
        {isMenuVisible && (
            <div className="menu-dropdown">
                <button onClick={() => showModal('info')}>Информация</button>
                <button onClick={() => showModal('report')}>Подать апелляцию</button>
            </div>
        )}
    </div>
);

export default TopBar