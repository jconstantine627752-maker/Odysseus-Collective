import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOdysseusResponse } from '../lib/odysseus-ai';

interface Message {
  text: string;
  isUser: boolean;
  pending?: boolean;
}

export default function OdysseusStatue() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);

    try {
      // Get and add Odysseus response
      const response = await getOdysseusResponse(input);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "The stone cracks, but no wisdom emerges. Perhaps the Fates themselves conspire against our dialogue.", 
        isUser: false 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* Statue */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-64 h-96 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl overflow-hidden">
          {/* Statue details */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Head */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gray-800 rounded-full shadow-inner" />
          
          {/* Body */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-40 h-64 bg-gray-800">
            {/* Robe details */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>
        
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full animate-pulse" />
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg w-full max-w-md h-[600px] flex flex-col shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-800 text-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-800 text-gray-100">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Speak to Odysseus..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}