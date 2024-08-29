import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatContainer from './components/chatContainer';
import InputContainer from './components/inputContainer';
import ModalOverlay from './components/modalOverlay';
import NotificationBar from './components/notificationBar';
import TopBar from './components/topBar';

function App() {

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isNotificationVisible, setNotificationVisible] = useState(true);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isChatClosed, setChatClosed] = useState(false);

  const chatContainerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const initialHeight = useRef(window.innerHeight);

  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const closeNotification = () => setNotificationVisible(false);
  const showModal = (type) => setModalVisible(type);
  const closeModal = () => setModalVisible(false);

  const handleSendMessage = () => {
    const messageText = inputValue.trim().toLowerCase();
    if (messageText !== '') {
      const timestamp = new Date().toLocaleTimeString();

      if (messageText.includes('телеграмм') || messageText.includes('telegram')) {
        appendSystemWarning('Мы ни в коем случае не рекомендуем переходить в другие мессенджеры, это не безопасно.', timestamp);
      }

      if (messageText.startsWith('/mess')) {
        const systemText = 'Платеж подтвержден продавцом. Чтобы вывести средства на маркет, воспользуйтесь кнопками: Профиль - Мои средства - Вывести средства. Чат будет закрыт через 30 секунд.';
        appendSystemMessage(systemText, timestamp);
        setTimeout(closeChat, 30000);
      } else if (messageText.startsWith('/amess')) {
        const systemText = 'Платеж подтвержден по решению администрации. Чтобы вывести средства на маркет, перейдите в Профиль, затем выберите Мои средства и нажмите Вывести средства.';
        appendSystemMessage(systemText, timestamp);
      } else if (messageText.startsWith('/acmess')) {
        const systemText = 'Платеж был отклонен по решению администрации.';
        appendSystemMessage(systemText, timestamp);
      } else {
        const messageData = {
          userId: messageText.startsWith('/admin') ? 'admin' :
            messageText.startsWith('/1 ') ? 'other' : 'current',
          text: messageText.startsWith('/1 ') || messageText.startsWith('/admin')
            ? messageText.split(' ').slice(1).join(' ')
            : messageText,
          timestamp,
        };
        appendMessage(messageData);
      }

      setInputValue('');
    }
  };

  const appendSystemWarning = (text, timestamp) => {
    setMessages((prevMessages) => [
        ...prevMessages,
        { text, type: 'warning', timestamp },
    ]);
    scrollChatToBottom();
};

const appendSystemMessage = (text, timestamp) => {
  setMessages((prevMessages) => [
      ...prevMessages,
      { text, type: 'system', timestamp },
  ]);
  scrollChatToBottom();
};

const appendMessage = (messageData) => {
  setMessages((prevMessages) => [
      ...prevMessages,
      { ...messageData, type: 'message' },
  ]);
  scrollChatToBottom();
};

  const appendGifSticker = (src) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { src, type: 'sticker' },
    ]);
    scrollChatToBottom();
  };

  const closeChat = () => {
    setChatClosed(true);
    appendSystemMessage('Чат закрыт. Вы не можете отправлять сообщения.');
    setTimeout(() => {
      appendGifSticker('bye.gif');
    }, 1000);
  };

  const adjustChatHeight = () => {
    const currentHeight = window.innerHeight;
    if (currentHeight < initialHeight.current) {
      const heightDifference = initialHeight.current - currentHeight;
      inputContainerRef.current.style.bottom = `${heightDifference}px`;
      chatContainerRef.current.style.paddingBottom = `${heightDifference + 80}px`;
    } else {
      inputContainerRef.current.style.bottom = '0';
      chatContainerRef.current.style.paddingBottom = '80px';
    }
    scrollChatToBottom();
  };

  const scrollChatToBottom = () => {
    setTimeout(() => {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      window.scrollTo(0, 0);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('resize', adjustChatHeight);
    return () => {
      window.removeEventListener('resize', adjustChatHeight);
    };
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);
  return (
    <div className="App">
      <TopBar toggleMenu={toggleMenu} showModal={showModal} isMenuVisible={isMenuVisible} />
      {isNotificationVisible && <NotificationBar closeNotification={closeNotification} />}
      <ChatContainer messages={messages} chatContainerRef={chatContainerRef} />
      <InputContainer
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        isChatClosed={isChatClosed}
        inputContainerRef={inputContainerRef}
      />
      {isModalVisible && <ModalOverlay closeModal={closeModal} modalType={isModalVisible} />}
    </div>
  );
}

export default App;
