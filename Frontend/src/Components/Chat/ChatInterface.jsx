import React, { useState } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import ReactMarkdown from "react-markdown"

const ChatInterface = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (content) => {
        const userMessage = {
            id: uuidv4(),
            content,
            role: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            const response = await axios.get("http://localhost:3000/api/ask", {
                params: {
                    query: content,
                }
            });
            // console.log(response.data.answer);
            const aiResponse = {
                id: uuidv4(),
                content: <ReactMarkdown>{response.data.answer}</ReactMarkdown>,
                role: 'assistant'
            };

            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Failed to get response:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full border rounded-lg shadow-sm overflow-hidden bg-background">
            <div className="flex flex-col h-full">
                <MessageList messages={messages} isLoading={isLoading} />
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} className="relative bottom-0" />
            </div>
        </div>
    );
};

export default ChatInterface;