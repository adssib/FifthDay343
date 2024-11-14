import React, { useState, useEffect, useRef } from 'react';
import '../styles/Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false); // hide by default
    const messagesEndRef = useRef(null);

    const handleSend = () => {
        if (!userMessage) return;

        setMessages([...messages, { text: userMessage, isUser: true }]);
        setUserMessage('');

        setTimeout(() => { setMessages(prevMessages => [...prevMessages, { text: "Hello! How can I assist you?", isUser: false }]); }, 800);
    };

    const handleToggleChatbot = () => {
        setIsOpen(!isOpen); // toggle chatbot
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h3>Chatbot</h3>
                        <button className="chatbot-close-btn" onClick={handleToggleChatbot}>
                            &times;
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chatbot-message ${message.isUser ? 'user-message' : 'bot-message'}`}
                            >
                                {message.text}
                            </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-container">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Ask questions..."
                            className="chatbot-input"
                        />
                        <button
                            onClick={handleSend}
                            className="chatbot-send-btn"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Chatbot button */}
            {!isOpen && (
                <button onClick={handleToggleChatbot} className="chatbot-toggle-btn">
                    Chat
                </button>
            )}
        </>
    );
};

export default Chatbot;
