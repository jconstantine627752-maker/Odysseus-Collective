import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOdysseusResponse } from '../lib/odysseus-ai';

interface Message {
  text: string;
  isUser: boolean;
}

const OdysseusStatue: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { text: trimmed, isUser: true }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getOdysseusResponse(trimmed);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'The stone cracks, but no wisdom emerges.', isUser: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative z-10">
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.02, rotateY: 5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-80 h-[32rem] bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-2xl overflow-hidden border border-[#E5C970]/20">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JhaW4iIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWluKSIvPjwvc3ZnPg==')] opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-800 rounded-full shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#E5C970]/10" />
          </div>

          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-48 h-80 bg-gray-800">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-700 to-gray-900" />
          </div>
        </div>

        <div className="absolute inset-0 bg-[#E5C970]/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-blue-900/20 blur-2xl rounded-full animate-pulse delay-75" />
        <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full animate-pulse delay-150" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-[#E5C970]/50 to-transparent blur-sm" />
      </motion.div>

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
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-gray-100">Odysseus Speaks</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-100'
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
};

export default OdysseusStatue;
