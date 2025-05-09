import React from 'react';
import { cn } from '@/lib/utils';

const MessageItem = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-muted text-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm md:text-base whitespace-pre-wrap break-words">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageItem;