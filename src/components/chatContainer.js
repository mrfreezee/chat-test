const ChatContainer = ({ messages, chatContainerRef }) => (
    <div className="chat-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
            <div
                key={index}
                className={
                    message.type === 'system'
                        ? 'system-message'
                        : message.type === 'warning'
                            ? 'system-message warning'
                            : message.type === 'sticker'
                                ? 'sticker-container'
                                : `message-container ${message.userId === 'current' ? 'message-user2' : message.userId === 'admin' ? 'message-admin' : 'message-user1'}`
                }
            >
                {message.type === 'sticker' ? (
                    <img src={message.src} alt="Sticker" style={{ width: '150px', height: '150px' }} />
                ) : (
                    <>
                        {message.userId !== 'current' && message.type !== 'system' && (
                            <div className="message-avatar">
                                {message.userId === 'admin' ? 'A' : 'F'}
                            </div>
                        )}
                        <div className="message-body">
                            {message.userId !== 'current' && message.type !== 'system' && (
                                <div className="message-nickname">
                                    {message.userId === 'admin' ? 'Администратор' : 'Fantep'}
                                </div>
                            )}
                            <div className="message-content">{message.text}</div>
                            <div className="message-time">
                                {message.timestamp}
                            </div>
                        </div>
                    </>
                )}
            </div>
        ))}
    </div>
);

export default ChatContainer