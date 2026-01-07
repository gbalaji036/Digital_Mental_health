import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { runChatStream } from '../services/apiService';
import type { ChatMessage } from '../types';
import { IconSend, IconUser, IconBot, IconX } from '../components/IconComponents';
import BackgroundVideo from '../components/BackgroundVideo';

const ChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Yo! I'm Hector. Think of me as your personal study-buddy and life-hacker. What's on your mind today? 😄" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;
        const userMessage: ChatMessage = { role: 'user', text: input };
        const newMessages = [...messages, userMessage, { role: 'model', text: '' } as ChatMessage];
        setMessages(newMessages);
        const currentInput = input;
        setInput('');
        setIsLoading(true);
        try {
            const stream = runChatStream(currentInput, messages);
            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk;
                setMessages(prev => {
                    const newMsgs = [...prev];
                    newMsgs[newMsgs.length - 1].text = fullResponse;
                    return newMsgs;
                });
            }
        } catch (error) {
            setMessages(prev => [...prev.slice(0, -1), { role: 'model', text: 'Sorry, I had a glitch. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            <BackgroundVideo src="https://videos.pexels.com/video-files/4057913/4057913-hd_1920_1080_25fps.mp4" />
            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-light-text">AI Companion</h1>
                    <p className="text-light-text/70 mt-2">A private space to talk, brainstorm, and figure things out.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-dark-neutral/90 backdrop-blur-md rounded-xl border border-light-neutral/50 flex flex-col h-[70vh]">
                        <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && <div className="bg-primary rounded-full p-2"><IconBot className="w-6 h-6 text-dark-bg"/></div>}
                                    <div className={`max-w-md p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary text-dark-bg rounded-br-none' : 'bg-light-neutral text-light-text/90 rounded-bl-none'}`}>
                                        <p className="whitespace-pre-wrap">{msg.text}</p>
                                    </div>
                                    {msg.role === 'user' && <div className="bg-light-neutral rounded-full p-2"><IconUser className="w-6 h-6 text-light-text"/></div>}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-light-neutral/50">
                            <div className="flex items-center bg-dark-bg rounded-lg">
                                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Let's talk..." className="w-full bg-transparent p-3 focus:outline-none" disabled={isLoading} />
                                <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-3 text-primary"><IconSend className="w-6 h-6" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;