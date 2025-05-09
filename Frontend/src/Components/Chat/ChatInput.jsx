import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t bg-background p-4 bottom-0"
    >
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <textarea
            className="w-full border rounded-lg px-4 py-2 pr-10 resize-none bg-background"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={1}
            disabled={isLoading}
            style={{
              minHeight: '44px',
              maxHeight: '200px'
            }}
          />
        </div>
        <Button 
          type="submit" 
          size="icon" 
          disabled={!input.trim() || isLoading}
        >
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground text-center">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
};

export default ChatInput;