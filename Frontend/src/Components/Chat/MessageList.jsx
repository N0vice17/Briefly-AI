import React from 'react';
import MessageItem from './MessageItem';
import LoadingDots from './LoadingDots';

const MessageList = ({ messages, isLoading }) => {
  const messagesEndRef = React.useRef(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground text-center">
            Upload a PDF to start the conversation
          </p>
        </div>
      )}
      
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-muted rounded-2xl rounded-tl-none">
            <LoadingDots />
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;