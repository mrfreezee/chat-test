const InputContainer = ({ inputValue, setInputValue, handleSendMessage, isChatClosed, inputContainerRef }) => (
    <div className="input-container" ref={inputContainerRef}>
        <div className="divider"></div>
        <div className="input-container-inner">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isChatClosed ? 'Вы не можете писать' : 'Введите сообщение...'}
                disabled={isChatClosed}
            />
            <button onClick={handleSendMessage} disabled={isChatClosed}>
                Отправить
            </button>
        </div>
    </div>
);

export default InputContainer