import React from 'react';
import SendMessageForm from './SendMessageForm';

const MessageSection = ({ selectedUser, messages }) => {
  return (
    <div className="message-section">
      <h3>Messages with {selectedUser}</h3>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message.content}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MessageSection;
