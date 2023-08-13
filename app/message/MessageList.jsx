import React from 'react';

const MessageList = () => {
  // Sample message data
  const messages = [
    { id: 1, sender: 'User1', content: 'Hello!' },
    { id: 2, sender: 'User2', content: 'Hi there!' },
    // ... more messages
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Message List</h3>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className="mb-2">
            <strong>{message.sender}:</strong> {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
